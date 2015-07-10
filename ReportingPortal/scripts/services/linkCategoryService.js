app.factory('linkCategoryService', ['$http', function ($http) {
    var urlBase = 'ReportingPortalApi/api/linkcategory/';
    var linkCategoryService = {};
    //GET
    linkCategoryService.getReportToCategory = function () {
        return $http.post(urlBase);
    };
    //POST
    linkCategoryService.postReportToCategory = function (object) {
        return $http.post(urlBase, object);
    };
    //DELETE
    linkCategoryService.deleteReportToCategory = function (id) {
        return $http.delete(urlBase + id);
    };

    return linkCategoryService;
}]);