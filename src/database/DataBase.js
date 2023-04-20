const mysql = require('mysql');

// MySQL 데이터베이스 연결 설정
const connection = mysql.createConnection({
    host: 'localhost', // 데이터베이스 호스트
    user: 'hyngxxob', // 사용자 이름
    password: '!hyngXxob-616', // 비밀번호
    database: 'TP_MENU_SELECTOR' // 데이터베이스 이름
});

// MySQL 데이터베이스 연결
connection.connect((error) => {
if (error) {
    console.error('MySQL 데이터베이스 연결 실패:', error);
} else {
    console.log('MySQL 데이터베이스 연결 성공');
}
});