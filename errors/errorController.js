class SendError {
    constructor(AppError, ErrorHandler) {
        this.ErrorHandler = new ErrorHandler(AppError);
    }

    sendErrors = (err, req, res, next) => {
        err.statusCode = err.statusCode || 500;
        err.status = err.status || 'error';

        if(process.env.NODE_ENV === 'development') {
            this.sendDevErrors(err, res);
        } else if(process.env.NODE_ENV === 'production') {
            let error = null;
            if(err.name === 'CastError') error = this.ErrorHandler.handleCastErrorDb({...err});
            if(err.code === 11000) error = this.ErrorHandler.handleDuplicateFields({ ...err, errmsg: err.errmsg })
            if(err.name === 'ValidationError') error = this.ErrorHandler.handleValidationErrorDB({...err, errors: err.errors});
            this.sendProdErrors(error || err, res);
        }
    }

    sendDevErrors = (err, res) => {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
    }

     sendProdErrors = (err, res) => {
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            })
        } else {
            res.status(500).json({
                status: 'error',
                message: 'Something went wrong',
            })
        }
    }
}

module.exports = SendError;
