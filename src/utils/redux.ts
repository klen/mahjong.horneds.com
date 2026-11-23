import isPlainObject from 'lodash/isPlainObject'
import * as Redux from 'redux'


// Combine reducers automatically
const buildReducer = (reducers: any): any => {
    if (!isPlainObject(reducers)) return reducers

    const combined: Record<string, any> = {}
    for (const name of Object.keys(reducers)) combined[name] = buildReducer(reducers[name])

    return Redux.combineReducers(combined)
}


// Create a redux store
const initStore = (reducers: any = {}, ...middlewares: any[]) => {

    // Setup enhancer
    let enhancer = Redux.applyMiddleware(...middlewares)

    // Enable devtools in debug mode
    let compose = Redux.compose
    if (process.env.NODE_ENV === 'development' && window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
        compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        enhancer = compose(enhancer)
    }

    // Create a base store
    return Redux.createStore(buildReducer(reducers), {}, enhancer)
}


export { buildReducer, initStore }
