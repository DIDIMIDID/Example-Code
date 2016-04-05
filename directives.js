angular.module('renameDirectives', [])
        
    .directive('spinner', [
        function(){
            return {
                restrict: 'A',
                link: function ($scope, elem) {
                    var spinner = '<div class="loading"><img src="/themes/widget/img/spinner.gif" alt=""></div>';
                    
                    elem.html(spinner);
                }
            };
        }]);
    