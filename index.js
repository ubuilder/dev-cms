import {Router} from '@ulibs/router'
import {PluginManager} from '@ulibs/plugin'

let ctx = {}

//add router
const app = new Router()
app.startServer('localhost', 5000, ()=>{
    console.log('App is running on port 5000')
})
ctx['router'] = app




const pm = PluginManager({config: './pm.config.json', ctx: ctx})

//loads the docs and todos plugins that are inside plugins directory
await pm.loadPlugins('./plugins')


// pm.install('docs', import('./plugins/docs/index.js'))
// pm.install('todos', import('./plugins/todos/index.js'))
// await pm.enable('docs')

await pm.start()

// pm.remove('docs')