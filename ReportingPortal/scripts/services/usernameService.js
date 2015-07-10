app.factory('usernameService', ['$http', function ($http) {
    var urlBase = '/ReportingPortalApi/api/identity/';
    var usernameService = {};
    usernameService.getUsername = function () {
        return $http.get(urlBase);
    };
    return usernameService;
}]);
