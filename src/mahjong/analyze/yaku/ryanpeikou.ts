import { GameState } from '../../types'

// RYAN PEIKOU (Twice Pure Double Chows)
export default {
    name: 'ryanpeikou',
    exclude: ['yakuhai', 'iipeikou', 'sanshoku', 'itsu', 'toitoi', 'chitoitsu', 'sanankou', 'sanshoku dokou', 'honroutou', 'sankantsu', 'shou sangen'],
    desc: 'Concealed hand with four chows which two and two form Pure Double Chows.',
    test: ({ hand }: GameState) => {
        if (hand.isOpened) return
        const sets = hand.sets.filter((set) => set.isRow)
        if (sets.length < 4) return

        let identical = 0
        for (const a of sets)
            for (const b of sets) {
                if (a.id === b.id) continue
                if (a.value === b.value) identical++
            }

        if (identical === 6) return
        if (identical < 4) return
        return 3
    },
}
