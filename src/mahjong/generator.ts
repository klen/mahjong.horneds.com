import random from 'lodash/random'
import sample from 'lodash/sample'
import shuffle from 'lodash/shuffle'

import { Hand, Tile, TileSet } from './tiles'
import { SUITS, TILES } from './resources'
import { GeneratedGame } from './types'

const HONORS_PERCENT = 70
const TERMINALS_PERCENT = 80

const PONS_PERCENT = 30
const KANS_PERCENT = 1


export const findSet = (tiles: Tile[], pair = false): TileSet | undefined => {
    for (let idx1 = 0; idx1 < tiles.length; idx1++) {
        const t1 = tiles[idx1]
        if (t1.isTerminal && random(100) >= TERMINALS_PERCENT) continue
        if (t1.isHonor && random(100) >= HONORS_PERCENT) continue
        for (let idx2 = idx1 + 1; idx2 < tiles.length; idx2++) {
            const t2 = tiles[idx2]
            if (pair) {
                const set = new TileSet(t1, t2)
                if (!set.isValid()) continue
                return set
            }

            if (!t1.isConnected(t2)) continue
            if (t2.isTerminal && random(100) >= TERMINALS_PERCENT) continue
            if (t1.value === t2.value && random(100) >= PONS_PERCENT) continue

            const tail = tiles.slice(idx1 + idx2 + 2)
            for (let idx3 = 0; idx3 < tail.length; idx3++) {
                const t3 = tail[idx3]
                if (t1.isTerminal && random(100) >= TERMINALS_PERCENT) continue
                const set = new TileSet(t1, t2, t3)
                if (set.isValid()) {
                    if (!set.isPon || random(100) >= KANS_PERCENT) return set
                    for (const t4 of tiles.slice(idx1 + idx2 + idx3 + 3)) {
                        if (t4.tile !== t1.tile) continue
                        set.tiles.push(t4)
                        return set.isValid()
                    }
                    return set
                }

                if (set.isValid()) return set
            }
        }
    }
}


export const generateGameState = (): GeneratedGame | undefined => {
    const tiles = shuffle(TILES).map((tile) => new Tile(tile))
    const wall = tiles.splice(0, 14)
    for (const tile of wall) tile.isClosed = true

    const hand = new Hand()
    while (hand.sets.length < 4) {
        const set = findSet(tiles)
        if (!set) return
        for (const tile of set.tiles) tiles.splice(tiles.indexOf(tile), 1)
        hand.push(set)
    }

    const pair = findSet(tiles, true)
    if (!pair) return
    hand.push(pair)

    let indicators = 1 + hand.sets.filter((set) => set.isKan).length
    while (random(100) > 75 && indicators < 5) indicators += 1
    for (let idx = 0; idx < indicators; idx++)
        wall[2 + idx].isClosed = wall[9 + idx].isClosed = false

    return {
        wall,
        hand,
        seatWind: sample(SUITS.w)!,
        prevalentWind: sample([SUITS.w[0], SUITS.w[1]])!,
    }
}
