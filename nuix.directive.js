
angular.module('nuixApp').directive('nuixTree', ['RecursionHelper', function (recursionHelper) {
    return {
        restrict: "E",
        replace:true,
        scope: {
            nodeType:'@',
            treeMap: '='             
        },
        controllerAs: 'vm',
        bindToController: true,
        templateUrl: 'nuix.directive.template.html',
        controller: treeController,
        compile: function(element) {
            return recursionHelper.compile(element, function(scope, iElement, iAttrs, controller, transcludeFn){
                // Define your normal link function here.
                // Alternative: instead of passing a function,
                // you can also pass an object with 
                // a 'pre'- and 'post'-link function.
            });
        }
    };

}]);

angular.module('nuixApp').controller('treeController', treeController);
treeController.$inject = ['$scope'];

function treeController($scope) {
    var vm = this;
    vm.isRootNode = vm.nodeType && vm.nodeType === 'root';
    vm.isLeafNode = vm.treeMap.children.length === 0;
    vm.isBranchNode = !vm.isLeafNode;


    vm.emitEvent = function () {
        $scope.$emit('traverseTree', {
            type: vm.treeMap.type,
            label: vm.treeMap.label
        });
    };

    $scope.$on('traverseTree', function (event, data) {
        var currentScopeVm = event.currentScope.vm;
        var text = currentScopeVm.treeMap.type + ' - ' + currentScopeVm.treeMap.label;
        console.log(text);
    });

}