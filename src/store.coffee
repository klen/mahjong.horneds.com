Riot = require 'riot'
RRM = require 'redux-riot'
{ skipMiddleware } = require 'redux-code'
thunkMiddleware = require('redux-thunk').default

router = require 'utils/router'
{ initStore } = require 'utils/redux'

store = initStore {
    app: {
        game: require './tags/game/reducer'
        scores: require './tags/scores/reducer'
        history: require './tags/history/reducer'
    }

}, thunkMiddleware, router.middleware, skipMiddleware

Riot.mixin('redux', RRM(store))

module.exports = store
