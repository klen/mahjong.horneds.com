import { GameState } from '../../types'

// CHANTA (Outside Hand)
export default {
    name: 'chanta',
    exclude: ['tanyao', 'junchan', 'itsu', 'chinitsu', 'toitoi', 'chitoitsu', 'honroutou'],
    test: ({ hand }: GameState) => {
        if (!hand.pair!.isHonor && !hand.pair!.isTerminal) return
        for (const set of hand.sets)
            if (!set.isHonor && !set.isTerminal) return

        return hand.isOpened ? 1 : 2
    },
    desc: `All sets contain terminals or honours, and the pair is terminals or
        honours.  The hand contains at least one chow. Gives an extra fan if
        concealed`,
}
