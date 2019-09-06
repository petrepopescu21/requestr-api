let uuid = require('uuid/v4')

module.exports = function(region, connectionID) {
    return {
        environment: {},
        taskId: uuid(),
        version: "2.*",
        name: "VM",
        refName: "",
        enabled: true,
        alwaysRun: false,
        continueOnError: false,
        timeoutInMinutes: 0,
        definitionType: "task",
        overrideInputs: {},
        condition: "succeeded()",
        inputs: {
            ConnectedServiceName: connectionID,
            action: "Create Or Update Resource Group",
            resourceGroupName: "$(resourceGroup-Name)",
            location: region,
            templateLocation: "Linked artifact",
            csmFileLink: "",
            csmParametersFileLink: "",
            csmFile: "$(System.DefaultWorkingDirectory)/_VM/drop/VM-deploy.json",
            csmParametersFile: "",
            overrideParameters: "-vm-klAdminLocalPassword $(kladminlocal) -vm-buAdminLocalPassword $(buadminlocalpassword) -vm-DomainAdminPassword $(sa-azr-adadm-p) -vm-MonitoringAdminLocalPassword $(monitoring-sa) -vm-AutomationAccountName $(automationAccountName) -entity-Code $(entity-Code) -country-Code $(country-Code) -vm-diagStorageResourceGroup $(vm-diagStorageResourceGroup) -vm-diagStorageName $(vm-diagStorageName) -vm-vNetResourceGroup $(vm-VnetResourceGroup) -vm-vNetName $(vm-vNetName) -vm-SubnetName $(vm-SubnetName) -vm-adminPasswordOrSSHKey \"$(vm-AdminPassword)\" -vm-Size $(vm-Size) -vm-DiskArray $(vm-DiskArray) -vm-OS $(vm-OS) -vm-OSDiskType $(vm-OSDiskType) -vm-Project $(vm-Project) -vm-Function $(vm-Function) -vault-Name $(vault-Name) -vault-RGName $(vault-RGName) -workspace-Name $(workspace-Name) -workspace-SubId $(hub-SubId) -workspace-ResourceGroup $(workspace-ResourceGroup) -vm-ADCodeDomain $(vm-ADCodeDomain) -vm-AppCode $(vm-AppCode) -vm-TypeCode $(vm-TypeCode) -vm-TypeEnv $(vm-TypeEnv) -vm-Increment $(vm-Increment) -vm-ReservedIP $(vm-ReservedIP) -sas-URI $(sas-URI) -sas-Token $(sas-Token)",
            deploymentMode: "Incremental",
            enableDeploymentPrerequisites: "None",
            deploymentGroupEndpoint: "",
            project: "",
            deploymentGroupName: "",
            copyAzureVMTags: "true",
            runAgentServiceAsUser: "false",
            userName: "",
            password: "",
            outputVariable: "",
            deploymentName: "",
            deploymentOutputs: "",
            addSpnToEnvironment: "false"
        }
    }
}