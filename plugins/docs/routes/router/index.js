import { View, Card } from '@ulibs/components'
import getContext from '../../../../pluginManager.js'


export const load= async({req})=>{
    const ctx = getContext()
    const Page = ctx.db.getModel('docs_subTitles')
    const subTitles = await Page.query(
        {
            select: {
                title: true
            },
            where: {
                page: {
                    title: 'router'
                }
            }
        }
    )
    req.subTitles = subTitles
}

export default function({req}){
    return View(
    [
        //list of subtitles
        tag('ul', {}, 
        [
            //req.subTitles is set in load function
            ...req.subTitles.map(title=>{
                //each of the liks will load the examples at that title
                return tag('li', {}, [tag('a', {href: `/docs/router/${title}`}, title)])
            })
        ]
        )
    ])
}