import sumBy from 'lodash/sumBy'

import { Tile } from '../tiles'
import { FuDetail, GameState, ScoredGame, Scores, YakuItem } from '../types'


export default (game: GameState & { wall: Tile[], yaku: YakuItem[] }): ScoredGame => {
    const { hand, yaku, wall, seatWind, prevalentWind } = game

    const tiles = hand.tiles()
    const dora = getDoras(tiles, wall.slice(2, 7))
    const uraDora = getDoras(tiles, wall.slice(9, 14))

    let fan = sumBy(yaku, 'fan')
    fan += dora
    if (hand.options.riichi) fan += uraDora

    fan = Math.min(13, fan)
    if (!hand.options.yakuman) fan = Math.min(12, fan)

    let basePoints = 0
    if (fan >= 13) basePoints = 8000
    else if (fan >= 11) basePoints = 6000
    else if (fan >= 8) basePoints = 4000
    else if (fan >= 6) basePoints = 3000
    else if (fan >= 5) basePoints = 2000

    let minipoints = 0
    let fuDetails: FuDetail[] = []
    if (!basePoints) {
        if (hand.tsumo || hand.isOpened) {
            minipoints = 20
            fuDetails.push({ value: 20, label: 'base' })
        } else {
            minipoints = 30
            fuDetails.push({ value: 30, label: 'base (closed ron)' })
        }

        // minipoints for pair
        const pair = hand.pair!
        if (pair.suit === 'd' || pair.value === seatWind || pair.value === prevalentWind) {
            minipoints += 2
            fuDetails.push({ value: 2, label: 'value pair' })
        }

        // +2 for Tsumo
        if (hand.tsumo) {
            minipoints += 2
            fuDetails.push({ value: 2, label: 'tsumo' })
        }

        // Points for sets
        for (const set of hand.sets) {
            if (!set.isPon) continue
            const isOpened = set.isOpened || (!hand.tsumo && set.id === hand.wait!.set!.id)
            let point: number
            if (set.isKan && isOpened) point = 8
            else if (set.isKan) point = 16
            else if (isOpened) point = 2
            else point = 4

            if (set.isHonor || set.isTerminal) point *= 2
            minipoints += point
            const kind = set.isKan ? 'kan' : 'pon'
            const state = isOpened ? 'open' : 'closed'
            const value = set.isHonor ? 'honor' : set.value
            fuDetails.push({ value: point, label: `${state} ${kind} (${value})` })
        }

        // Points for waiting
        const wait = hand.wait!
        if (wait.set!.isPair) {
            minipoints += 2
            fuDetails.push({ value: 2, label: 'tanki wait' })
        }

        if (wait.set!.isRow) {
            if (![wait.set!.tiles[0].id, wait.set!.tiles[2].id].includes(wait.id)) {
                minipoints += 2
                fuDetails.push({ value: 2, label: 'kanchan wait' })
            } else if (wait.value === 3 && wait.set!.value![1] === '1') {
                minipoints += 2
                fuDetails.push({ value: 2, label: 'penchan wait' })
            } else if (wait.value === 7 && wait.set!.value![1] === '7') {
                minipoints += 2
                fuDetails.push({ value: 2, label: 'penchan wait' })
            }
        }

        // No minipoints
        if (hand.isOpened && minipoints === 20) {
            minipoints += 2
            fuDetails.push({ value: 2, label: 'open hand bonus' })
        }

        // Round the minipoints
        const rounded = Math.ceil(minipoints / 10) * 10
        if (rounded > minipoints) fuDetails.push({ value: rounded - minipoints, label: 'round up' })
        minipoints = rounded

        if (hand.options.pinfu) {
            minipoints = hand.tsumo ? 20 : 30
            fuDetails = [{
                value: minipoints,
                label: hand.tsumo ? 'pinfu tsumo fixed fu' : 'pinfu ron fixed fu',
            }]
        }

        basePoints = minipoints * Math.pow(2, 2 + fan)

        if ((fan === 4 && minipoints > 30) || (fan === 3 && minipoints > 60)) basePoints = 2000
    }

    const doublePoints = round(basePoints * 2)
    const fourPoints = round(basePoints * 4)
    const sixPoints = round(basePoints * 6)
    basePoints = round(basePoints)

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
