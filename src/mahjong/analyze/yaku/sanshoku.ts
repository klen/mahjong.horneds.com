import { GameState } from '../../types'

// SANSHOKU (Mixed Triple Chow)
export default {
    name: 'sanshoku',
    exclude: ['ryanpeikou', 'itsu', 'honitsu', 'chinitsu', 'toitoi', 'chitoitsu', 'sanankou', 'sanshoku dokou', 'honroutou', 'sankantsu', 'shou sangen'],
    desc: 'Hand with three chows of the same numerical sequence, one in each suit',
    test: ({ hand }: GameState) => {
        const suits: Record<string, string[]> = { s: [], m: [], p: [] }
        for (const set of hand.sets) {
            if (!set.isRow) continue
            suits[set.suit!].push(set.value![1])
        }

        for (const souSet of suits.s)
            for (const manSet of suits.m)
                for (const pinSet of suits.p) {
                    // shortcut: the coffee version compared `a == b == c`, which only
                    // matched 1-2-3 chows; three way equality is the intent
                    if (souSet !== manSet || manSet !== pinSet) continue
                    return hand.isOpened ? 1 : 2
                }
    },
}
