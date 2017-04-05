/**
 * Created by dylan on 4/4/2017.
 */
/**
 * Created by dylan on 4/4/2017.
 */

starter.controller('smsInboxCtrl', function($scope,serverServices,toaster,$http,$rootScope) {
    $rootScope.baseUrl="http://localhost:3000";
    $scope.removingSms=false;
    $scope.refresh=function () {
        serverServices.get($rootScope.baseUrl+"/api/smsInboxMessages").then(function (result) {
            $scope.inboxMessages=result;
            console.log("ec");
        }).finally(function () {
            $scope.$broadcast('scroll.refreshComplete');
        })
    };
    $scope.hideRemoveSms=function () {
        $scope.removingSms=!$scope.removingSms;
    };
    $scope.deleteSms=function (id) {
        console.log(id);
    };

    $scope.refresh();


});