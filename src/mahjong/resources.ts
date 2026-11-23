import concat from 'lodash/concat'
import constant from 'lodash/constant'
import flatten from 'lodash/flatten'
import times from 'lodash/times'

export type Suit = 'm' | 's' | 'p' | 'w' | 'd'

const genSuit = (type: string, family: string): string[] =>
    family.split('').map((v) => `${type}${v}`)

export const SUITS: Record<Suit, string[]> = {
    m: genSuit('m', '123456789'),
    s: genSuit('s', '123456789'),
    p: genSuit('p', '123456789'),
    w: genSuit('w', 'ESWN'),
    d: genSuit('d', 'RWG'),
}

export const TILES: string[] = flatten(concat(
    times(4, constant(SUITS.m)),
    times(4, constant(SUITS.s)),
    times(4, constant(SUITS.p)),
    times(4, constant(SUITS.w)),
    times(4, constant(SUITS.d)),
))
