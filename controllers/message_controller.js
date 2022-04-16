const path = require('path');

class Message_controller {
    async sendPhoto(req, res) {
        try {
            const filePath = path.resolve('views', 'sendPhotoForm.html');
            res.status(200).sendFile(filePath);
        } catch(error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new Message_controller()
