import { commonReducer, createReducer, initialReducer } from 'redux-code'

import gameActions from 'tags/game/actions'

import { ScoresState } from '../../types'
import actions from './actions'

const DEFAULT = {
    userScores: null,
    userFans: null,
}


export default createReducer(DEFAULT, initialReducer(actions.TYPES), commonReducer(actions.TYPES, DEFAULT), {

    [actions.TYPES.SHOW_FANS]: (state: ScoresState, { payload: userFans }: { payload: number }) =>
        ({ ...state, userFans }),

    [actions.TYPES.SHOW_SCORES]: (state: ScoresState, { payload: userScores }: { payload: number }) =>
        ({ ...state, userScores }),

    [gameActions.TYPES.RELOAD]: (state: ScoresState) =>
        ({ ...state, userScores: null, userFans: null }),

})
