import {connect}  from '@ulibs/db'
import { View, Card } from '@ulibs/components'
const db = connect({filename: 'text-db'})
import {tag} from '@ulibs/router'


// db.createTable('docs_pages', {
//     page: 'components'
// })
const page = db.getModel('docs_pages')
console.log('page: ', await page.get({}))
export function load(){

}

export default function({}){
    return View(['somethind'
    ])
}

export const layout = (content)=>{
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
                            tag('a', {href: '/docs/components' ,style: 'line-type: node'}, 'Components'),
                            tag('a', {href: '/docs/db' ,style: 'line-type: node'}, 'DB ORM'),
                            tag('a', {href: '/docs/router' ,style: 'line-type: node'}, 'Router'),
                            tag('a', {href: '/docs/plugin' ,style: 'line-type: node'}, 'Plugin'),
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
