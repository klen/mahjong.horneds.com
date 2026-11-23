import { createActions } from 'redux-code'

import historyActions from 'tags/history/actions'


export default createActions('APP/SCORES', {
    update: 'update',
    reset: 'reset',

    showFans(userFans: number) {
        return (dispatch: any) => {
            dispatch(historyActions.record({ userFans }))
            return userFans
        }
    },

    showScores(value: string) {
        return (dispatch: any) => {
            const userScores = parseInt(value)
            dispatch(historyActions.record({ userScores }))
            return userScores
        }
    },
})
