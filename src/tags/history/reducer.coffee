{ createReducer, initialReducer, commonReducer } = require 'redux-code'

actions = require './actions'
scoresActions = require 'tags/scores/actions'
gameActions = require 'tags/game/actions'

DEFAULT =
    history: []
    current: null

module.exports = createReducer DEFAULT, initialReducer(actions.TYPES), commonReducer(actions.TYPES, DEFAULT), {

    [scoresActions.TYPES.SHOW_FANS]: (state, { payload }) ->
        return state

    [scoresActions.TYPES.SHOW_SCORES]: (state, { payload }) ->
        return state

    [actions.TYPES.RECORD]: (state, { payload }) ->
        return { state..., current: payload }

    [gameActions.TYPES.RELOAD]: (state, { payload }) ->
        return state unless state.current
        return {
            current: null
            history: [ state.current, state.history... ]
        }

}
