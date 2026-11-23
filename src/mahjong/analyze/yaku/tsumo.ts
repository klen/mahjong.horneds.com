import { GameState } from '../../types'

// MENZEN TSUMO (Fully Concealed Hand)
export default {
    name: 'tsumo',
    desc: 'Winning on a self-draw on a concealed hand.',
    test: ({ hand }: GameState) => {
        if (hand.isOpened) return
        if (!hand.tsumo) return
        return 1
    },
}
