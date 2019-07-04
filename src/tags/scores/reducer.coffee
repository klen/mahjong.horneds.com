{ createReducer, initialReducer, commonReducer } = require 'redux-code'

actions = require './actions'
gameActions = require 'tags/game/actions'

DEFAULT =
    userScores: null
    userFans: null

module.exports = createReducer DEFAULT, initialReducer(actions.TYPES), commonReducer(actions.TYPES, DEFAULT), {

    [actions.TYPES.SHOW_FANS]: (state, { payload }) ->
        return { state..., userFans: payload.split(',').map parseFloat }

    [actions.TYPES.SHOW_SCORES]: (state, { payload }) ->
        return { state..., userScores: parseInt payload }

    [gameActions.TYPES.RELOAD]: (state, { payload }) ->
        return { state..., userScores: null, userFans: null }

}
