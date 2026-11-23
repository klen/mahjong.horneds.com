import { createSelector } from 'reselect'

import gameSelector from 'tags/game/selector'

import { RootState, ScoresState } from '../../types'


export default createSelector(
    [gameSelector, (state: RootState) => state.app.scores],

    (game, state: ScoresState) => {
        let correctHan: boolean | null = null
        let correctScores: boolean | null = null

        if (state.userFans) correctHan = game.fan === state.userFans
        if (state.userScores) correctScores = game.scores?.main === state.userScores

        return { ...game, ...state, correctHan, correctScores }
    },
)
