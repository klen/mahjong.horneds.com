const actions = require('./actions').default
const gameActions = require('tags/game/actions').default
const scoresActions = require('tags/scores/actions').default
const reducer = require('./reducer').default


const DEFAULT = { history: [], current: null, scorePoints: 0, hanPoints: 0 }

const item = (overrides: any = {}) => ({
    hand: '#1 tanyao',
    dora: 0,
    fan: 5,
    scores: 12000,
    uraDora: undefined,
    userFans: null,
    userScores: null,
    ...overrides,
})


test('starts empty', () => {
    expect(reducer(undefined, { type: '@@init' })).toEqual(DEFAULT)
})


test('records the current hand', () => {
    const state = reducer(DEFAULT, { type: actions.TYPES.RECORD, payload: item() })

    expect(state.current).toEqual(item())
    expect(state.history).toEqual([])
})


test('scores the answer on the next hand', () => {
    const answered = reducer(DEFAULT, {
        type: actions.TYPES.RECORD,
        payload: item({ userFans: 5, userScores: 12000 }),
    })

    const state = reducer(answered, { type: gameActions.TYPES.RELOAD })

    // 4 points for the exact scores, 2 for the exact fans
    expect(state.scorePoints).toEqual(4)
    expect(state.hanPoints).toEqual(2)
    expect(state.current).toBeNull()
    expect(state.history).toEqual([item({ userFans: 5, userScores: 12000 })])
})


test('gives partial credit for close answers', () => {
    const answered = reducer(DEFAULT, {
        type: actions.TYPES.RECORD,
        payload: item({ scores: 12000, userScores: 10500, fan: 5, userFans: 3 }),
    })

    const state = reducer(answered, { type: gameActions.TYPES.RELOAD })

    expect(state.scorePoints).toEqual(2) // 1500 off
    expect(state.hanPoints).toEqual(0) // 2 han off
})


test('gives no points for misses', () => {
    const answered = reducer(DEFAULT, {
        type: actions.TYPES.RECORD,
        payload: item({ scores: 12000, userScores: 1000, fan: 5, userFans: 1 }),
    })

    const state = reducer(answered, { type: gameActions.TYPES.RELOAD })

    expect(state.scorePoints).toEqual(0)
    expect(state.hanPoints).toEqual(0)
})


test('does nothing without an answered hand', () => {
    expect(reducer(DEFAULT, { type: gameActions.TYPES.RELOAD })).toBe(DEFAULT)
})


test('keeps the state on answer actions', () => {
    const state = reducer(DEFAULT, { type: actions.TYPES.RECORD, payload: item() })

    expect(reducer(state, { type: scoresActions.TYPES.SHOW_FANS, payload: 3 })).toBe(state)
    expect(reducer(state, { type: scoresActions.TYPES.SHOW_SCORES, payload: 12000 })).toBe(state)
})


// keep the file a module, the helpers would leak into the global test scope
export {}
