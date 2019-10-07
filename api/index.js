const Router = require('koa-router')
const api = new Router()
const axios = require('axios')
const Params = require('../templatePartials/parameters')
const Devops = require('../models/Devops')


api.prefix('/api')
api.post('/request', async (ctx)=>{
    try {
        // ctx.body = Params(ctx.request.body)
        let suscription = ctx.request.body.globalParams.Subscription
        let devopsClient = new Devops(subscription)
        let serviceConnections = await devopsClient.getServiceConnections()
        let variableGroups = await devopsClient.getVariableGroups()
        ctx.body = "done"
    }
    catch(err) {
        console.log(err)
        ctx.status=400
        ctx.body="Bad Request"
    }
})

module.exports = api