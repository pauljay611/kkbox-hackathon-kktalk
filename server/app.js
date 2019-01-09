var express = require('express');
var cors = require('cors');
var app = express();
var axios = require('axios');
var bodyParser = require('body-parser');
app.use(cors());
app.use(express.static(__dirname + '/public/'))
// 解析 application/json
app.use(bodyParser.json());
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const URL = 'https://account.kkbox.com/oauth2';
//设置axios为form-data
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function (data) {
    let ret = ''
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
}]

app.get('/token', function (req, res) {
    axios.post(URL + '/token', {
        client_id: "6a87d0847e4de3e6fc3f51a79bfc93c6",
        grant_type: "client_credentials",
        client_secret: "2151c7c702c1c3c42aedb85a172b254b"
    }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    )
        .then(function (response) {
            res.json(response.data);
        })


});
app.get('/redirect', function (req, res) {
    axios.post(URL + '/token', {
        client_id: "6a87d0847e4de3e6fc3f51a79bfc93c6",
        grant_type: "authorization_code",
        client_secret: "2151c7c702c1c3c42aedb85a172b254b",
        code: req.query.code
    }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    )
        .then(function (response) {
            res.json(response.data);
        })

});
app.get('/page', function (req, res) {
    res.sendFile('public/index.html', { root: __dirname });
});
app.listen(3000, function () {

});