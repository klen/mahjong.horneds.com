random = require 'lodash/random'

{ createActions, SKIP } = require 'redux-code'

generate = require 'mahjong'
selector = require './selector'

REPEATS = 7


module.exports = createActions 'APP/GAME', {
    'update', 'reset'

    init: -> (dispatch) =>
        dispatch @reload()
        return

    reload: -> (dispatch, getState) ->
        state = selector getState()

        n = 0
        while n++ < REPEATS
            game = generate()
            continue if state.scores?.main == game.scores.main
            break if game.fan >= 5
            break if random(100) < game.fan * 10

        return game
}
