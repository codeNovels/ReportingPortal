var app = angular.module("mockData", []);

var model = {
    user: "Nerium Reports",
    items: [
        { title: "Nerium Default Report", done: false, link: "www.report.com/1", description: "This report goes over the types of customers in the database", category: "Analytics" },
        { title: "Customer Change Logs", done: false, link: "www.report.com/2", description: "This report goes over the types of customers in the Customer Change Logs", category: "Analytics" },
        { title: "Revenue Statistics", done: false, link: "www.report.com/3", description: "This report goes over the types of customers in the Revenue Statistics", category: "Analytics" },
        { title: "Daily enrollments", done: false, link: "www.report.com/4", description: "This report goes over the types of customers in the Daily enrollments", category: "Commissions" },
        { title: "Task Scheduler", done: false, link: "www.report.com/5", description: "This report goes over the types of customers in the Customer Change Logs", category: "Commissions" },
        { title: "Tealeaf Statistics", done: false, link: "www.report.com/6", description: "This report goes over the types of customers in the Revenue Statistics", category: "Compliance" },
        { title: "Total 500 errors on websites", done: false, link: "www.report.com/7", description: "This report goes over the types of customers in the Daily enrollments", category: "Archived" }]
};