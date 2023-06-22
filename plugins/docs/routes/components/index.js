import { View,Col, Row, Container, Card } from '@ulibs/components'
import {tag} from '@ulibs/router'
import pm from '../../../../pluginManager.js'
import {Sidebar, SidebarItem} from '../../components/Sidebar.js'


export const load = async ({req})=>{
    const ctx = pm.getContext()
    const Page = ctx.db.getModel('docs_subTitles')
    const subTitles = await Page.query(
        {
            where: {
                title: 'components:like'
            },
            select: {
                title: true
            }
            
        }
    )
    req['subTitles'] = subTitles
}
export default function({req, res}){
    return 'component page'
    
}
export function layout({req, content}){
    return View(
        [
            //list of subtitles
            Row(
                {},
                [
                    Col({col: 2}, [
                        Sidebar(
                            {}, 
                            [
                                ...req?.subTitles?.data?.map(({title})=>{
                                    //each of the liks will load the examples at that title
                                    return SidebarItem({}, [tag('a', {href: `/docs/components/${title}`}, title)])
                                })
                    
                            ]
                        )
                    ]),
                    Col({col: 10}, [
                        content
                    ])
                    
                ]
            )
        ]
    )
}