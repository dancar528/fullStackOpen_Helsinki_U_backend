require('dotenv').config()

let MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT

if (process.env.NODE_ENV === 'test') {
    MONGO_URL = process.env.TEST_MONGODB_URI
}

module.exports = {
    MONGO_URL,
    PORT
}