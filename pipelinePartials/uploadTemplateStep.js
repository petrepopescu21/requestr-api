let uuid = require("uuid/v4")
module.exports = function(connectionID = "f02005aa-bc1b-489a-89e4-f936be1d71fd") {
    return {
        environment: {},
        taskId: uuid(),
        version: "2.*",
        name: "Upload All Templates files",
        refName: "",
        enabled: true,
        alwaysRun: false,
        continueOnError: false,
        timeoutInMinutes: 0,
        definitionType: "task",
        overrideInputs: {},
        condition: "succeeded()",
        inputs: {
            SourcePath: "$(System.DefaultWorkingDirectory)/_VM/drop",
            ConnectedServiceNameSelector: "ConnectedServiceNameARM",
            ConnectedServiceName: "",
            ConnectedServiceNameARM: connectionID,
            Destination: "AzureBlob",
            StorageAccount: "",
            StorageAccountRM: "$(vm-diagStorageName)",
            ContainerName: "templates",
            BlobPrefix: "$(resourceGroup-Name)",
            EnvironmentName: "",
            EnvironmentNameRM: "",
            ResourceFilteringMethod: "machineNames",
            MachineNames: "",
            vmsAdminUserName: "",
            vmsAdminPassword: "",
            TargetPath: "",
            AdditionalArgumentsForBlobCopy: "",
            AdditionalArgumentsForVMCopy: "",
            enableCopyPrerequisites: "false",
            CopyFilesInParallel: "true",
            CleanTargetBeforeCopy: "false",
            skipCACheck: "true",
            outputStorageUri: "sas-URI",
            outputStorageContainerSasToken: "sas-Token"
        }
    }
}