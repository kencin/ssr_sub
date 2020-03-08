const fs = require("fs");
const request = require('request');
const util = require('util');
const sub_json = "data/subscription.json";

// logger.error('warp nacelles offline');
// logger.info('shields at 99%');

function read(dir){
    return new Promise(((resolve, reject) => {
        fs.stat(dir, async function (err, stats) {
            if(!stats) await write(dir, "{}");
            else {
                fs.readFile(dir, 'utf-8', ((err, data) => {
                    if(err){
                        reject(console.log(err))
                    }else {
                        resolve(data)
                    }
                }));
            }

        });
    }))
}

function write(filename, write_data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, write_data, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve()
        });
    })
}

function get_url_content(url){
    return new Promise(((resolve, reject) => {
        request.get(url, (err, response, body) => {
            if(err){
                reject(err);
            }else {
                resolve(body)
            }
        })
    }))
}


// 获取全部的订阅链接和订阅名称
exports.get_all_subs_link = async function (req, res) {
    // console.log("获取全部的订阅链接和订阅名称");
    // console.log(req.ip, req.method, req.url, req.originalUrl, req.headers["user-agent"]);
    let result = await read("data/subscription.json");
    result = JSON.parse(result);
    let send_text = "";
    for (let [key, value] of Object.entries(result)) {
        send_text += util.format("名称 %s: &nbsp订阅链接 %s <br>", key, value);
    }
    res.status(200).send(send_text);
};

// 根据订阅名称获得订阅链接
exports.get_sub_link_by_name = async function (req, res){
    // console.log("根据订阅名称获得订阅链接");
    let result = JSON.parse(await read(sub_json));
    let subid = req.params.subid.toUpperCase();
    if(result.hasOwnProperty(subid)){
        res.status(200).send(result[subid])
    }else {
        res.status(404).send("订阅名称不存在")
    }
};

// 根据订阅名称修改订阅链接
exports.modify_sub_link_by_name = async function (req, res) {
    /*
    req.params.subid:   订阅名称
    req.body.url:    订阅链接

    request：
        http://host/sub_link/:subid
            body(urlencoded):
                url:  sub_url
     */
    let subid = req.params.subid.toUpperCase();
    // console.log("根据订阅名称修改订阅链接");
    // console.log("要修改的订阅名称 %s，要修改的订阅链接: %s", subid, req.body.url);
    let result = JSON.parse(await read(sub_json));

    if(result.hasOwnProperty(subid)){
        result[subid] = req.body.url;
        await write(sub_json, JSON.stringify(result, null, 4));
        res.status(200).send(util.format("修改 %s 订阅链接为 %s 成功", subid, req.body.url))
    }else {
        res.status(404).send("订阅名称不存在")
    }
};

// 根据订阅名称删除订阅链接
exports.delete_sub_link_by_name = async function (req, res) {
    let subid = req.params.subid.toUpperCase();
    // console.log("根据订阅名称删除订阅链接");
    // console.log("要删除的订阅名称 %s", subid);
    let result = JSON.parse(await read(sub_json));

    if(result.hasOwnProperty(subid)){
        delete result[subid];
        await write(sub_json, JSON.stringify(result, null, 4));
        res.status(200).send(util.format("删除 %s 订阅链接成功", subid))
    }else {
        res.status(404).send("订阅名称不存在")
    }
};

// 添加新的订阅链接
exports.add_sub_link = async function (req, res) {
    /*
    POST:
        name: sub_name
        url: sub_url
     */
    if (!req.body.hasOwnProperty("name") && !req.body.hasOwnProperty("url")){
        res.status(404).send("请检查post参数正确与否")
    }
    let sub_name = req.body["name"].toUpperCase();
    let sub_url = req.body["url"];
    // console.log("添加新的订阅链接");
    // console.log("名称: %s  订阅链接: %s", sub_name, sub_url);
    let result = JSON.parse(await read(sub_json));
    result[sub_name] = sub_url;
    await write(sub_json, JSON.stringify(result, null, 4));
    res.status(201).send(util.format("添加 %s 订阅链接成功", sub_name));
};

// 根据订阅名称获取订阅内容
exports.get_sub_content_by_name = async function (req, res) {
    let subid = req.params.subid.toUpperCase();
    // console.log("根据订阅名称获取订阅内容");
    let result = JSON.parse(await read(sub_json));

    if(result.hasOwnProperty(subid)){
        res.status(200).send(await get_url_content(result[subid]))
    }else {
        res.status(404).send("订阅名称不存在")
    }
    // console.log(res);
};

// 获取全部订阅内容
exports.get_all_sub_contents = function (req, res) {
    res.sendStatus(403);
};

