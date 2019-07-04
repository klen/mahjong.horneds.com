flatten = require 'lodash/flatten'
{ createReducer, initialReducer, commonReducer } = require 'redux-code'

{ getHand } = require 'mahjong'

actions = require './actions'

DEFAULT =
    inited: false
    hand: flatten getHand()


module.exports = createReducer DEFAULT, commonReducer(actions.TYPES, DEFAULT), {

    [actions.TYPES.INIT]: (state) ->

}
