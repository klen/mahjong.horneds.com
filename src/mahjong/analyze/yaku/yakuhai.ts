import { GameState } from '../../types'

// YAKUHAI
export default {
    name: 'yakuhai',
    exclude: ['pinfu', 'junchan', 'ryanpeikou', 'chinitsu', 'chitoitsu'],
    desc: 'Pung/kong of dragons, seat/prevalent wind.',
    test: ({ hand, seatWind, prevalentWind }: GameState) => {
        let fan = 0
        for (const set of hand.sets) {
            if (!set.isHonor) continue
            if (set.isPair) continue
            if (set.suit === 'd') fan += 1
            if (set.suit === 'w' && set.value === seatWind) fan += 1
            if (set.suit === 'w' && set.value === prevalentWind) fan += 1
        }

        return fan
    },
}
