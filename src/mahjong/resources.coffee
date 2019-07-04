concat = require 'lodash/concat'
constant = require 'lodash/constant'
flatten = require 'lodash/flatten'
times = require 'lodash/times'


genSuit = (type, family) -> ("#{type}#{v}" for v in family.split(''))

SUITS =
    m: genSuit 'm', '123456789'
    s: genSuit 's', '123456789'
    p: genSuit 'p', '123456789'
    w: genSuit 'w', 'ESWN'
    d: genSuit 'd', 'RWG'

module.exports = {

    SUITS,

    TILES: flatten concat(
        times(4, constant(SUITS.m)),
        times(4, constant(SUITS.s)),
        times(4, constant(SUITS.p)),
        times(4, constant(SUITS.w)),
        times(4, constant(SUITS.d)),
    )
}
