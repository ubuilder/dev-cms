import pm from '../../../../pluginManager.js'
import { View, Row, Col, Container, Button, Table, TableHead,TableBody, TableCell, TableRow } from '@ulibs/components'

export const load= async(reqResObj) =>{
    const ctx = pm.getContext()
    const DocsPages = ctx.db.getModel('docs_pages')
    const pages = await DocsPages.query(
        {
            select: {
                title: true,
            }
        }
    )
    reqResObj['pages'] = pages
}

export  default  function ({req, res, pages}){
    return (
      [
        JSON.stringify(pages)
        ,

        View(
            [
                Button({color: 'primary'},'Add New Pages'),
            ]
        )
        ,
        Table(
            [
                
                TableHead([
                    TableCell('Title'),
                    TableCell('SubTitles'),
                    TableCell('Options')
                ]),
                TableBody([
                    pages.data.map((page)=>TableRow(
                        [
                            TableCell(page.title),
                            TableCell([View({tag: 'a', component: 'button' , bg:'primary', href: '/admin/docs/'+page.id},'View subTitles')]),
                            TableCell(
                                [
                                    Button('Edit'),
                                    Button({color: 'error'},'Delete'),
                                    
                                ]
                            ),
                        ]
                        ),
                    )
                ]),
            ]
        )
      ]
    )
}