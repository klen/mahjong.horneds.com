import * as riot from 'riot'

import '../store'
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
