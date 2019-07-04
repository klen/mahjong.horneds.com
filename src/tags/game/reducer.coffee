flatten = require 'lodash/flatten'
{ createReducer, initialReducer, commonReducer } = require 'redux-code'

actions = require './actions'

DEFAULT =
    inited: false
    number: 0


module.exports = createReducer DEFAULT, initialReducer(actions.TYPES), commonReducer(actions.TYPES, DEFAULT), {

    [actions.TYPES.RELOAD]: (state, { payload }) ->
        return { payload..., inited: state.inited, number: state.number + 1 }

}
