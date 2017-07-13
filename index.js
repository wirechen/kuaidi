/**
 * Created by wirechen on 2017/7/13.
 */

var fs = require('fs');
var kdniao = require('./kdniao');



/**
 * 查询快递编码
 * @param expName 快递名称
 * @returns {string}
 */
let getCode = (expName) => {

    let file = __dirname + '/config/kuaidi_code.json';
    let data = JSON.parse(fs.readFileSync(file));

    return data[expName] ? data[expName].编码 : '';

};


let query = (expName, expNo) => {

    //1.查询快递编码
    let expCode = getCode(expName);

    //2.查询物流跟踪信息
    kdniao(expCode, expNo, function (res) {
        console.log(res);
    });

};

query('百世快递', '70000736265159');