export async function fetchSummary(placeID, tags) {
  try {
    const response = await fetch('http://localhost:8000/summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ placeID, tags })
    });
    const result = await response.json();
    return result;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}


//already tested: method to let user add a new review into local database
export async function AddToDB(data){ //pass in the {id:xxx,name:xxx...}
   
  console.log('this is data',data);
  
  const addLocalReviewQuery=`
        mutation putUserReview($input:InputReview!) { 
                putUserReview(input:$input){
                  id
                }
              }`
 
  const variables={
    input:{
      id:data.id,
      restaurantName:data.restaurantName,
      rateOverall:data.grade,
      text:data.text
    }
  }

  const url='http://localhost:8000/reviews ';
  
  try{
     const reply= await fetch(url,
              {
                method:'POST',
                headers: { 'Content-Type': 'application/json' }, 
                body:JSON.stringify({
                  query:addLocalReviewQuery,
                  variables:variables})
              });
     console.log('reply is',reply);

  }
  catch(e){
    console.log('addToDB failed',e);
  }

 
}