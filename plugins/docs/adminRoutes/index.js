import { View, Row, Col, Container, Button, Table, TableHead,TableBody, TableCell, TableRow } from '@ulibs/components'
import {tag} from '@ulibs/router'
import { Sidebar, SidebarItem } from '../components/Sidebar.js'


export default function ({req}){
    return 'admin page'
}

export const layout =   ({content})=>{
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
                            tag('a', {href: `/admin/docs` ,style: 'line-type: node'}, 'Docs Page')
                        ]
                    )

                ]
            ),
            View(
                [
                    View(
                        [
                            //list of subtitles
                            Row(
                                {},
                                [
                                    Col({col: 2}, [
                                        Sidebar(
                                            {}, 
                                            [
                                                    SidebarItem({}, [tag('a', {href: `/admin/docs`}, "Docs")])
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
                ]
            )
        ]
    )
}

