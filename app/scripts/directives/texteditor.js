'use strict';

/**
 * @ngdoc directive
 * @name cardkitApp.directive:textEditor
 * @description
 * # textEditor
 */
angular.module('cardkitApp')
  .directive('textEditor', function () {
    return {
      template: '<div>' +
      '<label>Text</label>' +
      '<div class="warn label">Press "Enter" to create multi-line text.</div>' +
      '<textarea ng-model="element.text" class="form-control"></textarea></div>',
      restrict: 'E',
      replace: true,
      scope: {
        element: '='
      }
    };
  });
