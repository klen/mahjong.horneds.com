import { GameState } from '../../types'

// SUU ANKOU (Four Concealed Pungs)
export default {
    name: 'suu ankou',
    yakuman: true,
    desc: `Concealed hand with four concealed pungs/kongs.  Winning on a discard
        is allowed only in case of single wait on the pair.`,
    test: ({ hand }: GameState) => {
        if (hand.isOpened) return
        if (!hand.wait!.set!.isPair && !hand.tsumo) return
        const sets = hand.sets.filter((set) => set.isPon)
        if (sets.length < 4) return
        return 13
    },
}
