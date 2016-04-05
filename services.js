angular.module('renameServices', [])
        .factory('renameApi', ['$http', '$q', function($http, $q){
            var factory = {};
            var apiUrl = ''; //Removed
            var data = {};
            
            factory.initData = function(inc_id){
                inc_id = 'in='+inc_id;
                
                var deferred = $q.defer();

                $http.get(apiUrl+'?'+inc_id)    
                    .success(function(response) {
                        deferred.resolve(response);
                        data = response;
                    })
                    .error(function(response){
                        deferred.reject(response);
                    });

                return deferred.promise;
            };

            factory.getData = function(){
                return data;
            };
            
            factory.updateData = function(newData){
                data = newData;
            };
            
            factory.sendData = function(answers, data){
                var deferred = $q.defer();
                
                var user = {repeater:[], required:[]};
                
                for(var key in data.interviewee.rep) {
                    user.repeater.push({key: key, value: data.interviewee.rep[key]});
                }
                for(var key in data.interviewee.req) {
                    user.required.push({key: key, value: data.interviewee.req[key]});
                }
                user.promo_code = data.interviewee.promo_code;
                
                jQuery.ajax({
                    method: 'post',
                    url: apiUrl+'/GetResults',
                    data: {poll_results: answers, user: user, inquirer: data.inquirer},
                    success: function(data){
                        deferred.resolve(data);
                    },
                    error: function(data){
                        deferred.reject(data);
                    }
                });
                
                return deferred.promise;
            };
            
            return factory;
        }]);