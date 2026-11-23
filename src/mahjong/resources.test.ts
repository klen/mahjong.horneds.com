import { SUITS, TILES } from './resources'


test('suits are spelled out per family', () => {
    expect(SUITS.m).toEqual(['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9'])
    expect(SUITS.s).toHaveLength(9)
    expect(SUITS.p).toHaveLength(9)
    expect(SUITS.w).toEqual(['wE', 'wS', 'wW', 'wN'])
    expect(SUITS.d).toEqual(['dR', 'dW', 'dG'])
})


test('the wall holds four of every tile', () => {
    expect(TILES).toHaveLength(136)

    for (const suit of Object.values(SUITS))
        for (const tile of suit)
            expect(TILES.filter((item) => item === tile)).toHaveLength(4)
})
