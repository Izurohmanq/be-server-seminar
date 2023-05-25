const CustomeAPIError = require('./custom-api-error')
const Badrequest = require('./bad-request')
const NotFound = require('./not-found')
const UnauthorizedError = require('./unauthorizedError')
const UnauthenticateError = require('./unauthenticate')

module.exports = {
    CustomeAPIError,
    Badrequest,
    NotFound,
    UnauthenticateError,
    UnauthorizedError
}
