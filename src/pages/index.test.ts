import * as riot from 'riot'

import generate from 'mahjong'

import '../store'
import gameActions from '../tags/game/actions'
import store from '../store'
import './index'


const mountApp = (): any => {
    const element = document.createElement('div')
    document.body.appendChild(element)
    return riot.mount(element, 'app')[0]
}

// the store lives for the whole test file, so hands are counted relatively
beforeEach(() => {
    window.scrollTo = jest.fn()
})


test('mounts the whole trainer', () => {
    const app = mountApp()

    expect(app.VERSION).toEqual(VERSION)

    const games = app.tags.game
    const game = Array.isArray(games) ? games[0] : games

    expect(game.state.inited).toBeTruthy()
    expect(game.state.hand).toBeTruthy()
    expect(game.wall1).toHaveLength(7)
    expect(game.wall2).toHaveLength(7)

    const text = app.root.textContent!
    expect(text).toContain('HAND #1')
    expect(text).toContain('Next hand')

    // the page walks the player through three numbered steps, the first one under the hand counter
    const steps = [
        '1. Review the winning hand',
        '2. Select the number of han',
        '3. Select the score',
        '4. Continue to the next hand',
    ]
    for (const step of steps) expect(text).toContain(step)

    const positions = steps.map((step) => text.indexOf(step))
    expect(positions).toEqual([...positions].sort((a, b) => a - b))
    expect(positions[0]).toBeGreaterThan(text.indexOf('HAND #1'))

    app.unmount()
})


test('shows the riichi stick left of the ura dora wall', () => {
    const app = mountApp()

    const game = generate()
    game.hand.options.riichi = true
    store.dispatch({ type: gameActions.TYPES.RELOAD, payload: game })

    const stick = app.root.querySelector('.c-riichi')!
    const dora = app.root.querySelector('.mj-dora-list')!

    // the stick has its own row: flush left, with the ura dora wall on the right
    expect(stick).toBeTruthy()
    expect(app.root.querySelector('.mj-header')!.contains(stick)).toBeTruthy()
    expect(dora.contains(stick)).toBeFalsy()
    expect(app.root.querySelector('.mj-hand')!.contains(stick)).toBeFalsy()

    expect(stick.parentElement!.querySelectorAll('wall')).toHaveLength(1)
    expect(stick.parentElement!.firstElementChild).toBe(stick)

    app.unmount()
})


test('next hand deals a new hand', () => {
    const app = mountApp()
    const game = app.tags.game as any
    const hand = game.state.number

    app.onNext()

    expect(game.state.number).toEqual(hand + 1)
    expect(app.root.textContent).toContain(`HAND #${hand + 1}`)
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0)

    app.unmount()
})


test('opens the hand from its url', () => {
    const game = (app: any) => (Array.isArray(app.tags.game) ? app.tags.game[0] : app.tags.game).state

    // a fresh visit, not a replay of the hand another test left in the url
    window.history.replaceState(null, '', '/')
    const first = mountApp()
    const link = location.hash
    const hand = game(first).hand.tiles().map((tile: any) => tile.tile)
    const scores = game(first).scores.main
    first.unmount()

    window.history.replaceState(null, '', link)

    const shared = mountApp()

    expect(game(shared).hand.tiles().map((tile: any) => tile.tile)).toEqual(hand)
    expect(game(shared).scores.main).toEqual(scores)

    shared.unmount()
})


test('number keys pick the han, then the points', () => {
    const app = mountApp()
    const game = Array.isArray(app.tags.game) ? app.tags.game[0] : app.tags.game
    const scores = game.tags.scores

    const press = (key: string) => document.dispatchEvent(new KeyboardEvent('keydown', { key }))

    press('7')
    expect(scores.state.userFans).toEqual(7)
    expect(scores.state.userScores).toBeFalsy()

    // the han is in, so 1..5 pick the fixed limits
    press('1')
    expect(scores.state.userScores).toEqual(scores.scores.limits[0].value)

    // a new hand clears the answers, so the keys pick the han again
    app.onNext()
    press('4')
    expect(scores.state.userFans).toEqual(4)
    expect(scores.state.userScores).toBeFalsy()

    // 0 opens the points table and there the keys pick the values in ascending order
    press('0')
    expect(scores.modal).toBeTruthy()
    press('3')
    expect(scores.state.userScores).toEqual(scores.tableValues()[2])

    // the answer is in, the keys step aside
    press('5')
    expect(scores.state.userScores).toEqual(scores.tableValues()[2])

    app.unmount()
})


test('number keys stay quiet once the scores tag is gone', () => {
    const app = mountApp()
    app.unmount()

    document.dispatchEvent(new KeyboardEvent('keydown', { key: '5' }))

    expect((store.getState() as any).app.scores.userFans).toBeFalsy()
})


test('space deals the next hand, but not over the points table', () => {
    const app = mountApp()
    const game = Array.isArray(app.tags.game) ? app.tags.game[0] : app.tags.game
    const scores = game.tags.scores
    const number = game.state.number

    const press = (key: string) => document.dispatchEvent(new KeyboardEvent('keydown', { key }))

    press('3') // the han is in
    press('0') // the points table is up
    expect(scores.modal).toBeTruthy()

    press(' ')
    expect(game.state.number).toEqual(number)

    press('1') // a pick closes the table
    expect(scores.modal).toBeFalsy()

    press(' ')
    expect(game.state.number).toEqual(number + 1)
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0)

    app.unmount()
})
