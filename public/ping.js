module.exports.handler = async (event, context, cb) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: 'Pong! ' + new Date(),
            },
            null,
            2
        ),
    }

    return response
}
