const { StatusCodes } = require('http-status-codes')
const CustomeAPIError = require('./custom-api-error')

class UnauthenticateError extends CustomeAPIError {
    constructor (message) {
        super(message)
        this.statusCode = StatusCodes.FORBIDDEN
    }
}

module.exports = UnauthenticateError 