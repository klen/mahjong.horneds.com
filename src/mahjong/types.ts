import { Hand, Tile } from './tiles'

// wall, seatWind and prevalentWind are optional: the yaku tests pass a bare hand
export interface GameState {
    hand: Hand
    wall?: Tile[]
    seatWind?: string
    prevalentWind?: string
}

export interface GeneratedGame extends GameState {
    wall: Tile[]
    seatWind: string
    prevalentWind: string
}

export interface YakuItem {
    fan: number
    name: string
    desc: string
}

export interface Yaku {
    name: string
    desc: string
    exclude?: string[]
    yakuman?: boolean
    test: (game: GameState) => number | undefined
}

export interface FuDetail {
    value: number
    label: string
}

export interface Scores {
    main: number
    east?: number
    additional?: number
}

export interface ScoredGame extends GameState {
    wall: Tile[]
    yaku: YakuItem[]
    dora: number
    uraDora: number
    fan: number
    minipoints: number
    fuDetails: FuDetail[]
    scores: Scores
}
