import { Suit } from '../../resources'
import { GameState } from '../../types'

// HONITSU (Half Flush)
export default {
    name: 'honitsu',
    exclude: ['tanyao', 'junchan', 'sanshoku', 'chinitsu', 'sanshoku dokou'],
    desc: `Hand with tiles from only one of the three suits, in combination with
        honours. Gives an extra fan if concealed. `,
    test: ({ hand }: GameState) => {
        let isHonor = hand.pair!.isHonor
        const suits: Suit[] = isHonor ? [] : [hand.pair!.suit!]
        for (const set of hand.sets) {
            if (set.isHonor) {
                isHonor = true
                continue
            }

            if (!suits.includes(set.suit!)) suits.push(set.suit!)
        }

        if (!isHonor || suits.length !== 1) return
        return hand.isOpened ? 2 : 3
    },
}
