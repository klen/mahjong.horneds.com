# SUU ANKOU (Four Concealed Pungs)
module.exports =
    name: 'suu ankou'
    yakuman: true
    desc: """
        Concealed hand with four concealed pungs/kongs.  Winning on a discard
        is allowed only in case of single wait on the pair.
    """
    test: ({ hand }) ->
        return if hand.isOpened
        return unless hand.wait.set.isPair or hand.tsumo
        sets = (set for set in hand.sets when set.isPon)
        return unless sets.length >= 4
        return 13
