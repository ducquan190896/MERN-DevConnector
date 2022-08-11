export const errorHandler = async (err, req, res, next) => {

    const statuscode = res.statusCode === 200 ? 500 : res.statusCode
    console.log(err.stack)
    res.status(statuscode).json({
        error: err.message,
        stack: err.stack
    })

}

export const notFound = async ( req, res, next) => {
    const error = new Error('the api not found')
    res.status(404)
    next(error)
}