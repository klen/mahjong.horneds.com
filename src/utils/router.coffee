{ createActions } = require 'redux-code'
isPlainObject = require 'lodash/isPlainObject'
route = require('riot-route').default


ACTIONS = createActions 'ROUTER', { 'route', 'back', 'forward', 'go', 'routeChanged' }

toQuery = (params) ->
    (
        "#{encodeURIComponent(key)}=#{encodeURIComponent(value)}" for key, value of params
    ).join('&')

actions = ACTIONS

middleware = ({ dispatch }) ->
    route.base('#')
    route.parser (path) -> path.split('?')[0]
    route (args...) ->
        dispatch ACTIONS.routeChanged
            url: args.join('/')
            query: route.query()

    ops = [ACTIONS.TYPES.ROUTE]: ({ payload }) ->
        payload = "?#{toQuery(payload)}" if isPlainObject(payload)
        route(payload)

    if history
        ops[ACTIONS.TYPES.BACK] = ({payload}) -> history.back()
        ops[ACTIONS.TYPES.FORWARD] = ({payload}) -> history.forward()
        ops[ACTIONS.TYPES.GO] = ({payload}) -> history.go(payload)

    return (next) -> (action) -> (ops[action.type] or next)(action)


module.exports = { actions, middleware }
