{ createSelector } = require 'reselect'

gameSelector = require 'tags/game/selector'

module.exports = createSelector(
    gameSelector, (state) -> state.app.scores,

    (game, state) -> {game..., state...}
    
)
