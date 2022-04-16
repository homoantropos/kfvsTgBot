class Message_controller {
    async sendPhoto(req, res) {
        try {

        } catch(error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new Message_controller()
