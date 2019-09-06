let uuid = require('uuid/v4')
module.exports = function() {
    return {
        environment: {},
        taskId: uuid(),
        version: "1.*",
        name: "Azure Key Vault: ITEC-EUWE-KV",
        refName: "",
        enabled: true,
        alwaysRun: false,
        continueOnError: false,
        timeoutInMinutes: 0,
        definitionType: "task",
        overrideInputs: {},
        condition: "succeeded()",
        inputs: {
            ConnectedServiceName: "d57383d3-282b-4da2-8378-d479f6c7516f",
            KeyVaultName: "ITEC-EUWE-KV",
            SecretsFilter: "buadminlocalpassword,kladminlocal,sa-azr-adadm-p,monitoring-sa"
        }
    }
}