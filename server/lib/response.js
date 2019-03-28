const { liftA } = require('@cullylarson/f')

const responseFromValidationResult = (validationResult) => {
    return {
        validation: {
            errors: validationResult.errors,
            paramErrors: validationResult.paramErrors,
        },
    }
}

const responseError = (messages) => {
    return {
        errors: liftA(messages),
    }
}

module.exports = {
    responseFromValidationResult,
    responseError,
}
