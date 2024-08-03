const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://watch-database1.p.rapidapi.com/all-brands',
  headers: {
    'x-rapidapi-key': 'e5cbf121a4msh0ca9e01edb3d80fp1a6d7cjsn6671341be626',
    'x-rapidapi-host': 'watch-database1.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}