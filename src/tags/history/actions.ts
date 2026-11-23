import { createActions } from 'redux-code'

import { HistoryItem, RootState } from '../../types'
import selector from './selector'


export default createActions('APP/HISTORY', {
    update: 'update',
    reset: 'reset',

    record(payload: Partial<HistoryItem>) {
        return (dispatch: any, getState: () => RootState) => {
            const state = selector(getState())
            const isRiichi = state.hand!.options.riichi

            let hand = `#${state.number} `
            hand += state.yaku!.map((y) => y.name).join(', ')
            if (state.dora) hand += `, dora-${state.dora}`
            if (state.uraDora && isRiichi) hand += `, uradora-${state.uraDora}`

            return {
                ...payload,
                ...state.current,
                hand,
                dora: state.dora,
                fan: state.fan,
                scores: state.scores!.main,
                uraDora: isRiichi ? state.uraDora : undefined,
            }
        }
    },
})
