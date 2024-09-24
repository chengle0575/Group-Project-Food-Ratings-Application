const fs = require('fs');
//use apolloServer
const { ApolloServer, UserInputError } = require('apollo-server-express');

//use db from mongoCLient
const {getDatabase} = require('./mongoClient.js');

//get db
let db;

(async()=>{
    db = await getDatabase();
    //console.log(db.collection('localreview').find({id:1}).toArray());
   // fetchLocalReviews(1);
})();


const resolvers = {
  Query: {
    fetchLocalReviews,
  },
  Mutation: {
    putUserReview,
    sendPlaceID: async (_, { placeID }) => {
      console.log('Received placeID:', placeID);

      // Add your logic for handling the placeID here.
      // For example, you might want to save the placeID to your database.

      // Return a response. This is just a placeholder - you should replace this with your own logic.
      return {
        success: true,
        message: 'Successfully received placeID',
      };
    },
  },
};



const graphqlServer= new ApolloServer({
    //graphQL need type definition and resolvers
    typeDefs:fs.readFileSync('./server/schema.graphql','utf-8'), 
    resolvers, //state its resolver

    formatError: error => { //error handle
        console.log(error);
        return error;
      },
});



//resolvers functions
async function fetchLocalReviews(_,args){ 
    console.log('this is id',args.id);
    let reviews= await db.collection('localreview').find({id:args.id}).toArray();

    return reviews //return [reviews]

}


async function putUserReview(_,args){
    try{
        await db.collection('localreview').insertOne({id:args.input.id, restaurantName:args.input.restaurantName, rateOverall:args.input.rateOverall,tex:args.input.text});
       
        return args.input;
    }
    catch(e){
        console.log(e);
        return false;
    }
}

module.exports={graphqlServer};