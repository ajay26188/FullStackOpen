require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const TEST_MONGODB_URI = process.env.TEST_MONGODB_URI

module.exports = {MONGODB_URI, PORT,TEST_MONGODB_URI}