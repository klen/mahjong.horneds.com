import { ScoredGame } from 'mahjong/types'

// the store starts from DEFAULT (only inited/number) and gets the game on reload
export interface GameState extends Partial<ScoredGame> {
    inited: boolean
    number: number
}

export interface ScoresState {
    userScores: number | null
    userFans: number | null
}

export interface HistoryItem {
    hand: string
    dora: number
    fan: number
    scores: number
    uraDora: number | undefined
    userScores?: number | null
    userFans?: number | null
}

export interface HistoryState {
    history: HistoryItem[]
    current: HistoryItem | null
    scorePoints: number
    hanPoints: number
}

export interface RootState {
    app: {
        game: GameState
        scores: ScoresState
        history: HistoryState
    }
}
