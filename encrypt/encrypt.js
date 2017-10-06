/*
* Encryption service
* */

var app = angular.module('myApp');
app.service('EncryptService', EncryptService);

function EncryptService() {
    var keystorage = {}; //for storing url specific key.
    var ivstorage = {}; //for storing url specific iv.
    //public key for rsa client side.
    var publickey = "-----BEGIN PUBLIC KEY-----\
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDHikastc8+I81zCg/qWW8dMr8m\
qvXQ3qbPAmu0RjxoZVI47tvskYlFAXOf0sPrhO2nUuooJngnHV0639iTTEYG1vck\
NaW2R6U5QTdQ5Rq5u+uV3pMk7w7Vs4n3urQ6jnqt2rTXbC1DNa/PFeAZatbf7ffB\
By0IGO0zc128IshYcwIDAQAB\
-----END PUBLIC KEY-----";
    //private key for rsa server side.
    var privtekey = "-----BEGIN RSA PRIVATE KEY-----\
MIICXgIBAAKBgQDHikastc8+I81zCg/qWW8dMr8mqvXQ3qbPAmu0RjxoZVI47tvs\
kYlFAXOf0sPrhO2nUuooJngnHV0639iTTEYG1vckNaW2R6U5QTdQ5Rq5u+uV3pMk\
7w7Vs4n3urQ6jnqt2rTXbC1DNa/PFeAZatbf7ffBBy0IGO0zc128IshYcwIDAQAB\
AoGBALTNl2JxTvq4SDW/3VH0fZkQXWH1MM10oeMbB2qO5beWb11FGaOO77nGKfWc\
bYgfp5Ogrql4yhBvLAXnxH8bcqqwORtFhlyV68U1y4R+8WxDNh0aevxH8hRS/1X5\
031DJm1JlU0E+vStiktN0tC3ebH5hE+1OxbIHSZ+WOWLYX7JAkEA5uigRgKp8ScG\
auUijvdOLZIhHWq7y5Wz+nOHUuDw8P7wOTKU34QJAoWEe771p9Pf/GTA/kr0BQnP\
QvWUDxGzJwJBAN05C6krwPeryFKrKtjOGJIniIoY72wRnoNcdEEs3HDRhf48YWFo\
riRbZylzzzNFy/gmzT6XJQTfktGqq+FZD9UCQGIJaGrxHJgfmpDuAhMzGsUsYtTr\
iRox0D1Iqa7dhE693t5aBG010OF6MLqdZA1CXrn5SRtuVVaCSLZEL/2J5UcCQQDA\
d3MXucNnN4NPuS/L9HMYJWD7lPoosaORcgyK77bSSNgk+u9WSjbH1uYIAIPSffUZ\
bti+jc1dUg5wb+aeZlgJAkEAurrpmpqj5vg087ZngKfFGR5rozDiTsK5DceTV97K\
a3Y+Nzl+XWTxDBWk4YPh2ZlKv402hZEfWBYxUDn5ZkH/bw==\
-----END RSA PRIVATE KEY-----";
    var generatekey = function (url) {
        var key = CryptoJS.lib.WordArray.random(64 / 8).toString(CryptoJS.enc.Hex);
        keystorage[url] = key;
        return key;
    };
    var generateiv = function (url) {
        var iv = CryptoJS.lib.WordArray.random(64 / 8).toString(CryptoJS.enc.Hex);
        ivstorage[url] = iv;
        return iv;
    };
    var print = function () {
        console.log(keystorage);
        console.log(ivstorage);
    };
    var aesencrypt = function (data, key, iv) {
        var encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv });
        console.log(encrypted.toString());
        return encrypted.toString();
    };
    var aesdecrypt = function (data, url) {
        var key = keystorage[url];
        var iv = ivstorage[url];
        var decrypted = CryptoJS.AES.decrypt(data, key, { iv: iv });
        var planetext = decrypted.toString(CryptoJS.enc.Utf8);
        // var jsonobj = JSON.parse(planetext);
        return planetext;
    };
    var rsaencrypt = function (url) {
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey(publickey);
        var key = keystorage[url];
        var iv = ivstorage[url];
        var crypto = key + "|" + iv;
        console.log("crypto", crypto);
        var Rsacrypt = encrypt.encrypt(crypto);
        return Rsacrypt;

    };
    var rsadecrypt = function (crypto) {
        var decrypt = new JSEncrypt();
        decrypt.setPrivateKey(privtekey);
        var uncrypted = decrypt.decrypt(crypto);
        return uncrypted;
    };

    return {
        generatekey: generatekey,
        generateiv: generateiv,
        aesencrypt: aesencrypt,
        aesdecrypt: aesdecrypt,
        rsaencrypt: rsaencrypt,
        rsadecrypt: rsadecrypt,
        print: print
    }
}
