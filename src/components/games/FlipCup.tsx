
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Player {
  id: number;
  name: string;
  flipped: boolean;
}

export const FlipCup = () => {
  const [team1, setTeam1] = useState<Player[]>([
    { id: 1, name: "Giocatore 1", flipped: false },
    { id: 2, name: "Giocatore 2", flipped: false },
    { id: 3, name: "Giocatore 3", flipped: false },
  ]);
  
  const [team2, setTeam2] = useState<Player[]>([
    { id: 4, name: "Giocatore 4", flipped: false },
    { id: 5, name: "Giocatore 5", flipped: false },
    { id: 6, name: "Giocatore 6", flipped: false },
  ]);
  
  const [currentPlayer, setCurrentPlayer] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const flipCup = (playerId: number, team: 'team1' | 'team2') => {
    if (isFlipping || currentPlayer !== playerId) return;
    
    setIsFlipping(true);
    
    // Simulate flip attempt (70% success rate)
    setTimeout(() => {
      const success = Math.random() > 0.3;
      
      if (success) {
        if (team === 'team1') {
          setTeam1(prev => prev.map(p => 
            p.id === playerId ? { ...p, flipped: true } : p
          ));
        } else {
          setTeam2(prev => prev.map(p => 
            p.id === playerId ? { ...p, flipped: true } : p
          ));
        }
        
        // Move to next player or declare winner
        const nextPlayer = getNextPlayer(playerId, team);
        setCurrentPlayer(nextPlayer);
        
        if (!nextPlayer) {
          setWinner(team === 'team1' ? 'Team 1' : 'Team 2');
          setGameStarted(false);
        }
      }
      
      setIsFlipping(false);
    }, 1000);
  };

  const getNextPlayer = (playerId: number, team: 'team1' | 'team2') => {
    const teamArray = team === 'team1' ? team1 : team2;
    const currentIndex = teamArray.findIndex(p => p.id === playerId);
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < teamArray.length) {
      return teamArray[nextIndex].id;
    }
    return null;
  };

  const startGame = () => {
    setGameStarted(true);
    setCurrentPlayer(1); // First player from team 1
    setWinner(null);
    resetAllCups();
  };

  const resetAllCups = () => {
    setTeam1(prev => prev.map(p => ({ ...p, flipped: false })));
    setTeam2(prev => prev.map(p => ({ ...p, flipped: false })));
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentPlayer(null);
    setWinner(null);
    setIsFlipping(false);
    resetAllCups();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="play" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-black/30">
          <TabsTrigger value="rules" className="text-white data-[state=active]:bg-green-600">
            Regole
          </TabsTrigger>
          <TabsTrigger value="play" className="text-white data-[state=active]:bg-green-600">
            Gioca
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="space-y-4">
          <Card className="bg-black/30 border-white/20 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Come si gioca</h2>
            <div className="space-y-3 text-white/90">
              <p>• Formate due squadre da 3-4 persone ciascuna</p>
              <p>• Ogni giocatore ha un bicchiere di plastica con un po' di bevanda</p>
              <p>• Al via, il primo giocatore di ogni squadra beve tutto</p>
              <p>• Poi deve capovolgere il bicchiere facendolo "saltare" dal bordo del tavolo</p>
              <p>• Solo quando ci riesce può iniziare il compagno successivo</p>
              <p>• Vince la prima squadra che finisce!</p>
            </div>
          </Card>
          
          <Card className="bg-green-900/30 border-green-500/30 p-4">
            <h3 className="text-lg font-bold text-green-200 mb-2">🏆 Setup Squadre</h3>
            <div className="space-y-2 text-green-200 text-sm">
              <p>• Le squadre si posizionano ai lati opposti del tavolo</p>
              <p>• I bicchieri vanno posizionati sul bordo del tavolo</p>
              <p>• Decidete un segnale di inizio (es. "3, 2, 1, VIA!")</p>
            </div>
          </Card>
          
          <Card className="bg-blue-900/30 border-blue-500/30 p-4">
            <h3 className="text-lg font-bold text-blue-200 mb-2">🎯 Tecnica del Flip</h3>
            <div className="space-y-2 text-blue-200 text-sm">
              <p>• Posiziona il bicchiere capovolto sul bordo del tavolo</p>
              <p>• Usa l'indice per dare un colpetto secco al bordo inferiore</p>
              <p>• Il bicchiere deve fare una rotazione e atterrare dritto</p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="play" className="space-y-6">
          {/* Game Status */}
          {gameStarted && (
            <Card className="bg-green-900/50 border-green-500/50 p-4 text-center">
              <h3 className="text-xl font-bold text-green-200 mb-2">
                🏁 Gara in corso!
              </h3>
              <p className="text-green-300">
                Tocca a: <span className="font-bold">
                  {currentPlayer ? 
                    [...team1, ...team2].find(p => p.id === currentPlayer)?.name : 
                    "Nessuno"
                  }
                </span>
              </p>
            </Card>
          )}

          {/* Winner Display */}
          {winner && (
            <Card className="bg-yellow-900/50 border-yellow-500/50 p-6 text-center">
              <h3 className="text-2xl font-bold text-yellow-200 mb-2">
                🏆 {winner} VINCE!
              </h3>
              <p className="text-yellow-300">
                Complimenti! Gli avversari bevono una penale!
              </p>
            </Card>
          )}

          {/* Teams Display */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Team 1 */}
            <Card className="bg-blue-900/30 border-blue-500/30 p-6">
              <h3 className="text-xl font-bold text-blue-200 mb-4 text-center">
                Team 1
              </h3>
              <div className="space-y-3">
                {team1.map((player, index) => (
                  <div 
                    key={player.id}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                      currentPlayer === player.id ? 
                        'bg-blue-600/50 border-2 border-blue-400' : 
                        'bg-blue-800/30'
                    } ${player.flipped ? 'opacity-50' : ''}`}
                    onClick={() => gameStarted && flipCup(player.id, 'team1')}
                  >
                    <span className="text-white font-medium">
                      {player.name}
                    </span>
                    <div className={`text-2xl transform transition-all duration-500 ${
                      isFlipping && currentPlayer === player.id ? 'animate-bounce' : ''
                    }`}>
                      {player.flipped ? '✅' : '🥤'}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Team 2 */}
            <Card className="bg-red-900/30 border-red-500/30 p-6">
              <h3 className="text-xl font-bold text-red-200 mb-4 text-center">
                Team 2
              </h3>
              <div className="space-y-3">
                {team2.map((player, index) => (
                  <div 
                    key={player.id}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                      currentPlayer === player.id ? 
                        'bg-red-600/50 border-2 border-red-400' : 
                        'bg-red-800/30'
                    } ${player.flipped ? 'opacity-50' : ''}`}
                    onClick={() => gameStarted && flipCup(player.id, 'team2')}
                  >
                    <span className="text-white font-medium">
                      {player.name}
                    </span>
                    <div className={`text-2xl transform transition-all duration-500 ${
                      isFlipping && currentPlayer === player.id ? 'animate-bounce' : ''
                    }`}>
                      {player.flipped ? '✅' : '🥤'}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Instructions */}
          {gameStarted && currentPlayer && (
            <Card className="bg-yellow-900/30 border-yellow-500/30 p-4">
              <div className="text-center text-yellow-200">
                <div className="text-lg mb-2">🎯 Istruzioni</div>
                <p className="text-sm">
                  Tocca il tuo bicchiere per tentare il flip! 
                  {isFlipping ? " Flippando..." : " Buona fortuna!"}
                </p>
              </div>
            </Card>
          )}

          {/* Controls */}
          <div className="flex gap-4 justify-center">
            {!gameStarted ? (
              <Button 
                onClick={startGame}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg haptic-feedback"
              >
                Inizia Gara
              </Button>
            ) : (
              <Button 
                onClick={resetGame}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-3"
              >
                Ferma Gara
              </Button>
            )}
            
            <Button 
              onClick={resetGame}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3"
            >
              Reset
            </Button>
          </div>

          {/* Tips */}
          <Card className="bg-purple-900/30 border-purple-500/30 p-4">
            <div className="text-center text-purple-200">
              <div className="text-lg mb-2">🍺 Modalità Pass-and-Play</div>
              <p className="text-sm">
                Passate il telefono al giocatore di turno per un'esperienza più realistica!
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
