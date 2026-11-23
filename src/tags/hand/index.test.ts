import * as riot from 'riot'

import { Hand } from 'mahjong/tiles'
import { desc } from 'utils/tiles'

import './index'


const mountHand = (mask: string): any => {
    const element = document.createElement('div')
    document.body.appendChild(element)

    const hand = Hand.create(mask)
    return riot.mount(element, 'hand', { hand, number: 1 })[0]
}


test('labels every tile with its name', () => {
    const tag = mountHand('m1m2m3 p1p2p3 s1s2s3 m7m8m9 wSwS')

    const labels = [...tag.root.querySelectorAll('.c-tile')].map((tile: Element) => tile.getAttribute('aria-label'))
    const hand = tag.opts.hand as Hand

    // the winning tile is rendered apart from the rest of the hand
    const tiles = hand.tiles()
    const expected = [...tiles.filter((tile) => tile.id !== hand.wait!.id), hand.wait!]

    expect(labels).toHaveLength(14)
    expect(labels).toEqual(expected.map((tile) => desc[tile.tile]))

    expect(labels).toContain('1 man')
    expect(labels).toContain('1 pin')
    expect(labels).toContain('1 sou')
    expect(labels).toContain('South Wind')

    tag.unmount()
})
