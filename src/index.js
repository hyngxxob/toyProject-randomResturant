/** config file 위치 지정 설정 */
require('dotenv').config(({path : (__dirname + '/config/.env')}));

const express = require('express');
const app = express();
const cors = require('cors');          /* cors 모듈 사용 */
const routes = require("./routes");      /** router  모듈 사용  */
const ejs = require("ejs");
const mysql = require("mysql");
const corsOptions = {
  origin : true,
  credentials : true
};

const PreInterceptor  = require('./middleware/PreInterceptor');
const PostInterceptor = require('./middleware/PostInterceptor');


// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });
// app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(cors(corsOptions));

/** express 에서 JSON Request Body parsing  */
app.use(express.json());

/** 전처리 interceptor */
app.use(PreInterceptor);

/** 후처리 interceptor */
app.use(PostInterceptor);

app.get('/', (req, res) => {
    res.render('index');
})
app.use(routes);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server listening on port ${process.env.SERVER_PORT}`);
});