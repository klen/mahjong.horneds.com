{ createReducer, initialReducer, commonReducer } = require 'redux-code'

actions = require './actions'
gameActions = require 'tags/game/actions'

DEFAULT =
    userScores: null
    userFans: null

module.exports = createReducer DEFAULT, initialReducer(actions.TYPES), commonReducer(actions.TYPES, DEFAULT), {

    [actions.TYPES.SHOW_FANS]: (state, { payload: userFans }) ->
        return { state..., userFans }

    [actions.TYPES.SHOW_SCORES]: (state, { payload: userScores }) ->
        return { state..., userScores }

    [gameActions.TYPES.RELOAD]: (state, { payload }) ->
        return { state..., userScores: null, userFans: null }

}
