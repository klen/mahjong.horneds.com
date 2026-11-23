import sumBy from 'lodash/sumBy'

import { Tile } from '../tiles'
import { GameState, ScoredGame, Scores, YakuItem } from '../types'

import fu from './fu'


export default (game: GameState & { wall: Tile[], yaku: YakuItem[] }): ScoredGame => {
    const { hand, yaku, wall, seatWind, prevalentWind } = game

    const tiles = hand.tiles()
    const dora = getDoras(tiles, wall.slice(2, 7))
    const uraDora = getDoras(tiles, wall.slice(9, 14))

    let fan = sumBy(yaku, 'fan')
    fan += dora
    if (hand.options.riichi) fan += uraDora

    fan = Math.min(13, fan)

    const { minipoints, fuDetails, basePoints: rawPoints } = fu(hand, fan, seatWind, prevalentWind)
    const doublePoints = round(rawPoints * 2)
    const fourPoints = round(rawPoints * 4)
    const sixPoints = round(rawPoints * 6)
    const basePoints = round(rawPoints)

    const scores: Scores = {
        main: seatWind === 'wE' ? sixPoints : fourPoints,
    }

    if (hand.tsumo) {
        scores.east = doublePoints
        scores.additional = basePoints
    }

    return { ...game, dora, uraDora, fan, minipoints, fuDetails, scores }
}


const round = (d: number): number => Math.ceil(d / 100.0) * 100


const getDoras = (tiles: Tile[], indicators: Tile[]): number => {
    const doras: Record<string, number> = {}
    for (const t of indicators) {
        if (t.isClosed) continue
        doras[t.next()] = (doras[t.next()] ?? 0) + 1
    }

    let dora = 0
    for (const t of tiles) {
        if (!doras[t.tile]) continue
        dora += doras[t.tile]
    }

    return dora
}
