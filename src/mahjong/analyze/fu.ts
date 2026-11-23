import { Hand } from '../tiles'
import { FuDetail } from '../types'


export interface Fu {
    minipoints: number
    fuDetails: FuDetail[]
    basePoints: number
}


// limits are checked from the top: from mangan up the value depends on fan alone
const LIMITS: Array<[number, number]> = [
    [13, 8000], // yakuman
    [11, 6000], // sanbaiman
    [8, 4000], // baiman
    [6, 3000], // haneman
    [5, 2000], // mangan
]


export default (hand: Hand, fan: number, seatWind?: string, prevalentWind?: string): Fu => {
    for (const [limit, basePoints] of LIMITS)
        if (fan >= limit) return { minipoints: 0, fuDetails: [], basePoints }

    const { minipoints, fuDetails } = countFu(hand, seatWind, prevalentWind)
    if ((fan === 4 && minipoints > 30) || (fan === 3 && minipoints > 60))
        return { minipoints, fuDetails, basePoints: 2000 }

    return { minipoints, fuDetails, basePoints: minipoints * Math.pow(2, 2 + fan) }
}


const countFu = (hand: Hand, seatWind?: string, prevalentWind?: string): { minipoints: number, fuDetails: FuDetail[] } => {
    let fuDetails: FuDetail[] = []
    let minipoints: number

    if (hand.tsumo || hand.isOpened) {
        minipoints = 20
        fuDetails.push({ value: 20, label: 'base' })
    } else {
        minipoints = 30
        fuDetails.push({ value: 30, label: 'base (closed ron)' })
    }

    // minipoints for pair
    const pair = hand.pair!
    if (pair.suit === 'd' || pair.value === seatWind || pair.value === prevalentWind) {
        minipoints += 2
        fuDetails.push({ value: 2, label: 'value pair' })
    }

    // +2 for Tsumo
    if (hand.tsumo) {
        minipoints += 2
        fuDetails.push({ value: 2, label: 'tsumo' })
    }

    // Points for sets
    for (const set of hand.sets) {
        if (!set.isPon) continue
        const isOpened = set.isOpened || (!hand.tsumo && set.id === hand.wait!.set!.id)
        let point: number
        if (set.isKan && isOpened) point = 8
        else if (set.isKan) point = 16
        else if (isOpened) point = 2
        else point = 4

        if (set.isHonor || set.isTerminal) point *= 2
        minipoints += point
        const kind = set.isKan ? 'kan' : 'pon'
        const state = isOpened ? 'open' : 'closed'
        const value = set.isHonor ? 'honor' : set.value
        fuDetails.push({ value: point, label: `${state} ${kind} (${value})` })
    }

    // Points for waiting
    const wait = hand.wait!
    if (wait.set!.isPair) {
        minipoints += 2
        fuDetails.push({ value: 2, label: 'tanki wait' })
    }

    if (wait.set!.isRow) {
        if (![wait.set!.tiles[0].id, wait.set!.tiles[2].id].includes(wait.id)) {
            minipoints += 2
            fuDetails.push({ value: 2, label: 'kanchan wait' })
        } else if (wait.value === 3 && wait.set!.value![1] === '1') {
            minipoints += 2
            fuDetails.push({ value: 2, label: 'penchan wait' })
        } else if (wait.value === 7 && wait.set!.value![1] === '7') {
            minipoints += 2
            fuDetails.push({ value: 2, label: 'penchan wait' })
        }
    }

    // No minipoints
    if (hand.isOpened && minipoints === 20) {
        minipoints += 2
        fuDetails.push({ value: 2, label: 'open hand bonus' })
    }

    // Round the minipoints
    const rounded = Math.ceil(minipoints / 10) * 10
    if (rounded > minipoints) fuDetails.push({ value: rounded - minipoints, label: 'round up' })
    minipoints = rounded

    if (hand.options.pinfu) {
        minipoints = hand.tsumo ? 20 : 30
        fuDetails = [{
            value: minipoints,
            label: hand.tsumo ? 'pinfu tsumo fixed fu' : 'pinfu ron fixed fu',
        }]
    }

    return { minipoints, fuDetails }
}
