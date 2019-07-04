# SUU ANKOU (Four Concealed Pungs)
# Concealed hand with four concealed pungs/kongs.
# Winning on a discard is allowed only in case of single wait on the pair.
#
module.exports =
    name: 'suu ankou'
    yakuman: true
    test: ({ hand }) ->
        return if hand.isOpened
        return unless hand.wait.set.isPair
        sets = (set for set in hand.sets when set.isPon)
        return unless sets.length >= 4
        return 13
