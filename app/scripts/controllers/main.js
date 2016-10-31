'use strict';

/**
 * @ngdoc function
 * @name cardkitApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cardkitApp
 */
angular.module('cardkitApp')
  .controller('MainCtrl', function ($scope, $location, $analytics, $filter, saveSvgAsPng, themeConfig, templateConfig) {
  if (!$scope.googleInfo){ //ooh dirty. ah well. todo: as service
    $location.path('/login');
  }
  $analytics.pageTrack('/homepage');

    $scope.config = {
      sizes: [
        {
          name: 'Twitter',
          width: 650,
          height: 320,
          gridSize: 16.25,
          fill: 'transparent',
        },
        {
          name: 'Facebook',
          width: 486,
          height: 254,
          gridSize: 12.15
        },
        {
          name: 'Instagram',
          width: 640,
          height: 640,
          gridSize: 20
        },
        {
          name: 'UNFPA.org Article',
          width: 600,
          height: 295,
          gridSize: 15
        },        
 /*       {
          name: 'Square',
          width: 450,
          height: 450,
          gridSize: 15
        }
*/        
      ],
      themes: themeConfig,
      templates: templateConfig,
      output: {
        scale: 2,
        editable: {
          scale: true
        }
      },
      svg: {
        canvas: {
          height: function() {
            return $scope.size.height;
          },
          width: function() {
            return $scope.size.width;
          },
          gridSize: function() {
            return $scope.size.gridSize;
          }
        },
      }
    };

    function createConfigCopy() {
      $scope.defaultConfig = angular.copy($scope.config);
      $scope.$broadcast('resetSvg');
    }

    // Configure themes, set default
    if(typeof $scope.config.themes !== 'undefined') {
      var defaultTheme = $filter('filter')($scope.config.themes, {
        default: true
      }, true)[0];
      if(defaultTheme) {
        $scope.theme = defaultTheme;
      } else {
        $scope.theme = ($scope.config.themes.length > 1) ? null : $scope.config.themes[0];
      }
    }

    // Configure templates, set default
    if(typeof $scope.config.template !== 'undefined') {
      var defaultTemplate = $filter('filter')($scope.config.template, {
        default: true
      }, true)[0];
      if(defaultTemplate) {
        $scope.template = defaultTemplate;
      } else {
        $scope.template = ($scope.config.templates.length > 1) ? null : $scope.config.template[0];
      }
    }

    // Configure sizes, set default
    var defaultSize = $filter('filter')($scope.config.sizes, {
      default: true
    }, true)[0];
    if(defaultSize) {
      $scope.size = defaultSize;
    } else {
      $scope.size = ($scope.config.sizes.length > 1) ? null : $scope.config.sizes[0];
    }

    $scope.$watch('theme', function() {
      $scope.$broadcast('changeTheme');
      createConfigCopy();
    });

    $scope.$watch('template', function(template) {
      if (!template) {
        return;
      }
      $scope.config.svg.elements = template.elements($scope);
      $scope.$broadcast('changeTemplate');
      createConfigCopy();
    });

    $scope.$watch('size', function() {
      $scope.$broadcast('changeSize');
      createConfigCopy();
    });

    $scope.resetSvg = function() {
      $scope.config.svg = $scope.defaultConfig.svg;
      createConfigCopy();
    };

    // Drop handler.
    $scope.onDrop = function (data, event) {
      var dataTransfer = getDataTransfer(event);
      readFile(dataTransfer.files[0], this.element);
    };

    $scope.fileChanged = function(file) {
      readFile(angular.element(file)[0].files[0], this.element);
    };

    // Read the supplied file (from DataTransfer API)
    function readFile(file, element) {
      var reader = new FileReader();

      reader.onload = function() {
        element.src = reader.result;
        $scope.$apply();
      };

      reader.readAsDataURL(file);
    }

     /**
     * Gets the data transfer
     *
     * @param   {Event}   The data transfer event
     *
     * @return  The event's data transfer or null
     */

    // Get the data transfer
    function getDataTransfer(event) {
      event.stopPropagation();
      event.preventDefault();
      return event.dataTransfer || null;
    }

    /**
     * Slugifies the supplied string
     *
     * @param   {string}  text - The string to slugify
     *
     * @return  {string}  The slugified string
     */
    function slugify(text) {
      return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    }

    /**
     * Finds the first element with 'useAsFilename' set to true, and returns the file name based on it's text value
     *
     * @return  string  The file name
     */
    function findFileName() {
      // Map elements object to an array
      var elementsArray = [];
      angular.forEach($scope.config.svg.elements, function(value){
        elementsArray.push(value);
      });

      // Filter to find the element that has `useAsFilename` set as true
      var fileNameElement = $filter('filter')(elementsArray, {
        useAsFilename: true,
        type: 'text'
      }, true)[0];

      // Default the title to 'image.png'
      var fileName = 'image.png';

      // If we found an appropriate element, set that as the title instead
      if(fileNameElement) {
        // We run `slugify()` here to make it an acceptable file name
        fileName = slugify(fileNameElement.text) + '.png';
      }

      // Return the filename
      return fileName;
    }

    $scope.removeImage = function() {
      this.element.src = '';
    };

    $scope.downloadSvg = function() {
      // Get the file name
      var fileName = findFileName();

      // Run the conversion and download
      saveSvgAsPng(document.getElementById('snap-svg'), fileName, {
        scale: $scope.config.output.scale
      });
    };
  });
