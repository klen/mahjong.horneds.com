import { Suit } from '../../resources'
import { GameState } from '../../types'

// CHINITSU (Full Flush)
export default {
    name: 'chinitsu',
    exclude: ['yakuhai', 'chanta', 'sanshoku', 'honitsu', 'sanshoku dokou', 'honroutou', 'shou sangen'],
    test: ({ hand }: GameState) => {
        let suit: Suit | null = null
        for (const tile of hand.tiles()) {
            if (tile.isHonor) return
            if (suit && suit !== tile.suit) return
            suit = tile.suit
        }

        return hand.isOpened ? 5 : 6
    },
    desc: `Hand composed entirely of tiles from only one of the three suits. No
        honours allowed. Gives an extra fan if concealed.`,
}
