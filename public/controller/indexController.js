/**
 *  사용자 관련 요청 컨트롤러
 *  @module       public/controller/indexController
 *  @author       HYUNGSEUBKIM
 *  @version      1.0
*/

// 모델
const UserModel = require('../../src/model/Model');

// 요청, 응답 데이터
const RequestData                       = require('../../common/RequestData');

/**
 * 데이터 조회
 * @param {Object} req Express Request 객체
 * @param {Object} res Express Response 객체
 * @returns {ResponseData} 응답 데이터
 */
const onSearch = async(req,res) => {
  alert("clicked");
  /**  요청 데이터  */
  let   requestData     =  new RequestData(req);

  let test = await UserModel.searchMenu(requestData);
}

module.exports = onSearch;