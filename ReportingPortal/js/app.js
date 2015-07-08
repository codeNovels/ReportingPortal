var app = angular.module("app", ['mockData', 'ui.bootstrap']);

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
        return $http.put(urlBase+id, update);
    };
    //DELETE
    reportLinkService.deleteReportLinks = function (id) {
        return $http.delete(urlBase + id);
    };
    return reportLinkService;
}]);

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

app.factory('usernameService', ['$http', function ($http) {
    var urlBase = '/ReportingPortalApi/api/identity/';
    var usernameService = {};
    usernameService.getUsername = function () {
        return $http.get(urlBase);
    };
    return usernameService;
}]);

//<!--SideNav + SubmitForm Controller-->
app.controller("bodyCtrl", ['$scope', 'reportLinkService', 'usernameService', '$window', '$http', 'linkCategoryService', function ($scope, reportLinkService, usernameService, $window, $http, linkCategoryService) {
    $scope.spinner = 'true';
    $scope.filterArchive = true;


    //Categories
    var categories = function (response) {
        $scope.sideNavCategory = response.data;
    };
    $scope.sideNavCategory2 = function () {
        $http.get('/ReportingPortalApi/api/Category')
            .then(categories);
    };
    $scope.sideNavCategory2();


    function getReportToCategory() {
        linkCategoryService.getReportToCategory()
            .success(function (reportToCategory) {
                $scope.reportToCategory = reportToCategory;
            })
        .error(function (error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        })
    };



    //<!--New Report Button Collapse/Expand Controller-->//
    $scope.isCollapsed = true;

    //GET USERNAME
    getUsername();
    function getUsername() {
        usernameService.getUsername()
            .success(function (username) {
                $scope.username = username;
            })
        .error(function (error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        })
    }
    //GET REPORTSLIST
    getReportLinks();
    function getReportLinks() {
        reportLinkService.getReportLinks()
            .success(function (reportLinks) {
                $scope.reportList = reportLinks;
            })
        .error(function (error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        })
    };
    //POST
    $scope.addNewItem = function () {
        $scope.spinner = 'true';
        reportLinkService.postReportLinks({ Title: this.title, Link: this.link, Description: this.description, IsActive: true })
            .success(function (data, status, headers, config) {
                $scope.sideNavCategory.forEach(function (category) {
                    if (category.selected) {
                        linkCategoryService.postReportToCategory({ LinkId: data.LinkId, CategoryId: category.CategoryId });
                    }
                })
                getReportLinks();
            })
            .error(function (data, status, headers, config) {
            });
    };

    $scope.$watch('reportList', function (newValue, oldValue) {
        if (newValue) {
            $scope.spinner = 'false';
        }
    });
    //UPDATE
    $scope.activateItem = function (report) {
        reportLinkService.updateReportLinks(report.LinkId, { LinkId: report.LinkId, Title: report.Title, Link: report.Link, Description: report.Description, IsActive: report.IsActive })
            .success(function () {
                console.log("successfully updated object");
            })
            .error(function () {

            })
    };

    


    //DELETE
    $scope.deleteLink = function (index, LinkId) {
        $scope.spinner = 'true';
        reportLinkService.deleteReportLinks(LinkId)
            .success(function () {
                $scope.reportList.splice(index, 1);
                console.log("successfuly delete record");
                getReportLinks();
            })
            .error(function () {
                console.log("Error");
            })
    };

    //validate username is admin
    $scope.isAdmin = function (name) {
        switch (name) {
            case 'vpatel':
                return true;
                break;
            case 'mwsmith':
                return true;
                break;
            case 'jnunez':
                return true;
                break;
            case 'jmaddox':
                return true;
                break;
            case 'qyin':
                return true;
                break;
            case 'karnold':
                return true;
                break;
            case 'smackenzie':
                return true;
                break;
            case 'bnguyen':
                return true;
                break;
            case '':
                return true;
                break;
            default:
                return false;
        }
    }

    //openTab
    $scope.openTab = function (url) {
        $window.open('http://' + url);
    }
    //default category and form category selection
    $scope.formCategory = 'Analytics';
    $scope.setFormCategory = function (category) {
        $scope.formCategory = category;
    }
    //filtering the sideNav by categories
    $scope.filterCategory = '';
    $scope.chooseCategory = function (category) {
        $scope.filterCategory = category;
        $scope.filterArchive = true;
    }
    //filter the unchecked marked items in report list   
    $scope.showArchive = function () {
        $scope.filterCategory = '';
        $scope.filterArchive = false;
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
