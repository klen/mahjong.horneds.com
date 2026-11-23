import * as riot from 'riot'

import './store'
import './pages/index'


test('mounts the tags when the document is ready', () => {
    const addEventListener = jest.spyOn(window, 'addEventListener')
    const mount = jest.spyOn(riot, 'mount').mockImplementation(() => [])

    require('./index')

    expect(addEventListener).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function))

    const listener = addEventListener.mock.calls.find(([event]) => event === 'DOMContentLoaded')![1] as () => void
    listener()

    expect(mount).toHaveBeenCalledWith('*')
})
