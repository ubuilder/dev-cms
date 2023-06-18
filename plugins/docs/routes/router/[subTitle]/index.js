import { View, Card } from '@ulibs/components'
import { tag } from '../../../../../../router/src/ui/tags.js'
import getContext from '../../../../pluginManager.js'


export const load= async({req})=>{
    const subTitle = req.params.subTitle
    const ctx = getContext()
    const Page = ctx.db.getModel('docs_examples')
    const examples = await Page.query(
        {
            select: {
                title: true,
                description: true,
                code: true
            },
            where: {
                subTitle: {
                    title: subTitle
                }
            }
        }
    )
    req.examples = examples
}

export default function({req}){
    //returns the examples of the specific title
    return View(
    [
        ...req.examples.map(example=>{
            return View(
                [
                    tag('h1', {}, example.title),
                    tag('p', {}, example.description),
                    tag('code', {}, example.code),
                ]
                )
        })
    ])
}