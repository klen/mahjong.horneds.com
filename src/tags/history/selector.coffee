{ createSelector } = require 'reselect'

gameSelector = require 'tags/game/selector'

module.exports = createSelector(
    gameSelector, (state) -> state.app.history,

    (game, state) -> {game..., state...}
    
)

