exports.getBaseUrl = (request) => {
    return (request.connection && request.connection.encrypted ? 
        "https":"http")
            + `://${request.header.host}`}