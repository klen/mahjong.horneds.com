const actions = require('./actions').default
const historyActions = require('tags/history/actions').default


const state = {
    app: {
        game: {
            number: 2,
            hand: { options: { riichi: false } },
            yaku: [{ name: 'tanyao', fan: 1 }],
            dora: 0,
            uraDora: 0,
            fan: 1,
            scores: { main: 1000 },
        },
        history: { current: null, history: [], scorePoints: 0, hanPoints: 0 },
    },
}


// behave like redux-thunk: run thunks, collect actions
const run = (thunk: any): any[] => {
    const dispatched: any[] = []
    const dispatch: any = (action: any) => {
        if (typeof action === 'function') return action(dispatch, () => state)
        dispatched.push(action)
        return action
    }

    thunk(dispatch)

    return dispatched
}


test('records the guessed fans in the history', () => {
    const dispatched = run(actions.showFans(3))
    const record = dispatched.find((action) => action.type === historyActions.TYPES.RECORD)

    expect(record).toBeTruthy()
    expect(record.payload).toMatchObject({ userFans: 3 })
})


test('parses the guessed scores before recording them', () => {
    const dispatched = run(actions.showScores('12000'))
    const record = dispatched.find((action) => action.type === historyActions.TYPES.RECORD)

    expect(record).toBeTruthy()
    expect(record.payload).toMatchObject({ userScores: 12000 })
})


// keep the file a module, the helpers would leak into the global test scope
export {}
