import { Hand, Tile, TileSet } from './tiles'


test('TileSet:create', () => {

    let set = TileSet.create('p1p2p3')
    expect(set.tiles.length).toEqual(3)

    expect(set.isValid()).toBeTruthy()

    set = TileSet.create('p1p1')
    expect(set.isValid()).toBeTruthy()
    expect(set.isPair).toBeTruthy()
})


test('Hand:create', () => {
    const hand = Hand.create('p1p2p3p4p5p6p7p8p9m1m2m3s1s1')

    expect(hand.pair).toBeTruthy()
    expect(hand.sets.length).toEqual(4)
})


test('Tile: parses suits and honours', () => {
    const man = new Tile('m1')
    expect(man.suit).toEqual('m')
    expect(man.value).toEqual(1)
    expect(man.isHonor).toBeFalsy()
    expect(man.isTerminal).toBeTruthy()
    expect(man.isClosed).toBeFalsy()
    expect(man.set).toBeNull()

    expect(new Tile('p5').isTerminal).toBeFalsy()
    expect(new Tile('s9').isTerminal).toBeTruthy()

    const wind = new Tile('wE')
    expect(wind.isHonor).toBeTruthy()
    expect(wind.value).toEqual('E')
    expect(wind.isTerminal).toBeFalsy()

    const dragon = new Tile('dG')
    expect(dragon.isHonor).toBeTruthy()
    expect(dragon.isTerminal).toBeFalsy()
})


test('Tile: ids are unique', () => {
    const ids = new Set([new Tile('m1'), new Tile('m1'), new Tile('m1')].map((tile) => tile.id))
    expect(ids.size).toEqual(3)
})


test('Tile:isConnected follows suits and numbers', () => {
    expect(new Tile('m1').isConnected(new Tile('m2'))).toBeTruthy()
    expect(new Tile('m2').isConnected(new Tile('m1'))).toBeTruthy()
    expect(new Tile('m1').isConnected(new Tile('m3'))).toBeFalsy()
    expect(new Tile('m1').isConnected(new Tile('p2'))).toBeFalsy()
    expect(new Tile('m1').isConnected(new Tile('m1'))).toBeTruthy()

    // honours only connect to the same honour
    expect(new Tile('wE').isConnected(new Tile('wS'))).toBeFalsy()
    expect(new Tile('wE').isConnected(new Tile('wE'))).toBeTruthy()
})


test('Tile:next wraps around the suit', () => {
    expect(new Tile('m1').next()).toEqual('m2')
    expect(new Tile('m9').next()).toEqual('m1')
    expect(new Tile('wN').next()).toEqual('wE')
    expect(new Tile('dG').next()).toEqual('dR')
})


test('TileSet:isValid marks pair, pon, row and kan', () => {
    const pair = new TileSet(new Tile('m1'), new Tile('m1'))
    expect(pair.isValid()).toBe(pair)
    expect(pair.isPair).toBeTruthy()
    expect(pair.isPon).toBeFalsy()
    expect(pair.suit).toEqual('m')
    expect(pair.value).toEqual('m1')

    const pon = new TileSet(new Tile('p5'), new Tile('p5'), new Tile('p5'))
    expect(pon.isValid()).toBe(pon)
    expect(pon.isPon).toBeTruthy()
    expect(pon.isRow).toBeFalsy()
    expect(pon.isTerminal).toBeFalsy()

    const kan = new TileSet(
        new Tile('wE'), new Tile('wE'), new Tile('wE'), new Tile('wE'),
    )
    expect(kan.isValid()).toBe(kan)
    expect(kan.isKan).toBeTruthy()
    expect(kan.isPon).toBeTruthy()
    expect(kan.isHonor).toBeTruthy()

    const row = new TileSet(new Tile('s5'), new Tile('s6'), new Tile('s7'))
    expect(row.isValid()).toBe(row)
    expect(row.isRow).toBeTruthy()
    expect(row.value).toEqual('s5')
    expect(row.tiles.map((tile) => tile.tile)).toEqual(['s5', 's6', 's7'])
    expect(row.tiles.every((tile) => tile.set === row)).toBeTruthy()
})


test('TileSet:isValid rejects broken sets', () => {
    expect(new TileSet(new Tile('m1'), new Tile('m3')).isValid()).toBeUndefined()
    expect(new TileSet(new Tile('m1'), new Tile('p2')).isValid()).toBeUndefined()
    expect(new TileSet(new Tile('m1'), new Tile('m2'), new Tile('m2')).isValid()).toBeUndefined()
    expect(new TileSet(new Tile('m1'), new Tile('m5'), new Tile('m9')).isValid()).toBeUndefined()
})


test('Hand:push keeps four sets and a pair and picks a wait', () => {
    const hand = new Hand()
    hand.push(TileSet.create('m1m2m3'))
    hand.push(TileSet.create('p1p2p3'))
    expect(hand.wait).toBeNull()

    hand.push(TileSet.create('s1s2s3'))
    hand.push(TileSet.create('wEwEwE'))
    expect(hand.wait).toBeNull()

    hand.push(TileSet.create('dGdG'))
    expect(hand.sets).toHaveLength(4)
    expect(hand.pair!.value).toEqual('dG')
    expect(hand.wait).toBeTruthy()
    expect(hand.tiles()).toHaveLength(14)
    expect(hand.wait!.set).toBeTruthy()
    expect(hand.isOpened).toBeFalsy()
})


test('Hand: the wait never lands in an opened set', () => {
    const hand = new Hand()
    const opened = TileSet.create('m1m2m3')
    hand.push(opened)
    opened.isOpened = true
    for (const mask of ['p1p2p3', 's1s2s3', 'p7p8p9']) hand.push(TileSet.create(mask))
    hand.push(TileSet.create('wNwN'))

    expect(opened.isOpened).toBeTruthy()
    expect(hand.wait!.set!.isOpened).toBeFalsy()
})


test('Hand:push ignores invalid sets', () => {
    const hand = new Hand(TileSet.create('m1m3'))
    expect(hand.sets).toHaveLength(0)
    expect(hand.pair).toBeNull()
})


test('Hand:tiles sorts sets and the pair together', () => {
    const hand = Hand.create('m4m5m6 wEwEwE dRdRdR p1p2p3 s9s9')
    expect(hand.tiles().map((tile) => tile.tile)).toEqual([
        'dR', 'dR', 'dR', 'm4', 'm5', 'm6',
        'p1', 'p2', 'p3', 's9', 's9', 'wE', 'wE', 'wE',
    ])
})
