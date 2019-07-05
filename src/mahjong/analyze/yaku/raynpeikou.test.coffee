yaku = require './ryanpeikou'
{ Hand } = require '../../tiles'


test 'test ryanpeikou', ->
    hand = Hand.create('s2s3s4s2s3s4s7s8s9s7s8s9m8m8')
    expect yaku.test { hand }
        .toEqual 3
