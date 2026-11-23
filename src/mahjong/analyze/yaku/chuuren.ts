import { Suit } from '../../resources'
import { GameState } from '../../types'

// CHUUREN POOTO (Nine Gates)
const FORM = [1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9]

export default {
    name: 'chuuren pooto',
    yakuman: true,
    test: ({ hand }: GameState) => {
        let suit: Suit | null = null
        const form = [...FORM]
        for (const tile of hand.tiles()) {
            if (tile.isHonor) return
            if (suit && suit !== tile.suit) return
            suit = tile.suit
            const idx = form.indexOf(Number(tile.value))
            if (idx !== -1) form.splice(idx, 1)
        }

        if (form.length !== 0) return
        return 13
    },
    desc: `Concealed hand consisting of the tiles 1112345678999 in the same suit
        plus any one extra tile in the same suit`,
}
