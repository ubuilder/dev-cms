import * as page from './routes/index.js'
import * as compoentsPage from './routes/components/index.js'
import * as dbPage from './routes/db/index.js'
import * as routerPage from './routes/router/index.js'
import * as pluginPage from './routes/plugin/index.js'


function onStart(ctx){
    console.log('starting docs plugin')
    ctx.router.addPage('/docs', page)
    ctx.router.addPage('/docs/components', compoentsPage)
    ctx.router.addPage('/docs/db', dbPage)
    ctx.router.addPage('/docs/router', routerPage)
    ctx.router.addPage('/docs/plugin', pluginPage)
}
function onInstall(ctx){
    console.log('installing docs plugin')
    //create tables
    
    ctx.db.createTable('docs_pages', 
        {
            title: 'string|required',
            subTitle: 'docs_subTitle[]'
        } 
    )
    ctx.db.createTable('docs_subTitles', 
        {
           title: 'string|required',
           page: 'docs_pages',
           example: 'docs_examples[]'
        }
    )
    ctx.db.createTable('docs_examples', 
        {
           title: 'string',
           description: 'text',
           code: 'text',
           subTitle: 'docs_subTitles'
        }
    )
}
function onRemove(ctx){
    console.log('removing docs plugin')
}
function onEnable(ctx){
    console.log('enableing docs plugin')
}
function onDisable(ctx){
    console.log('disableing docs plugin')
}

export {
    onDisable,
    onEnable,
    onInstall,
    onRemove,
    onStart,
}