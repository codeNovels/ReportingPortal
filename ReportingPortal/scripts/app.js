var app = angular.module("app", ['ui.bootstrap']);

//<!--SideNav + SubmitForm Controller-->
angular
    .module('app')
    .controller("bodyCtrl", bodyCtrl);

bodyCtrl.$inject = ['$scope', 'reportLinkService', 'usernameService', '$window', '$http', 'linkCategoryService'];

function bodyCtrl($scope, reportLinkService, usernameService, $window, $http, linkCategoryService) {
    
    //New Report Button Collapse/Expand//
    $scope.isCollapsed = true;
    //AJAX loading spinner
    $scope.spinner = 'true';
    //reports archive checkbox
    $scope.filterArchive = true;


    //GET sideNavCategories
    var categories = function (response) {
        $scope.sideNavCategory = response.data;
    };
    $scope.sideNavCategory2 = function () {
        $http.get('/ReportingPortalApi/api/Category')
            .then(categories);
    };
    $scope.sideNavCategory2();

    //Assign sideNavCategories into form
    function getReportToCategory() {
        linkCategoryService.getReportToCategory()
            .success(function (reportToCategory) {
                $scope.reportToCategory = reportToCategory;
            })
        .error(function (error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        })
    };

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
    //POST REPORT
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
    //UPDATE IsActive checkbox
    $scope.activateItem = function (report) {
        reportLinkService.updateReportLinks(report.LinkId, { LinkId: report.LinkId, Title: report.Title, Link: report.Link, Description: report.Description, IsActive: report.IsActive })
            .success(function () {
                console.log("successfully updated object");
            })
            .error(function () {

            })
    };

    //DELETE report
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

};




































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
