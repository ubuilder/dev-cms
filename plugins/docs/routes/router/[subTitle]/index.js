import { View, Card } from '@ulibs/components'
import { tag } from '../../../../../../router/src/ui/tags.js'
import pm from '../../../../../pluginManager.js'

export const load= async({req})=>{
    const subTitle = req.params.subTitle
    const ctx = pm.getContext()
    const Page = ctx.db.getModel('docs_examples')
    const examples = await Page.query(
        {
            where: {
                subTitle: {
                    title: `${subTitle}:like`
                }
            },
            select: {
                title: true,
                description: true,
                code: true
            },
        }
    )
    req['examples'] = examples

}

export default function({req}){
    //returns the examples of the specific title
    console.log('examples data: ', req.examples)
    return View(
    [
        ...req?.examples?.data?.map(example=>{
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