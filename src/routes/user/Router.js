const express     = require('express');
const router      = express.Router();

// controller
const controller  = require('../../controller/user/indexController');

/** 회원 가입 */
// router.post('/signUp'       , controller.);

/** 로그인  */
router.get('/isTest'       , controller.onSearch);

module.exports = router;
