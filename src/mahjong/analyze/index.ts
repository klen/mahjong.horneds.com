import orderBy from 'lodash/orderBy'
import random from 'lodash/random'
import sumBy from 'lodash/sumBy'

import { Hand, Tile, TileSet } from '../tiles'
import { GameState, Yaku, YakuItem } from '../types'

import chuuren from './yaku/chuuren'
import suuankou from './yaku/suuankou'
import suukantsu from './yaku/suukantsu'
import ryuuiisou from './yaku/ryuuiisou'
import chinrouto from './yaku/chinrouto'
import tsuuiisou from './yaku/tsuuiisou'
import daisangen from './yaku/daisangen'
import shousuushii from './yaku/shousuushii'
import daisuushii from './yaku/daisuushii'
import chinitsu from './yaku/chinitsu'
import ryanpeikou from './yaku/ryanpeikou'
import sanshoku_dokou from './yaku/sanshoku_dokou'
import sanankou from './yaku/sanankou'
import sankantsu from './yaku/sankantsu'
import toitoi from './yaku/toitoi'
import honitsu from './yaku/honitsu'
import shou_sangen from './yaku/shou_sangen'
import honroutou from './yaku/honroutou'
import junchan from './yaku/junchan'
import pinfu from './yaku/pinfu'
import iipeikou from './yaku/iipeikou'
import tanyao from './yaku/tanyao'
import sanshoku from './yaku/sanshoku'
import itsu from './yaku/itsu'
import yakuhai from './yaku/yakuhai'
import chanta from './yaku/chanta'
import tsumo from './yaku/tsumo'


const TSUMO_PERCENT = 40
const RIICHI_PERCENT = 20

// the order matters: the first matching yaku excludes the ones below it
const YAKU_LIST: Yaku[] = [
    // Yakuman
    chuuren,
    suuankou,
    suukantsu,
    ryuuiisou,
    chinrouto,
    tsuuiisou,
    daisangen,
    shousuushii,
    daisuushii,

    // 5 fan
    chinitsu,

    // 3 fan
    ryanpeikou,

    // 2 fan
    sanshoku_dokou,
    sanankou,
    sankantsu,
    toitoi,
    honitsu,
    shou_sangen,
    honroutou,
    junchan,

    // 1 fan
    pinfu,
    iipeikou,
    tanyao,
    sanshoku,
    itsu,
    yakuhai,
    chanta,
    tsumo,
]


export default <T extends GameState>(game: T): T & { yaku: YakuItem[] } => {
    const { hand } = game
    const tsumo = TSUMO_PERCENT > random(100)

    const candidates = buildCandidates(hand)
    let best: { hand: Hand, yaku: YakuItem[], score: number } | null = null

    for (const candidate of candidates) {
        linkSets(candidate)
        candidate.options = {}
        candidate.tsumo = tsumo

        const yakuList = evaluateYaku({ ...game, hand: candidate })
        const score = sumBy(yakuList, 'fan')

        if (best && best.score >= score) continue
        best = { hand: candidate, yaku: yakuList, score }
    }

    if (!best) best = { hand, yaku: [], score: 0 }

    if (!best.hand.isOpened) {
        if (!best.yaku.length || RIICHI_PERCENT >= random(100)) {
            best.hand.options.riichi = true
            best.yaku.push({ name: 'riichi', fan: 1, desc: 'Concealed waiting hand declared at 1,000 points stake.' })
        }
    }

    linkSets(best.hand)
    hand.sets = best.hand.sets
    hand.pair = best.hand.pair
    hand.wait = best.hand.wait
    hand.options = best.hand.options
    hand.tsumo = best.hand.tsumo

    return {
        ...game,
        hand,
        yaku: orderBy(best.yaku, 'fan', ['desc']),
    }
}


// Tiles remember their set from the last variant built; relink before use
const linkSets = (hand: Hand): void => {
    for (const set of [hand.pair!, ...hand.sets])
        for (const tile of set.tiles) tile.set = set
}


