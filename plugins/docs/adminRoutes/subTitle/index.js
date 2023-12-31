import pm from '../../../../pluginManager.js'
import { View, Row, Col, Container, Button, Table, TableHead,TableBody, TableCell, TableRow } from '@ulibs/components'
import {tag} from '@ulibs/router'

export const load= async(reqResObj) =>{
    const ctx = pm.getContext()
    const SubTitlePage = ctx.db.getModel('docs_subTitles')
    const subTitles = await SubTitlePage.query(
        {
            where: {
                page_id : reqResObj.req.params.page
            },
            select: {
                title: true,
                page: true
            }
        }
    )
    reqResObj['subTitles'] = subTitles
}


export  default  function ({req, res, subTitles}){
    return (
      [
        JSON.stringify(subTitles)
        ,

        View(
            [
                Button({color: 'primary'},'Add New Title'),
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
                    subTitles.data.map((subTitle)=>TableRow(
                        [
                            TableCell(subTitle.title),
                            TableCell([View({tag: 'a', component: 'button', color:'primary', href: '/admin/docs/subtitle/'+subTitle.id},'View Examples')]),
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