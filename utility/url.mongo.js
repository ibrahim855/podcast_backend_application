const MODE = 'production';



module.exports = `mongodb+srv://${process.env.DB_USERNAME}
:${process.env.DB_PASSWORD}@cluster0.dtnfd.mongodb.net/${
  MODE === 'production' ? process.env.DB_NAME : process.env.DB_NAME_DEV
}?retryWrites=true&w=majority`;