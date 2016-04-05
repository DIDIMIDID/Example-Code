angular.module('renameControllers', [])
        .controller('renameCtrl', ['$rootScope', '$scope', '$location', 'renameApi', 
            function ($rootScope, $scope, $location, renameApi) {
                var perPage = 30;

                $rootScope.loaded = $rootScope.loaded > 1 ? $rootScope.loaded : 1;
                $scope.nextButton = true;
                $scope.prevButton = false;
                $scope.finishButton = false;
                $scope.data = renameApi.getData();
                $scope.pages = Math.ceil($scope.data.total_count / perPage);
                $scope.page = 0; //After the first nextQuestions call, page will be 1
                $scope.progress = 0;

                $scope.nextQuestions = function () {
                    var next = $scope.loaded + perPage;
                    loadQuestions($rootScope.loaded, next);
                    $rootScope.loaded = next;
                    $scope.page += 1;

                    reloadProgressBar();
                    checkButtons();
                };

                $scope.prevQuestions = function () {
                    var prev = $rootScope.loaded - perPage * 2;
                    $rootScope.loaded = $rootScope.loaded - perPage;
                    loadQuestions(prev, $rootScope.loaded);
                    $scope.page -= 1;

                    reloadProgressBar();
                    checkButtons();
                };

                $scope.getResult = function () {
                    renameApi.updateData($scope.data);
                    $location.path('/result');
                }

                $scope.nextQuestions();

                //Functions
                function loadQuestions(from, to) {
                    
                    //Removed
                    
                }

                function checkButtons() {

                    if (($rootScope.loaded - perPage) == 1)
                        $scope.prevButton = false;
                    else
                        $scope.prevButton = true;

                    if ($rootScope.loaded <= $scope.data.total_count) {
                        $scope.nextButton = true;
                        $scope.finishButton = false;
                    } else {
                        $scope.nextButton = false;
                        $scope.finishButton = true;
                    }
                }

                function reloadProgressBar() {

                    if ($scope.page == $scope.pages)
                        $scope.progress = 100;
                    else if ($scope.page == 1)
                        $scope.progress = 0;
                    else
                        $scope.progress = Math.ceil(100 / $scope.pages * ($scope.page - 0.5));

                    return true;
                }

            }])

        .controller('IndexCtrl', ['$routeParams', '$scope', '$location', 'renameApi', 
            function ($routeParams, $scope, $location, renameApi) {
                $scope.startPoll = function () {
                    renameApi.updateData($scope.data);
                    $location.path('/questions');
                    return true;
                }

                $scope.promo = {};

                if ($routeParams.inq) {
                    renameApi.initData($routeParams.inq).then(function (response) {
                        $scope.data = response;
                        $scope.data.interviewee = {req: [], rep: []};
                        $scope.dataLoaded = true;


                        if ($routeParams.partner) {
                            $scope.promo.show = false;
                            
                            //Removed
                            
                        } else {
                            $scope.promo.show = true;
                            $scope.promo.value = '';
                        }

                    }, function () {
                        $scope.dataFailed = true;
                    });
                }
            }])
        
            //Removed
            ;
