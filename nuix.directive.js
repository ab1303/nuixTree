
angular.module('nuixApp').directive('nuixTree',['RecursionHelper',function(recursionHelper){
    function treeController(){
        var vm = this;
        vm.isRootNode = vm.nodeType && vm.nodeType === 'root';
        vm.isLeafNode = vm.treeMap.children.length===0;
        vm.isBranchNode = !vm.isLeafNode;        
    }

    
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
        controller:treeController,
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