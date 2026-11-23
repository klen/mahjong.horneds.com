import generate from 'mahjong'
import { newSeed, random, setSeed } from 'mahjong/random'
import { ScoredGame } from 'mahjong/types'
import { createActions } from 'redux-code'

import { RootState } from '../../types'
import selector from './selector'

const REPEATS = 7


// the hash holds the seed that draws the hand, so a copied link shows the same hand
const seedFromUrl = (): number | undefined => {
    const found = /^#(\d+)$/.exec(location.hash)
    return found ? Number(found[1]) : undefined
}

// replaceState: the url follows the hand without piling up history entries
const setUrl = (seed: number): void => {
    history.replaceState(null, '', `#${seed}`)
}


export default createActions('APP/GAME', {
    update: 'update',
    reset: 'reset',

    init() {
        return (dispatch: any) => {
            dispatch(this.reload(seedFromUrl()))
        }
    },

    reload(seed?: number) {
        return (dispatch: any, getState: () => RootState) => {
            // a shared link draws its hand once, without the "next hand" filters
            if (seed !== undefined) {
                setSeed(seed)
                const shared = generate()
                setUrl(seed)
                return shared
            }

            const state = selector(getState())

            let game: ScoredGame
            let attempt = 0
            let n = 0
            do {
                attempt = newSeed()
                setSeed(attempt)
                game = generate()
                if (state.scores?.main === game.scores.main) continue
                if (game.fan >= 5) break
                if (random(100) < game.fan * 10) break
            } while (++n < REPEATS)

            setUrl(attempt)
            return game
        }
    },
})
