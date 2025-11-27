import { useState } from "react";
import { Player, SkillLevel } from "@/types/player";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Calendar, Clock, User, MessageSquare, Mail, MapPin, UserMinus } from "lucide-react";

const levelLabels: Record<SkillLevel, string> = {
  novice: "Novice",
  beginner: "Beginner",
  intermediate: "Intermediate", 
  advanced: "Advanced",
  expert: "Expert",
};

interface PlayerCardProps {
  player: Player;
  index: number;
  onRemove: (id: string) => void;
}

export function PlayerCard({ player, index, onRemove }: PlayerCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card 
      className="bg-gradient-card border-border/50 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-5 relative">
        <Badge variant={player.level} className="absolute -top-0 -right-0 flex-shrink-0 rounded-none rounded-bl-lg rounded-tr-lg">
          {levelLabels[player.level]}
        </Badge>

        <div>
          <div className="flex items-center gap-2 mb-3 pr-20">
            <User className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <h3 className="font-serif text-lg font-semibold text-foreground truncate">
              {player.name}
            </h3>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span>{formatDate(player.date)}</span>
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span>{player.time}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{player.location}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <a 
                href={`mailto:${player.email}`}
                className="text-accent hover:underline truncate"
              >
                {player.email}
              </a>
            </div>

            {player.notes && (
              <div className="flex items-start gap-2 text-muted-foreground pt-1">
                <MessageSquare className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span className="text-xs italic line-clamp-2">{player.notes}</span>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-border/50">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <UserMinus className="w-4 h-4 mr-2" />
                  Partner no longer needed
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove Listing?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Please confirm that <strong>{player.email}</strong> no longer needs a partner for their bridge game on {formatDate(player.date)} at {player.time}.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => onRemove(player.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Yes, remove listing
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
