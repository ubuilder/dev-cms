import {PluginManager} from '@ulibs/plugin'

let ctx = {}
let pm = PluginManager({config: './pm.config.json', ctx: ctx})
export default pm
