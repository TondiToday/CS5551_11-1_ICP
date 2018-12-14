/**
 * Created by user on 10/23/2018.
 */
var myapp = angular.module('demoMongo',[]);
myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json';
    //
    $http.defaults.headers.get['dataType'] = 'json'
});
myapp.controller('MongoRestController',function($scope,$http){
    $scope.insertData = function(){
        console.log($scope.formData.ClassID);
        console.log($scope.formData.StudentName);
        console.log($scope.formData.CourseOfStudy);
        console.log($scope.formData.email);
        console.log($scope.formData.major);
        console.log($scope.formData.minor);
        console.log($scope.formData.searchmajor);
        var dataParams = {
            'ClassID' : $scope.ClassID,
            'CourseOfStudy' : $scope.CourseOfStudy,
            'StudentName' : $scope.StudentName,
            'email' : $scope.email,
            'major' : $scope.major,
            'minor' : $scope.minor,
            'searchmajor' : $scope.searchmajor

        };
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        var req = $http.post('http://127.0.0.1:8081/register',$scope.formData);
        req.success(function(data, status, headers, config) {
            $scope.message = data;
            console.log(data);
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    };
    $scope.findingData = function(){
        console.log($scope.formData.searchmajor);
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };

        var dataParams = {'searchmajor' : $scope.searchmajor

        };

        var req2 = $http.get('http://127.0.0.1:8081/read',$scope.formData.searchmajor);
        req2.success(function(data, status, headers, config) {
            $scope.formData.information = data;
            console.log(data);
        });
        req2.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    };
});