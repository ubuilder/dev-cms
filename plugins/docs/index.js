import { pathToFileURL } from "url";
import path from "path";
import * as page from './routes/index.js'
import * as compoentsPage from './routes/components/index.js'
import * as dbPage from './routes/db/index.js'
import * as routerPage from './routes/router/index.js'
import * as pluginPage from './routes/plugin/index.js'
import { connect } from "@ulibs/db";


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
    const db = connect({filename: 'text-db'})
    db.createTable(tableName, columns)
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