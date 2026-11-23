import flatten from 'lodash/flatten'
import orderBy from 'lodash/orderBy'
import sample from 'lodash/sample'
import some from 'lodash/some'
import uniq from 'lodash/uniq'

import { SUITS, Suit } from './resources'

let uid = 0


export class Tile {

    id: number
    isClosed: boolean
    suit: Suit
    isHonor: boolean
    // numbers for the suits, letters for honors
    value: number | string
    isTerminal: boolean
    set: TileSet | null

    constructor(public tile: string) {
        this.id = ++uid
        this.isClosed = false
        this.set = null
        this.suit = this.tile[0] as Suit
        this.isHonor = this.suit === 'd' || this.suit === 'w'
        this.value = this.isHonor ? this.tile[1] : parseInt(this.tile[1], 10)
        this.isTerminal = this.value === 1 || this.value === 9
    }

    isConnected(tile: Tile): boolean {
        if (this.suit !== tile.suit) return false
        if (this.value === tile.value) return true
        if (this.isHonor) return false
        return Math.abs(Number(this.value) - Number(tile.value)) === 1
    }

    next(): string {
        const suit = SUITS[this.suit]
        return suit[(suit.indexOf(this.tile) + 1) % suit.length]
    }
}


export class TileSet {

    id: number
    tiles: Tile[]
    isPair?: boolean
    isKan?: boolean
    isPon?: boolean
    isRow?: boolean
    isHonor?: boolean
    isTerminal?: boolean
    isOpened?: boolean
    suit?: Suit
    value?: string

    constructor(...tiles: Tile[]) {
        this.id = ++uid
        this.tiles = tiles
    }

    isValid(): this | undefined {
        this.isPair = this.tiles.length === 2
        this.isKan = this.tiles.length === 4
        const unique = uniq(this.tiles.map((tile) => tile.value)).length
        let isValid = unique === 1 || unique === this.tiles.length
        for (let idx = 0; idx < this.tiles.length - 1; idx++)
            isValid = isValid && this.tiles[idx].isConnected(this.tiles[idx + 1])
        if (this.isPair) isValid = isValid && unique === 1
        if (!isValid) return

        this.isPon = unique === 1 && !this.isPair
        this.isRow = unique === 3
        this.isHonor = this.tiles[0].isHonor
        this.isTerminal = some(this.tiles, 'isTerminal')
        this.isOpened = false

        this.tiles = orderBy(this.tiles, 'value')
        this.suit = this.tiles[0].suit
        this.value = `${this.suit}${this.tiles[0].value}`
        for (const tile of this.tiles) tile.set = this

        return this
    }

    static create(mask: string): TileSet {
        const tiles = mask.match(/.{1,2}/g)!.map((tile) => new Tile(tile))
        const set = new TileSet(...tiles)
        set.isValid()
        return set
    }
}


export class Hand {

    pair: TileSet | null
    sets: TileSet[]
    tsumo: boolean
    wait: Tile | null
    isOpened: boolean
    options: Record<string, boolean>

    constructor(...sets: TileSet[]) {
        this.pair = null
        this.sets = []
        this.tsumo = false
        this.wait = null
        this.isOpened = false
        this.options = {}
        for (const set of sets) this.push(set)
    }

    push(set?: TileSet): void {
        const valid = set?.isValid()
        if (!valid) return

        if (valid.isPair) this.pair = valid
        else this.sets.push(valid)

        if (!this.pair || this.sets.length !== 4) return
        this.wait = sample(this.tiles())!
        while (this.wait.set!.isKan) this.wait = sample(this.tiles())!
    }

    tiles(): Tile[] {
        const tiles = [...flatten(this.sets.map((set) => set.tiles)), ...this.pair!.tiles]
        return orderBy(tiles, 'tile')
    }

    static create(mask: string): Hand {
        mask = mask.replace(/\s/g, '')
        const sets = mask.match(/.{1,6}/g)!.map((set) => TileSet.create(set))
        return new Hand(...sets)
    }
}
