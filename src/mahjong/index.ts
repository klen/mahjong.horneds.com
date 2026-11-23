import analyze from './analyze'
import scores from './analyze/scores'
import { generateGameState } from './generator'

export default () => {
    // generateGameState returns nothing when it cannot build a hand from the shuffled tiles
    let game = generateGameState()
    while (!game) game = generateGameState()
    return scores(analyze(game))
}
