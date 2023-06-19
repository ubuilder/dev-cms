import { View, Card } from '@ulibs/components'
import {tag} from '@ulibs/router'
import pm from '../../../../pluginManager.js'


export async function load(req){
    const ctx = pm.getContext()
    const Page = ctx.db.getModel('docs_subTitles')
    const subTitles = await Page.query(
        {
            where: {
                title: 'db:like'
            },
            select: {
                title: true
            }
            
        }
    )
    req.subTitles = subTitles
}

export default function(req){
    return View(
        [
            //list of subtitles
            tag('ul', {}, 
            [
                // req.subTitles is set in load function
                ...req.subTitles.data.map(({title})=>{
                    //each of the liks will load the examples at that title
                    return tag('li', {}, [tag('a', {href: `/docs/db/${title}`}, title)])
                })
            ]
            )
        ]
    )
}