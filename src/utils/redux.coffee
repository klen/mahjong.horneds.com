Redux = require 'redux'
isPlainObject = require 'lodash/isPlainObject'


# Combine reducers automatically
buildReducer = (reducers) ->
    return reducers unless isPlainObject(reducers)

    combined = {}
    combined[name] = buildReducer(reducer) for name, reducer of reducers

    return Redux.combineReducers combined


# Create a redux store
initStore = (reducers={}, middlewares...) ->

        # Setup enhancer
        enhancer = Redux.applyMiddleware(middlewares...)

        # Enable devtools in debug mode
        compose = Redux.compose
        if process.env.NODE_ENV == 'development' and window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            enhancer = compose(enhancer)

        # Create a base store
        return Redux.createStore(buildReducer(reducers), {}, enhancer)


module.exports = { buildReducer, initStore }
