import analyze from './analyze'
import scores from './analyze/scores'
import { generateGameState } from './generator'

export default () => {
    while (true) {
        // generateGameState returns nothing when it cannot build a hand from the shuffled tiles
        const game = generateGameState()
        if (!game) continue

        const result = scores(analyze(game))
        // an opened hand cannot declare riichi, so draw again when it has no yaku
        if (result.yaku.length) return result
    }
}
