class User_controller {

    async createUser( req, res) {
        try {
            res.status(200).json({
                message: 'Successfully created'
            })
        } catch(error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

}

module.exports = new User_controller()
