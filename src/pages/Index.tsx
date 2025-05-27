import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GameCard } from "@/components/GameCard";
import { KingsCup } from "@/components/games/KingsCup";
import { IoNonHoMai } from "@/components/games/IoNonHoMai";
import { PowerHour } from "@/components/games/PowerHour";
import { Quarters } from "@/components/games/Quarters";
import { FlipCup } from "@/components/games/FlipCup";
import { Settings } from "lucide-react";

const games = [
  {
    id: 'kings-cup',
    title: "King's Cup",
    description: "Il classico gioco con le carte",
    color: "bg-gradient-to-br from-purple-500 to-pink-500",
    icon: "👑"
  },
  {
    id: 'io-non-ho-mai',
    title: "Io Non Ho Mai",
    description: "Scopri i segreti dei tuoi amici",
    color: "bg-gradient-to-br from-blue-500 to-cyan-500",
    icon: "🤫"
  },
  {
    id: 'power-hour',
    title: "Power Hour",
    description: "60 minuti di pura resistenza",
    color: "bg-gradient-to-br from-orange-500 to-red-500",
    icon: "⏰"
  },
  {
    id: 'quarters',
    title: "Quarters",
    description: "Mira e lancia la moneta",
    color: "bg-gradient-to-br from-yellow-500 to-orange-500",
    icon: "🪙"
  },
  {
    id: 'flip-cup',
    title: "Flip Cup",
    description: "Gara di abilità a squadre",
    color: "bg-gradient-to-br from-green-500 to-teal-500",
    icon: "🥤"
  }
];

const Index = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  const renderGame = () => {
    switch (selectedGame) {
      case 'kings-cup':
        return <KingsCup />;
      case 'io-non-ho-mai':
        return <IoNonHoMai />;
      case 'power-hour':
        return <PowerHour />;
      case 'quarters':
        return <Quarters />;
      case 'flip-cup':
        return <FlipCup />;
      default:
        return null;
    }
  };

  if (selectedGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="p-4">
          <Button 
            onClick={() => setSelectedGame(null)}
            variant="outline"
            className="mb-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            ← Torna alla Lobby
          </Button>
          {renderGame()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="p-6 text-center">
        <h1 className="text-4xl font-bold text-white mb-2 party-gradient bg-clip-text text-transparent">
          DrinkParty
        </h1>
        <p className="text-white/80 text-lg">
          L'app definitiva per i giochi alcolici
        </p>
      </div>

      {/* Game Grid */}
      <div className="px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onSelect={() => setSelectedGame(game.id)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-lg border-t border-white/10">
        <div className="flex justify-center py-3">
          <Button variant="ghost" className="flex flex-col gap-1 text-white/70 hover:text-white hover:bg-white/10">
            <Settings className="w-5 h-5" />
            <span className="text-xs">Impostazioni</span>
          </Button>
        </div>
      </div>

      {/* Safety Reminder */}
      <div className="fixed top-4 right-4 glass-effect rounded-lg p-3 text-white/90 text-sm max-w-xs hidden md:block">
        💡 Ricorda di bere responsabilmente!
      </div>
    </div>
  );
};

export default Index;
