import { GameState } from '../../types'

// SAN SHOKU DOKOU (Triple Pung)
export default {
    name: 'sanshoku dokou',
    desc: 'Hand with three pungs/kongs, one in each suit, of the same number',
    test: ({ hand }: GameState) => {
        const suits: Record<string, string[]> = { s: [], m: [], p: [] }
        for (const set of hand.sets) {
            if (!set.isPon || set.isHonor) continue
            suits[set.suit!].push(set.value![1])
        }

        for (const souSet of suits.s)
            for (const manSet of suits.m)
                for (const pinSet of suits.p) {
                    // shortcut: the coffee version compared `a == b == c`, which only
                    // matched 1-2-3 chows; three way equality is the intent
                    if (souSet !== manSet || manSet !== pinSet) continue
                    return 2
                }
    },
}
