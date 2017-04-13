/**
 * Created by dylan on 4/4/2017.
 */
/**
 * Created by dylan on 4/4/2017.
 */

starter.controller('smsInboxCtrl', function($scope,serverServices,toaster,$http,$rootScope,toaster,SmsInbox, $ionicPopup) {
/*
    $rootScope.baseUrl="https://syncusx.herokuapp.com";
    $scope.removingSms=false;
    $scope.refresh=function () {
        serverServices.get($rootScope.baseUrl+"/api/smsInboxMessages").then(function (result) {
            $scope.inboxMessages=result;

        }).finally(function (result) {
            $scope.$broadcast('scroll.refreshComplete');
        })
    };
    */
    $scope.showSms = function(message) {
        var alertPopup = $ionicPopup.alert({
            title: 'sms Message',
            template: message
        });
        alertPopup.then(function(res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });
    };
    $scope.hideRemoveSms=function () {
        $scope.removingSms=!$scope.removingSms;
    };

    $scope.deleteSms=function (mid) {
        var index = $scope.inboxMessages.map(function(o) { return o.id; }).indexOf(mid);
        if (index > -1){
            $scope.inboxMessages.splice(index,1);
        }
        serverServices.delete($rootScope.baseUrl+"/api/smsInboxMessages/"+mid);
    };

    $scope.viewSms=function (mid) {

            var index = $scope.inboxMessages.map(function(o) { return o.id; }).indexOf(mid);
            $scope.showSms($scope.inboxMessages[index].message);


    };


var limit=10;
    var currentMsg=0;
    var totalMsg=0;

    function haveNext() {
        $scope.haveNextInboxMsg=(totalMsg >currentMsg ) ? true :false;


    }
    function havePrev() {
       $scope.havePrevInboxMsg=(currentMsg > limit) ? true :false;
    }

    $scope.nextInboxMsgPage=function () {
        $scope.inboxMessages = SmsInbox.find({
                filter: {
                    limit: limit,
                    skip:currentMsg,
                    order: 'id DESC',
                }
            },
            function success(){
                $scope.$broadcast('scroll.refreshComplete');
                currentMsg=currentMsg+ limit;
                haveNext();
                havePrev();

            },
            function err(){
                $scope.$broadcast('scroll.refreshComplete');
                toaster.pop('error',"unable to connect or server error");
            });

    };
    $scope.prevInboxMsgPage=function () {
        $scope.inboxMessages = SmsInbox.find({
                filter: {
                    limit: limit,
                    skip:(currentMsg > totalMsg) ? currentMsg-(limit*2):currentMsg-limit, //if
                    // current msg > total , a -limit on currentMsg will return current screen eg. (15-(limit 5)) ==10 on a totalMsg 12
                    // will show 2 msg just as current screen(exactly same content) , hence we must get back to one screen by reducing it twice
                    order: 'id DESC',
                }
            },
            function success(){
                $scope.$broadcast('scroll.refreshComplete');
                currentMsg-=limit;
                havePrev();
                haveNext();

            },
            function err(){
                $scope.$broadcast('scroll.refreshComplete');
                toaster.pop('error',"unable to connect or server error");
            });
    }



    $scope.initInboxMsg=function() {
        //do this so as not to query server every time for count
        if(currentMsg==0) {
            SmsInbox.count({}, function success(e) {
                totalMsg = e.count;
                $scope.nextInboxMsgPage();
            });
        }
    }
    $scope.initInboxMsg();





});