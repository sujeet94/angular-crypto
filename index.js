
var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $location, EncryptService) {
    var url = "login.json";
    $scope.url = url;
    $scope.encrypt = function () {
        var Data = $scope.data;
        if (Data == "" || Data == undefined || Data == null) {
            $scope.errormsg = "fill in data to encrypt";
        } else {
            $scope.errormsg = "";
            var key = EncryptService.generatekey(url);
            var iv = EncryptService.generateiv(url);
            $scope.key = key;
            $scope.iv = iv;
            var Data = $scope.data;
            var aesencrypt = EncryptService.aesencrypt(Data, key, iv);
            $scope.aesEncrypted = aesencrypt;
            var aesdecript = EncryptService.aesdecrypt($scope.aesEncrypted, url);
            $scope.aesDecrypted = aesdecript;
            var rsaEncriptData = EncryptService.rsaencrypt(url);
            var rsaDecryptData = EncryptService.rsadecrypt(rsaEncriptData);
            $scope.rsaEncriptData = rsaEncriptData;
            $scope.rsaDecryptData = rsaDecryptData;
        }
    }
});