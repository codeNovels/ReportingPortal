var app = angular.module("app", ['mockData', 'ui.bootstrap']);

app.factory('reportLinkService', ['$http', function ($http) {
    var urlBase = '/ReportingPortalApi/api/reportlinks/';
    var reportLinkService = {};
    reportLinkService.getReportLinks = function () {
        return $http.get(urlBase);
    };
    reportLinkService.postReportLinks = function (newReport) {
        return $http.post(urlBase, newReport);
    };
    return reportLinkService;
}]);


//<!--SideNav + SubmitForm Controller-->
app.controller("bodyCtrl", ['$scope', 'reportLinkService', function ($scope, reportLinkService) {
    //Categories
    $scope.sideNavCategories = ['Analytics', 'Commissions', 'Compliance', 'Field', 'International', 'Management', 'Marketing', 'Sales', 'Supply Chain', 'Archived'];

    //<!--New Report Button Collapse/Expand Controller-->//
    $scope.isCollapsed = true;

    //GET
    getReportLinks();
    function getReportLinks() {
        reportLinkService.getReportLinks()
            .success(function (reportLinks) {
                $scope.reportList = reportLinks;
            })
        .error(function (error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        })
    }

    //POST
    $scope.addNewItem = function () {
        reportLinkService.postReportLinks({
            Title: this.title,
            Link: this.link,
            Description: this.description,
            Category: this.formCategory
        })
            .success(function (data, status, headers, config) {
            })
            .error(function (data, status, headers, config) {
            });

    }


    //default category and form category selection
    $scope.formCategory = 'Analytics';
    $scope.setFormCategory = function (category) {
        $scope.formCategory = category;
    }
    //method to archive a report
    $scope.archiveItem = function (item) {
        item.category = "Archived";
    }
    //filtering the sideNav by categories
    $scope.sideNavCategory = '';
    $scope.chooseCategory = function (category) {
        $scope.sideNavCategory = category;
    }


}]);

































//$scope.resetForm = function () {
//    $scope.reportList.$setPristine();
//};

//<--Filter-->//
//angular.module("app").filter("checkedItems", [
//  function () {
//      return function (items, showComplete) {
//          var resultArr = [];

//          angular.forEach(items, function (item) {

//              if (item.done == false || showComplete == true) {
//                  resultArr.push(item);
//              }
//          });

//          return resultArr;
//      }
//  }
//]);
