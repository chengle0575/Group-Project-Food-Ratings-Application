
const fetch=require('node-fetch');

const url = 'https://api.openai.com/v1/chat/completions'; //connceting to openai



async function openAISummarize(reviewcontent,tags,variables={}) {
	const apiKey = '*****'; // Use environment variable for API key, this is invalid key here
	const model = 'gpt-3.5-turbo'; // Specify the model you want to use

	//const tags=tags;

	console.log('this is reviewcontente!!!',reviewcontent);
	console.log('this is tags',tags);

	const query = [
		{ role: 'system', 
		  content: `Quote all supporting details from the reviews and focus on ${tags.join(',')} sections.
		  If the keywords used as criteria do not appear, say no found and provide all supporting details based on similar meanings and tell the similar words used to replace.
		  Each sentence should have no special character.
		  The supporting details and grade should organised by criteria.
		  Firsty give the overall grade based on all information input and following by a short summary about why. The grade should be a number withn 0 to 5. 
		  The overall grade and summary must be generated, if the focus cannot be found in the input, give summary and grade based on review input.
		  Then give the Positive evidence of comments, it should be grouped by tags.
		  Lastly, give the Negative evidence of comments, it should be grouped by tags.
		  The answer should be structured strickly with key words 'grade', 'summary', 'positive evidence', and 'negative evidence' none of key wors should be capitaled.
		  If no information can be summarised, in each section should include 'not enough inforamtion can be found'`},
		{ role: 'user', content: reviewcontent}
	];

	//need to dajust the return of openai
	//should return: 
	//claenness: grade:4/5, 'suporting details'
	//value of money: grade:3/5, 'supporting details'
	//fast: not found . similar:quick, 'supporting details'



	const response = await fetch(url, {
	method: 'Post',
	headers: {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${apiKey}` // Use the API key in Authorization header
	  },
	body: JSON.stringify({
		model: model,
		messages: query, // Ensure your query variable has the data you want to send
		//variables: {},
	}),
  });
  if (!response.ok){
	throw new Error(`Network response was not ok: ${response.status}`);
  }

  const resultjson = await response.json();
  console.log(resultjson.choices[0].message);
  return resultjson.choices[0].message.content;;

}




module.exports={ openAISummarize };
