class CustomeAPIError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = CustomeAPIError;