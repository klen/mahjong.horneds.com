generate = require './index'

GAMES = 3000


countDoras = (tiles, indicators) ->
    total = 0
    for indicator in indicators when not indicator.isClosed
        dora = indicator.next()
        total += (1 for tile in tiles when tile.tile == dora).length

    return total


test 'generated hands are scored consistently', ->
    for i in [0...GAMES]
        game = generate()
        { hand } = game

        # The winning tile must point at the set it belongs to, otherwise
        # yaku/fu that depend on the wait (pinfu, sanankou, tanki fu) go wrong.
        holders = (set for set in [hand.pair, hand.sets...] when set.tiles.some((t) -> t.id == hand.wait.id))
        expect(holders.length).toEqual 1
        expect(hand.wait.set.id).toEqual holders[0].id

        # Generator may open up to 5 indicators, all of them count.
        expect(game.dora).toEqual countDoras(hand.tiles(), game.wall[2..6])
        expect(game.uraDora).toEqual countDoras(hand.tiles(), game.wall[9..13])
    return
