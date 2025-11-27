import { useState } from "react";
import { Player, SkillLevel } from "@/types/player";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PlayerFormProps {
  onSubmit: (player: Omit<Player, 'id' | 'createdAt'>) => void;
}

export function PlayerForm({ onSubmit }: PlayerFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [level, setLevel] = useState<SkillLevel | "">("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !location.trim() || !date || !time || !level) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      name: name.trim(),
      email: email.trim(),
      location: location.trim(),
      date,
      time,
      level: level as SkillLevel,
      notes: notes.trim() || undefined,
    });

    // Reset form
    setName("");
    setEmail("");
    setLocation("");
    setDate("");
    setTime("");
    setLevel("");
    setNotes("");

    toast({
      title: "Success!",
      description: "Your availability has been posted.",
    });
  };

  // Get today's date as minimum
  const today = new Date().toISOString().split('T')[0];

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card">
      <CardHeader className="pb-4">
        <CardTitle className="font-serif text-xl flex items-center gap-2 text-foreground">
          <UserPlus className="w-5 h-5 text-accent" />
          Post Your Availability
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              maxLength={50}
              className="bg-background border-input focus:ring-accent"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">Email *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              maxLength={100}
              className="bg-background border-input focus:ring-accent"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-foreground">Location *</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City or venue name"
              maxLength={100}
              className="bg-background border-input focus:ring-accent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-foreground">Date *</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={today}
                className="bg-background border-input focus:ring-accent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-foreground">Time *</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-background border-input focus:ring-accent"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="level" className="text-foreground">Playing Level *</Label>
            <Select value={level} onValueChange={(val) => setLevel(val as SkillLevel)}>
              <SelectTrigger className="bg-background border-input">
                <SelectValue placeholder="Select your level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="novice">Novice</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-foreground">Notes (optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional details (preferred conventions, online/in-person, etc.)"
              maxLength={200}
              rows={3}
              className="bg-background border-input focus:ring-accent resize-none"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            Post Availability
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
