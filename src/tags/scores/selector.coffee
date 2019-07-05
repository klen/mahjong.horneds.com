{ createSelector } = require 'reselect'

gameSelector = require 'tags/game/selector'

module.exports = createSelector(
    gameSelector, (state) -> state.app.scores,

    (game, state) ->

        correctHan = correctScores = null
        correctHan = game.fan in state.userFans if state.userFans
        correctScores = game.scores.main == state.userScores if state.userScores

        return {
            game...,
            state...
            correctHan, correctScores
        }
    
)
