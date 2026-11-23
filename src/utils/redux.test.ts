import { buildReducer, initStore } from './redux'


const counter = (state = 0, action: { type: string, payload?: number }): number => {
    if (action.type === 'inc') return state + 1
    if (action.type === 'set') return action.payload!
    return state
}


test('buildReducer combines nested reducers', () => {
    const reducer = buildReducer({ app: { counter }, root: counter })

    let state = reducer(undefined, { type: '@@init' })
    expect(state).toEqual({ app: { counter: 0 }, root: 0 })

    state = reducer(state, { type: 'inc' })
    expect(state).toEqual({ app: { counter: 1 }, root: 1 })

    state = reducer(state, { type: 'set', payload: 7 })
    expect(state).toEqual({ app: { counter: 7 }, root: 7 })
})


test('buildReducer leaves plain functions alone', () => {
    expect(buildReducer(counter)).toBe(counter)
})


test('initStore enables devtools in development', () => {
    const compose = jest.fn((enhancer: any) => enhancer)
    const env = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = compose

    try {
        const store = initStore({ app: { counter } })
        store.dispatch({ type: 'inc' })

        expect(compose).toHaveBeenCalled()
        expect(store.getState()).toEqual({ app: { counter: 1 } })
    } finally {
        process.env.NODE_ENV = env
        delete window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
})


test('initStore runs middlewares', () => {
    const seen: string[] = []
    const middleware = () => (next: any) => (action: any) => {
        seen.push(action.type)
        return next(action)
    }

    const store = initStore({ app: { counter } }, middleware)

    store.dispatch({ type: 'inc' })

    expect(seen).toEqual(['inc'])
    expect(store.getState()).toEqual({ app: { counter: 1 } })
})
