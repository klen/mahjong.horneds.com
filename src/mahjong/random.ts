// Every random choice of the hand generation goes through here, so one seed draws
// one hand and a shared link (the seed in the url) shows the same hand again.

const MODULUS = 2147483647

let state = 1


export const newSeed = (): number => Math.floor(Math.random() * MODULUS)

export const setSeed = (value: number): void => {
    // the generator needs a state in 1..MODULUS-1, so fold any seed into that range
    state = (Math.abs(Math.floor(value)) % (MODULUS - 1)) + 1
}

const next = (): number => {
    state = (state * 48271) % MODULUS
    return (state - 1) / (MODULUS - 1)
}

export const random = (lower: number, upper?: number): number => {
    if (upper === undefined) {
        upper = lower
        lower = 0
    }
    return lower + Math.floor(next() * (upper - lower + 1))
}

export const sample = <T>(items: T[]): T => items[random(items.length - 1)]

export const shuffle = <T>(items: T[]): T[] => {
    const result = [...items]
    for (let idx = result.length - 1; idx > 0; idx--) {
        const swap = random(idx)
        const item = result[idx]
        result[idx] = result[swap]
        result[swap] = item
    }
    return result
}
