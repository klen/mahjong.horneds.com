import { GameState } from '../../types'

// JUNCHAN (Terminals in All Sets)
export default {
    name: 'junchan',
    exclude: ['tanyao', 'yakuhai', 'chanta', 'itsu', 'honitsu', 'toitoi', 'chitoitsu', 'honroutou', 'shou sangen'],
    desc: `All sets contain terminals, and the pair is terminals. The hand
        contains at least one chow. Gives an extra fan if concealed. `,
    test: ({ hand }: GameState) => {
        if (!hand.pair!.isTerminal) return
        let row = false
        for (const set of hand.sets) {
            row = row || !!set.isRow
            if (!set.isTerminal) return
        }

        if (!row) return
        return hand.isOpened ? 2 : 3
    },
}
