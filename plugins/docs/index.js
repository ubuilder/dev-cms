function onStart(ctx){
    console.log('starting docs plugin')
}
function onInstall(ctx){
    console.log('installing docs plugin')
}
function onRemove(ctx){
    console.log('removing docs plugin')
}
function onEnable(ctx){
    console.log('enableing docs plugin')
}
function onDisable(ctx){
    console.log('disableing docs plugin')
}

export {
    onDisable,
    onEnable,
    onInstall,
    onRemove,
    onStart,
}