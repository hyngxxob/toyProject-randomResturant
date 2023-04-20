/**
 *  사용자 데이터 처리
 *  @module       model/Model
 *  @author       HYUNGSEUBKIM
 *  @version      1.0
 */

const Logger            = require('../lib/logger');

// myBatis
const Query             = require('../database/Mybatis');

/**
 *  사용자 입력
 * @description 사용자 정보로 회원 가입 처리
 * @param {RequestData} requestData 요청 데이터
 * @returns {boolean} 성공 여부
 */
const searchMenu = async (requestData) => {

    try {
      /**  입력받은 정보    */
    //   const userID    = requestData.getBodyValue(DB_FIELD_NAME.USER_ID);
    //   const password  = requestData.getBodyValue(DB_FIELD_NAME.PASSWORD);
    //   const userName  = requestData.getBodyValue(DB_FIELD_NAME.USER_NAME);
    //   const userEmail  = requestData.getBodyValue(DB_FIELD_NAME.USER_EMAIL);
    //   const userPhoneNum  = requestData.getBodyValue(DB_FIELD_NAME.USER_PHONENUM);
    //   const createDate  = requestData.getBodyValue(DB_FIELD_NAME.CREATE_DATE);
    //   const salt      = requestData.getBodyValue(DB_FIELD_NAME.SALT);
  
      /** SQL parameter   */
    //   const params = {
    //     [DB_FIELD_NAME.USER_ID]   : userID,
    //     [DB_FIELD_NAME.PASSWORD]  : password,
    //     [DB_FIELD_NAME.USER_NAME] : userName,
    //     [DB_FIELD_NAME.USER_EMAIL] : userEmail,
    //     [DB_FIELD_NAME.USER_PHONENUM] : userPhoneNum,
    //     [DB_FIELD_NAME.CREATE_DATE] : createDate,
    //     [DB_FIELD_NAME.SALT]      : salt,
    //   };
  
      /**  connection 객체  */
      const connection = requestData.getConnection();
  
      /**  query 문장       */
      const statement = Query('USER','dbSearch');
      // const res = await connection.query(statement);
      const res = await connection.exec(statement);
  
      // return res[DB_RESULT.ROW_FIRST][DB_RESULT.AFFECTED_ROWS] === DB_RESULT.ONE;
      return 0;
    }
    catch (e) {
      Logger.error(e.stack);
      throw e;
    }
  };

  module.exports = {
    searchMenu
  };