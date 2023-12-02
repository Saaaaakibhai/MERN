const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.status(200).json({
    massage: 'hello Allahu akbar , it is the hi from server side',
    app: 'natours',
  });
});
app.post('/', (req, res) => {
  res.send('it is the post and endponint bro');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is running alhamdulillah ${port}...`);
});
