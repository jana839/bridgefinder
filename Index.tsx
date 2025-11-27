import { useState, useEffect } from "react";
import { Player, SkillLevel } from "@/types/player";
import { HeroSection } from "@/components/HeroSection";
import { PlayerForm } from "@/components/PlayerForm";
import { PlayerList } from "@/components/PlayerList";
import { PasswordGate } from "@/components/PasswordGate";
import { Spade } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Sample initial data
const initialPlayers: Player[] = [
  {
    id: "1",
    name: "Margaret Chen",
    email: "margaret.chen@email.com",
    location: "Downtown Bridge Club, NYC",
    date: "2025-11-29",
    time: "14:00",
    level: "advanced",
    notes: "Prefer Standard American bidding",
    createdAt: new Date(),
  },
  {
    id: "2", 
    name: "Robert Williams",
    email: "r.williams@email.com",
    location: "Online (BBO)",
    date: "2025-11-28",
    time: "19:00",
    level: "intermediate",
    notes: "Available for online or in-person games",
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "Susan Taylor",
    email: "susan.t@email.com",
    location: "Boston Bridge Center",
    date: "2025-11-30",
    time: "10:00",
    level: "expert",
    notes: "Looking for tournament practice partner",
    createdAt: new Date(),
  },
  {
    id: "4",
    name: "David Park",
    email: "david.park@email.com",
    location: "Community Center, Chicago",
    date: "2025-11-28",
    time: "15:30",
    level: "beginner",
    notes: "New to bridge, patient partner appreciated",
    createdAt: new Date(),
  },
];

// Filter out expired players (date/time has passed)
const filterExpiredPlayers = (players: Player[]): Player[] => {
  const now = new Date();
  return players.filter((player) => {
    const playerDateTime = new Date(`${player.date}T${player.time}`);
    return playerDateTime > now;
  });
};

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => 
    sessionStorage.getItem("bridge-auth") === "true"
  );
  const [players, setPlayers] = useState<Player[]>(() => 
    filterExpiredPlayers(initialPlayers)
  );

  // Check for expired players every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayers((current) => filterExpiredPlayers(current));
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const handleAddPlayer = (newPlayer: Omit<Player, 'id' | 'createdAt'>) => {
    const player: Player = {
      ...newPlayer,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setPlayers((prev) => [player, ...prev]);
  };

  const handleRemovePlayer = (id: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
    toast({
      title: "Listing Removed",
      description: "Your availability has been removed. Good luck with your game!",
    });
  };

  if (!isAuthenticated) {
    return <PasswordGate onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Players List Section */}
          <div className="flex-1 md:w-2/3">
            <PlayerList players={players} onRemove={handleRemovePlayer} />
          </div>
          
          {/* Form Section */}
          <div className="md:w-1/3">
            <div className="md:sticky md:top-8">
              <PlayerForm onSubmit={handleAddPlayer} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Spade className="w-4 h-4" />
            <span className="text-sm">Bridge Partner Finder</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Find your perfect bridge partner for your next game
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
