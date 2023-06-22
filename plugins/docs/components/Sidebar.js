import {  View, Col, Row, } from "@ulibs/components";


export const Sidebar = (props, slot )=>{
    const sidebarStyle = "background-color: rgba(100,100, 100, 0.3); position:sticky;height: 100vh"
    return View(
        {
            tag: 'div',
            px: '0',
            ...props,
            style: sidebarStyle,
        },
        [
            Col(
                {},
                [
                    ...slot?.map(sl=>{
                        return Row([sl])
                    })
                ]
            )
        ]
    
    )

}

export const SidebarItem = (props, slot)=>{
    const sidebarItemStyle = `<style>.sidebar-item:hover{ background-color: rgba(120,120,120, 0.3)}</style>`
    return View(
        {
            tag: 'div',
            class: 'sidebar-item',
            px: 'sm',
            py: 'sm',
            htmlHead: sidebarItemStyle,
        },
        [
            ...slot?.map(sl=>sl)
        ]
    )
}