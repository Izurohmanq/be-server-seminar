const { StatusCodes } = require('http-status-codes')
const CustomeAPIError = require('./custom-api-error')

class UnauthorizedError extends CustomeAPIError {
    constructor (message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthorizedError