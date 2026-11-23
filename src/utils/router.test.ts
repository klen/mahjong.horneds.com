jest.mock('riot-route', () => {
    const route: any = jest.fn()
    route.base = jest.fn()
    route.parser = jest.fn()
    route.query = jest.fn(() => ({ page: '2' }))
    return { __esModule: true, default: route }
})

const route = require('riot-route').default as any
const { actions, middleware } = require('./router') as typeof import('./router')


const setup = () => {
    const dispatch = jest.fn()
    const next = jest.fn()
    const run = middleware({ dispatch })

    return { dispatch, next, handle: (action: any) => run(next)(action) }
}


beforeEach(() => {
    route.mockClear()
    route.base.mockClear()
    route.parser.mockClear()
})


test('configures the router and reports route changes', () => {
    const { dispatch } = setup()

    expect(route.base).toHaveBeenCalledWith('#')
    expect(route.parser).toHaveBeenCalled()

    // the parser drops the query string
    const parser = route.parser.mock.calls[0][0]
    expect(parser('/game?page=2')).toEqual('/game')

    // the router dispatches the route change
    const onRoute = route.mock.calls[0][0]
    onRoute('a', 'b')

    expect(dispatch).toHaveBeenCalledWith({
        type: actions.TYPES.ROUTE_CHANGED,
        payload: { url: 'a/b', query: { page: '2' } },
    })
})


test('navigates with a query string for object payloads', () => {
    const { handle } = setup()
    route.mockClear()

    handle({ type: actions.TYPES.ROUTE, payload: { suit: 'm', page: 2 } })

    expect(route).toHaveBeenCalledWith(`?${encodeURIComponent('suit')}=m&${encodeURIComponent('page')}=2`)
})


test('navigates with a plain string payload', () => {
    const { handle } = setup()
    route.mockClear()

    handle({ type: actions.TYPES.ROUTE, payload: 'scores' })

    expect(route).toHaveBeenCalledWith('scores')
})


test('delegates history operations', () => {
    const { handle } = setup()
    const back = jest.spyOn(window.history, 'back').mockImplementation(() => {})
    const forward = jest.spyOn(window.history, 'forward').mockImplementation(() => {})
    const go = jest.spyOn(window.history, 'go').mockImplementation(() => {})

    handle({ type: actions.TYPES.BACK })
    handle({ type: actions.TYPES.FORWARD })
    handle({ type: actions.TYPES.GO, payload: -2 })

    expect(back).toHaveBeenCalled()
    expect(forward).toHaveBeenCalled()
    expect(go).toHaveBeenCalledWith(-2)
})


test('passes unknown actions to the next middleware', () => {
    const { handle, next } = setup()

    handle({ type: 'SOMETHING' })

    expect(next).toHaveBeenCalledWith({ type: 'SOMETHING' })
})


// keep the file a module, the helpers would leak into the global test scope
export {}
