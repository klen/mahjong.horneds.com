import { Hand, TileSet } from '../../tiles'
import { GameState } from '../../types'

import chanta from './chanta'
import chinitsu from './chinitsu'
import chinrouto from './chinrouto'
import chuuren from './chuuren'
import daisangen from './daisangen'
import daisuushii from './daisuushii'
import honitsu from './honitsu'
import honroutou from './honroutou'
import iipeikou from './iipeikou'
import itsu from './itsu'
import junchan from './junchan'
import ryuuiisou from './ryuuiisou'
import sankantsu from './sankantsu'
import sanankou from './sanankou'
import sanshoku from './sanshoku'
import sanshoku_dokou from './sanshoku_dokou'
import shou_sangen from './shou_sangen'
import shousuushii from './shousuushii'
import suukantsu from './suukantsu'
import tanyao from './tanyao'
import toitoi from './toitoi'
import tsumo from './tsumo'
import tsuuiisou from './tsuuiisou'
import yakuhai from './yakuhai'
import { Yaku } from '../../types'


interface Case {
    yaku: Yaku
    mask?: string
    hand?: Hand
    fan?: number
    tsumo?: boolean
    opened?: boolean
    seatWind?: string
}

const cases: Case[] = [
    { yaku: chanta, mask: 'm1m2m3 p7p8p9 s1s1s1 wEwEwE dRdR', fan: 2 },
    { yaku: chanta, mask: 'm1m2m3 p7p8p9 s1s1s1 wEwEwE dRdR', opened: true, fan: 1 },
    { yaku: chinitsu, mask: 'm1m2m3 m4m5m6 m7m8m9 m1m1m1 m5m5', fan: 6 },
    { yaku: chinitsu, mask: 'm1m2m3 m4m5m6 m7m8m9 m1m1m1 m5m5', opened: true, fan: 5 },
    { yaku: chinrouto, mask: 'm1m1m1 m9m9m9 p1p1p1 s9s9s9 p9p9', fan: 13 },
    { yaku: chuuren, mask: 'm1m1m1 m1m2m3 m4m5m6 m7m8m9 m9m9', fan: 13 },
    { yaku: daisangen, mask: 'dRdRdR dWdWdW dGdGdG m1m2m3 wNwN', fan: 13 },
    { yaku: daisuushii, mask: 'wEwEwE wSwSwS wWwWwW wNwNwN m1m1', fan: 13 },
    { yaku: honitsu, mask: 'm1m2m3 m4m5m6 m7m8m9 m1m1m1 wNwN', fan: 3 },
    { yaku: honroutou, mask: 'm1m1m1 m9m9m9 p1p1p1 s9s9s9 dRdR', fan: 2 },
    { yaku: iipeikou, mask: 'm1m2m3 m1m2m3 m4m5m6 m7m8m9 wNwN', fan: 1 },
    { yaku: iipeikou, mask: 'm1m2m3 m1m2m3 m4m5m6 m7m8m9 wNwN', opened: true },
    { yaku: junchan, mask: 'm1m2m3 p7p8p9 s1s1s1 s7s8s9 m9m9', fan: 3 },
    { yaku: ryuuiisou, mask: 's2s3s4 s2s2s2 s6s6s6 s8s8s8 dGdG', fan: 13 },
    { yaku: sanshoku, mask: 'm4m5m6 s4s5s6 p4p5p6 m1m2m3 wNwN', fan: 2 },
    { yaku: sanshoku_dokou, mask: 'm4m4m4 p4p4p4 s4s4s4 m1m2m3 wNwN', fan: 2 },
    { yaku: shou_sangen, mask: 'dRdRdR dWdWdW m1m2m3 p4p5p6 dGdG', fan: 2 },
    { yaku: shousuushii, mask: 'wEwEwE wSwSwS wWwWwW m1m2m3 wNwN', fan: 13 },
    { yaku: tanyao, mask: 'm2m3m4 p4p5p6 s4s5s6 m6m7m8 m5m5', fan: 1 },
    { yaku: toitoi, mask: 'm2m2m2 p4p4p4 s6s6s6 m8m8m8 wNwN', fan: 2 },
    { yaku: tsumo, mask: 'm2m3m4 p4p5p6 s4s5s6 m6m7m8 m5m5', tsumo: true, fan: 1 },
    { yaku: tsumo, mask: 'm2m3m4 p4p5p6 s4s5s6 m6m7m8 m5m5', tsumo: true, opened: true },
    { yaku: tsuuiisou, mask: 'wEwEwE wSwSwS dRdRdR dWdWdW dGdG', fan: 13 },
    { yaku: yakuhai, mask: 'dRdRdR m1m2m3 p4p5p6 s2s3s4 wNwN', seatWind: 'wS', fan: 1 },
    { yaku: yakuhai, mask: 'wSwSwS m1m2m3 p4p5p6 s2s3s4 wNwN', seatWind: 'wS', fan: 1 },
    { yaku: yakuhai, mask: 'wEwEwE m1m2m3 p4p5p6 s2s3s4 wNwN', seatWind: 'wS', fan: 1 },
    { yaku: yakuhai, mask: 'wNwNwN m1m2m3 p4p5p6 s2s3s4 dGdG', seatWind: 'wS' },

    // negative cases
    { yaku: chanta, mask: 'm1m2m3 p4p5p6 s1s1s1 wEwEwE dRdR' },
    { yaku: chinitsu, mask: 'm1m2m3 m4m5m6 s7s8s9 m1m1m1 m5m5' },
    { yaku: junchan, mask: 'm1m2m3 p7p8p9 s1s1s1 s7s8s9 dRdR' }, // pair is not a terminal
    { yaku: junchan, mask: 'm1m1m1 p9p9p9 s1s1s1 m9m9m9 p1p1' }, // no chow
    { yaku: iipeikou, mask: 'm1m2m3 m4m5m6 s7s8s9 m1m1m1 m5m5' },
    { yaku: tanyao, mask: 'm1m2m3 p4p5p6 s4s5s6 m6m7m8 m5m5' },
    { yaku: toitoi, mask: 'm2m2m2 p4p4p4 s6s7s8 m8m8m8 wNwN' },
    { yaku: tsuuiisou, mask: 'wEwEwE wSwSwS dRdRdR dWdWdW m1m1' },
    { yaku: ryuuiisou, mask: 's2s3s4 s2s2s2 s6s6s6 s8s8s8 m5m5' },
    { yaku: sanshoku_dokou, mask: 'm4m4m4 p4p4p4 s5s5s5 m1m2m3 wNwN' },
    { yaku: sanshoku, mask: 'm4m5m6 s4s5s6 s1s2s3 m1m2m3 wNwN' },
    // three wind pungs are required, four are not a small four winds
    { yaku: shousuushii, mask: 'wEwEwE wSwSwS wWwWwW wNwNwN m1m1' },

    // opened hands lose a fan
    { yaku: honitsu, mask: 'm1m2m3 m4m5m6 m7m8m9 m1m1m1 wNwN', opened: true, fan: 2 },
    { yaku: sanshoku, mask: 'm4m5m6 s4s5s6 p4p5p6 m1m2m3 wNwN', opened: true, fan: 1 },
    { yaku: itsu, mask: 'm1m2m3 m4m5m6 m7m8m9 s2s3s4 wNwN', opened: true, fan: 1 },
    { yaku: junchan, mask: 'm1m2m3 p7p8p9 s1s1s1 s7s8s9 m9m9', opened: true, fan: 2 },

    // two dragons pay twice
    { yaku: yakuhai, mask: 'dRdRdR dWdWdW m1m2m3 p4p5p6 wNwN', seatWind: 'wS', fan: 2 },
    // a pair of dragons is not yakuhai
    { yaku: yakuhai, mask: 'm1m2m3 p4p5p6 s2s3s4 m6m7m8 dGdG', seatWind: 'wS' },

    // kans cannot be spelled in a mask, they are built by hand
    {
        yaku: sankantsu,
        hand: new Hand(
            TileSet.create('m2m2m2m2'), TileSet.create('p4p4p4p4'), TileSet.create('s6s6s6s6'),
            TileSet.create('m8m8m8'), TileSet.create('wNwN'),
        ),
        fan: 2,
    },
    {
        yaku: suukantsu,
        hand: new Hand(
            TileSet.create('m2m2m2m2'), TileSet.create('p4p4p4p4'), TileSet.create('s6s6s6s6'),
            TileSet.create('m8m8m8m8'), TileSet.create('wNwN'),
        ),
        fan: 13,
    },
]


const run = (item: Case): number | undefined => {
    const hand = item.hand || Hand.create(item.mask!)
    if (item.tsumo) hand.tsumo = true
    if (item.opened) hand.isOpened = true

    const game: GameState = { hand, seatWind: item.seatWind || 'wS', prevalentWind: 'wE' }
    return item.yaku.test(game)
}


test('sanankou ignores opened pungs', () => {
    const hand = Hand.create('m9m9m9 p2p2p2 p7p8p9 wWwWwW s8s8')
    hand.tsumo = true
    hand.wait = hand.tiles()[13]
    hand.sets[0].isOpened = true

    expect(sanankou.test({ hand })).toBeFalsy()
})


for (const item of cases) {
    const label = item.mask || 'built by hand'

    test(`${item.yaku.name} for ${label}`, () => {
        const fan = run(item)

        if (item.fan === undefined) expect(fan).toBeFalsy()
        else expect(fan).toEqual(item.fan)
    })
}
