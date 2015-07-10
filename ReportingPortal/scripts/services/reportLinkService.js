app.factory('reportLinkService', ['$http', function ($http) {
    var urlBase = '/ReportingPortalApi/api/reportlinks/';
    var reportLinkService = {};
    //GET
    reportLinkService.getReportLinks = function () {
        return $http.get(urlBase);
    };
    //POST
    reportLinkService.postReportLinks = function (newReport) {
        return $http.post(urlBase, newReport);
    };
    //UPDATE
    reportLinkService.updateReportLinks = function (id, update) {
        return $http.put(urlBase + id, update);
    };
    //DELETE
    reportLinkService.deleteReportLinks = function (id) {
        return $http.delete(urlBase + id);
    };
    return reportLinkService;
}]);