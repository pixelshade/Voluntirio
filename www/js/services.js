angular.module('starter.services', ['ngResource'])
    .factory('Session', function ($resource) {
        return $resource('http://nocturnal.cf:1337/ghost/:sessionId');
    });
