module.exports = function (request) {
    let vmArray = generateVMArray(request)
    return {
        "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentParameters.json#",
        "contentVersion": "0.0.0.1",
        "parameters": {
            "vm-Project": {"value":request.globalParams.Project},
            "vm-AppName": {"value":request.globalParams.AppName},
            "vm-TypeEnv": {"value":request.globalParams.Environment[0]},
            "vm-Array": {
                "value": vmArray
            }
        }
    }
}

function generateVMArray(request) {
    let incrementMap = {}
    let output =[]
    request.vmArray.forEach(vm=>{
        outVM = vm
        if(incrementMap[vm.appcode+vm.typecode]==undefined) {
            incrementMap[vm.appcode+vm.typecode] = 1
        }
        //Convert 1 to "01" and 10 to "10"
        outVM.Increment = ("0" + incrementMap[vm.appcode+vm.typecode]++).slice(-2)
        //Implement auto password generators
        outVM.adminPasswordOrSSHKey = "asd!@#ddssca"
        outVM.ReservedIp = "static"
        output.push(vm)
    })

    return output
}