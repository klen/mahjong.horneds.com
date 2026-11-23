import uniq from 'lodash/uniq'

import { GameState } from '../../types'

// IIPEIKOU (Pure Double Chow)
export default {
    name: 'iipeikou',
    exclude: ['ryanpeikou', 'toitoi', 'chitoitsu', 'sanankou', 'sanshoku dokou', 'honroutou', 'sankantsu'],
    desc: `Concealed hand with two completely identical chows, i.e. the same
        values in the same suit. `,
    test: ({ hand }: GameState) => {
        if (hand.isOpened) return
        const sets = hand.sets.filter((set) => set.isRow).map((set) => set.value!)
        if (sets.length < 2) return
        const unique = uniq(sets)
        if (unique.length === sets.length) return
        return 1
    },
}
