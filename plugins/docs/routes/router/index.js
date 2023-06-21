import { View,Col, Row, Container, Card } from '@ulibs/components'
import {tag} from '@ulibs/router'
import pm from '../../../../pluginManager.js'


export async function load({req}){
    const ctx = pm.getContext()
    const Page = ctx.db.getModel('docs_subTitles')
    const subTitles = await Page.query(
        {
            where: {
                title: 'router:like'
            },
            select: {
                title: true
            }
            
        }
    )
    req["subTitles"] = subTitles
}
export default function({req, res}){
    return 'router page'
}

export function layout({req, content}){
    return View(
        [
            //list of subtitles
            Row(
                {},
                [
                    Col({col: 2}, [
                        tag('ul', {style: 'background-color:rgb(24, 24, 24); color:rgb(250, 250, 250); text-decoration: none; height: 100%'}, 
                        [
                            // req.subTitles is set in load function
                            ...req.subTitles.data.map(({title})=>{
                                //each of the liks will load the examples at that title
                                return tag('li',{}, [tag('a', {href: `/docs/router/${title}`}, title)])
                            })
                        ]
                        ),
                    ]),
                    Col({col: 10}, [
                        content
                    ])
                    
                ]
            )
        ]
    )
}