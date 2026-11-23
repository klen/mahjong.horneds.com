import * as Riot from 'riot'
import { skipMiddleware } from 'redux-code'
import RRM from 'redux-riot'
import thunkMiddleware from 'redux-thunk'

import game from 'tags/game/reducer'
import history from 'tags/history/reducer'
import scores from 'tags/scores/reducer'

import { initStore } from 'utils/redux'
import { middleware as routerMiddleware } from 'utils/router'

const store = initStore({
    app: {
        game,
        scores,
        history,
    },
}, thunkMiddleware, routerMiddleware, skipMiddleware)

Riot.mixin('redux', RRM(store))

export default store
