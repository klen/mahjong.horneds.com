import { GameState } from '../../types'

// SUU KAN TSU (Four kongs)
export default {
    name: 'suu kan tsu',
    yakuman: true,
    desc: 'Hand with four kongs.',
    test: ({ hand }: GameState) => {
        const sets = hand.sets.filter((set) => set.isKan)
        if (sets.length < 4) return
        return 13
    },
}
