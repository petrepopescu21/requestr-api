module.exports = function (request) {
    let vmArray = generateVMArray(request)
    return {
        "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentParameters.json#",
        "contentVersion": "0.0.0.1",
        "parameters": {
            "vm-Project": { "value": request.globalParams.Project },
            "vm-TypeEnv": { "value": request.globalParams.Environment[0] },
            "vm-Array": {
                "value": vmArray
            }
        }
    }
}

function generateVMArray(request) {
    let incrementMap = {}
    let output = []
    request.vmArray.forEach(vm => {
        if (incrementMap[vm.AppCode + vm.TypeCode] == undefined) {
            incrementMap[vm.AppCode + vm.TypeCode] = 1
        }

        //Convert 1 to "01" and 10 to "10"
        vm.Increment = ("0" + incrementMap[vm.AppCode + vm.TypeCode]++).slice(-2)

        //Add handlers for lanet vs asnet
        vm.ADCodeDomain = vm.Internet === true ? "w" : "l"
        //Set subnetcode for generating subnet name in master template
        if (vm.Internet == true || vm.TypeCode == "web")
            vm.SubnetCode = "web"
        else if (vm.TypeCode == "db")
            vm.SubnetCode = "db"
        else
            vm.SubnetCode = "app"

        //Set osdisktype and disktype based on environment
        vm.OSDiskType =
            request.globalParams.Environment == "production"
                ? "StandardSSD_LRS"
                : "Standard_LRS"

        if (vm.DiskArray !== undefined) {
            vm.DiskArray.forEach(disk => {
                disk.diskType =
                    request.globalParams.Environment == "production"
                        ? "StandardSSD_LRS"
                        : "Standard_LRS";
            });
        }

        //Implement auto password generators
        vm.adminPasswordOrSSHKey = "asd!@#ddssca"
        vm.ReservedIP = "dynamic"

        delete (vm.Internet)

        output.push(vm)
    })

    return output
}