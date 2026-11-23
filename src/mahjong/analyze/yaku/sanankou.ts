import { GameState } from '../../types'

// SANANKOU (Three Concealed Pungs)
export default {
    name: 'sanankou',
    exclude: ['pinfu', 'iipeikou', 'ryanpeikou', 'sanshoku', 'itsu', 'chitoitsu'],
    desc: `Hand with three concealed pungs/kongs. Note, the entire hand is not
        required to be concealed. `,
    test: ({ hand }: GameState) => {
        let count = 0
        for (const set of hand.sets) {
            if (!set.isPon) continue
            if (set.isOpened) continue
            if (!hand.tsumo && hand.wait!.set!.id === set.id) continue
            count++
        }
        if (count !== 3) return
        return 2
    },
}
