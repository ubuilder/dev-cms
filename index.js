// in the name of ullah
console.log('cms starting')

import {Router} from '@ulibs/router'
import {PluginManager} from '@ulibs/plugin'
let ctx = {}

const app = new Router()
ctx['router'] = app

const pm = PluginManager({config: './pm.config.json', ctx: ctx})

await pm.loadPlugins('./plugins')
// pm.install('docs', import('./plugins/docs/index.js'))
// pm.install('todos', import('./plugins/todos/index.js'))

// await pm.enable('docs')
await pm.start()

