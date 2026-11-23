import { GameState } from '../../types'

// TOI-TOI HOU (All Pungs)
export default {
    name: 'toitoi',
    exclude: ['pinfu', 'chanta', 'junchan', 'iipeikou', 'ryanpeikou', 'sanshoku', 'itsu', 'chitoitsu'],
    desc: 'Hand with four pungs/kongs and a pair.',
    test: ({ hand }: GameState) => {
        for (const set of hand.sets)
            if (set.isRow) return
        return 2
    },
}
