/** config file 위치 지정 설정 */
require('dotenv').config(({path : (__dirname + '/config/.env')}));

const express = require('express');
const app = express();
const ejs = require("ejs");
// const routes = require("./routes");      /** router  모듈 사용  */


// app.use(routes);

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server listening on port ${process.env.SERVER_PORT}`);
});