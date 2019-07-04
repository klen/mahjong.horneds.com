{ createActions, SKIP } = require 'redux-code'

selector = require './selector'

module.exports = createActions 'APP/HISTORY', {
    'update', 'reset',

    record: (payload) -> (dispatch, getState) ->
        state = selector getState()
        hand = "##{state.history.length + 1} "
        hand += (y.name for y in state.yaku).join(', ')
        hand += ", dora-#{state.dora}" if state.dora
        hand += ", uradora-#{state.uraDora}" if state.uraDora
        return {
            payload...,
            state.current..., hand,
            dora: state.dora
            fan: state.fan
            scores: state.scores.main
            uraDora: state.riichi and state.uraDora
        }
}

