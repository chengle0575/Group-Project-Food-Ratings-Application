
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; 
const client=new MongoClient(url,{ useNewUrlParser: true ,  useUnifiedTopology: true });


async function getDatabase(){
    try{
        await client.connect();   
        //create a db named ...
        let db=client.db('5007Project');
        //init db
        db.collection('localreview').deleteMany({})  
        db.collection('localreview').insertOne({"id" : "abcd", "restaurantName" : "bbq", "rateOverall" : 3, "tex" : "Not too bad"})

        console.log("db is ready")
      
        return db;
    }
    catch(e){
        console.log(e);
    }
}

module.exports={getDatabase}

//dev test
//getDatabase();
