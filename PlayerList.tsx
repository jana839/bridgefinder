import { Player } from "@/types/player";
import { PlayerCard } from "./PlayerCard";
import { Users } from "lucide-react";

interface PlayerListProps {
  players: Player[];
  onRemove: (id: string) => void;
}

export function PlayerList({ players, onRemove }: PlayerListProps) {
  // Sort players by date, then by time
  const sortedPlayers = [...players].sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    return a.time.localeCompare(b.time);
  });

  if (players.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <p className="text-muted-foreground text-lg">
          No players available yet.
        </p>
        <p className="text-muted-foreground text-sm mt-1">
          Be the first to post your availability!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-5 h-5 text-accent" />
        <h2 className="font-serif text-2xl font-semibold text-foreground">
          Available Players
        </h2>
        <span className="text-sm text-muted-foreground ml-2">
          ({players.length} {players.length === 1 ? 'player' : 'players'})
        </span>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2">
        {sortedPlayers.map((player, index) => (
          <PlayerCard 
            key={player.id} 
            player={player} 
            index={index} 
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
}
