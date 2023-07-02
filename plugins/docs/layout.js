import  {View } from '@ulibs/components'

export const layout = ({req, res, content})=>{
    return View({tag: 'div', htmlHead: `<script src='//unpkg.com/alpinejs' defer='true'></script>`}, [content])
}