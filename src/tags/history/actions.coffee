{ createActions, SKIP } = require 'redux-code'

selector = require './selector'

module.exports = createActions 'APP/HISTORY', {
    'update', 'reset',

    record: (payload) -> (dispatch, getState) ->
        state = selector getState()
        isRiichi = state.hand.options.riichi
        hand = "##{ state.number } "
        hand += (y.name for y in state.yaku).join(', ')
        hand += ", dora-#{state.dora}" if state.dora
        hand += ", uradora-#{state.uraDora}" if state.uraDora and isRiichi
        return {
            payload...,
            state.current..., hand,
            dora: state.dora
            fan: state.fan
            scores: state.scores.main
            uraDora: isRiichi and state.uraDora
        }
}

