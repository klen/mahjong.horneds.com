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
