import {Router} from '@ulibs/router'
import pm from './pluginManager.js'
import {connect} from '@ulibs/db'

const app = new Router()
const db = connect({filename: 'dev-db'})

//add router
app.startServer('localhost', 5000, ()=>{
    console.log('App is running on port 5000')
})

pm.getContext()['router'] = app
pm.getContext()['db'] = db



//loads the docs and todos plugins that are inside plugins directory
await pm.loadPlugins('./plugins')

// pm.install('docs', import('./plugins/docs/index.js'))
// pm.install('todos', import('./plugins/todos/index.js'))
// await pm.enable('docs')
await pm.start()

// pm.remove('docs')
