import pm from '../../../../pluginManager.js'
import { View, Row, Col, Container,Card ,CardBody, CardTitle, Button, Table, TableHead,TableBody, TableCell, TableRow } from '@ulibs/components'
import {tag} from '@ulibs/router'


export const load= async(reqResObj) =>{
    console.log('pagge id : ', reqResObj.req.params.exampleId)
    const ctx = pm.getContext()
    const ExamplePage = ctx.db.getModel('docs_examples')
    const example = await ExamplePage.query(
        {
            where: {
                id: reqResObj.req.params.exampleId
            },
            select: {
                title: true,
                description: true,
                code: true
            }
        }
    )
    console.log('data: ', example)
    reqResObj['example'] = example
}


export  default  function ({req, res, example}){
    return (
      [
        JSON.stringify(`example`)
        ,
        [
            Card(
                [
                    example.data.map(ex =>Col(
                                 {
                                    col: 12,
                                    p:'sm'
                                 },
                                [
                                    Row({py:'sm', pt:0, style: 'display: flex; justify-content: space-between'},
                                        [
                                            Button({color: 'secondary'},'Back'),
                                            View({tag: 'form', action: '/admin/docs/example/id', method: 'post'}, 
                                                [
                                                    Button({color: 'error'},'Save Changes'),

                                                ]
                                            )
                                            
                                        ]
                                    )
                                    ,
                                    Row({py:'sm', pt:0},
                                    [
                                        View({tag:'label', for:'title'}, 'Title')
                                        ,
                                        View({tag: 'input',name: 'title',id: 'title',p: 'xs', type: 'text' ,style: 'width: 100%;border-radius: 10px', value: ex.title })
                                    ])
                                    ,
                                    Row(
                                        [
                                            View({tag: 'label', for: 'description'}, 'Description'),
                                            View({tag: 'textarea',name: 'description',id: 'description', p: 'xs', style: 'width: 100%;border-radius: 10px' },ex.description)
                                        ]
                                    ),
                                    Row({py: 'sm'},
                                        [
                                            View({tag: 'label',for: 'code'}, 'Code'),
                                            View({ p:'sm'  ,name: 'code', id: 'code',tag: 'textarea',component:'code', style: 'border-radius: 10px;background-color: rgba(10,10,10,0.9);color: rgba(250,250,250, 0.8);width: 100%', }, ex.code)
                                        ]
                                    ),
                                ]
                            )
                            
                        
                    )
                    
                ]
            )
        ]

      ]
    )
}