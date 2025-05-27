
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Quarters = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [lastResult, setLastResult] = useState<'success' | 'miss' | null>(null);
  const [score, setScore] = useState({ hits: 0, attempts: 0 });
  const [gameActive, setGameActive] = useState(false);

  const flipCoin = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    setGameActive(true);
    
    // Simulate coin physics with random result
    setTimeout(() => {
      const success = Math.random() > 0.7; // 30% success rate
      setLastResult(success ? 'success' : 'miss');
      setScore(prev => ({
        hits: success ? prev.hits + 1 : prev.hits,
        attempts: prev.attempts + 1
      }));
      setIsFlipping(false);
    }, 2000);
  };

  const resetGame = () => {
    setScore({ hits: 0, attempts: 0 });
    setLastResult(null);
    setGameActive(false);
    setIsFlipping(false);
  };

  const accuracy = score.attempts > 0 ? Math.round((score.hits / score.attempts) * 100) : 0;

  return (
    <div className="max-w-2xl mx-auto">
      <Tabs defaultValue="play" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-black/30">
          <TabsTrigger value="rules" className="text-white data-[state=active]:bg-yellow-600">
            Regole
          </TabsTrigger>
          <TabsTrigger value="play" className="text-white data-[state=active]:bg-yellow-600">
            Gioca
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="space-y-4">
          <Card className="bg-black/30 border-white/20 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Come si gioca</h2>
            <div className="space-y-3 text-white/90">
              <p>• Ogni giocatore cerca di far rimbalzare una moneta in un bicchiere</p>
              <p>• Se centri il bicchiere, puoi assegnare un sorso a qualcuno</p>
              <p>• Se sbagli, tocca al giocatore successivo</p>
              <p>• Nel gioco virtuale: swipe verso l'alto per lanciare!</p>
            </div>
          </Card>
          
          <Card className="bg-yellow-900/30 border-yellow-500/30 p-4">
            <h3 className="text-lg font-bold text-yellow-200 mb-2">🎯 Setup</h3>
            <div className="space-y-2 text-yellow-200 text-sm">
              <p>• Posizionate un bicchiere al centro del tavolo</p>
              <p>• Ogni giocatore ha 1 moneta</p>
              <p>• Sedete in cerchio intorno al tavolo</p>
            </div>
          </Card>
          
          <Card className="bg-orange-900/30 border-orange-500/30 p-4">
            <h3 className="text-lg font-bold text-orange-200 mb-2">🏆 Varianti</h3>
            <div className="space-y-2 text-orange-200 text-sm">
              <p>• <strong>Sfida:</strong> 3 centri di fila = tutti bevono</p>
              <p>• <strong>Vendetta:</strong> Chi ti fa bere può essere "vendicato"</p>
              <p>• <strong>Doppio:</strong> Centro al primo colpo = assegni 2 sorsi</p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="play" className="space-y-6">
          {/* Game Area */}
          <Card className="bg-gradient-to-b from-green-800 to-green-900 p-8 text-center min-h-[400px] relative overflow-hidden">
            {/* Table Surface */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-700 to-green-800"></div>
            
            {/* Cup Target */}
            <div className="relative z-10">
              <div className="mx-auto w-24 h-24 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full border-4 border-gray-600 mb-8 mt-16 relative">
                <div className="absolute inset-2 bg-gradient-to-b from-gray-100 to-gray-300 rounded-full"></div>
                {lastResult === 'success' && !isFlipping && (
                  <div className="absolute -top-2 -right-2 text-2xl animate-bounce">✨</div>
                )}
              </div>
              
              {/* Coin */}
              <div className={`mx-auto w-12 h-12 ${isFlipping ? 'animate-coin-flip' : ''}`}>
                <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full border-2 border-yellow-700 flex items-center justify-center text-yellow-900 font-bold">
                  🪙
                </div>
              </div>
              
              {/* Launch Instruction */}
              {!isFlipping && (
                <div className="mt-8 text-white">
                  <p className="text-lg mb-2">Swipe verso l'alto per lanciare!</p>
                  <div className="text-4xl animate-bounce">⬆️</div>
                </div>
              )}
            </div>
            
            {/* Touch Area */}
            <div 
              className="absolute inset-0 z-20 cursor-pointer"
              onTouchStart={flipCoin}
              onClick={flipCoin}
            ></div>
          </Card>

          {/* Result Display */}
          {lastResult && !isFlipping && (
            <Card className={`p-6 text-center ${
              lastResult === 'success' 
                ? 'bg-green-900/50 border-green-500/50' 
                : 'bg-red-900/50 border-red-500/50'
            }`}>
              <div className={`text-2xl font-bold mb-2 ${
                lastResult === 'success' ? 'text-green-200' : 'text-red-200'
              }`}>
                {lastResult === 'success' ? '🎯 CENTRO!' : '😞 MANCATO!'}
              </div>
              <p className={lastResult === 'success' ? 'text-green-300' : 'text-red-300'}>
                {lastResult === 'success' 
                  ? 'Assegna un sorso a qualcuno!' 
                  : 'Tocca al prossimo giocatore'
                }
              </p>
            </Card>
          )}

          {/* Stats */}
          {gameActive && (
            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-black/30 border-white/20 p-4 text-center">
                <div className="text-2xl font-bold text-yellow-300">{score.hits}</div>
                <div className="text-white/70 text-sm">Centri</div>
              </Card>
              <Card className="bg-black/30 border-white/20 p-4 text-center">
                <div className="text-2xl font-bold text-yellow-300">{score.attempts}</div>
                <div className="text-white/70 text-sm">Tentativi</div>
              </Card>
              <Card className="bg-black/30 border-white/20 p-4 text-center">
                <div className="text-2xl font-bold text-yellow-300">{accuracy}%</div>
                <div className="text-white/70 text-sm">Precisione</div>
              </Card>
            </div>
          )}

          {/* Controls */}
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={flipCoin}
              disabled={isFlipping}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 text-lg haptic-feedback"
            >
              {isFlipping ? 'Lanciando...' : 'Lancia Moneta'}
            </Button>
            <Button 
              onClick={resetGame}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3"
            >
              Reset
            </Button>
          </div>

          {/* Tips */}
          <Card className="bg-blue-900/30 border-blue-500/30 p-4">
            <div className="text-center text-blue-200">
              <div className="text-lg mb-2">💡 Suggerimento</div>
              <p className="text-sm">
                Nel gioco reale, fate rimbalzare la moneta sul tavolo prima che entri nel bicchiere!
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
