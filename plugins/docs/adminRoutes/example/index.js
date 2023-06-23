import pm from '../../../../pluginManager.js'
import { View, Row, Col, Container, Button, Table, TableHead,TableBody, TableCell, TableRow } from '@ulibs/components'
import {tag} from '@ulibs/router'

export const load= async(reqResObj) =>{
    console.log('pagge id : ', reqResObj.req.params.subtitle)
    const ctx = pm.getContext()
    const ExamplePage = ctx.db.getModel('docs_Examples')
    const examples = await ExamplePage.query(
        {
            where: {
                docs_subtitles: {
                    id: reqResObj.req.params.subtitle
                }
        
            },
            select: {
                title: true,
                description: true,
                code: true
            }
        }
    )
    console.log('data: ', examples)
    reqResObj['examples'] = examples
}


export  default  function ({req, res, examples}){
    return (
      [
        JSON.stringify(examples)
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
                    TableCell('Example'),
                    TableCell('Options')
                ]),
                TableBody([
                    examples.data.map((example)=>TableRow(
                        [
                            TableCell(example.title),
                            TableCell([View({tag: 'a', component: 'button', color:'primary', href: '/admin/docs/subtitle/'+example.id},'View Examples')]),
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