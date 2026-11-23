const actions = require('./actions').default
const gameActions = require('tags/game/actions').default
const reducer = require('./reducer').default


const DEFAULT = { userScores: null, userFans: null }


test('starts with no answer', () => {
    expect(reducer(undefined, { type: '@@init' })).toEqual(DEFAULT)
})


test('remembers the guessed fans and scores', () => {
    const fans = reducer(DEFAULT, { type: actions.TYPES.SHOW_FANS, payload: 3 })
    expect(fans).toEqual({ userScores: null, userFans: 3 })

    const scores = reducer(fans, { type: actions.TYPES.SHOW_SCORES, payload: 12000 })
    expect(scores).toEqual({ userScores: 12000, userFans: 3 })
})


test('forgets the answer on the next hand', () => {
    const answered = { userScores: 12000, userFans: 3 }

    expect(reducer(answered, { type: gameActions.TYPES.RELOAD })).toEqual(DEFAULT)
})


// keep the file a module, the helpers would leak into the global test scope
export {}
