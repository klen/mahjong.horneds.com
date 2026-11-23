import random from 'lodash/random'

import generate from 'mahjong'
import { ScoredGame } from 'mahjong/types'
import { createActions } from 'redux-code'

import { RootState } from '../../types'
import selector from './selector'

const REPEATS = 7


export default createActions('APP/GAME', {
    update: 'update',
    reset: 'reset',

    init() {
        return (dispatch: any) => {
            dispatch(this.reload())
        }
    },

    reload() {
        return (dispatch: any, getState: () => RootState) => {
            const state = selector(getState())

            let game: ScoredGame | undefined
            let n = 0
            while (n++ < REPEATS) {
                game = generate()
                if (state.scores?.main === game.scores.main) continue
                if (game.fan >= 5) break
                if (random(100) < game.fan * 10) break
            }

            return game
        }
    },
})
