angular.module('state1',[])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('state1', {
      url: '/state1',
      views: {
        'main': {
          controller: 'State12Ctrl',
          templateUrl: 'state1/state1.html'
        }
      }
    })
  }])


  .controller('State12Ctrl', ['$scope', function($scope) {



    //temporary node
    $scope.temporaryNode = {
      children: []
    };

    //test tree model
    $scope.roleList = [
      { label : "User", id : "role1", children : [
        { label : "subUser1", id : "role11", children : [] },
        { label : "subUser2", id : "role12", children : [
          { label : "subUser2-1", id : "role121", children : [
            { label : "subUser2-1-1", id : "role1211", children : [] },
            { label : "subUser2-1-2", id : "role1212", children : [] }
          ]}
        ]}
      ]},

      { label : "Admin", id : "role2", children : [] },

      { label : "Guest", id : "role3", children : [] }
    ];

    $scope.done = function () {
      /* reset */
      $scope.mytree.currentNode.selected = undefined;
      $scope.mytree.currentNode = undefined;
      $scope.mode = undefined;
    };

    $scope.addChildDone = function () {
      /* add child */

      if( $scope.mytree.currentNode.selected && $scope.temporaryNode.label ) {
        $scope.mytree.currentNode.children.push( angular.copy($scope.temporaryNode) );
      }

      /* reset */
      $scope.temporaryNode.id = "";
      $scope.temporaryNode.label = "";

      $scope.done();
    };

  }])



//$compile делает то же самое, что и $parse, но для HTML
  .directive( 'treeModel', ['$compile', function( $compile ) {
    return {

      // ограничить применение директивы A: в качестве атрибута, например  <div my-directive></div>
      restrict: 'A',

      //осуществляющая привязку scope к шаблону
      //scope — область видимости, в которой вызывается директива
      //element — элемент DOM, которому принадлежит директива, обернутый в jQuery Lite
      //attrs — объект со списком всех атрибутов тэга, в котором вызывается директива

      link: function ( scope, element, attrs ) {

        //id дерева
        var treeId = attrs.treeId;

        //иодель дерева
        var treeModel = attrs.treeModel;

        //id  узла
        var nodeId = attrs.nodeId || 'id';

        //node label
        var nodeLabel = attrs.nodeLabel || 'label';

        //children
        var nodeChildren = attrs.nodeChildren || 'children';

        //tree template
        var template =
          '<ul>' +
          '<li data-ng-repeat="node in ' + treeModel + '">' +
          '<i class="collapsed" data-ng-show="node.' + nodeChildren + '.length && node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)"></i>' +
          '<i class="expanded" data-ng-show="node.' + nodeChildren + '.length && !node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)"></i>' +
          '<i class="normal" data-ng-hide="node.' + nodeChildren + '.length"></i> ' +
          '<span data-ng-class="node.selected" data-ng-click="' + treeId + '.selectNodeLabel(node)">{{node.' + nodeLabel + '}}</span>' +
          '<div data-ng-hide="node.collapsed" data-tree-id="' + treeId + '" data-tree-model="node.' + nodeChildren + '" data-node-id=' + nodeId + ' data-node-label=' + nodeLabel + ' data-node-children=' + nodeChildren + '></div>' +
          '</li>' +
          '</ul>';


        //check tree id, tree model
        if( treeId && treeModel ) {


          if( attrs.angularTreeview ) {

            //create tree object if not exists
            scope[treeId] = scope[treeId] || {};

            //if node head clicks,
            scope[treeId].selectNodeHead = scope[treeId].selectNodeHead || function( selectedNode ){

                //Collapse or Expand
                selectedNode.collapsed = !selectedNode.collapsed;
              };

            //if node label clicks,
            scope[treeId].selectNodeLabel = scope[treeId].selectNodeLabel || function( selectedNode ){

                //remove highlight from previous node
                if( scope[treeId].currentNode && scope[treeId].currentNode.selected ) {
                  scope[treeId].currentNode.selected = undefined;
                }

                //set highlight to selected node
                selectedNode.selected = 'selected';

                //set currentNode
                scope[treeId].currentNode = selectedNode;
              };
          }

          //Rendering template.
          element.html('').append( $compile( template )( scope ) );
        }
      }
    };
  }]);
