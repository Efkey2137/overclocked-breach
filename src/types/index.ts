/**
 * Game screen states
 */
export type GameScreen = "start" | "game" | "pause" | "firewall"

/**
 * Game modes
 */
export type GameMode = "endless" | "challenge"

/**
 * Types of power-ups available in the game
 */
export type PowerupType = "speed" | "disable" | "shield" | "stealth"

/**
 * Firewall puzzle types
 */
export type FirewallType = "sequence" | "pattern" | "code"

/**
 * Game state interface
 */
export interface GameState {
  threatLevel: number
  timeUntilBlackout: number
  comboMultiplier: number
  systemCorruption: number
  gatePenetration: number
  ultimateCooldown: number
  activePowerups: PowerupType[]
}

