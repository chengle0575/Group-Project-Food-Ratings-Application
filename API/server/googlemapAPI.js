const fetch=require('node-fetch');

let APIKEY='***this is invalid key';

let query='fields=id,displayName,reviews.relativePublishTimeDescription,reviews.rating,reviews.text.text' //specify field to get 
	


//connecting to Googlemap api
async function fetchPlaceDetails(PLACE_ID){

    urlTarget=`https://places.googleapis.com/v1/places/${PLACE_ID}?${query}&key=${APIKEY}`

	const response= await fetch(urlTarget);
	console.log("this is response,",JSON.stringify(response));
	const placeDetail = await response.json(); //change to json to js obj array
	
	return placeDetail //is an js object
}



module.exports={fetchPlaceDetails};
