jest.mock('mahjong', () => ({ __esModule: true, default: jest.fn() }))

const actions = require('./actions').default
const reducer = require('./reducer').default


const game = {
    hand: {},
    wall: [],
    seatWind: 'wS',
    prevalentWind: 'wE',
    yaku: [],
    dora: 0,
    uraDora: 0,
    fan: 1,
    minipoints: 30,
    fuDetails: [],
    scores: { main: 1000 },
}


test('starts empty', () => {
    expect(reducer(undefined, { type: '@@init' })).toEqual({ inited: false, number: 0 })
})


test('reload stores the game and counts the hand', () => {
    const started = reducer({ inited: true, number: 0 }, { type: actions.TYPES.RELOAD, payload: game })

    expect(started).toEqual({ ...game, inited: true, number: 1 })

    const next = reducer(started, { type: actions.TYPES.RELOAD, payload: { ...game, fan: 3 } })
    expect(next.fan).toEqual(3)
    expect(next.number).toEqual(2)
})


test('init and update are handled by redux-code', () => {
    const inited = reducer({ inited: false, number: 0 }, { type: actions.TYPES.INIT })
    expect(inited.inited).toBeTruthy()

    expect(reducer(inited, { type: actions.TYPES.UPDATE, payload: { number: 5 } }).number).toEqual(5)
    expect(reducer(inited, { type: actions.TYPES.RESET })).toEqual({ inited: false, number: 0 })
})


// keep the file a module, the helpers would leak into the global test scope
export {}
