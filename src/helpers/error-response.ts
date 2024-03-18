/**
 * @description Ensures consistency in error response returned
 */
class ApplicationError extends Error {
    status: number
    errors: object
    constructor(
        status = 500,
        message = 'Sorry, an error occurred',
        errors = {}
    ) {
        super(message)
        this.status = status
        this.errors = errors
    }
}

export default ApplicationError