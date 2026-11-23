import { createSelector } from 'reselect'

import gameSelector from 'tags/game/selector'

import { HistoryState, RootState } from '../../types'


export default createSelector(
    [gameSelector, (state: RootState) => state.app.history],

    (game, state: HistoryState) => ({ ...game, ...state }),
)
