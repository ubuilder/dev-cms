function onStart(ctx){
    console.log('starting todos plugin')
}
function onInstall(ctx){
    console.log('installing todos plugin')
}
function onRemove(ctx){
    console.log('removing todos plugin')
}
function onEnable(ctx){
    console.log('enableing todos plugin')
}
function onDisable(ctx){
    console.log('disableing todos plugin')
}



export {
    onDisable,
    onEnable,
    onInstall,
    onRemove,
    onStart,
}