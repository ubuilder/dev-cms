import pm from '../../../../pluginManager.js'
import { View, Row, Modal,Form, Input, ModalBody, Divider, Col, Container, Button, Table, TableHead,TableBody, TableCell, TableRow } from '@ulibs/components'
import { tag } from '../../../../../router/src/ui/tags.js'

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
export const actions ={
  addPage: async (reqResObj)=>{
    const pageTitle  = reqResObj.req.formData.title
    const ctx = pm.getContext();
    const DocsPages = ctx.db.getModel('docs_pages')
    const result = await DocsPages.insert({title: pageTitle})
    console.log('result:: ', result)
    reqResObj.pageAdded = result
    return true
  },
  deletePage: async (reqResObj)=>{
    const pageId  = reqResObj.req.searchParams.id
    console.log('id: ', pageId)
    const ctx = pm.getContext();
    const DocsPages = ctx.db.getModel('docs_pages')
    const result = await DocsPages.remove(pageId)
    console.log('result:: ', result)
    reqResObj.pageDeleted = result
    return true
  }
}

export  default function ({req, res, pages, pageAdded, pageDeleted}){
  console.log('========', pageAdded, pageDeleted)
    return (
      [
        JSON.stringify(pages),
        
        pageAdded? View({ "x-data": '{open:true}', "x-init": "setTimeout(()=> open = false, 3000)"}, [
          View({"x-show": "open", style: 'border: 1px solid blue',p:'md'}, [
            View(`page Create: ${pageAdded}`)
          ])
        ]): ''
        ,
        pageDeleted? View({ "x-data": '{open:true}', "x-init": "setTimeout(()=> open = false, 3000)"}, [
          View({"x-show": "open", style: 'border: 1px solid red',p:'md'}, [
            View(`page deleted: ${pageDeleted}`)
          ])
        ]): ''
        ,

        View(
            [
                Button({color: 'primary', onclick : "openCreatePageModal()"},'Add New Pages'),
                View({tag: 'script'}, 
                  `
                  function openCreatePageModal(){
                    document.getElementById('createPageModal').setAttribute('u-modal-open', 'true')
                  }
                  function closeCreatePageModal(){
                    document.getElementById('createPageModal').removeAttribute('u-modal-open')
                  }
                  `
                ),
                Modal({id: 'createPageModal', size: 'xxs'}, [
                  Form({onsubmit: 'closeCreatePageModal()',method:'post', action: '/admin/docs?action=addPage'}, [
                    ModalBody([
                      Row({p:'md'},[
                        View({tag: 'h3', style: 'text-align: center'}, 'Create a Docs Page')
                      ]) ,
                      Divider({width: '100%'})
                      ,
                      Row({p: 'md'},[
                        View({tag: 'div'}, [
                          View({tag: "h3"}, 'Page title: ')
                        ]),
                        Input({type: 'text', id: 'page-title', placeholder: "Page title", name: 'title'}),
                      ]),
                      Divider(),
                      Row({p:'md'},[
                          Button({color: 'error', size: 'lg', type: 'reset', onclick: 'closeCreatePageModal()'},'Cancel'),
                          Button({color: 'primary', ms: 'auto', size: 'lg', type: 'submit',},'Submit'),
                      ])
                    ])   
                  ])
                ]),
            ]
        )
        ,
        Table(
            [
                
                TableHead([
                    TableCell('Title'),
                    TableCell('Options')
                ]),
                TableBody([
                  View({tag: 'script'}, 
                  `
                  function openDeletePageModal(pageId){
                    document.getElementById('deletePageModal').setAttribute('u-modal-open', 'true')
                    document.getElementById('deletePageform').setAttribute('action', '/admin/docs?action=deletePage&id='+pageId)
                  }
                  function closeDeletePageModal(){
                    document.getElementById('deletePageModal').removeAttribute('u-modal-open')
                  }
                  `
                  ),
                  Modal({id: 'deletePageModal', size: 'xxs'}, [
                    ModalBody([
                      Form({onsubmit: 'closeDeletePageModal()', id:'deletePageform',method:'post'}, [
                        View({}, [
                           View('Confirm Delete'),
                           View([
                               View('do you want to delete')
                           ]),
                           Row({p:'md'},[
                            Button({color: 'error', size: 'lg', type: 'reset', onclick: 'closeDeletePageModal()'},'Cancel'),
                            Button({color: 'primary', ms: 'auto', size: 'lg', type: 'submit',},'Yes'),
                          ])
                        ])
                      ])   
                    ])
                  ])
  
                  ,

                    pages.data.map((page)=>TableRow(
                        [
                            TableCell(page.title),
                            TableCell(
                                [
                                    View({tag: 'a', component: 'button', ms: 'auto' , bg:'primary', href: '/admin/docs/'+page.id},'View'),
                                    Button('Edit'),
                                    View(
                                      {tag: 'span'},
                                      [
                                          Button({color: 'error', onclick : `openDeletePageModal(${page.id})`},'Delete'),
                                      ]
                                    ),
                                    // View({tag: 'span', 'x-data': '{open: false} ' }, [
                                    //     Button({color: 'error', '@click': `open = !open`},'Delete'),
                                    //     View({tag: 'div', style: 'position: fixed; top: 50%; left:50%', 'x-show': 'open', '@click.outside': 'open = false'}, [
                                    //         View({}, [
                                    //             View('Confirm Delete'),
                                    //             View([
                                    //                 View('do you want to delete')
                                    //             ]),
                                    //             View([
                                    //                 Button({color: 'error', 'x-on:click': 'open=false'},'cancel'),
                                    //                 Button({color: 'primary', }, 'yes')
                                    //             ])
                                    //         ])
                                    //     ])
                                    // ])
                                    
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