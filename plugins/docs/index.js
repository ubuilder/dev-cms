import * as page from './routes/index.js'
//router
import * as routerPage from './routes/router/index.js'
import * as routerExaples from './routes/router/\[subTitle\]/index.js'
//plugin
import * as pluginPage from './routes/plugin/index.js'
import * as pluginExaples from './routes/plugin/\[subTitle\]/index.js'
//db
import * as dbPage from './routes/db/index.js'
import * as dbExaples from './routes/db/\[subTitle\]/index.js'
//components
import * as componentsPage from './routes/components/index.js'
import * as componentsExaples from './routes/components/\[subTitle\]/index.js'
//admin
import * as adminPage from './adminRoutes/index.js'


function onStart(ctx){
    console.log('starting docs plugin')
    ctx.router.addPage('/docs', page)
    //router
    ctx.router.addPage('/docs/router', routerPage)
    ctx.router.addPage('/docs/router/[subTitle]', routerExaples)
    //plugin
    ctx.router.addPage('/docs/plugin', pluginPage)
    ctx.router.addPage('/docs/plugin/[subTitle]', pluginExaples)
    //db
    ctx.router.addPage('/docs/db', dbPage)
    ctx.router.addPage('/docs/db/[subTitle]', dbExaples)
    //components
    ctx.router.addPage('/docs/components', componentsPage)
    ctx.router.addPage('/docs/components/[subTitle]', componentsExaples)
    //admin
    ctx.router.addPage('./admin/docs', adminPage)


    
}
async function onInstall(ctx){
    console.log('installing docs plugin')
    //create tables
    return
    await ctx.db.createTable('docs_pages', 
        {
            title: 'string|required',
            subTitle: 'docs_subTitles[]'
        } 
    )
    await ctx.db.createTable('docs_subTitles', 
        {
           title: 'string|required',
           page: 'docs_pages',
           example: 'docs_examples[]'
        }
    )
    await ctx.db.createTable('docs_examples', 
        {
           title: 'string',
           description: 'string',
           code: 'string',
           subTitle: 'docs_subTitles'
        }
    )

    //seeding
    const Page  = await ctx.db.getModel('docs_pages')
    console.log('page: ', Page.toString())
    const SubTitle  = await ctx.db.getModel('docs_subTitles')
    const Example  = await ctx.db.getModel('docs_examples')
    await Page.insert(
        [
            {
                title: "router",
                subTitle: 
                    [
                        {
                            title: 'routersubtitle1',
                            example: 
                                [
                                    {
                                        title: 'example title',
                                        description: 'example description',
                                        code: 'example code',
                                    }
                                ]
                        },
                    ]
            },
            {
                title: "components",
                subTitle: 
                    [
                        {
                            title: 'componentsubtitle',
                            example: 
                                [
                                    {
                                        title: 'example title',
                                        description: 'example description',
                                        code: 'example code',
                                    }
                                ]
                        },
                    ]
            },
            {
                title: "db",
                subTitle: 
                    [
                        {
                            title: 'dbsubtitle1',
                            example: 
                                [
                                    {
                                        title: 'example title',
                                        description: 'example description',
                                        code: 'example code',
                                    }
                                ]
                        },
                    ]
            },
            {
                title: "plugin",
                subTitle: 
                    [
                        {
                            title: 'pluginsubtitle1',
                            example: 
                                [
                                    {
                                        title: 'example title',
                                        description: 'example description',
                                        code: 'example code',
                                    }
                                ]
                        },
                    ]
            },
        ]
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