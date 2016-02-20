'use strict';

/**
 * @ngdoc function
 * @name vSwitchUiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the vSwitchUiApp
 */
angular.module('vSwitchUiApp')
  .controller('OrgCtrl', function($scope, $location, $timeout) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // Local Storage
    $scope.organizations = localStorage.getItem('organizations') == null ? [] : JSON.parse(localStorage.getItem('organizations'));

    // Scope variables
    $scope.organization = {};

    // Scope functions
    $scope.add_organization = add_organization;
    $scope.join_organization = join_organization;
    $scope.rem_organization = rem_organization;
    $scope.edit_organization = edit_organization;
    $scope.view_instances = view_instances;



    // Functions

    function add_organization() {

      //TODO: call service add_organization

      $scope.organizations.push({
        name: $scope.organization.name,
        instances: [],
        code: "MYCODE",
        ready: false
      });
      localStorage.setItem('organizations', JSON.stringify($scope.organizations));
      $scope.organization.name = ""
  
      var index = $scope.organizations.length - 1;
      $timeout(function () {add_organization_complete(index)}, 3000);
    }
    
     function add_organization_complete(index) {
      $scope.organizations[index].ready = true;
      localStorage.setItem('organizations', JSON.stringify($scope.organizations));
      
    }

    function join_organization() {

      var code = $scope.organization.code;

      //TODO: Call service join_organization(code) 
      $scope.organizations.push({
        name: "Organization",
        instances: [],
        code: "MYCODE",
        ready: false
      });
      localStorage.setItem('organizations', JSON.stringify($scope.organizations));
      $scope.organization.code = ""

      var index = $scope.organizations.length - 1;
      $timeout(function () {add_organization_complete(index)}, 2000);
    }

    function edit_organization(index) {

      localStorage.setItem('organizations', JSON.stringify($scope.organizations));

      //TODO: call service edit_organization  
    }

    function rem_organization(index) {
      if (!$scope.organizations[index].ready) return;
      
      if (confirm("Are you sure you want to remove " + $scope.organizations[index]))
        $scope.organizations.splice(index, 1);

      localStorage.setItem('organizations', JSON.stringify($scope.organizations));
    }

    function view_instances(index) {
      localStorage.setItem('current', index);
      $location.path('/instances');
    }

  });
