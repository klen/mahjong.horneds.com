import uniq from 'lodash/uniq'

import { GameState } from '../../types'

// Itsu (Pure Straight)
export default {
    name: 'itsu',
    exclude: ['tanyao', 'chanta', 'junchan', 'ryanpeikou', 'sanshoku', 'toitoi', 'chitoitsu', 'sanankou', 'sanshoku doku', 'honroutou', 'sankantsu', 'shou sangen'],
    desc: 'Hand with three consecutive chows in the same suit.',
    test: ({ hand }: GameState) => {
        const suits: Record<string, string[]> = { s: [], m: [], p: [] }
        for (const set of hand.sets) {
            if (!set.isRow) continue
            if (['1', '4', '7'].includes(set.value![1])) suits[set.suit!].push(set.value![1])
        }

        for (const value of Object.values(suits)) {
            if (value.length < 3) continue
            if (uniq(value).length < 3) continue
            return hand.isOpened ? 1 : 2
        }
    },
}
