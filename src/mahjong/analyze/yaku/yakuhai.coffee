# YAKUHAI
module.exports =
    name: 'yakuhai'
    exclude: ['pinfu', 'junchan', 'ryanpeikou', 'chinitsu', 'chitoitsu']
    desc: "Pung/kong of dragons, seat/prevalent wind."
    test: ({ hand, seatWind, prevalentWind }) ->
        fan = 0
        for set in hand.sets
            continue unless set.isHonor
            continue if set.isPair
            fan += 1 if set.suit == 'd'
            fan += 1 if set.suit == 'w' and set.value == seatWind
            fan += 1 if set.suit == 'w' and set.value == prevalentWind

        return fan
