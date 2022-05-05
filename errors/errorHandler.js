class ErrorHandler {
    constructor(AppError) {
        this.AppError = AppError;
    }

    handleCastErrorDb = err => {
        const message = `Invalid  ${err.path}: ${err.value}`
        return new this.AppError(message, 400)
    }

    handleDuplicateFields = err => {
        const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
        const message = `Duplicate field value: ${value}  Please use another value`
        return new this.AppError(message, 400)
    }

    handleValidationErrorDB = err => {
        const message = 'Invalid input data'
        return new this.AppError(message, 400)
    }
}

module.exports = ErrorHandler;
