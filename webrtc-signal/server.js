const fs = require('fs')
const https = require('https')
const express = require('express')
const app = express()

const key = fs.readFileSync('./cert/cert.key')
const cert = fs.readFileSync('./cert/cert.crt')    

const secureExpressServer = https.createServer({key,cert},app)
secureExpressServer.listen(9000)
