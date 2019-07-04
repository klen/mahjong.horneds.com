{ mount } = require 'riot'

require './pages/index'


window.addEventListener 'DOMContentLoaded', ->
    store = require './store'

    mount '*'
