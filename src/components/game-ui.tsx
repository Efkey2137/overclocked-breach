"use client"

import { useState, useEffect } from "react"
import { Shield, Zap, Info, Volume2, VolumeX, Play, Settings, ArrowLeft, Power } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { GameScreen, GameMode, PowerupType } from "@/types/index"

/**
 * Main Game UI Component for Overlock Breach
 *
 * This component manages the game state and renders different screens based on the current game state.
 */
export function GameUI() {
  // Game state
  const [currentScreen, setCurrentScreen] = useState<GameScreen>("start")
  const [gameMode, setGameMode] = useState<GameMode>("endless")
  const [threatLevel, setThreatLevel] = useState(45)
  const [timeUntilBlackout, setTimeUntilBlackout] = useState(30)
  const [comboMultiplier, setComboMultiplier] = useState(1.5)
  const [systemCorruption, setSystemCorruption] = useState(65)
  const [gatePenetration, setGatePenetration] = useState(42)
  const [ultimateCooldown, setUltimateCooldown] = useState(80)
  const [activePowerups, setActivePowerups] = useState<PowerupType[]>(["speed", "disable"])
  const [isMuted, setIsMuted] = useState(false)
  const [isGlitching, setIsGlitching] = useState(false)

  // Simulate glitch effect when blackout approaches
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (timeUntilBlackout < 10) {
        setIsGlitching((prev) => !prev)
      } else {
        setIsGlitching(false)
      }
    }, 500)

    return () => clearInterval(glitchInterval)
  }, [timeUntilBlackout])

  // Simulate game values changing
  useEffect(() => {
    if (currentScreen !== "game") return

    const gameInterval = setInterval(() => {
      // Update threat level (random fluctuation)
      setThreatLevel((prev) => Math.max(0, Math.min(100, prev + (Math.random() * 10 - 5))))

      // Countdown to blackout
      setTimeUntilBlackout((prev) => Math.max(0, prev - 1))

      // Update combo multiplier (random fluctuation)
      setComboMultiplier((prev) => Math.max(1, Math.min(5, prev + (Math.random() * 0.4 - 0.2))))

      // Increase system corruption (endless mode)
      setSystemCorruption((prev) => Math.min(100, prev + 0.5))

      // Increase gate penetration (challenge mode)
      setGatePenetration((prev) => Math.min(100, prev + 0.3))

      // Increase ultimate cooldown
      setUltimateCooldown((prev) => Math.min(100, prev + 0.2))

      // Reset blackout timer when it reaches zero
      if (timeUntilBlackout === 0) {
        setTimeUntilBlackout(30)
      }
    }, 1000)

    return () => clearInterval(gameInterval)
  }, [currentScreen, timeUntilBlackout])

  /**
   * Start the game with the selected mode
   * @param mode Game mode to start (endless or challenge)
   */
  const startGame = (mode: GameMode) => {
    setGameMode(mode)
    setCurrentScreen("game")
  }

  /**
   * Render the start screen with game mode selection and upgrades
   */
  const renderStartScreen = () => (
    <div className="flex flex-col items-center justify-center h-full gap-8 p-6">
      <h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 mb-2 glitch-text">
        OVERLOCK BREACH
      </h1>
      <p className="text-cyan-400 text-lg mb-8 text-center">SYSTEM INFILTRATION IMMINENT</p>

      <Tabs defaultValue="mode" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2 bg-black/50 border border-cyan-500/30">
          <TabsTrigger value="mode" className="data-[state=active]:bg-cyan-900/30">
            GAME MODE
          </TabsTrigger>
          <TabsTrigger value="upgrades" className="data-[state=active]:bg-cyan-900/30">
            UPGRADES
          </TabsTrigger>
        </TabsList>
        <TabsContent value="mode" className="border border-cyan-500/30 bg-black/50 p-4 mt-2">
          <div className="grid gap-4">
            <Button
              variant="outline"
              className="h-20 border-cyan-500 bg-black/70 hover:bg-cyan-900/30 text-cyan-400 flex flex-col"
              onClick={() => startGame("endless")}
            >
              <span className="text-lg">ENDLESS MODE</span>
              <span className="text-xs text-cyan-400/70">Survive as long as possible</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 border-purple-500 bg-black/70 hover:bg-purple-900/30 text-purple-400 flex flex-col"
              onClick={() => startGame("challenge")}
            >
              <span className="text-lg">CHALLENGE MODE</span>
              <span className="text-xs text-purple-400/70">Complete the system maze</span>
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="upgrades" className="border border-cyan-500/30 bg-black/50 p-4 mt-2">
          <div className="grid gap-4">
            <div className="flex justify-between items-center">
              <span className="text-emerald-400">Ultimate Cooldown</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`w-4 h-4 border ${level <= 3 ? "bg-emerald-500" : "bg-transparent"} border-emerald-500`}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-purple-400">Virus Speed</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`w-4 h-4 border ${level <= 2 ? "bg-purple-500" : "bg-transparent"} border-purple-500`}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-cyan-400">Firewall Bypass</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`w-4 h-4 border ${level <= 1 ? "bg-cyan-500" : "bg-transparent"} border-cyan-500`}
                  />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4 mt-4">
        <Button variant="outline" size="icon" className="border-cyan-500/50 bg-black/50 text-cyan-400">
          <Settings className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="border-cyan-500/50 bg-black/50 text-cyan-400"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
        <Button variant="outline" size="icon" className="border-cyan-500/50 bg-black/50 text-cyan-400">
          <Info className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  /**
   * Render the in-game HUD with threat level, blackout timer, and game mode progress
   */
  const renderGameHUD = () => (
    <div className={`relative h-full ${isGlitching ? "glitch-container" : ""}`}>
      {/* Top HUD */}
      <div className="absolute top-0 left-0 right-0 flex justify-between p-4 bg-black/40 backdrop-blur-sm border-b border-cyan-500/30">
        <div className="flex items-center gap-2">
          <div className="text-xs text-cyan-400">THREAT</div>
          <Progress
            value={threatLevel}
            className="w-24 h-2 bg-black/50"
            indicatorClassName={`${threatLevel > 70 ? "bg-red-500" : "bg-cyan-400"}`}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className={`text-xs ${timeUntilBlackout < 10 ? "text-red-400 animate-pulse" : "text-cyan-400"}`}>
            BLACKOUT
          </div>
          <div
            className={`font-mono text-sm ${timeUntilBlackout < 10 ? "text-red-400 animate-pulse" : "text-cyan-400"}`}
          >
            {timeUntilBlackout.toString().padStart(2, "0")}s
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-xs text-emerald-400">COMBO</div>
          <div className="font-mono text-sm text-emerald-400">x{comboMultiplier.toFixed(1)}</div>
        </div>
      </div>

      {/* Game Mode Progress */}
      <div className="absolute top-16 left-0 right-0 flex justify-center px-4">
        {gameMode === "endless" ? (
          <div className="w-full max-w-md">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-red-400">SYSTEM CORRUPTED</span>
              <span className="text-red-400">{systemCorruption.toFixed(0)}%</span>
            </div>
            <Progress
              value={systemCorruption}
              className="h-3 bg-black/50 border border-red-500/30"
              indicatorClassName="bg-gradient-to-r from-red-500 to-purple-500"
            />
          </div>
        ) : (
          <div className="w-full max-w-md">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-purple-400">GATE PENETRATION</span>
              <span className="text-purple-400">{gatePenetration.toFixed(0)}%</span>
            </div>
            <Progress
              value={gatePenetration}
              className="h-3 bg-black/50 border border-purple-500/30"
              indicatorClassName="bg-gradient-to-r from-purple-500 to-cyan-400"
            />
          </div>
        )}
      </div>

      {/* Active Powerups */}
      <div className="absolute top-28 left-4 flex flex-col gap-2">
        {activePowerups.includes("speed") && (
          <div className="bg-black/70 border border-emerald-500/50 p-2 rounded-md">
            <Zap className="h-5 w-5 text-emerald-400" />
          </div>
        )}
        {activePowerups.includes("disable") && (
          <div className="bg-black/70 border border-purple-500/50 p-2 rounded-md">
            <Shield className="h-5 w-5 text-purple-400" />
          </div>
        )}
      </div>

      {/* Ultimate Ability */}
      <div className="absolute bottom-4 right-4 flex flex-col items-center">
        <div className="relative">
          <svg className="w-16 h-16 -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              className="text-black/50"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="3"
              fill="transparent"
              strokeDasharray={175.9}
              strokeDashoffset={175.9 - (175.9 * ultimateCooldown) / 100}
              className={`${
                ultimateCooldown < 30
                  ? "text-gray-500"
                  : ultimateCooldown < 70
                    ? "text-cyan-500"
                    : ultimateCooldown < 100
                      ? "text-emerald-500"
                      : "text-yellow-400"
              }`}
            />
          </svg>
          <Button
            variant="outline"
            size="icon"
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 ${
              ultimateCooldown === 100
                ? "border-yellow-400 bg-yellow-400/20 text-yellow-400 animate-pulse"
                : "border-cyan-500/50 bg-black/70 text-cyan-400"
            }`}
            disabled={ultimateCooldown < 100}
            onClick={() => {
              if (ultimateCooldown === 100) {
                setUltimateCooldown(0)
              }
            }}
          >
            <Power className="h-6 w-6" />
          </Button>
        </div>
        <span className="text-xs text-cyan-400 mt-1">OVERCLOCK</span>
      </div>

      {/* Pause Button */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 right-4 border-cyan-500/50 bg-black/50 text-cyan-400"
        onClick={() => setCurrentScreen("pause")}
      >
        <span className="sr-only">Pause</span>
        <span className="w-1 h-4 bg-cyan-400 mr-0.5"></span>
        <span className="w-1 h-4 bg-cyan-400 ml-0.5"></span>
      </Button>

      {/* Info Button */}
      <Button
        variant="outline"
        size="icon"
        className="absolute bottom-4 left-4 border-cyan-500/50 bg-black/50 text-cyan-400"
      >
        <Info className="h-4 w-4" />
      </Button>
    </div>
  )

  /**
   * Render the pause screen with game status summary
   */
  const renderPauseScreen = () => (
    <div className="flex flex-col items-center justify-center h-full gap-6 p-6 bg-black/80 backdrop-blur-md">
      <h2 className="text-3xl font-bold text-cyan-400 mb-4">SYSTEM PAUSED</h2>

      <div className="w-full max-w-md border border-cyan-500/30 bg-black/50 p-4 rounded-md">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-sm text-cyan-400/70">Threat Level:</div>
          <div className="text-sm text-cyan-400 text-right">{threatLevel}%</div>

          <div className="text-sm text-cyan-400/70">Time Until Blackout:</div>
          <div className="text-sm text-cyan-400 text-right">{timeUntilBlackout}s</div>

          <div className="text-sm text-cyan-400/70">Combo Multiplier:</div>
          <div className="text-sm text-cyan-400 text-right">x{comboMultiplier.toFixed(1)}</div>

          {gameMode === "endless" ? (
            <>
              <div className="text-sm text-cyan-400/70">System Corruption:</div>
              <div className="text-sm text-cyan-400 text-right">{systemCorruption.toFixed(0)}%</div>
            </>
          ) : (
            <>
              <div className="text-sm text-cyan-400/70">Gate Penetration:</div>
              <div className="text-sm text-cyan-400 text-right">{gatePenetration.toFixed(0)}%</div>
            </>
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <Button
          variant="outline"
          className="border-cyan-500 bg-black/70 hover:bg-cyan-900/30 text-cyan-400"
          onClick={() => setCurrentScreen("game")}
        >
          <Play className="h-4 w-4 mr-2" />
          RESUME
        </Button>
        <Button
          variant="outline"
          className="border-red-500 bg-black/70 hover:bg-red-900/30 text-red-400"
          onClick={() => setCurrentScreen("start")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          EXIT
        </Button>
      </div>
    </div>
  )

  /**
   * Render the firewall puzzle screen
   */
  const renderFirewallScreen = () => (
    <div className="flex flex-col items-center justify-center h-full gap-6 p-6 bg-black/80 backdrop-blur-md">
      <h2 className="text-3xl font-bold text-purple-400 mb-4">FIREWALL DETECTED</h2>

      <div className="w-full max-w-md border border-purple-500/30 bg-black/50 p-4 rounded-md">
        <div className="text-center mb-4">
          <span className="text-sm text-purple-400/70">Complete the sequence to bypass</span>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <Button
              key={num}
              variant="outline"
              className="h-12 border-purple-500/50 bg-black/70 hover:bg-purple-900/30 text-purple-400 font-mono"
            >
              {num}
            </Button>
          ))}
        </div>

        <div className="flex justify-center gap-2 font-mono text-lg">
          <div className="w-8 h-10 border border-purple-500 flex items-center justify-center text-purple-400">4</div>
          <div className="w-8 h-10 border border-purple-500 flex items-center justify-center text-purple-400">7</div>
          <div className="w-8 h-10 border border-purple-500 flex items-center justify-center text-purple-400">?</div>
          <div className="w-8 h-10 border border-purple-500 flex items-center justify-center text-purple-400">?</div>
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <Button
          variant="outline"
          className="border-purple-500 bg-black/70 hover:bg-purple-900/30 text-purple-400"
          onClick={() => setCurrentScreen("game")}
        >
          SUBMIT
        </Button>
        <Button
          variant="outline"
          className="border-red-500 bg-black/70 hover:bg-red-900/30 text-red-400"
          onClick={() => setCurrentScreen("game")}
        >
          CANCEL
        </Button>
      </div>
    </div>
  )

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>

      {/* Matrix-like code rain effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="matrix-code-container">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="matrix-code-column" style={{ animationDelay: `${i * 0.15}s` }}>
              {Array.from({ length: 30 }).map((_, j) => (
                <span key={j} className="matrix-code-symbol" style={{ animationDelay: `${j * 0.05}s` }}>
                  {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full h-full">
        {currentScreen === "start" && renderStartScreen()}
        {currentScreen === "game" && renderGameHUD()}
        {currentScreen === "pause" && renderPauseScreen()}
        {currentScreen === "firewall" && renderFirewallScreen()}
      </div>

      {/* Glitch overlay */}
      {isGlitching && (
        <div className="absolute inset-0 pointer-events-none z-20 glitch-overlay">
          <div className="glitch-line" style={{ top: `${Math.random() * 100}%` }}></div>
          <div className="glitch-line" style={{ top: `${Math.random() * 100}%` }}></div>
        </div>
      )}
    </div>
  )
}

