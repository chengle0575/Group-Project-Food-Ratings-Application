const express = require('express');
const {fetchPlaceDetails} =require('./googlemapAPI.js');
const {openAISummarize} = require('./openaiAPI.js');
const {graphqlServer} =require('./graphQLserver.js');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json()); // This middleware is required to parse JSON bodies
//graphql middleware
graphqlServer.applyMiddleware({app,path:'/reviews'});

app.get('/', (req, res) => {
	res.send('Server is running');
  });


app.post('/summary', async (req,res)=>{ //handle client request
	//using in development
	//let PLACE_ID="ChIJsfvX3fUa2jERoMQytgleoOA";
    //let tags=["cleanness","fast","environment"] //need to get from front-end
	let tags = req.body.tags;
	console.log('Received request:', req.body);
	let PLACE_ID = req.body.placeID;
	console.log('Place_ID:', PLACE_ID);
    
	//get reviews from googlemapAPI
	const placeDetail= await fetchPlaceDetails(PLACE_ID);
	const reviewTexts = handleGmapData(placeDetail); //process data

	//let openai deal 
	const dataToFront= await openAISummarize(reviewTexts,tags);
	console.log('dataToFront:',dataToFront);
	//send back to font
	res.send({review: dataToFront});
})




app.listen(8000, function () {
	console.log('backend started on port 8000');
});


function handleGmapData(placeDetail){

	let reviewTexts=``; //save all review text to pass to openai
    for(i=0;i<4.;i++){ //each time only fetch 5 logs from googlemap
		reviewTexts=`${reviewTexts}${placeDetail.reviews[i].text.text}`;
	}

	console.log(reviewTexts);
	return reviewTexts;
}



