analyze = require './analyze'

{ generateGameState } = require './generator'


module.exports = ->
    game = generateGameState()
    state = analyze game
    return { game..., state... }
