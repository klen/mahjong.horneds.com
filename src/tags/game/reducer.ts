import { ScoredGame } from 'mahjong/types'
import { commonReducer, createReducer, initialReducer } from 'redux-code'

import { GameState } from '../../types'
import actions from './actions'

const DEFAULT = {
    inited: false,
    number: 0,
}


export default createReducer(DEFAULT, initialReducer(actions.TYPES), commonReducer(actions.TYPES, DEFAULT), {

    [actions.TYPES.RELOAD]: (state: GameState, { payload }: { payload: ScoredGame }) =>
        ({ ...payload, inited: state.inited, number: state.number + 1 }),

})
