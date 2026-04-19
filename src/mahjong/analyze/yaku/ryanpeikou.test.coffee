yaku = require './ryanpeikou'
{ Hand } = require '../../tiles'


test 'test ryanpeikou', ->
    hand = Hand.create('s2s3s4s2s3s4s7s8s9s7s8s9m8m8')
    expect yaku.test { hand }
        .toEqual 3

    hand = Hand.create('p4p5p6s2s2s2s3s3s3s4s4s4 m4m4')
    expect yaku.test { hand }
        .toBeFalsy()