const evaluateYaku = (game: GameState): YakuItem[] => {
    const { hand } = game
    const yakuList: YakuItem[] = []
    const exclude: Record<string, boolean> = {}

    for (const yaku of YAKU_LIST) {
        if (exclude[yaku.name]) continue
        const fan = yaku.test(game)
        if (!fan) continue
        yakuList.push({ fan, name: yaku.name, desc: yaku.desc })
        hand.options[yaku.name] = true
        if (yaku.yakuman) {
            hand.options.yakuman = true
            break
        }
        if (!yaku.exclude) continue
        for (const name of yaku.exclude) exclude[name] = true
    }

    return yakuList
}


const buildCandidates = (hand: Hand): Hand[] => {
    if (hand.isOpened) return [hand]
    if (hand.sets.some((set) => set.isKan)) return [hand]

    const tiles = orderBy(hand.tiles(), ['suit', 'value', 'id'])
    const waitTile = hand.wait
    const signatures: Record<string, boolean> = {}
    const candidates: Hand[] = []

    const pairs = findPairs(tiles)
    if (!pairs.length) return [hand]

    for (const pair of pairs) {
        const rest = withoutTiles(tiles, pair)
        const melds: Tile[][][] = []
        collectMelds(rest, [], melds)

        for (const meld of melds) {
            const candidate = new Hand(
                ...meld.map((group) => new TileSet(...group)),
                new TileSet(...pair),
            )
            candidate.wait = findWait(candidate, waitTile)
            candidate.isOpened = false

            const signature = handSignature(candidate)
            if (signatures[signature]) continue
            signatures[signature] = true
            candidates.push(candidate)
        }
    }

    return candidates.length ? candidates : [hand]
}


const findPairs = (tiles: Tile[]): Tile[][] => {
    const result: Tile[][] = []
    let idx = 0
    while (idx < tiles.length - 1) {
        if (tiles[idx].tile === tiles[idx + 1].tile) {
            result.push([tiles[idx], tiles[idx + 1]])
            const tile = tiles[idx].tile
            while (idx < tiles.length && tiles[idx].tile === tile) idx += 1
            continue
        }
        idx += 1
    }

    return result
}


const withoutTiles = (tiles: Tile[], exclude: Tile[]): Tile[] => {
    const excludeIds: Record<number, boolean> = {}
    for (const tile of exclude) excludeIds[tile.id] = true
    return tiles.filter((tile) => !excludeIds[tile.id])
}


const collectMelds = (tiles: Tile[], chain: Tile[][], acc: Tile[][][]): void => {
    if (!tiles.length) {
        acc.push(chain)
        return
    }

    const base = tiles[0]

    const same = tiles.filter((tile) => tile.tile === base.tile)
    if (same.length >= 3) {
        const meld = [same[0], same[1], same[2]]
        collectMelds(withoutTiles(tiles, meld), [...chain, meld], acc)
    }

    if (base.isHonor) return

    const value = Number(base.value)
    const next1 = tiles.find((tile) => tile.suit === base.suit && tile.value === value + 1)
    const next2 = tiles.find((tile) => tile.id !== next1?.id && tile.suit === base.suit && tile.value === value + 2)
    if (!next1 || !next2) return

    const meld = [base, next1, next2]
    collectMelds(withoutTiles(tiles, meld), [...chain, meld], acc)
}


const findWait = (hand: Hand, waitTile: Tile | null): Tile | null => {
    if (!waitTile) return hand.wait
    for (const tile of hand.tiles())
        if (tile.tile === waitTile.tile) return tile
    return hand.wait
}


const handSignature = (hand: Hand): string => {
    const sets = hand.sets.map((set) => set.value!).sort()
    const pair = hand.pair?.value || ''
    return `${pair}|${sets.join(',')}`
}
