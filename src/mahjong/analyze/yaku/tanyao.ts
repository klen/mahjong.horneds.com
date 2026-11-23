import { GameState } from '../../types'

// TANYAO (All Simples)
export default {
    name: 'tanyao',
    exclude: ['yakuhai', 'chanta', 'junchan', 'itsu', 'honitsu', 'honroutou', 'shou sangen'],
    desc: 'Hand with no terminals and honours',
    test: ({ hand }: GameState) => {
        for (const set of hand.sets)
            if (set.isHonor || set.isTerminal) return
        if (hand.pair!.isHonor || hand.pair!.isTerminal) return
        return 1
    },
}
