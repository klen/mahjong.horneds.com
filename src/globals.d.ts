declare const VERSION: string

// webpack replaces process.env.NODE_ENV through EnvironmentPlugin
declare const process: { env: Record<string, string | undefined> }

// webpack resolves assets and tag html through require()
declare function require(path: string): any

declare module '*.sass'
declare module '*.tag.html'
declare module '*.svg'
declare module '*.png'

declare module 'riot' {
    export function mount(selector: string, opts?: unknown): any[]
    export function mount(element: HTMLElement, tag: string, opts?: unknown): any[]
    export function mixin(name: string, mixin: unknown): void
}

declare module 'riot-route' {
    interface Route {
        base(path: string): void
        parser(fn: (path: string) => string): void
        (path: string): void
        (fn: (...args: string[]) => void): void
        query(): Record<string, string>
    }
    const route: Route
    export default route
}

// untyped libraries
declare module 'redux-code' {
    export function createActions(namespace: string, creators: Record<string, any>): any
    export function createReducer(defaults: unknown, ...mixins: unknown[]): any
    export function initialReducer(types: unknown): unknown
    export function commonReducer(types: unknown, defaults: unknown): unknown
    export const skipMiddleware: any
}

declare module 'redux-riot' {
    const mixin: (store: unknown) => Record<string, unknown>
    export default mixin
}

interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
}
