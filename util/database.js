const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://aarsh:nohaark@cluster0.wfbzx.mongodb.net/shop?retryWrites=true&w=majority', {useUnifiedTopology: true })
        .then(client => {
            _db = client.db();
            console.log('connected');
        callback();
    }).catch(err => { console.log(err); });
    
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database';
}
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;