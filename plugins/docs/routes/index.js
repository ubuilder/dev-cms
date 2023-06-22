import pm from '../../../pluginManager.js'
import { View, Card } from '@ulibs/components'
import {tag, renderHead} from '@ulibs/router'




export default function({}){
    return 'this is home page of codos to see the documentation of each section please click to the liks in the header'
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

export  const layout =  async ({content})=>{
    const pages  = await getPages()
    return View(
        {
         
            htmlHead:
            `
                <script>
                    body{padding: 0px; margin: 0px; background-color: rgba(200,200,200, 0.1)}
                    a{text-decoration: none}
                    a:hover{text-decoration: underline}
                </script>
                <meta name = 'viewport' content = 'with = device-width, initial-scale=1.0'>
                <link rel = 'stylesheet' href = 'https://unpkg.com/@ulibs/components@next/dist/styles.css'>
                <scritp src ='https://unpkg.com/@ulibs/components@next/dist/ulibs.js'> </scritp>
                <style>
                li:hover{
                    background-color: gray;
                }
                li{
                    list-style-type: none;
                    text-decoration: none;
                }
                </style>
            `
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
                            pages.data.map(page=>{
                                    return tag('a', {href: `/docs/${page.title}` ,style: 'line-type: node'}, page.title)
                            }),
                            tag('a', {href: `/admin/docs` ,style: 'line-type: node'}, 'Go to Admin')

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

