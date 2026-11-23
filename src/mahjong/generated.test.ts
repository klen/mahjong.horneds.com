import generate from './index'
import { Tile } from './tiles'

const GAMES = 3000


const countDoras = (tiles: Tile[], indicators: Tile[]): number => {
    let total = 0
    for (const indicator of indicators) {
        if (indicator.isClosed) continue
        const dora = indicator.next()
        total += tiles.filter((tile) => tile.tile === dora).length
    }

    return total
}


test('generated hands are scored consistently', () => {
    let opened = 0

    for (let i = 0; i < GAMES; i++) {
        const game = generate()
        const { hand } = game

        // The winning tile must point at the set it belongs to, otherwise
        // yaku/fu that depend on the wait (pinfu, sanankou, tanki fu) go wrong.
        const holders = [hand.pair!, ...hand.sets].filter((set) => set.tiles.some((t) => t.id === hand.wait!.id))
        expect(holders.length).toEqual(1)
        expect(hand.wait!.set!.id).toEqual(holders[0].id)

        // An opened hand is declared by its called sets and its wait stays concealed.
        expect(hand.isOpened).toEqual(hand.sets.some((set) => set.isOpened))
        expect(hand.wait!.set!.isOpened).toBeFalsy()
        if (hand.isOpened) opened += 1

        // A hand without yaku cannot be declared riichi when it is opened.
        expect(game.yaku.length).toBeGreaterThan(0)

        // Generator may open up to 5 indicators, all of them count.
        expect(game.dora).toEqual(countDoras(hand.tiles(), game.wall.slice(2, 7)))
        expect(game.uraDora).toEqual(countDoras(hand.tiles(), game.wall.slice(9, 14)))
    }

    expect(opened).toBeGreaterThan(0)
})
