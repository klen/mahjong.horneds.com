{ createActions } = require 'redux-code'

historyActions = require 'tags/history/actions'


module.exports = createActions 'APP/SCORES', {

    'update', 'reset'

    showFans: (userFans) -> (dispatch) ->
        dispatch historyActions.record { userFans }
        return userFans

    showScores: (value) -> (dispatch) ->
        userScores = parseInt value
        dispatch historyActions.record { userScores }
        return userScores

}
