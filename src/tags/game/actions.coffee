random = require 'lodash/random'

{ createActions, SKIP } = require 'redux-code'

generate = require 'mahjong'

REPEATS = 5


module.exports = createActions 'APP/GAME', {
    'update', 'reset'

    init: -> (dispatch) =>
        dispatch @reload()
        return

    reload: ->
        n = 0
        while n++ < REPEATS
            game = generate()
            break if game.fan >= 5
            break if random(100) < game.fan * 10

        return game
}
