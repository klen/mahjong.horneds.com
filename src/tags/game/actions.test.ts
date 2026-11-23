jest.mock('mahjong', () => ({ __esModule: true, default: jest.fn() }))
jest.mock('lodash/random', () => ({ __esModule: true, default: jest.fn() }))

const generate = require('mahjong').default as jest.Mock
const random = require('lodash/random').default as jest.Mock
const actions = require('./actions').default


const game = (main: number, fan: number) => ({ scores: { main }, fan })

const getState = (main = 1000) => () => ({ app: { game: { scores: { main } } } }) as any

// the action creator is wrapped by redux-code into a thunk that dispatches the action
const run = (main?: number) => {
    const dispatch = jest.fn((action: any) => action)
    actions.reload()(dispatch, getState(main))
    return { dispatch, action: dispatch.mock.calls[0][0] }
}


beforeEach(() => {
    generate.mockReset()
    random.mockReset()
    random.mockReturnValue(99)
})


test('reload draws on until the scores change', () => {
    generate
        .mockReturnValueOnce(game(1000, 1)) // same scores, retry
        .mockReturnValueOnce(game(2000, 1)) // different, but the fan roll misses
        .mockReturnValueOnce(game(3000, 5)) // big hand, stop here

    const { action } = run()

    expect(generate).toHaveBeenCalledTimes(3)
    expect(action.type).toEqual(actions.TYPES.RELOAD)
    expect(action.payload).toEqual(game(3000, 5))
})


test('reload stops early on a big hand', () => {
    generate.mockReturnValueOnce(game(2000, 5))

    const { action } = run()

    expect(generate).toHaveBeenCalledTimes(1)
    expect(action.payload).toEqual(game(2000, 5))
})


test('reload stops early when the fan chance hits', () => {
    random.mockReturnValue(0) // 0 < fan * 10
    generate.mockReturnValueOnce(game(2000, 2))

    run()

    expect(generate).toHaveBeenCalledTimes(1)
})


test('reload draws no more than REPEATS hands', () => {
    generate.mockReturnValue(game(1000, 1))

    const { action } = run()

    expect(generate).toHaveBeenCalledTimes(7)
    expect(action.payload).toEqual(game(1000, 1))
})


test('init leads to a reload', () => {
    generate.mockReturnValueOnce(game(2000, 5))

    // behave like redux-thunk: run thunks, pass actions on
    const dispatched: any[] = []
    const dispatch: any = jest.fn((action: any) => {
        dispatched.push(action)
        if (typeof action === 'function') return action(dispatch, getState())
        return action
    })

    actions.init()(dispatch)

    expect(dispatched.some((action) => action && action.type === actions.TYPES.RELOAD)).toBeTruthy()
})


// keep the file a module, the helpers would leak into the global test scope
export {}
