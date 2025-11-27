import { Spade, Heart, Diamond, Club } from "lucide-react";

export function HeroSection() {
  return (
    <header className="bg-gradient-hero text-primary-foreground py-16 px-4 relative overflow-hidden">
      {/* Decorative suit symbols */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <Spade className="absolute top-8 left-[10%] w-24 h-24" />
        <Heart className="absolute bottom-8 right-[15%] w-20 h-20" />
        <Diamond className="absolute top-1/2 left-[5%] w-16 h-16" />
        <Club className="absolute bottom-1/4 right-[8%] w-28 h-28" />
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="flex justify-center gap-2 mb-6">
          <Spade className="w-6 h-6 text-gold-light" />
          <Heart className="w-6 h-6 text-gold-light" />
          <Diamond className="w-6 h-6 text-gold-light" />
          <Club className="w-6 h-6 text-gold-light" />
        </div>
        
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
          Bridge Partner Finder
        </h1>
        
        <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '100ms' }}>
          Looking for a bridge partner? Browse available players or post your availability 
          to find your perfect match for your next game.
        </p>
      </div>
    </header>
  );
}
