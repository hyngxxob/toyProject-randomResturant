const jwt = require('jsonwebtoken');
const RequestData = require("../common/RequestData");
const ResponseData = require("../common/ResponseData");
const {DATA_FIELD_NAME} = require("../common/Constant");
const {RESPONSE_CODE} = require("../common/ResponseConst");

/**
 * namespace lib
 * property {module:lib/jwt} jwt - jwt library
 */

/**
 *  jwt library
 *  module       lib/jwt
 *  author       HYUNGSEUBKIM
 *  version      1.0, 작업 내용
 */

/**
 * JWT 토큰 값으로 생성 함수
 * @description 헤터에 토큰 값을 찾아서 검증 후 응답
 * @param {Object} payload token 의 payload 에 해당하는 객체
 * @returns {string} jwt 토큰
 */
const getJWTToken = (payload) => {

  /** jwt 토큰 생성 */
  const token = jwt.sign(
    {
      data:payload
    },
    process.env.SECRET_KEY,
    {
    expiresIn : process.env.EXPIRE_MIN  ,
    issuer    : process.env.ISSUER     ,
    });

  return token;
}

/**
 * JWT 토큰 값으로 decode 된 객체를 구하는 함수
 * @description 헤터에 토큰 값을 찾아서 검증 후 응답
 * @param {Object} req HTTP 요청 객체
 * @returns {ResponseData} 응답 데이터
 */
const getPayload = (req) => {

  // 요청 데이터
  const requestData   = new RequestData(req.headers);
  // 응답 데이터
  const responseData  = new ResponseData();

  /**  header에서  authorization 데이터 존재 여부 체크  */
  if ( req.headers.hasOwnProperty(DATA_FIELD_NAME.AUTHORIZATION)){

    // 토큰 (req.headers.authorization)
    let authorization = req.headers[DATA_FIELD_NAME.AUTHORIZATION];

    // Bearer 명시 되어 있으면
    const pos = authorization.indexOf(DATA_FIELD_NAME.BEARER);
    if(pos === 0){
      authorization = authorization.substring(DATA_FIELD_NAME.BEARER.length, authorization.length);
    }

    try {
      // 토큰을 키를 사용하여 decode
      const payload = jwt.verify(authorization, process.env.SECRET_KEY);

      // 정상적으로 decode 된 데이터 설정
      // responseData.setDataValue(DATA_FIELD_NAME.PAYLOAD, payload[DATA_FIELD_NAME.DATA]);
      responseData.setDataValue(DATA_FIELD_NAME.PAYLOAD, payload);
      
    }
    /** error 구간  */
    catch (error) {
      // token expired
      if (error.message === 'jwt expired') {
        responseData.setResponseCode(RESPONSE_CODE.TOKEN_EXPIRED);
      }
      else if (error.name === 'invalid token') {
        responseData.setResponseCode(RESPONSE_CODE.INVALID_TOKEN)
      }
      else {
        responseData.setResponseCode(RESPONSE_CODE.VERIFY_TOKEN_FAIL);
      }
    }
  }
  /**  header 의 authorization 존재하지 않을 때  */
  else {
    responseData.setResponseCode(RESPONSE_CODE.NO_TOKEN);
  }
  return responseData;
}

module.exports = {
  getJWTToken   ,
  getPayload    ,
};