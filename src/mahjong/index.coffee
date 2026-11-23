analyze = require './analyze'

scores = require './analyze/scores'
{ generateGameState } = require './generator'


module.exports = ->
    # generateGameState returns nothing when it cannot build a hand from the shuffled tiles
    game = generateGameState() until game?
    game = analyze game
    game = scores game

    return game
