angular.module('starter.controllers', ['starter.services', 'ngOpenFB'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, ngFB) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
    //'email,read_stream,publish_actions'
    $scope.fbLogin = function () {
        ngFB.login({
            scope: {
                scope: 'email'
            }
        }).then(
            function (response) {
                if (response.status === 'connected') {
                    console.log('Facebook login succeeded');
                    $scope.closeLogin();
                } else {
                    alert('Facebook login failed');
                }
            });
    };
})

.controller('SessionsCtrl', function ($scope, Session) {
    $scope.sessions = Session.query();
})

.controller('SessionCtrl', function ($scope, $stateParams, Session) {
    $scope.session = Session.get({
        sessionId: $stateParams.sessionId

    });
})

.controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
        {
            title: 'Reggae',
            id: 1
        },
        {
            title: 'Chill',
            id: 2
        },
        {
            title: 'Dubstep',
            id: 3
        },
        {
            title: 'Indie',
            id: 4
        },
        {
            title: 'Rap',
            id: 5
        },
        {
            title: 'Cowbell',
            id: 6
        }
  ];
})

.controller('PostsCtrl', function ($scope, $http) {

    // You can change this url to experiment with other endpoints
    var postsApi = 'http://scottbolinger.com/wp-json/posts?_jsonp=JSON_CALLBACK';

    // This should go in a service so we can reuse it
    $http.jsonp(postsApi).
    success(function (data, status, headers, config) {
        $scope.posts = data;
        console.log(data);
    }).
    error(function (data, status, headers, config) {
        console.log('Post load error.');
    });

})

.controller('PostCtrl', function ($scope, $stateParams, $sce, $http) {

    // we get the postID from $stateParams.postId, the query the api for that post
    var singlePostApi = 'http://scottbolinger.com/wp-json/posts/' + $stateParams.postId + '?_jsonp=JSON_CALLBACK';

    console.log($stateParams.postId);

    $http.jsonp(singlePostApi).
    success(function (data, status, headers, config) {
        $scope.post = data;

        // must use trustAsHtml to get raw HTML from WordPress
        $scope.content = $sce.trustAsHtml(data.content);

        console.log(data);

    }).
    error(function (data, status, headers, config) {
        console.log('Single post load error.');
    });

})

.controller('PlaylistCtrl', function ($scope, $stateParams) {});
