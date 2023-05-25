const { StatusCodes } = require('http-status-codes')
const CustomeAPIError = require('./custom-api-error')

class NotFound extends CustomeAPIError {
    constructor(message) {
        super(message)

        this.statusCode = StatusCodes.NOT_FOUND
    }
}

module.exports = NotFound