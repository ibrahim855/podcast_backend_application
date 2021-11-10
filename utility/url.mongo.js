
module.exports = `mongodb+srv://${process.env.DB_USERNAME}
:${process.env.DB_PASSWORD}@cluster0.dtnfd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;