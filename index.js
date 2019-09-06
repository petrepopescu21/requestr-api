let Devops = require('./models/Devops')
let Params = require('./templatePartials/parameters')
const fs = require('fs')
let sampleReq = require('./request.json')
let subName = sampleReq.globalParams.subName
let hubName = sampleReq.globalParams.hubName


let d = new Devops(subName, hubName)

async function init() {
    //Get connections
    let subcids = await d.getServiceConnections()
    console.log(subcids)
    //Get variable groups
    let vargids = await d.getVariableGroups()
    console.log(vargids)
}

async function test() {
    let subcids = {
        spoke: '2addb208-1de4-4ddb-8315-01590ae455b0',
        hub: '7139056c-83a3-44f1-8524-93eaa6c8b56b'
    }
    let vargids = { spoke: 57, hub: 8 }
    let parametersFile = Params(sampleReq)
    console.log(parametersFile)
    fs.writeFile('./templates/parameters.json',JSON.stringify(parametersFile),function(err){
        if(err)
        console.log(err)
    })
}
// async function run() {
//     let rel = await connection.getReleaseApi()
//     // let defs = await rel.getReleaseDefinitions(project)
//     // defs.forEach(def=>{
//     //     // console.log(`${def.name}: ${def.id}`)
//     // })
//     let vmRef = await rel.getReleaseDefinition(project.name, 15)
//     console.log(vmRef)
// }

test()


