import isPlainObject from 'lodash/isPlainObject'
import { createActions } from 'redux-code'
import route from 'riot-route'


const ACTIONS = createActions('ROUTER', {
    route: 'route',
    back: 'back',
    forward: 'forward',
    go: 'go',
    routeChanged: 'routeChanged',
})

const toQuery = (params: Record<string, string>): string =>
    Object.keys(params)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&')

const actions = ACTIONS

const middleware = ({ dispatch }: any) => {
    route.base('#')
    route.parser((path) => path.split('?')[0])
    route((...args: string[]) => {
        dispatch(ACTIONS.routeChanged({
            url: args.join('/'),
            query: route.query(),
        }))
    })

    const ops: Record<string, any> = {
        [ACTIONS.TYPES.ROUTE]: ({ payload }: any) => {
            if (isPlainObject(payload)) payload = `?${toQuery(payload as Record<string, string>)}`
            route(payload)
        },
    }

    if (history) {
        ops[ACTIONS.TYPES.BACK] = () => history.back()
        ops[ACTIONS.TYPES.FORWARD] = () => history.forward()
        ops[ACTIONS.TYPES.GO] = ({ payload }: any) => history.go(payload)
    }

    return (next: any) => (action: any) => (ops[action.type] || next)(action)
}


export { actions, middleware }
