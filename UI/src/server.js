const express = require('express');
const path = require('path');

const app = express();
//app.use(express.static('public'));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
  });

app.listen(3000, () => console.log('App started on port 3000'));

/*
( function () {
  try {
    app.listen(3000, function () {
      console.log('App started on port 3000');
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();
*/