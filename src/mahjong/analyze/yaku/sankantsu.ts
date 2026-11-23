import { GameState } from '../../types'

// SAN KAN TSU (Three Kongs)
export default {
    name: 'sankantsu',
    exclude: ['pinfu', 'iipeikou', 'ryanpeikou', 'sanshoku', 'itsu', 'chitoitsu'],
    desc: 'Hand with three kongs.',
    test: ({ hand }: GameState) => {
        const sets = hand.sets.filter((set) => set.isKan)
        if (sets.length < 3) return
        return 2
    },
}
