/**
 *  사용자 관련 요청 컨트롤러
 *  @module       controller/user/indexController
 *  @author       HYUNGSEUBKIM
 *  @version      1.0
*/

// 공통 라이브러리
const Logger                            = require('../../lib/logger');
const JWT                               = require('../../lib/jwt');
const Util                              = require('../../lib/util');

// jwt에 사용할 토큰 object
const PayloadData                       = require('../../common/PayloadData');

// 요청, 응답 데이터
const RequestData                       = require('../../common/RequestData');
const ResponseData                      = require('../../common/ResponseData');

// 상수
const {DB_FIELD_NAME}                   = require('../../common/Constant');
const { RESPONSE_CODE, RESPONSE_FIELD } = require('../../common/ResponseConst');
// 모델
const UserModel = require('../../model/Model');

/**
 * 데이터 조회
 * @param {Object} req Express Request 객체
 * @param {Object} res Express Response 객체
 * @returns {ResponseData} 응답 데이터
 */
const onSearch = async(req,res) => {
  /**  요청 데이터  */
  let   requestData     =  new RequestData(req);

  /**  응답 데이터  */
  let   responseData    =  new ResponseData(requestData);

  try {
    let test = await UserModel.searchMenu(requestData);
  }
  catch (e) {
    Logger.error(e.stack);
    /** 트랜잭션 롤백  */
    await requestData.error();
    responseData.setResponseCode(RESPONSE_CODE.CONTACT_ADMIN);
  }
  finally {
    /** 트랜잭션 종료 */
    await requestData.end(responseData.isSuccess());
    /** 데이터 응답 */
    res.send(responseData);
  }
};

module.exports = {
  onSearch
};