const {envs, security} = require('../lib');
module.exports = {
    handleFinalResponse(data, req, res, next) {
        if(data && data.error) {
            // This is just for a fail safe test.
            // This will never get called
            return res.status(500).send(data);
        }
        const message = data.message || 'Success';
        delete data['message'];
        let finalData = data;
        if(req.appData) {
            if(typeof data ==='object' && Array.isArray(data)) {
                finalData = {modelData: data};
            }
            if(envs.encryptAppResponse()) {
                finalData = security.encryptResponseData(JSON.stringify(finalData), req.appData.secretKey, req.appData.apiKey);
            }
        }
        let response = {
            error: false,
            status: 200,
            message: message,
            data: finalData,
        };
        if(envs.useEncryptedPipe()) {
            response = security.encryptAES(JSON.stringify(response));
        }
        res.status(200).send(response);
    }
}