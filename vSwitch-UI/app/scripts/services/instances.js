angular.module('vSwitchUiApp')
    .service('InstanceService', function($http, $location, toastr, endpoint) {
    
        /*
         ** Service Add instance
         ** @org: instance object
         ** @callback: function to be executed
         **/
        this.add = function(instance, callback) {
            var token = localStorage.getItem("token")
            instance.organization = localStorage.getItem("current")
            $http({
                method: 'POST',
                url: endpoint + '/instance',
                data: instance,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                add_helper(response.data, callback);
            }, function errorCallback(response) {
                toastr.error("There was an error");
            });
        }
        
        /*
         ** This function add the instance to the organization
         ** @instance: instance object
         ** @callback: function to be executed
        **/
        function add_helper(instance, callback) {
            var token = localStorage.getItem("token");
            var orgid = localStorage.getItem('current');
            $http({
                method: 'POST',
                url: endpoint + '/organization/'+orgid+'/instances/'+ instance.id,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                toastr.success("Instanced added successfully");
                callback();
            }, function errorCallback(response) {
                toastr.error("There was an error");
            });
        }
        
        /**
         * Service list instances
         * Get organization's instances
         * @callback: function to be executed when done
         */
        this.list = function(callback) {
            var token = localStorage.getItem("token")
            var orgid = localStorage.getItem("current")
            $http({
                method: 'GET',
                url: endpoint + '/organization/'+orgid+'/instances',
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                callback(response.data);
            }, function errorCallback(response) {
                toastr.error("There was an error");
            });
        }
        
        /**
         * Service update instance
         * Update instance by id
         * @instance: instance object
         * @callback: function to be executed when done
         **/
        this.update = function(instance) {
            var id = instance.id;
            var token = localStorage.getItem("token");
            var data = {};
            data.name = instance.name;
            $http({
                method: 'PUT',
                url: endpoint + '/instance/' + id,
                data: data,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                toastr.success("Instance updated successfully");
            }, function errorCallback(response) {
                toastr.error("There was an error");
            });
        }
        
        /**
         * Service delete instance
         * Delete instance by id
         * @org: instance object
         * @callback: function to be executed when done
         **/
        this.delete = function(instance,callback) {
            var id = instance.id;
            var token = localStorage.getItem("token")
            $http({
                method: 'DELETE',
                url: endpoint + '/instance/' + id,
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).then(function successCallback(response) {
                toastr.success("Instance deleted successfully");
                callback();
            }, function errorCallback(response) {
                toastr.error("There was an error");
            });
        }
    })