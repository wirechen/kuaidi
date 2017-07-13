/**
 * Created by wirechen on 2017/7/13.
 */
var request = require('request');
let crypto = require('crypto');


//电商ID，快递鸟提供
const EBUSINESS_ID = '1293588';
//电商加密私钥，快递鸟提供
const APP_KEY = '49884e46-6dd9-4e45-b7c1-f444dfd02e8d';
//请求url，快递鸟提供
const REQ_URL = 'http://api.kdniao.cc/Ebusiness/EbusinessOrderHandle.aspx';

/**
 * 调用快递鸟API:查看及时物流信息
 * @param expCode 快递编码
 * @param expNo 快递单号
 * @returns {*|string|string|string}
 */
let kdniao = (expCode, expNo, cb) => {

    const requestData = `{"OrderCode":"","ShipperCode":"${expCode}","LogisticCode":"${expNo}"}`;
    const params = {
        RequestData: requestData, //解决中文乱码
        EBusinessID: EBUSINESS_ID,
        RequestType: '1002',
        DataSign: encrypt(requestData, APP_KEY),
        DataType: '2'
    };

    //发出请求
    new Promise(function (resole, reject) {
        request.post({url: REQ_URL, form: params}, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                resole(body);
            } else {
                reject(body);
            }
        })
    }).then(function (data) {
        cb(data);
    }).catch(function (data) {
        cb(data);
    });

};

/**
 * MD5加密
 * @param str
 * @returns {*}
 */
let md5 = str => {
    let md5 = crypto.createHash('md5');
    md5.update(str);
    const d = md5.digest('hex');
    return d;
};

/**
 * base64编码
 * @param content
 * @param keyValue
 * @returns {string}
 */
let encrypt = (content, keyValue) => {
    keyValue = keyValue || '';
    let buf = new Buffer(md5(content + keyValue));
    return buf.toString('base64');
};

module.exports = kdniao;