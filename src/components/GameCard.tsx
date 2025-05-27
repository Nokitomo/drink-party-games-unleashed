
import { Card } from "@/components/ui/card";

interface Game {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
}

interface GameCardProps {
  game: Game;
  onSelect: () => void;
}

export const GameCard = ({ game, onSelect }: GameCardProps) => {
  return (
    <Card 
      className={`${game.color} p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl haptic-feedback border-0 relative overflow-hidden`}
      onClick={onSelect}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="text-4xl mb-3 animate-bounce-gentle">
          {game.icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          {game.title}
        </h3>
        <p className="text-white/90 text-sm">
          {game.description}
        </p>
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full transition-transform duration-700 hover:translate-x-full"></div>
    </Card>
  );
};
