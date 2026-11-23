const actions = require('./actions').default


const state = (game: any) => ({
    app: {
        game: {
            number: 1,
            hand: { options: { riichi: true } },
            yaku: [{ name: 'riichi', fan: 1 }, { name: 'tanyao', fan: 1 }],
            dora: 2,
            uraDora: 1,
            fan: 3,
            scores: { main: 12000 },
            ...game,
        },
        history: { current: null, history: [], scorePoints: 0, hanPoints: 0 },
    },
})


// behave like redux-thunk: run thunks, collect actions
const record = (game: any = {}, payload: any = {}) => {
    const appState = state(game)
    const dispatched: any[] = []
    const dispatch: any = (action: any) => {
        if (typeof action === 'function') return action(dispatch, () => appState)
        dispatched.push(action)
        return action
    }

    actions.record(payload)(dispatch, () => appState)

    return dispatched.find((action) => action.type === actions.TYPES.RECORD)
}


test('describes the hand in the history', () => {
    const action = record()

    expect(action.payload).toMatchObject({
        hand: '#1 riichi, tanyao, dora-2, uradora-1',
        dora: 2,
        fan: 3,
        scores: 12000,
        uraDora: 1,
    })
})


test('leaves ura dora out without riichi', () => {
    const action = record({ hand: { options: { riichi: false } } })

    expect(action.payload.hand).toEqual('#1 riichi, tanyao, dora-2')
    expect(action.payload.uraDora).toBeUndefined()
})


test('leaves dora out when there is none', () => {
    const action = record({ dora: 0, uraDora: 0, hand: { options: { riichi: false } } })

    expect(action.payload.hand).toEqual('#1 riichi, tanyao')
})


test('keeps the player answer from the payload', () => {
    const action = record({}, { userFans: 3 })

    expect(action.payload.userFans).toEqual(3)
})


// keep the file a module, the helpers would leak into the global test scope
export {}
