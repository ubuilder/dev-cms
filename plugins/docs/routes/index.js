import pm from '../../../pluginManager.js'
import { View, Card } from '@ulibs/components'
import {tag} from '@ulibs/router'




export default function({}){
    return 'this is home page of codos to see the documentation of each section please click to the liks in the header'
}

export  const layout = async  (content)=>{
    return View(
        {
            htmlHead:
            `<style>
                body{padding: 0px; margin: 0px; background-color: rgba(200,200,200, 0.1)}
                a{text-decoration: none}
                a:hover{text-decoration: underline}
            </style>`
        },
        [
            View(
                {
                    style: 'display: flex; justify-content: space-between; padding: 0.5rem;position: sticky; box-shadow: 0px 0px 5px gray ' ,
                },
                [
                    View(
                        [
                            tag('h2', {style:'padding: 0px; margin: 0px'},
                            [
                                tag('a', {href: '/docs'}, "UDocs")
                            ])
                        ]
                        ),
                    View(
                        {
                            style: 'display: flex ; gap : 20px;align-items: center; padding-right: 1rem'
                        },
                        [
                            ...await getPages().map(page=>{
                                return tag('a', {href: `/docs/${page.title}` ,style: 'line-type: node'}, page.title)
                            }),
                        ]
                    )

                ]
            ),
            View(
                [
                    content
                ]
            )
        ]
        )
}

const getPages= async() =>{
    const ctx = pm.getContext()
    const DocsPages = ctx.db.getModel('docs_pages')
    const pages = await DocsPages.query(
        {
            select: {
                title: true,
            }
        }
    )
    return pages
}