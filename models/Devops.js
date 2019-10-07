const azdev = require('azure-devops-node-api')
const axios = require('axios')

let orgUrl = "https://dev.azure.com/edenred-hq-azure"
let token = process.env.TOKEN || "mu2if7hgyu3apuqg6pi5dlhr2xtzrgzus73kfkyugotugz4umoeq"
let b64token = getB64(`:${token}`)

let project = {
    name: "Azure",
    id: "f638f8ea-d1f1-46a3-a759-3100707b072c"
}

const cclient = axios.create({
    baseURL: `${orgUrl}/${project.name}/_apis`,
    headers: { 'Authorization': `Basic ${b64token}` }
})

let authHandler = azdev.getPersonalAccessTokenHandler(token);
let connection = new azdev.WebApi(orgUrl, authHandler);

function getB64(str) {
    let buff = Buffer.from(str)
    return buff.toString("base64")
}

module.exports = class DevOpsClient {
    constructor(spokeName, scendpoint = "/serviceendpoint/endpoints?api-version=5.1-preview.2") {
        this.project = project
        this.scendpoint = scendpoint
        this.spokeName = spokeName
        this.devopsConnection = connection
        this.customClient = cclient
    }

    // constructor(spokeName, hubName, scendpoint = "/serviceendpoint/endpoints?api-version=5.1-preview.2") {
    //     this.project = project
    //     this.scendpoint = scendpoint
    //     this.spokeName = spokeName
    //     this.hubName = hubName
    //     this.devopsConnection = connection
    //     this.customClient = cclient
    // }

    async getServiceConnections(spoke = this.spokeName, hub = this.hubName) {
        let sc = await this._getServiceConnectionIDBySubscriptionName(spoke)
        if (hub !== undefined) {
            let hc = await this._getServiceConnectionIDBySubscriptionName(hub)
            return {
                spoke: sc,
                hub: hc
            }
        }
        else return {
            spoke: sc
        }
    }

    async getVariableGroups(spoke = this.spokeName, hub = this.hubName) {
        let sv = await this._getVariableGroupIDBySubscriptionName(spoke)
        // let hv = await this._getVariableGroupIDBySubscriptionName(hub)
        return {
            spoke: sv
            // hub: hv
        }
    }

    async _getServiceConnectionIDBySubscriptionName(subName) {
        try {
            let res = await this.customClient.get(this.scendpoint)
            let serviceConnections = res.data.value
            let serviceConnection = serviceConnections.filter(sc => {
                return sc.data.subscriptionName == subName
            })
            if (serviceConnection.length == 0)
                return null
            else
                return serviceConnection[0].id
        }
        catch (e) {
            console.log(e)
        }
    }

    async _getVariableGroupIDBySubscriptionName(subName) {
        try {
            let ta = await this.devopsConnection.getTaskAgentApi()
            let groups = await ta.getVariableGroups(this.project.name)
            let group = groups.filter(g => {
                return g.name.indexOf(subName) > -1
            })
            return group[0].id
        }
        catch (e) {
            console.log(e)
        }
    }
}