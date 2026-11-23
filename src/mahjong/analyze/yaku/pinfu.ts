import { Tile, TileSet } from '../../tiles'
import { GameState } from '../../types'

// PINFU
export default {
    name: 'pinfu',
    exclude: ['yakuhai', 'toitoi', 'chitoitsu', 'sanankou', 'sanshoku dokou', 'honroutou', 'sankantsu', 'shou sangen'],
    desc: `Concealed all chows hand with a valueless pair. I.e. a concealed hand
        with four chows and a pair that is neither dragons, nor seat wind, nor
        prevalent wind. The winning tile is required to finish a chow with a
        two-sided wait.`,

    test: ({ hand, seatWind, prevalentWind }: GameState) => {
        if (hand.isOpened) return
        for (const set of hand.sets)
            if (set.isPon) return

        const pair = hand.pair!
        if (pair.suit === 'd') return
        if (pair.value === seatWind || pair.value === prevalentWind) return

        const wait = hand.wait!
        const waitSet = wait.set!
        const twoSided = waitSet.isPair ||
            wait.tile === waitSet.tiles[1].tile ||
            (waitSet.value![1] === '7' && wait.value === 7) ||
            (waitSet.value![1] === '1' && wait.value === 3)
        if (!twoSided) return 1

        // Analize the wait
        for (const set of hand.sets)
            if (isEmbeded(wait, set)) return 1
    },
}


const isEmbeded = (wait: Tile, set: TileSet): boolean | undefined => {
    if (wait.suit !== set.suit) return
    if (wait.set!.id === set.id) return
    if (set.value![1] !== '7' && wait.tile === set.tiles[0].tile) return true
    if (set.value![1] !== '1' && wait.tile === set.tiles[2].tile) return true
}
