{ createReducer, initialReducer, commonReducer } = require 'redux-code'

actions = require './actions'
scoresActions = require 'tags/scores/actions'
gameActions = require 'tags/game/actions'

DEFAULT =
    history: []
    current: null
    scorePoints: 0
    hanPoints: 0

module.exports = createReducer DEFAULT, initialReducer(actions.TYPES), commonReducer(actions.TYPES, DEFAULT), {

    [scoresActions.TYPES.SHOW_FANS]: (state, { payload }) ->
        return state

    [scoresActions.TYPES.SHOW_SCORES]: (state, { payload }) ->
        return state

    [actions.TYPES.RECORD]: (state, { payload }) ->
        return { state..., current: payload }

    [gameActions.TYPES.RELOAD]: (state, { payload }) ->
        return state unless state.current

        { scores, userScores, fan, userFans } = state.current
        scores = 0
        scores = 4 - (Math.abs(scores - userScores) / 1000) if userScores
        han = 0
        han = 2 - Math.abs(fan - userFans) if userFans
        return {
            current: null
            hanPoints: if han > 0 then state.hanPoints + han else state.hanPoints
            scorePoints: if scores > 0 then state.scorePoints + scores else state.scorePoints
            history: [ state.current, state.history... ]
        }

}
