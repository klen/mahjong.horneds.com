import { commonReducer, createReducer, initialReducer } from 'redux-code'

import gameActions from 'tags/game/actions'
import scoresActions from 'tags/scores/actions'

import { HistoryItem, HistoryState } from '../../types'
import actions from './actions'

const DEFAULT = {
    history: [],
    current: null,
    scorePoints: 0,
    hanPoints: 0,
}


export default createReducer(DEFAULT, initialReducer(actions.TYPES), commonReducer(actions.TYPES, DEFAULT), {

    [scoresActions.TYPES.SHOW_FANS]: (state: HistoryState) => state,

    [scoresActions.TYPES.SHOW_SCORES]: (state: HistoryState) => state,

    [actions.TYPES.RECORD]: (state: HistoryState, { payload }: { payload: Partial<HistoryItem> }) =>
        ({ ...state, current: payload as HistoryItem }),

    [gameActions.TYPES.RELOAD]: (state: HistoryState) => {
        if (!state.current) return state

        const { scores, userScores, fan, userFans } = state.current
        let score = 0
        if (userScores) score = 4 - Math.ceil(Math.abs(scores - userScores) / 1000)
        let han = 0
        if (userFans) han = 2 - Math.abs(fan - userFans)

        return {
            current: null,
            hanPoints: han > 0 ? state.hanPoints + han : state.hanPoints,
            scorePoints: score > 0 ? state.scorePoints + score : state.scorePoints,
            history: [state.current, ...state.history],
        }
    },

})
