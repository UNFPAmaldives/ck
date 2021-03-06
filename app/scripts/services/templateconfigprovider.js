'use strict';
var templateHelper = {
  logo: {
    width: function ($scope) {
      return $scope.size.gridSize * ($scope.theme.isNikkei ? 9 : 5);
    },
    height: function ($scope) {
      return $scope.size.gridSize * ($scope.theme.isNikkei ? 3 : 5);
    },
    x: function ($scope) {
      return $scope.size.width - ($scope.theme.isNikkei ? this.width($scope) : $scope.size.gridSize * 5.5);
    },
    y: function ($scope) {
      var paddingTop = $scope.theme.isNikkei ? 0 : $scope.size.gridSize / 2;
      return ($scope.size.height * 1.075) - (this.height($scope) + paddingTop);
    }
  },
  creditFontSize: function ($scope) {
    if ($scope.size.name === 'Twitter') {
      return $scope.theme.isNikkei ? 20 : 20;
    } else if ($scope.size.name === 'Instagram') {
      return $scope.template.isQuote ? 20 : 28;    
    } else {      
      return $scope.theme.isNikkei ? 16 : 16;
    }
  },
  headLineFontSize: function ($scope) {
    if ($scope.size.name === 'Twitter') {
      return $scope.theme.isNikkei ? 30 : 32;
    } else {
      return $scope.theme.isNikkei ? 22 : 24;
    }
  },

  crossReferenceBackground: {
    width: function ($scope) {
      var nikkeiLogoDeduct = $scope.theme.isNikkei ? $scope.size.gridSize * 9 : 0;
      return $scope.size.width - nikkeiLogoDeduct;
    }
  }
}
/**
 * @ngdoc provider
 * @name cardkitApp.templateConfigProvider
 * @description
 * # templateConfigProvider
 * Loads the available templates
 */
angular.module('cardkitApp')
  .provider('templateConfigProvider', function () {
    return {
      $get: function () {
        return ([{
          name: 'Quote',
          default: true,        
          "isQuote": true,          
          elements: function ($scope) {
            return [{
              name: 'Background Colour',
              type: 'rect',
              controlsOrder: 7,
              height: function () {
                return $scope.size.height;
              },
              width: function () {
                return $scope.size.width;
              },
              fill: function () {
                return $scope.theme.background;
              }
            }, {
              name: 'Pullquote',
              type: 'image',
              width: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 6;
                }
                else return $scope.size.gridSize * 10;
              },
              controlsOrder: 4,
              height: function () {
                if (typeof this.width === 'function') {
                  return this.width();
                }
                return this.width;
              },
              src: function () {
                return $scope.theme.images.pullquoteSrc;
              },
              opacity: 0.6,
              x: function () {
                if ($scope.size.name === 'Instagram') {              
                  return $scope.size.gridSize * 13.5;
                }
                else return $scope.size.gridSize * -1;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {              
                  return $scope.size.gridSize * 7;
                }             
                else return $scope.size.gridSize * -.1;
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: true,
              defaultFilter: '',
              editable: {
                width: true,
              }
            }, {               
              name: 'Cross Reference Background',
              type: 'rect',
              controlsOrder: 5,
              height: function () {
                return $scope.size.gridSize * 3;
              },
              width: function () {
                return templateHelper.crossReferenceBackground.width($scope);
              },
              y: function () {
                return $scope.size.height - this.height();
              },
              fill: function () {
                return $scope.theme.xrefBackground;
              }
            }, {
              name: 'Logo',
              type: 'image',
              controlsOrder: 6,
              width: function () {
                return templateHelper.logo.width($scope);
              },
              height: function () {
                return templateHelper.logo.height($scope);
              },
              src: function () {
                return $scope.theme.images.logoSrc;
              },
              opacity: 1,
              x: function () {
                return templateHelper.logo.x($scope);
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {              
                return templateHelper.logo.y($scope) -18;
              }
                else return templateHelper.logo.y($scope);
              },
              // x: 500,
              // y: 150,
              preserveAspectRatio: 'xMinYMin meet',
              draggable: {
                x: false,
                y: true
              },
            }, {
              name: 'Cross Reference Text',
              type: 'text',
              text: 'Read more: unfpa.org/adolescent-pregnancy',
              controlsOrder: 3,
              fill: function () {
                return $scope.theme.xref;
              },
              fontSize: function () {
                return templateHelper.creditFontSize($scope)
              },
              fontFamily: function () {
                return $scope.theme.xrefFont;
              },
              textAnchor: 'start',
              x: function () {
                return $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.height - ($scope.size.gridSize +3);
                }
                else return $scope.size.height - ($scope.size.gridSize);
              },
              fontWeight: 500,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fontSize: {
                  'Small (18px)': 18,
                  'Standard (22px)': 22,
                  'Large (24px)': 24,
                }
              },
            }, {
              name: 'Credit',
              type: 'text',
              text: 'YORIKO YASUKAWA\nDirector, Asia & the Pacific',
              controlsOrder: 2,
              fill: function () {
                return $scope.theme.quote;
              },
              fontSize: function () {
                return templateHelper.creditFontSize($scope)
              },
              fontFamily: function () {
                return $scope.theme.creditFont;
              },
              textAnchor: function () {
                if ($scope.size.name === 'Instagram') {
                  return 'middle'; 
                }                
                else return 'start'
              },              
              textTransform: 'none',
              x: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 16; 
                }
                else return $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.height - $scope.size.gridSize * 12.6; 
                }
                else return $scope.size.height - $scope.size.gridSize * 6;
              },              
              fontWeight: 500,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fontSize: {
                  'Small (16px)': 16,
                  'Large (22px)': 22,
                  'Larger (24px)': 24,
                  'X-Large (26px)': 26,
                },
                fontFamily: {
                  'Eureka Regular': 'eureka-regular',
                  'Eureka Bold': 'eureka-bold',
                  'Eureka Italic': 'eureka-italic',
                  'Eureka Medium': 'eureka-medium',
                  'UNFPA Text': 'unfpatext',
                  'UNFPA Text Italic': 'unfpatextitalic',
                  'UNFPA Semibold': 'unfpasemibold',
                  'UNFPA Semibold Italic': 'unfpasemibolditalic',
                  'UNFPA Bold': 'unfpabold',
                }, 
              },
            }, {
              name: 'Headline',
              type: 'text',
              text: 'Empowerment means guaranteeing\ngirls and women full, unfettered\naccess to family planning\nsupplies and services' +
              '',
              fill: function () {
                return $scope.theme.quote;
              },
              controlsOrder: 1,
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {
                  return 28; 
                }                
                else return templateHelper.headLineFontSize($scope)
              },
              fontFamily: function () {
                return $scope.theme.headlineFont;
              },
              textAnchor: function () {
                if ($scope.size.name === 'Instagram') {
                  return 'middle'; 
                }                
                else return 'start'
              },
              x: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 16; 
                }
                else return $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 13; 
                }
                else return $scope.size.gridSize * 3;
              },
              fontWeight: 600,
              draggable: true,
              showHoverArea: true,            
              editable: {
                text: true,
                fontSize: {
                  'Small (24px)': 24,
                  'Medium (28px)': 28,                  
                  'Standard (32px)': 32,
                  'Large (34px)': 34,
                  'X-Large (50px)': 42,
                },
                textAnchor: {
                  'start': 'start',
                  'middle': 'middle',
                  'end': 'end',
                },                 
              },
            }, {
              name: 'UNFPA Brand Extension Logos',
              type: 'image',
              width: function () {
                return $scope.size.width * 0.15;
              },
              controlsOrder: 20,
              height: function () {
                var h;
                if (typeof this.width === 'string') {
                  h = +this.width * .5;
                } else {
                  h = this.width() *.5;
                }
                return h;
              },
              src: '',
              opacity: 1,
              x: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 7.4;
                }
                return $scope.size.width - ($scope.theme.isNikkei ? this.width($scope) : $scope.size.gridSize * 30.5);
              },
              y: function () {
                var paddingTop = $scope.theme.isNikkei ? 0 : $scope.size.gridSize * 2.91;
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.height - (this.height($scope) + paddingTop * 2.5);
                }
                return $scope.size.height - (this.height($scope) + paddingTop );
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: true,
              defaultFilter: '',
              editable: {
                src: {
                  'None': $scope.theme.images.blank,
                  'UNFPA Color': $scope.theme.images.logoSrc,
                  'UNFPA Dark': $scope.theme.images.logoBW,
                  'UNFPA White': $scope.theme.images.logoWhite,
                  'UNFPA Grey': $scope.theme.images.logoAltSrc,
                  'SWOP English': $scope.theme.images.nikkeiAsianReviewLogoWideSrc,
                  'SWOP English (White)': $scope.theme.images.SWOPwh,
                  'Global Goals': $scope.theme.images.GlobalgoalsSrc,
                  'Global Goals (White)': $scope.theme.images.GlobalgoalsSrcWhite,
                  'SWOP Français': $scope.theme.images.SWOPfr,
                  'SWOP Français (White)': $scope.theme.images.SWOPfrWh,
                  'SWOP Español': $scope.theme.images.SWOPes,
                  'SWOP Español (White)': $scope.theme.images.SWOPesWh,
                  'WPD English': $scope.theme.images.WPD,
                  'WPD English (White)':   $scope.theme.images.WPDwh,
                  'WPD Français': $scope.theme.images.WPDfr,
                  'WPD Français (White)': $scope.theme.images.WPDfrWh,
                  'WPD Español': $scope.theme.images.WPDes,
                  'WPD Español (White)': $scope.theme.images.WPDesWh,
                  'Master Narrative English (Lockup A)': $scope.theme.images.MN,
                  'Master Narrative English (Lockup A) White': $scope.theme.images.MNwh,
                  'Master Narrative English (Lockup B)': $scope.theme.images.MNverb,
                  'Master Narrative English (Lockup B) White': $scope.theme.images.MNverbWh,
                  'Master Narrative Arabic': $scope.theme.images.MNar,
                  'Master Narrative Chinese': $scope.theme.images.MNch,
                  'Master Narrative Français': $scope.theme.images.MNfr,
                  'Master Narrative Español': $scope.theme.images.MNes                  
                },
                width: true,
              },          
            }];
          },
        }, {
          name: 'Quote Big',
          elements: function ($scope) {
            return [{
              name: 'Background Colour',
              type: 'rect',
              controlsOrder: 7,
              height: function () {
                return $scope.size.height;
              },
              width: function () {
                return $scope.size.width;
              },
              fill: function () {
                return $scope.theme.background;
              }
            }, {
              name: 'Pullquote',
              type: 'image',
              width: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 20; 
                }  
                else return $scope.size.gridSize * 10;
              },
              controlsOrder: 4,
              height: function () {
                if (typeof this.width === 'function') {
                  return this.width();
                }
                return this.width;
              },
              src: function () {
                return $scope.theme.images.pullquoteSrc || '';
              },
              opacity: 0.7,
              x: function () {
                return $scope.size.gridSize * -1;
              },
              y: function () {
                return $scope.size.gridSize * -.1;
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: true,
              defaultFilter: '',
              editable: {
                width: true,
              }
            }, {              
              name: 'Cross Reference Background',
              type: 'rect',
              controlsOrder: 5,
              height: function () {
                return $scope.size.gridSize * 3;
              },
              width: function () {
                return templateHelper.crossReferenceBackground.width($scope);
              },
              y: function () {
                return $scope.size.height - this.height();
              },
              fill: function () {
                return $scope.theme.xrefBackground;
              }
            }, {
              name: 'Logo',
              type: 'image',
              controlsOrder: 6,
              width: function () {
                return templateHelper.logo.width($scope);
              },
              height: function () {
                return templateHelper.logo.height($scope);
              },
              src: function () {
                return $scope.theme.images.logoSrc;
              },
              opacity: 1,
              x: function () {
                return templateHelper.logo.x($scope);
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {              
                return templateHelper.logo.y($scope) -18;
              }
                else return templateHelper.logo.y($scope);
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: {
                x: false,
                y: true
              }
            }, {
              name: 'Cross Reference Text',
              type: 'text',
              text: 'Read more at: unfpa.org/maternal-health',
              controlsOrder: 3,
              fill: function () {
                return $scope.theme.xref;
              },
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.template.isQuote ? 30 : 20; 
                }
                else return ($scope.size.name === 'Twitter') ? 20 : 16;
              },
              fontFamily: function () {
                return $scope.theme.xrefFont;
              },
              textAnchor: 'start',
              x: function () {
                return $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.height - ($scope.size.gridSize +3);
                }
                else return $scope.size.height - ($scope.size.gridSize);
              },
              fontWeight: 500,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fontSize: {
                  'X-Small (16px)': 16,
                  'Small (18px)': 18,
                  'Standard (22px)': 22,
                  'Large (24px)': 24,
                }
              },
            }, {
              name: 'Credit',
              type: 'text',
              text: 'BABATUNDE OSOTIMEHIN\nExecutive Director',
              controlsOrder: 2,
              fill: function () {
                return $scope.theme.quote;
              },
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {
                  return 25;
                }                
                return ($scope.size.name === 'Twitter') ? 23 : 17;
              },
              fontFamily: function () {
                return $scope.theme.creditFont;
              },
              textAnchor: 'start',
              textTransform: 'none',
              x: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize + 16;
                }
                else return $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 19;
                }                
                else return $scope.size.height - $scope.size.gridSize * 6;
              },
              fontWeight: 500,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fontSize: {
                  'Small (16px)': 16,
                  'Smallish (18px)': 18,
                  'Medium (20px': 20,
                  'Large (22px)': 22,
                  'Larger (24px)': 24,
                  'X-Large (26px)': 26,
                },
                fontFamily: {
                  'Eureka Regular': 'eureka-regular',
                  'Eureka Bold': 'eureka-bold',
                  'Eureka Italic': 'eureka-italic',
                  'Eureka Medium': 'eureka-medium',
                  'UNFPA Text': 'unfpatext',
                  'UNFPA Text Italic': 'unfpatextitalic',
                  'UNFPA Semibold': 'unfpasemibold',
                  'UNFPA Semibold Italic': 'unfpasemibolditalic',
                  'UNFPA Bold': 'unfpabold',
                },                
              },
            }, {
              name: 'Quote',
              type: 'text',

              text: 'No woman should\ndie giving life' +
              '',
              fill: function () {
                return $scope.theme.quote;
              },
              controlsOrder: 1,
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {
                  return 65;
                }                
                return ($scope.size.name === 'Twitter' ) ? 60 : 50;
              },
              fontFamily: function () {
                return $scope.theme.headlineFont;
              },
              textAnchor: 'start',
              x: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize + 16;
                }
                else return $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 11.5;
                }
                else return $scope.size.gridSize * 5;
              },
              fontWeight: 600,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fontSize: {
                  'Small (50px)': 50,
                  'Standard (60px)': 60,
                  'Standard (65px)': 65,                 
                  'Large (72px)': 72,
                },
              },
            }, {
              name: 'UNFPA Brand Extension Logos',
              type: 'image',
              width: function () {
                return $scope.size.width * 0.15;
              },
              controlsOrder: 20,
              height: function () {
                var h;
                if (typeof this.width === 'string') {
                  h = +this.width * .5;
                } else {
                  h = this.width() *.5;
                }
                return h;
              },
              src: '',
              opacity: 1,
              x: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 7.4;
                }
                return $scope.size.width - ($scope.theme.isNikkei ? this.width($scope) : $scope.size.gridSize * 30.5);
              },
              y: function () {
                var paddingTop = $scope.theme.isNikkei ? 0 : $scope.size.gridSize * 2.91;
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.height - (this.height($scope) + paddingTop * 2.5);
                }
                return $scope.size.height - (this.height($scope) + paddingTop );
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: true,
              defaultFilter: '',
              editable: {
                src: {
                  'None': $scope.theme.images.blank,
                  'UNFPA Color': $scope.theme.images.logoSrc,
                  'UNFPA Dark': $scope.theme.images.logoBW,
                  'UNFPA White': $scope.theme.images.logoWhite,
                  'UNFPA Grey': $scope.theme.images.logoAltSrc,
                  'SWOP English': $scope.theme.images.nikkeiAsianReviewLogoWideSrc,
                  'SWOP English (White)': $scope.theme.images.SWOPwh,
                  'Global Goals': $scope.theme.images.GlobalgoalsSrc,
                  'Global Goals (White)': $scope.theme.images.GlobalgoalsSrcWhite,
                  'SWOP Français': $scope.theme.images.SWOPfr,
                  'SWOP Français (White)': $scope.theme.images.SWOPfrWh,
                  'SWOP Español': $scope.theme.images.SWOPes,
                  'SWOP Español (White)': $scope.theme.images.SWOPesWh,
                  'WPD English': $scope.theme.images.WPD,
                  'WPD English (White)':   $scope.theme.images.WPDwh,
                  'WPD Français': $scope.theme.images.WPDfr,
                  'WPD Français (White)': $scope.theme.images.WPDfrWh,
                  'WPD Español': $scope.theme.images.WPDes,
                  'WPD Español (White)': $scope.theme.images.WPDesWh,
                  'Master Narrative English (Lockup A)': $scope.theme.images.MN,
                  'Master Narrative English (Lockup A) White': $scope.theme.images.MNwh,
                  'Master Narrative English (Lockup B)': $scope.theme.images.MNverb,
                  'Master Narrative English (Lockup B) White': $scope.theme.images.MNverbWh,
                  'Master Narrative Arabic': $scope.theme.images.MNar,
                  'Master Narrative Chinese': $scope.theme.images.MNch,
                  'Master Narrative Français': $scope.theme.images.MNfr,
                  'Master Narrative Español': $scope.theme.images.MNes                  
                },
                width: true,
              },                  
            }];
          }
        }, {
          name: 'Quote With Headshot',
          elements: function ($scope) {
            return [{
              name: 'Background Colour',
              type: 'rect',
              controlsOrder: 7,
              height: function () {
                return $scope.size.height;
              },
              width: function () {
                return $scope.size.width;
              },
              fill: function () {
                return $scope.theme.background;
              }
            }, {
              name: 'Image',
              type: 'image',
              width: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 30;
                }
                else return $scope.size.gridSize * 20;
              },
              controlsOrder: 2,
              height: function () {
                if (typeof this.width === 'function') {
                  return this.width();
                }
                return this.width;
              },
              src: function () {
                return $scope.theme.images.headshotSrc || '';
              },
              opacity: 1,
              x: function () {                                 
                var w;
                if (typeof this.width === 'function') {
                  w = this.width();
                } else {
                  w = +this.width;
                }
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.width - (w + $scope.size.gridSize *-7);
                }                
                else return $scope.size.width - (w + $scope.size.gridSize);
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 6;
                }
                else return $scope.size.gridSize;
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: true,
              defaultFilter: '',
              editable: {
                src: true,
                width: true,
                filters: [
                  'Grayscale'
                ],
              }
            }, {
              name: 'Cross Reference Background',
              type: 'rect',
              controlsOrder: 5,
              height: function () {
                return $scope.size.gridSize * 3;
              },
              width: function () {
                return templateHelper.crossReferenceBackground.width($scope);
              },
              y: function () {
                return $scope.size.height - this.height();
              },
              fill: function () {
                return $scope.theme.xrefBackground;
              }
            }, {
              name: 'Logo',
              type: 'image',
              controlsOrder: 6,
              width: function () {
                return templateHelper.logo.width($scope);
              },
              height: function () {
                return templateHelper.logo.height($scope);
              },
              src: function () {
                return $scope.theme.images.logoSrc;
              },
              opacity: 1,
              x: function () {
                return templateHelper.logo.x($scope);
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {              
                return templateHelper.logo.y($scope) -18;
              }
                else return templateHelper.logo.y($scope);
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: {
                x: false,
                y: true
              }
            }, {
              name: 'Cross Reference Text',
              type: 'text',
              text: 'Read more: unfpa.org/engaging-men-boys',
              controlsOrder: 4,
              fill: function () {
                return $scope.theme.xref;
              },
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.template.isQuote ? 20 : 20; 
                }
                else return ($scope.size.name === 'Twitter') ? 20 : 16;
              },
              fontFamily: function () {
                return $scope.theme.xrefFont;
              },
              textAnchor: 'start',
              x: function () {
                return $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.height - ($scope.size.gridSize +3);
                }
                else return $scope.size.height - ($scope.size.gridSize);
              },
              fontWeight: 500,
              draggable: true,
              editable: {
                text: true
              },
            }, {
              name: 'Credit',
              type: 'text',
              text: 'BABATUNDE OSOTIMEHIN\nExecutive Director',
              controlsOrder: 3,
              fill: function () {
                return $scope.theme.quote;
              },
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.template.isQuote ? 26 : 26; 
                }
                else return ($scope.size.name === 'Twitter') ? 22 : 16;
              },
              fontFamily: function () {
                return $scope.theme.creditFont;
              },
              textAnchor: 'start',
              textTransform: 'none',
              x: function () {
                return $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.height - $scope.size.gridSize * 12;
                }               
                else return $scope.size.height - $scope.size.gridSize * 6;
              },
              fontWeight: 500,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fontSize: {
                  'Small (16px)': 16,
                  'Large (22px)': 22,
                  'Larger (24px)': 24,
                  'Large (26px)': 26,
                },
                fontFamily: {
                  'Eureka Regular': 'eureka-regular',
                  'Eureka Bold': 'eureka-bold',
                  'Eureka Italic': 'eureka-italic',
                  'Eureka Medium': 'eureka-medium',
                  'UNFPA Text': 'unfpatext',
                  'UNFPA Text Italic': 'unfpatextitalic',
                  'UNFPA Semibold': 'unfpasemibold',
                  'UNFPA Semibold Italic': 'unfpasemibolditalic',
                  'UNFPA Bold': 'unfpabold',
                },                
              },
            }, {
              name: 'Headline',
              type: 'text',
              text: function () {
                if ($scope.size.name === 'Instagram') {
                 return 'How do we socialize\nboys to understand:\nWomen are engines\nof development, the\nsoul of communities?';
                }
                else return 'How do we socialize\nboys to understand:\nWomen are engines of\ndevelopment, the soul\nof communities?'
              },              
              fill: function () {
                return $scope.theme.quote;
              },
              controlsOrder: 1,
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.template.isQuote ? 36 : 36; 
                }
                else return ($scope.size.name === 'Twitter') ? 32 : 26;
              },
              fontFamily: function () {
                return $scope.theme.headlineFont;
              },
              textAnchor: 'start',
              x: function () {
                return $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 8;
                }
                else return $scope.size.gridSize * 3;
              },
              fontWeight: 600,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fontSize: {
                  'Facebook Default (26px)': 26,
                  'Twitter Default (32px)': 32,
                  'Instagram Default (40px)': 40,                
                  'Large (40px)': 40,
                  'X-Large (50px)': 50,
                },
              },
            }, {
              name: 'UNFPA Brand Extension Logos',
              type: 'image',
              width: function () {
                return $scope.size.width * 0.15;
              },
              controlsOrder: 20,
              height: function () {
                var h;
                if (typeof this.width === 'string') {
                  h = +this.width * .5;
                } else {
                  h = this.width() *.5;
                }
                return h;
              },
              src: '',
              opacity: 1,
              x: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 7.4;
                }
                return $scope.size.width - ($scope.theme.isNikkei ? this.width($scope) : $scope.size.gridSize * 30.5);
              },
              y: function () {
                var paddingTop = $scope.theme.isNikkei ? 0 : $scope.size.gridSize * 2.91;
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.height - (this.height($scope) + paddingTop * 2.5);
                }
                return $scope.size.height - (this.height($scope) + paddingTop );
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: true,
              defaultFilter: '',
              editable: {
                src: {
                  'None': $scope.theme.images.blank,
                  'UNFPA Color': $scope.theme.images.logoSrc,
                  'UNFPA Dark': $scope.theme.images.logoBW,
                  'UNFPA White': $scope.theme.images.logoWhite,
                  'UNFPA Grey': $scope.theme.images.logoAltSrc,
                  'SWOP English': $scope.theme.images.nikkeiAsianReviewLogoWideSrc,
                  'SWOP English (White)': $scope.theme.images.SWOPwh,
                  'Global Goals': $scope.theme.images.GlobalgoalsSrc,
                  'Global Goals (White)': $scope.theme.images.GlobalgoalsSrcWhite,
                  'SWOP Français': $scope.theme.images.SWOPfr,
                  'SWOP Français (White)': $scope.theme.images.SWOPfrWh,
                  'SWOP Español': $scope.theme.images.SWOPes,
                  'SWOP Español (White)': $scope.theme.images.SWOPesWh,
                  'WPD English': $scope.theme.images.WPD,
                  'WPD English (White)':   $scope.theme.images.WPDwh,
                  'WPD Français': $scope.theme.images.WPDfr,
                  'WPD Français (White)': $scope.theme.images.WPDfrWh,
                  'WPD Español': $scope.theme.images.WPDes,
                  'WPD Español (White)': $scope.theme.images.WPDesWh,
                  'Master Narrative English (Lockup A)': $scope.theme.images.MN,
                  'Master Narrative English (Lockup A) White': $scope.theme.images.MNwh,
                  'Master Narrative English (Lockup B)': $scope.theme.images.MNverb,
                  'Master Narrative English (Lockup B) White': $scope.theme.images.MNverbWh,
                  'Master Narrative Arabic': $scope.theme.images.MNar,
                  'Master Narrative Chinese': $scope.theme.images.MNch,
                  'Master Narrative Français': $scope.theme.images.MNfr,
                  'Master Narrative Español': $scope.theme.images.MNes                  
                },
                width: true,
              },                  
            }];
          }
        }, {
          name: 'Big Number',
          elements: function ($scope) {
            return [{
              name: 'Background Colour',
              type: 'rect',
              controlsOrder: 7,
              height: function () {
                return $scope.size.height;
              },
              width: function () {
                return $scope.size.width;
              },
              fill: function () {
                return $scope.theme.background;
              }
            }, {
              name: 'Image (Optional)',
              type: 'image',
              width: function () {
                return $scope.size.width * 0.6;
              },
              controlsOrder: 10,
              height: function () {
                var h;
                if (typeof this.width === 'string') {
                  h = +this.width;
                } else {
                  h = this.width();
                }
                return h;
              },
              src: '',
              opacity: 1,
              x: '0%',
              y: '0%',
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: true,
              defaultFilter: '',
              editable: {
                src: true,
                width: true,
                filters: [
                  'Grayscale'
                ],
              }           
            }, {
              name: 'Cross Reference Background',
              type: 'rect',
              controlsOrder: 5,
              height: function () {
                return $scope.size.gridSize * 3;
              },
              width: function () {
                return templateHelper.crossReferenceBackground.width($scope);
              },
              y: function () {
                return $scope.size.height - this.height();
              },
              fill: function () {
                return $scope.theme.xrefBackground;
              }
            }, {
              name: 'Logo',
              type: 'image',
              controlsOrder: 6,
              width: function () {
                return templateHelper.logo.width($scope);
              },
              height: function () {
                return templateHelper.logo.height($scope);
              },
              src: function () {
                return $scope.theme.images.logoSrc;
              },
              opacity: 1,
              x: function () {
                return templateHelper.logo.x($scope);
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {              
                return templateHelper.logo.y($scope) -18;
              }
                else return templateHelper.logo.y($scope);
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: {
                x: false,
                y: true
              }
            }, {
              name: 'Cross Reference Text',
              type: 'text',
              text: 'Read more at: unfpa.org/child-marriage',
              controlsOrder: 3,
              fill: function () {
                return $scope.theme.xref;
              },
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.template.isQuote ? 30 : 20; 
                }
                else return ($scope.size.name === 'Twitter') ? 20 : 16;
              }, 
              fontFamily: function () {
                return $scope.theme.xrefFont;
              },
              textAnchor: 'start',
              x: function () {
                return $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.height - ($scope.size.gridSize +3);
                }
                else return $scope.size.height - ($scope.size.gridSize);
              },
              fontWeight: 500,
              draggable: false,
              editable: {
                text: true,
                fontSize: {
                  'X-Small (16px)': 16,
                  'Small (18px)': 18,
                  'Medium (20px)': 20,                 
                  'Standard (22px)': 22,
                  'Large (24px)': 24,
                }
              },
            }, {
              name: 'Explanatory Text',
              type: 'text',
              text: 'girls in developing countries is\nmarried before reaching age 18.',
              controlsOrder: 2,
              fill: function () {
                return $scope.theme.quote;
              },
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {
                  return 34;
                }                
                else return ($scope.size.name === 'Twitter') ? 32 : 26;
              },
              fontFamily: function () {
                return $scope.theme.creditFont;
              },
              textAnchor: 'start',
              x: function () {
                return $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 15;
              }
                else return $scope.size.gridSize * 13;
              },
              fontWeight: 500,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fill: 'picker',
                fontSize: {
                  'X-Small (12px)': 12,
                  'Smaller (14px)': 14,
                  'Smallish (16px)': 16,
                  'Small (18px)': 18,
                  'Medium (20px)': 20,
                  'Standard (24px)': 24,
                  'Standard Plus (28px)': 28,
                  'Large (34px)': 34,
                  'X-Large (36px)': 36,
                  'XX-Large (44px)': 44,
                }
              },
            }, {
              name: 'Big Number',
              type: 'text',
              text: '1 in 3',
              fill: function () {
                return $scope.theme.highlightColor;
              },
              controlsOrder: 1,
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {
                  return 120;
              }
                else return ($scope.size.name === 'Facebook') ? 80 : 100;
              },
              fontFamily: function () {
                return $scope.theme.headlineFont;
              },
              textAnchor: 'start',
              x: function () {
                return $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 11;
              }
                else return $scope.size.gridSize * 7;
              },
              fontWeight: 600,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fill: 'picker',
              },
            }, {
              name: 'UNFPA Brand Extension Logos',
              type: 'image',
              width: function () {
                return $scope.size.width * 0.15;
              },
              controlsOrder: 20,
              height: function () {
                var h;
                if (typeof this.width === 'string') {
                  h = +this.width * .5;
                } else {
                  h = this.width() *.5;
                }
                return h;
              },
              src: '',
              opacity: 1,
              x: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 7.4;
                }
                return $scope.size.width - ($scope.theme.isNikkei ? this.width($scope) : $scope.size.gridSize * 30.5);
              },
              y: function () {
                var paddingTop = $scope.theme.isNikkei ? 0 : $scope.size.gridSize * 2.91;
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.height - (this.height($scope) + paddingTop * 2.5);
                }
                return $scope.size.height - (this.height($scope) + paddingTop );
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: true,
              defaultFilter: '',
              editable: {
                src: {
                  'None': $scope.theme.images.blank,
                  'UNFPA Color': $scope.theme.images.logoSrc,
                  'UNFPA Dark': $scope.theme.images.logoBW,
                  'UNFPA White': $scope.theme.images.logoWhite,
                  'UNFPA Grey': $scope.theme.images.logoAltSrc,
                  'SWOP English': $scope.theme.images.nikkeiAsianReviewLogoWideSrc,
                  'SWOP English (White)': $scope.theme.images.SWOPwh,
                  'Global Goals': $scope.theme.images.GlobalgoalsSrc,
                  'Global Goals (White)': $scope.theme.images.GlobalgoalsSrcWhite,
                  'SWOP Français': $scope.theme.images.SWOPfr,
                  'SWOP Français (White)': $scope.theme.images.SWOPfrWh,
                  'SWOP Español': $scope.theme.images.SWOPes,
                  'SWOP Español (White)': $scope.theme.images.SWOPesWh,
                  'WPD English': $scope.theme.images.WPD,
                  'WPD English (White)':   $scope.theme.images.WPDwh,
                  'WPD Français': $scope.theme.images.WPDfr,
                  'WPD Français (White)': $scope.theme.images.WPDfrWh,
                  'WPD Español': $scope.theme.images.WPDes,
                  'WPD Español (White)': $scope.theme.images.WPDesWh,
                  'Master Narrative English (Lockup A)': $scope.theme.images.MN,
                  'Master Narrative English (Lockup A) White': $scope.theme.images.MNwh,
                  'Master Narrative English (Lockup B)': $scope.theme.images.MNverb,
                  'Master Narrative English (Lockup B) White': $scope.theme.images.MNverbWh,
                  'Master Narrative Arabic': $scope.theme.images.MNar,
                  'Master Narrative Chinese': $scope.theme.images.MNch,
                  'Master Narrative Français': $scope.theme.images.MNfr,
                  'Master Narrative Español': $scope.theme.images.MNes                  
                },
                width: true,
              },                       
            }];
          }
        }, {
          name: 'Illustration',
          elements: function ($scope) {
            return [{
              name: 'Background Colour',
              type: 'rect',
              controlsOrder: 10,
              height: function () {
                return $scope.size.height;
              },
              width: function () {
                return $scope.size.width;
              },
              fill: '#ffffff'
            }, {
              name: 'Illustration',
              type: 'image',
              width: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.width * 1.4; 
                }
                else return ($scope.size.name === 'Twitter') ? $scope.size.width * 0.7 : $scope.size.width * 0.73;
              },
              controlsOrder: 1,
              height: function () {
                var h;
                if (typeof this.width === 'string') {
                  h = +this.width;
                } else {
                  h = this.width();
                }

                return h;
              },
              src: function () {
                return $scope.theme.images.illustrationSrc;
              },
              opacity: 1,
              x: 0,
              y: function () {
                return $scope.size.gridSize * -0.2;
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: true,
              defaultFilter: '',
              editable: {
                src: true,
                width: true,
                filters: [
                  'Grayscale'
                ],
              }
            }, {
              name: 'Side Explanation Background',
              type: 'rect',
              controlsOrder: 10,
              height: function () {
                return $scope.size.height;
              },
              width: function () {
                return $scope.size.width * 0.3;
              },
              y: '0%',
              x: function () {
                return $scope.size.width - this.width();
              },
              fill: function () {
                return $scope.theme.xrefBackground;
              }
            }, {
              name: 'Logo',
              type: 'image',
              controlsOrder: 6,
              width: function () {
                return $scope.size.gridSize * ($scope.theme.isNikkei ? 12 : 5.1);
              },
              height: function () {
                return templateHelper.logo.height($scope);
              },
              src: function () {
                return $scope.theme.isNikkei ? $scope.theme.images.logoWideSrc : $scope.theme.images.logoSrc;
              },
              opacity: 1,
              x: function () {
                return $scope.size.width - ($scope.theme.isNikkei ? this.width($scope) : $scope.size.gridSize * 5.5);
              },
              y: function () {
                return $scope.size.height - $scope.size.gridSize * 4.2
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: {
                x: false,
                y: true
              }
            }, {
              name: 'Ref Text',
              type: 'text',
              text: 'unfpa.org/\nxxx',
              controlsOrder: 3,
              fill: function () {
                return $scope.theme.xref;
              },
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {
                  return 16;
                }
                if ($scope.theme.isNikkei) return 0;
                return ($scope.size.name === 'Twitter') ? 16 : 12;
              },
              fontFamily: function () {
                return $scope.theme.xrefFont;
              },
              textAnchor: 'start',
              x: function () {
                var w = $scope.size.width;
                return (w - w * 0.3) + $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.height - ($scope.size.gridSize * ($scope.theme.isNikkei ? 4 : 2) + 128);;
                }
                else return $scope.size.height - ($scope.size.gridSize * ($scope.theme.isNikkei ? 4 : 2) + 2);
              },
              fontWeight: 500,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fontSize: {
                  'XX-Small (8px)': 8,
                  'X-Small (12px)': 12,
                  'Smaller (14px)': 14,
                  'Small (16px)': 16,
                  'Medium (18px)': 18,                  
                  'Large (22px)': 22,
                  'Larger (24px)': 24,
                  'X-Large (26px)': 26,
                },
                fontFamily: {
                  'Eureka Regular': 'eureka-regular',
                  'Eureka Bold': 'eureka-bold',
                  'Eureka Italic': 'eureka-italic',
                  'Eureka Medium': 'eureka-medium',
                  'UNFPA Text': 'unfpatext',
                  'UNFPA Text Italic': 'unfpatextitalic',
                  'UNFPA Semibold': 'unfpasemibold',
                  'UNFPA Semibold Italic': 'unfpasemibolditalic',
                  'UNFPA Bold': 'unfpabold',
                },
                textAnchor: {
                  'start': 'start',
                  'middle': 'middle',
                  'end': 'end',
                },
              },
            }, {
              name: 'Explanatory Text',
              type: 'text',
              text: 'Youth face\nlife-changing\ndecisions about\nreproductive\nhealth.\n\nThey deserve an\neducation that\nprepares them\nfor it.',
              controlsOrder: 2,
              fill: function () {
                return $scope.theme.xref;
              },
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {
                  return 21;
                }
                return ($scope.size.name === 'Twitter') ? 21 : 17;
              },
              fontFamily: function () {
                return $scope.theme.promoFont;
              },
              textAnchor: 'start',
              width: function () {
                return $scope.size.width * 0.3;
              },
              x: function () {
                var w = $scope.size.width;
                return (w - w * 0.3) + $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 8;
                }
                else return $scope.size.gridSize * 2;
              },
              fontWeight: 500,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fontSize: {
                  'X-Small (12px)': 12,
                  'Smaller (14px)': 14,
                  'Smallish (16px)': 16,
                  'Twitter Default (17px)': 17,
                  'Facebook Default (21px)': 21,
                  'Small (18px)': 18,
                  'Medium (20px)': 20,
                  'Standard (24px)': 24,
                  'Standard Plus (28px)': 28,
                  'Large (34px)': 34,
                  'X-Large (36px)': 36,
                  'XX-Large (44px)': 44,
                }
              },
            }, {
              name: 'UNFPA Brand Extension Logos',
              type: 'image',
              width: function () {
                return $scope.size.width * 0.15;
              },
              controlsOrder: 20,
              height: function () {
                var h;
                if (typeof this.width === 'string') {
                  h = +this.width * .5;
                } else {
                  h = this.width() *.5;
                }
                return h;
              },
              src: '',
              opacity: 1,
              x: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 7.4;
                }
                return $scope.size.width - ($scope.theme.isNikkei ? this.width($scope) : $scope.size.gridSize * 30.5);
              },
              y: function () {
                var paddingTop = $scope.theme.isNikkei ? 0 : $scope.size.gridSize * 2.91;
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.height - (this.height($scope) + paddingTop * 2.5);
                }
                return $scope.size.height - (this.height($scope) + paddingTop );
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: true,
              defaultFilter: '',
              editable: {
                src: {
                  'None': $scope.theme.images.blank,
                  'UNFPA Color': $scope.theme.images.logoSrc,
                  'UNFPA Dark': $scope.theme.images.logoBW,
                  'UNFPA White': $scope.theme.images.logoWhite,
                  'UNFPA Grey': $scope.theme.images.logoAltSrc,
                  'SWOP English': $scope.theme.images.nikkeiAsianReviewLogoWideSrc,
                  'SWOP English (White)': $scope.theme.images.SWOPwh,
                  'Global Goals': $scope.theme.images.GlobalgoalsSrc,
                  'Global Goals (White)': $scope.theme.images.GlobalgoalsSrcWhite,
                  'SWOP Français': $scope.theme.images.SWOPfr,
                  'SWOP Français (White)': $scope.theme.images.SWOPfrWh,
                  'SWOP Español': $scope.theme.images.SWOPes,
                  'SWOP Español (White)': $scope.theme.images.SWOPesWh,
                  'WPD English': $scope.theme.images.WPD,
                  'WPD English (White)':   $scope.theme.images.WPDwh,
                  'WPD Français': $scope.theme.images.WPDfr,
                  'WPD Français (White)': $scope.theme.images.WPDfrWh,
                  'WPD Español': $scope.theme.images.WPDes,
                  'WPD Español (White)': $scope.theme.images.WPDesWh,
                  'Master Narrative English (Lockup A)': $scope.theme.images.MN,
                  'Master Narrative English (Lockup A) White': $scope.theme.images.MNwh,
                  'Master Narrative English (Lockup B)': $scope.theme.images.MNverb,
                  'Master Narrative English (Lockup B) White': $scope.theme.images.MNverbWh,
                  'Master Narrative Arabic': $scope.theme.images.MNar,
                  'Master Narrative Chinese': $scope.theme.images.MNch,
                  'Master Narrative Français': $scope.theme.images.MNfr,
                  'Master Narrative Español': $scope.theme.images.MNes                  
                },
                width: true,
              },                       
            }];
          }
        }, {
          name: 'Chart: 1 Column',
          elements: function ($scope) {
            return [{
              name: 'Background Colour',
              type: 'rect',
              controlsOrder: 10,
              height: function () {
                return $scope.size.height;
              },
              width: function () {
                return $scope.size.width;
              },
              fill: function () {
                return $scope.theme.background;
              }
            }, {
              name: 'Graph',
              type: 'image',
              width: function () {
                return $scope.size.width * 0.6;
              },
              controlsOrder: 1,
              height: function () {
                var h;
                if (typeof this.width === 'string') {
                  h = +this.width;
                } else {
                  h = this.width();
                }

                if (h > ($scope.size.height - $scope.size.gridSize * 2)) {
                  h = $scope.size.height - $scope.size.gridSize * 2;
                }
                return h;
              },
              src: function () {
                return $scope.theme.images.graphSrc;
              },
              opacity: 1,
              x: function () {

                var areaW = $scope.size.width * 0.7;
                var picW = $scope.size.width * 0.45;
                var x = areaW / 2 - picW / 2;

                return x;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 8;
                }
                else return $scope.size.gridSize;
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: true,
              defaultFilter: '',
              editable: {
                src: true,
                width: true,
                filters: [
                  'Grayscale'
                ],
              }
            }, {
              name: 'Side Explanation Background',
              type: 'rect',
              controlsOrder: 10,
              height: function () {
                return $scope.size.height;
              },
              width: function () {
                return $scope.size.width * 0.3;
              },
              y: '0%',
              x: function () {
                return $scope.size.width - this.width();
              },
              fill: function () {
                return $scope.theme.xrefBackground;
              }
            }, {
              name: 'Logo',
              type: 'image',
              controlsOrder: 6,
              width: function () {
                return $scope.size.gridSize * ($scope.theme.isNikkei ? 12 : 5.1);
              },
              height: function () {
                return templateHelper.logo.height($scope);
              },
              src: function () {
                return $scope.theme.isNikkei ? $scope.theme.images.logoWideSrc : $scope.theme.images.logoSrc;
              },
              opacity: 1,
              x: function () {
                return $scope.size.width - ($scope.theme.isNikkei ? this.width($scope) : $scope.size.gridSize * 5.5);
              },
              y: function () {
                return $scope.size.height - $scope.size.gridSize * 4.2
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: {
                x: false,
                y: true
              }
            }, {
              name: 'Reference Text',
              type: 'text',
              text: '#Midwives\nMatter',
              controlsOrder: 3,
              fill: function () {
                return $scope.theme.xref;
              },
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {
                  return 16;
                }
                else return ($scope.size.name === 'Twitter') ? 16 : 12;
              },
              fontFamily: function () {
                return $scope.theme.xrefFont;
              },
              textAnchor: function () {
                if ($scope.size.name === 'Instagram') {
                  return 'end'; 
                }                
                else return 'start'
              },
              
              x: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 31.4;
                }
                else return $scope.size.gridSize * 28.6;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.height - ($scope.size.gridSize * ($scope.theme.isNikkei ? 4 : 2) + 48);
                }
                else return $scope.size.height - ($scope.size.gridSize * ($scope.theme.isNikkei ? 4 : 2) + 2);
              },
              fontWeight: 500,
              draggable: true,
              editable: {
                text: true
              }
            }, {
              name: 'Explanatory Text',
              type: 'text',
              text: 'Every day,\nmore than\n800 women\ndie from\ncomplications\nof childbirth\nand pregnancy',
              controlsOrder: 2,
              fill: function () {
                return $scope.theme.xref;
              },
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {
                  return 22;
                }
                return ($scope.size.name === 'Twitter') ? 22 : 18;
              },
              fontFamily: function () {
                return $scope.theme.promoFont;
              },
              textAnchor: 'start',
              width: function () {
                return $scope.size.width * 0.3;
              },
              x: function () {
                var w = $scope.size.width;
                return (w - w * 0.3) + $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 8;
                }
                else return $scope.size.gridSize * 2;
              },
              fontWeight: 500,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fontSize: {
                  'X-Small (12px)': 12,
                  'Smaller (14px)': 14,
                  'Smallish (16px)': 16,
                  'Medium (20px)': 20,
                  'Default Twitter (22px)': 22,
                  'Default Facebook (18px)': 18,
                  'Standard (24px)': 24,
                  'Standard Plus (28px)': 28,
                  'Large (34px)': 34,
                  'X-Large (36px)': 36,
                  'XX-Large (44px)': 44,
                }
              },
            }, {
              name: 'UNFPA Brand Extension Logos',
              type: 'image',
              width: function () {
                return $scope.size.width * 0.15;
              },
              controlsOrder: 20,
              height: function () {
                var h;
                if (typeof this.width === 'string') {
                  h = +this.width * .5;
                } else {
                  h = this.width() *.5;
                }
                return h;
              },
              src: '',
              opacity: 1,
              x: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 7.4;
                }
                return $scope.size.width - ($scope.theme.isNikkei ? this.width($scope) : $scope.size.gridSize * 30.5);
              },
              y: function () {
                var paddingTop = $scope.theme.isNikkei ? 0 : $scope.size.gridSize * 2.91;
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.height - (this.height($scope) + paddingTop * 2.5);
                }
                return $scope.size.height - (this.height($scope) + paddingTop );
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: true,
              defaultFilter: '',
              editable: {
                src: {
                  'None': $scope.theme.images.blank,
                  'UNFPA Color': $scope.theme.images.logoSrc,
                  'UNFPA Dark': $scope.theme.images.logoBW,
                  'UNFPA White': $scope.theme.images.logoWhite,
                  'UNFPA Grey': $scope.theme.images.logoAltSrc,
                  'SWOP English': $scope.theme.images.nikkeiAsianReviewLogoWideSrc,
                  'SWOP English (White)': $scope.theme.images.SWOPwh,
                  'Global Goals': $scope.theme.images.GlobalgoalsSrc,
                  'Global Goals (White)': $scope.theme.images.GlobalgoalsSrcWhite,
                  'SWOP Français': $scope.theme.images.SWOPfr,
                  'SWOP Français (White)': $scope.theme.images.SWOPfrWh,
                  'SWOP Español': $scope.theme.images.SWOPes,
                  'SWOP Español (White)': $scope.theme.images.SWOPesWh,
                  'WPD English': $scope.theme.images.WPD,
                  'WPD English (White)':   $scope.theme.images.WPDwh,
                  'WPD Français': $scope.theme.images.WPDfr,
                  'WPD Français (White)': $scope.theme.images.WPDfrWh,
                  'WPD Español': $scope.theme.images.WPDes,
                  'WPD Español (White)': $scope.theme.images.WPDesWh,
                  'Master Narrative English (Lockup A)': $scope.theme.images.MN,
                  'Master Narrative English (Lockup A) White': $scope.theme.images.MNwh,
                  'Master Narrative English (Lockup B)': $scope.theme.images.MNverb,
                  'Master Narrative English (Lockup B) White': $scope.theme.images.MNverbWh,
                  'Master Narrative Arabic': $scope.theme.images.MNar,
                  'Master Narrative Chinese': $scope.theme.images.MNch,
                  'Master Narrative Français': $scope.theme.images.MNfr,
                  'Master Narrative Español': $scope.theme.images.MNes                  
                },
                width: true,
              },                       
            }];
          }
        }, {
          name: 'Chart: 2 Column',
          elements: function ($scope) {
            return [{
              name: 'Background Colour',
              type: 'rect',
              controlsOrder: 7,
              height: function () {
                return $scope.size.height;
              },
              width: function () {
                return $scope.size.width;
              },
              fill: function () {
                return $scope.theme.background;
              }
            }, {
              name: 'Graph',
              type: 'image',
              width: function () {
                return $scope.size.width * 0.7;
              },
              controlsOrder: 1,
              height: function () {
                var h;
                if (typeof this.width === 'string') {
                  h = +this.width;
                } else {
                  h = this.width();
                }

                if (h > ($scope.size.height - $scope.size.gridSize * 2)) {
                  h = $scope.size.height - $scope.size.gridSize * 2;
                }
                return h;
              },
              src: function () {
                return $scope.theme.images.graphWideSrc;
              },
              opacity: 1,
              x: function () {
                return $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 8;
                }
                else return $scope.size.gridSize;
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: true,
              defaultFilter: '',
              editable: {
                src: true,
                width: true,
                filters: [
                  'Grayscale'
                ],
              }
            }, {
              name: 'Side Explanation Background',
              type: 'rect',
              controlsOrder: 5,
              height: function () {
                return $scope.size.height;
              },
              width: function () {
                return $scope.size.width * 0.25;
              },
              y: '0%',
              x: function () {
                return $scope.size.width - this.width();
              },
              fill: function () {
                return $scope.theme.xrefBackground;
              }
            }, {
              name: 'Logo',
              type: 'image',
              controlsOrder: 6,
              width: function () {
                return $scope.size.gridSize * ($scope.theme.isNikkei ? 10 : 6);
              },
              height: function () {
                return $scope.size.gridSize * ($scope.theme.isNikkei ? 3 : 6);
              },
              src: function () {
                return $scope.theme.isNikkei ? $scope.theme.images.logoWideSrc : $scope.theme.images.logoSrc;
              },
              opacity: 1,
              x: function () {
                return $scope.size.width - ($scope.theme.isNikkei ? this.width($scope) : $scope.size.gridSize * 6.5);
              },
              y: function () {
                var paddingTop = $scope.theme.isNikkei ? 0 : $scope.size.gridSize * -1.2 ;
                return $scope.size.height - (this.height($scope) + paddingTop);
              },
              preserveAspectRatio: 'xMidYMid slice',
              draggable: {
                x: false,
                y: true
              }
            }, {
              name: 'Reference Text',
              type: 'text',
              text: 'unfpa.org/\nsdgs',
              controlsOrder: 3,
              fill: function () {
                return $scope.theme.xref;
              },
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {
                  return 16;
                }
                else return ($scope.size.name === 'Twitter') ? 16 : 12;
              },
              fontFamily: function () {
                return $scope.theme.xrefFont;
              },
              textAnchor: 'end',
              x: function () {
                var w = $scope.size.width;
                return (w - w * 0.04) + $scope.size.gridSize;
              },
              y: function () {
                return $scope.size.height - ($scope.size.gridSize * ($scope.theme.isNikkei ? 4 : 5) + 2);
              },
              fontWeight: 500,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true
              }
            }, {
              name: 'Explanatory Text',
              type: 'text',
              text: 'What attracts\nmillions of new\nusers to\nfamily planning?\n\nA) rights-based\napproaches\nB) better options\nC) all the above',
              controlsOrder: 2,
              fill: function () {
                return $scope.theme.xref;
              },
              fontSize: function () {
                return ($scope.size.name === 'Facebook') ? 13 : 17;
              },
              fontFamily: function () {
                return $scope.theme.promoFont;
              },
              textAnchor: 'start',
              width: function () {
                return $scope.size.width * 0.25;
              },
              x: function () {
                var w = $scope.size.width;
                return (w - w * 0.26) + $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 12;
                }
                else return $scope.size.gridSize * 2;
              },
              fontWeight: 500,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fontSize: {
                  'X-Small (12px)': 12,
                  'Smaller (14px)': 14,
                  'Smallish (16px)': 16,
                  'Small (18px)': 18,
                  'Medium (20px)': 20,
                  'Standard (24px)': 24,
                  'Standard Plus (28px)': 28,
                  'Large (34px)': 34,
                  'X-Large (36px)': 36,
                  'XX-Large (44px)': 44,
                }
              },
            }, {
              name: 'UNFPA Brand Extension Logos',
              type: 'image',
              width: function () {
                return $scope.size.width * 0.15;
              },
              controlsOrder: 20,
              height: function () {
                var h;
                if (typeof this.width === 'string') {
                  h = +this.width * .5;
                } else {
                  h = this.width() *.5;
                }
                return h;
              },
              src: '',
              opacity: 1,
              x: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 7.4;
                }
                return $scope.size.width - ($scope.theme.isNikkei ? this.width($scope) : $scope.size.gridSize * 30.5);
              },
              y: function () {
                var paddingTop = $scope.theme.isNikkei ? 0 : $scope.size.gridSize * 2.91;
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.height - (this.height($scope) + paddingTop * 2.5);
                }
                return $scope.size.height - (this.height($scope) + paddingTop );
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: true,
              defaultFilter: '',
              editable: {
                src: {
                  'None': $scope.theme.images.blank,
                  'UNFPA Color': $scope.theme.images.logoSrc,
                  'UNFPA Dark': $scope.theme.images.logoBW,
                  'UNFPA White': $scope.theme.images.logoWhite,
                  'UNFPA Grey': $scope.theme.images.logoAltSrc,
                  'SWOP English': $scope.theme.images.nikkeiAsianReviewLogoWideSrc,
                  'SWOP English (White)': $scope.theme.images.SWOPwh,
                  'Global Goals': $scope.theme.images.GlobalgoalsSrc,
                  'Global Goals (White)': $scope.theme.images.GlobalgoalsSrcWhite,
                  'SWOP Français': $scope.theme.images.SWOPfr,
                  'SWOP Français (White)': $scope.theme.images.SWOPfrWh,
                  'SWOP Español': $scope.theme.images.SWOPes,
                  'SWOP Español (White)': $scope.theme.images.SWOPesWh,
                  'WPD English': $scope.theme.images.WPD,
                  'WPD English (White)':   $scope.theme.images.WPDwh,
                  'WPD Français': $scope.theme.images.WPDfr,
                  'WPD Français (White)': $scope.theme.images.WPDfrWh,
                  'WPD Español': $scope.theme.images.WPDes,
                  'WPD Español (White)': $scope.theme.images.WPDesWh,
                  'Master Narrative English (Lockup A)': $scope.theme.images.MN,
                  'Master Narrative English (Lockup A) White': $scope.theme.images.MNwh,
                  'Master Narrative English (Lockup B)': $scope.theme.images.MNverb,
                  'Master Narrative English (Lockup B) White': $scope.theme.images.MNverbWh,
                  'Master Narrative Arabic': $scope.theme.images.MNar,
                  'Master Narrative Chinese': $scope.theme.images.MNch,
                  'Master Narrative Français': $scope.theme.images.MNfr,
                  'Master Narrative Español': $scope.theme.images.MNes                  
                },
                width: true,
              },                       
            }];
          }
        }, {
          name: 'Promo A',
          elements: function ($scope) {
            return [{
              name: 'Background Colour',
              type: 'rect',
              controlsOrder: 7,
              height: function () {
                return $scope.size.height;
              },
              width: function () {
                return $scope.size.width;
              },
              fill: function () {
                return $scope.theme.background;
              }
            }, {
              name: 'Promo Image',
              type: 'image',          
              width: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.width * 1.4;
                }
                else return $scope.size.width;
              },
              controlsOrder: 1,
              height: function () {
                var h;
                if (typeof this.width === 'string') {
                  h = +this.width;
                } else {
                  h = this.width();
                }
                return h;
              },
              src: function () {
                return $scope.theme.images.promoSrc;
              },
              opacity: 1,
              x: '0%',
              y: '0%',
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: true,
              defaultFilter: '',
              editable: {
                src: true,
                width: true,
                filters: [
                  'Grayscale'
                ],
              }
            }, {
              name: 'Cross Reference Background',
              type: 'rect',
              controlsOrder: 5,
              height: function () {
                return $scope.size.gridSize * 3;
              },
              width: function () {
                return templateHelper.crossReferenceBackground.width($scope);
              },
              y: function () {
                return $scope.size.height - this.height();
              },
              fill: function () {
                return $scope.theme.xrefBackground;
              }
            }, {
              name: 'Logo',
              type: 'image',
              controlsOrder: 6,
              width: function () {
                return templateHelper.logo.width($scope);
              },
              height: function () {
                return templateHelper.logo.height($scope);
              },
              src: function () {
                return $scope.theme.images.logoSrc;
              },
              opacity: 1,
              x: function () {
                return templateHelper.logo.x($scope);
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {              
                return templateHelper.logo.y($scope) -18;
              }
                else return templateHelper.logo.y($scope);
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: {
                x: false,
                y: true
              }
            }, {
              name: 'Cross Reference Text',
              type: 'text',
              text: '#SafeBirthEvenHere',
              controlsOrder: 2,
              fill: function () {
                return $scope.theme.xref;
              },
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.template.isQuote ? 30 : 20; 
                }
                else return ($scope.size.name === 'Twitter') ? 20 : 16;
              },  
              fontFamily: function () {
                return $scope.theme.xrefFont;
              },
              textAnchor: 'start',
              x: function () {
                return $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.height - ($scope.size.gridSize +3);
                }
                else return $scope.size.height - ($scope.size.gridSize);
              },
              fontWeight: 500,
              draggable: false,
              editable: {
                text: true,
                fontSize: {
                  'X-Small (16px)': 16,
                  'Small (18px)': 18,
                  'Standard (22px)': 22,
                  'Large (24px)': 24,
                }
              },
            }, {
              name: 'UNFPA Brand Extension Logos',
              type: 'image',
              width: function () {
                return $scope.size.width * 0.25;
              },
              controlsOrder: 20,
              height: function () {
                var h;
                if (typeof this.width === 'string') {
                  h = +this.width;
                } else {
                  h = this.width();
                }
                return h;
              },
              src: '',
              opacity: 1,
              x: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 7.4;
                }
                return $scope.size.width - ($scope.theme.isNikkei ? this.width($scope) : $scope.size.gridSize * 30.5);
              },
              y: function () {
                var paddingTop = $scope.theme.isNikkei ? 0 : $scope.size.gridSize * 2.91;
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.height - (this.height($scope) + paddingTop * 2.5);
                }
                return $scope.size.height - (this.height($scope) + paddingTop );
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: false,
              defaultFilter: '',
              editable: {
                src: {
                  'None': $scope.theme.images.blank,
                  'UNFPA Color': $scope.theme.images.logoSrc,
                  'UNFPA Dark': $scope.theme.images.logoBW,
                  'UNFPA White': $scope.theme.images.logoWhite,
                  'UNFPA Grey': $scope.theme.images.logoAltSrc,
                  'SWOP English': $scope.theme.images.nikkeiAsianReviewLogoWideSrc,
                  'SWOP English (White)': $scope.theme.images.SWOPwh,
                  'Global Goals': $scope.theme.images.GlobalgoalsSrc,
                  'Global Goals (White)': $scope.theme.images.GlobalgoalsSrcWhite,
                  'SWOP Français': $scope.theme.images.SWOPfr,
                  'SWOP Français (White)': $scope.theme.images.SWOPfrWh,
                  'SWOP Español': $scope.theme.images.SWOPes,
                  'SWOP Español (White)': $scope.theme.images.SWOPesWh,
                  'WPD English': $scope.theme.images.WPD,
                  'WPD English (White)':   $scope.theme.images.WPDwh,
                  'WPD Français': $scope.theme.images.WPDfr,
                  'WPD Français (White)': $scope.theme.images.WPDfrWh,
                  'WPD Español': $scope.theme.images.WPDes,
                  'WPD Español (White)': $scope.theme.images.WPDesWh,
                  'Master Narrative English (Lockup A)': $scope.theme.images.MN,
                  'Master Narrative English (Lockup A) White': $scope.theme.images.MNwh,
                  'Master Narrative English (Lockup B)': $scope.theme.images.MNverb,
                  'Master Narrative English (Lockup B) White': $scope.theme.images.MNverbWh,
                  'Master Narrative Arabic': $scope.theme.images.MNar,
                  'Master Narrative Chinese': $scope.theme.images.MNch,
                  'Master Narrative Français': $scope.theme.images.MNfr,
                  'Master Narrative Español': $scope.theme.images.MNes                  
                },
                width: true,
              },                   
            }];
          }
        }, {
          name: 'Promo B',
          elements: function ($scope) {
            return [{
              name: 'Background Colour',
              type: 'rect',
              controlsOrder: 7,
              height: function () {
                return $scope.size.height;
              },
              width: function () {
                return $scope.size.width;
              },
              fill: function () {
                return $scope.theme.background;
              }
            }, {
              name: 'Promo Image',
              type: 'image',
              width: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.width * 1.5; 
                }
                else return ($scope.size.name === 'Twitter') ? $scope.size.width * 0.75 : $scope.size.width * 0.79;
              },
              controlsOrder: 1,
              height: function () {
                var h;
                if (typeof this.width === 'string') {
                  h = +this.width;
                } else {
                  h = this.width();
                }
                return h;
              },
              src: function () {
                return $scope.theme.images.promoSrc;
              },
              opacity: 1,
              x: function () {
                if ($scope.size.name === 'Instagram') {
                  return '-15%';
                }
                else return '0%';
                },
              y: '0%',
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: true,
              defaultFilter: '',
              editable: {
                src: true,
                width: true,
                filters: [
                  'Grayscale'
                ],
              }
            }, {
              name: 'Side Explanation Background',
              type: 'rect',
              controlsOrder: 5,
              height: function () {
                return $scope.size.height;
              },
              width: function () {
                return $scope.size.width * 0.25;
              },
              y: '0%',
              x: function () {
                return $scope.size.width - this.width();
              },
              fill: function () {
                return $scope.theme.xrefBackground;
              }
            }, {
              name: 'Logo',
              type: 'image',
              controlsOrder: 6,
              width: function () {
                return $scope.size.gridSize * ($scope.theme.isNikkei ? 10 : 6);
              },
              height: function () {
                return $scope.size.gridSize * ($scope.theme.isNikkei ? 3 : 6);
              },
              src: function () {
                return $scope.theme.isNikkei ? $scope.theme.images.logoWideSrc : $scope.theme.images.logoSrc;
              },
              opacity: 1,
              x: function () {
                return $scope.size.width - ($scope.theme.isNikkei ? this.width($scope) : $scope.size.gridSize * 6.5);
              },
              y: function () {
                var paddingTop = $scope.theme.isNikkei ? 0 : $scope.size.gridSize * -1.2;
                return $scope.size.height - (this.height($scope) + paddingTop);
              },
              preserveAspectRatio: 'xMidYMid slice',
              draggable: {
                x: false,
                y: true
              }
            }, {
              name: 'Explanatory Text',
              type: 'text',
              text: 'Young\npeople take\nthe lead\nagainst\nZika in\nBrazil',
              controlsOrder: 2,
              fill: function () {
                return $scope.theme.xref;
              },
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {
                  return 22;
                }
                return ($scope.size.name === 'Twitter') ? 24 : 18;
              },
              fontFamily: function () {
                return $scope.theme.promoFont;
              },
              textAnchor: 'start',
              width: function () {
                return $scope.size.width * 0.25;
              },
              x: function () {
                var w = $scope.size.width;
                return (w - w * 0.25) + $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 10;
                }
                else return $scope.size.gridSize * 2;
              },
              fontWeight: 500,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fontSize: {
                  'X-Small (12px)': 12,
                  'Smaller (14px)': 14,
                  'Smallish (16px)': 16,
                  'Small (18px)': 18,
                  'Medium (20px)': 20,
                  'Standard (24px)': 24,
                  'Standard Plus (28px)': 28,
                  'Large (34px)': 34,
                  'X-Large (36px)': 36,
                  'XX-Large (44px)': 44,
                }
              },
            }, {
              name: 'UNFPA Brand Extension Logos',
              type: 'image',
              width: function () {
                return $scope.size.width * 0.15;
              },
              controlsOrder: 20,
              height: function () {
                var h;
                if (typeof this.width === 'string') {
                  h = +this.width * .5;
                } else {
                  h = this.width() *.5;
                }
                return h;
              },
              src: '',
              opacity: 1,
              x: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 7.4;
                }
                return $scope.size.width - ($scope.theme.isNikkei ? this.width($scope) : $scope.size.gridSize * 30.5);
              },
              y: function () {
                var paddingTop = $scope.theme.isNikkei ? 0 : $scope.size.gridSize * 2.91;
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.height - (this.height($scope) + paddingTop * 2.5);
                }
                return $scope.size.height - (this.height($scope) + paddingTop );
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: true,
              defaultFilter: '',
              editable: {
                src: {
                  'None': $scope.theme.images.blank,
                  'UNFPA Color': $scope.theme.images.logoSrc,
                  'UNFPA Dark': $scope.theme.images.logoBW,
                  'UNFPA White': $scope.theme.images.logoWhite,
                  'UNFPA Grey': $scope.theme.images.logoAltSrc,
                  'SWOP English': $scope.theme.images.nikkeiAsianReviewLogoWideSrc,
                  'SWOP English (White)': $scope.theme.images.SWOPwh,
                  'Global Goals': $scope.theme.images.GlobalgoalsSrc,
                  'Global Goals (White)': $scope.theme.images.GlobalgoalsSrcWhite,
                  'SWOP Français': $scope.theme.images.SWOPfr,
                  'SWOP Français (White)': $scope.theme.images.SWOPfrWh,
                  'SWOP Español': $scope.theme.images.SWOPes,
                  'SWOP Español (White)': $scope.theme.images.SWOPesWh,
                  'WPD English': $scope.theme.images.WPD,
                  'WPD English (White)':   $scope.theme.images.WPDwh,
                  'WPD Français': $scope.theme.images.WPDfr,
                  'WPD Français (White)': $scope.theme.images.WPDfrWh,
                  'WPD Español': $scope.theme.images.WPDes,
                  'WPD Español (White)': $scope.theme.images.WPDesWh,
                  'Master Narrative English (Lockup A)': $scope.theme.images.MN,
                  'Master Narrative English (Lockup A) White': $scope.theme.images.MNwh,
                  'Master Narrative English (Lockup B)': $scope.theme.images.MNverb,
                  'Master Narrative English (Lockup B) White': $scope.theme.images.MNverbWh,
                  'Master Narrative Arabic': $scope.theme.images.MNar,
                  'Master Narrative Chinese': $scope.theme.images.MNch,
                  'Master Narrative Français': $scope.theme.images.MNfr,
                  'Master Narrative Español': $scope.theme.images.MNes                  
                },
                width: true,
              },                       
            }];
          }
        }, {
          name: 'Promo C',
          elements: function ($scope) {
            return [{
              name: 'Background Colour',
              type: 'rect',
              controlsOrder: 7,
              height: function () {
                return $scope.size.height;
              },
              width: function () {
                return $scope.size.width;
              },
              fill: function () {
                return $scope.theme.background;
              }
            }, {
              name: 'Promo Image',
              type: 'image',
              width: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.width * 1.5; 
                }
                else return ($scope.size.name === 'Twitter') ? $scope.size.width * 0.75 : $scope.size.width * 0.784;
              },
              controlsOrder: 3,
              height: function () {
                var h;
                if (typeof this.width === 'string') {
                  h = +this.width;
                } else {
                  h = this.width();
                }
                return h;
              },
              src: function () {
                return $scope.theme.images.promoSrc;
              },
              opacity: 1,
              x: '0%',
              y: '0%',
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: true,
              defaultFilter: '',
              editable: {
                src: true,
                width: true,
                filters: [
                  'Grayscale'
                ],
              }
            }, {
              name: 'Side Explanation Background',
              type: 'rect',
              controlsOrder: 5,
              height: function () {
                return $scope.size.height;
              },
              width: function () {
                return $scope.size.width * 0.498;
              },
              y: '0%',
              x: function () {
                return $scope.size.width - this.width();
              },
              fill: function () {
                return $scope.theme.xrefBackground;
              }
            }, {
              name: 'Logo',
              type: 'image',
              controlsOrder: 6,
              width: function () {
                return $scope.size.gridSize * ($scope.theme.isNikkei ? 10 : 5.5);
              },
              height: function () {
                return $scope.size.gridSize * ($scope.theme.isNikkei ? 3 : 5.5);
              },
              src: function () {
                return $scope.theme.isNikkei ? $scope.theme.images.logoWideSrc : $scope.theme.images.logoSrc;
              },
              opacity: 1,
              x: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.width * 0.665;
                }                
                else return $scope.size.gridSize * 21;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 23;
                }
                else return ($scope.size.name === 'Twitter') ? $scope.size.gridSize *15 : $scope.size.gridSize *16;
              },
              preserveAspectRatio: 'xMidYMid slice',
              draggable: true,
              showHoverArea: true,
            }, {
              name: 'Explanatory Text',
              type: 'text',
              text: 'Death,\nsex,\nand\nfertility\n\n',
              controlsOrder: 1,
              fill: function () {
                return $scope.theme.xref;
              },
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {
                  return 44;
                }                
                else return ($scope.size.name === 'Twitter') ? 32 : 28;
              },
              fontFamily: function () {
                return $scope.theme.promoFont;
              },
              textAnchor: function () {
                if ($scope.size.name === 'Instagram') {
                  return 'middle'; 
                }                
                else return 'end'
              }, 
              width: function () {
                return $scope.size.width * 0.25;
              },
              x: function () {
                if ($scope.size.name === 'Instagram') {
                  return ($scope.size.gridSize) * 24.2;
                }
                else return ($scope.size.width - $scope.size.width * 0.08) + $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 11;
                }
                else return $scope.size.gridSize * 2.9;
              },
              fontWeight: 500,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fontSize: {
                  'X-Small (12px)': 12,
                  'Smaller (14px)': 14,
                  'Smallish (16px)': 16,
                  'Small (18px)': 18,
                  'Medium-ish (22px)': 22,
                  'Medium (20px)': 20,
                  'Standard (24px)': 24,
                  'Facebook Default (28px)': 28,
                  'X-Large (40px)': 40,
                  'Twitter Default (34px)': 34,
                  'Large (38px)': 38,
                  'XX-Large (44px)': 44,
                },
                textAnchor: {
                  'left': 'start',
                  'center': 'middle',
                  'right': 'end',
                },                
              },
            }, {
              name: 'More Text',
              type: 'text',
              text: 'Stories of\npopulation trends\nas they happen',
              controlsOrder: 2,
              fill: function () {
                return $scope.theme.xref;
              },
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {
                  return 22;
                }
                return ($scope.size.name === 'Twitter') ? 24 : 18;
              },
              fontFamily: 'eureka-bold',
              fontStyle: 'normal',
              textAnchor: function () {
                if ($scope.size.name === 'Instagram') {
                  return 'middle'; 
                }                
                else return 'end'
              }, 
              width: function () {
                return $scope.size.gridSize * 0.25;
              },
              x: function () {
                if ($scope.size.name === 'Instagram') {
                  return ($scope.size.gridSize) * 24.2;
                }
                else return ($scope.size.width - $scope.size.width * 0.08) + $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 20;
                }
                else return ($scope.size.name === 'Twitter') ? $scope.size.gridSize * 12.5 : $scope.size.gridSize * 13.5;
              },
              fontWeight: 300,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fontSize: {
                  'Small (18px)': 18,
                  'Medium (21px)': 21,
                  'Instagram Default (22px)': 22,                                  
                  'Standard (24px)': 24,
                  'Large (34px)': 34,
                },
                fontFamily: {
                  'Eureka Regular': 'eureka-regular',
                  'Eureka Bold': 'eureka-bold',
                  'Eureka Italic': 'eureka-italic',
                  'Eureka Medium': 'eureka-medium',
                  'UNFPA Text': 'unfpatext',
                  'UNFPA Text Italic': 'unfpatextitalic',
                  'UNFPA Semibold': 'unfpasemibold',
                  'UNFPA Semibold Italic': 'unfpasemibolditalic',
                  'UNFPA Bold': 'unfpabold',
                },
                textAnchor: {
                  'left': 'start',
                  'center': 'middle',
                  'right': 'end',
                },
              },
            }, {
              name: 'UNFPA Brand Extension Logos',
              type: 'image',
              width: function () {
                return $scope.size.width * 0.15;
              },
              controlsOrder: 20,
              height: function () {
                var h;
                if (typeof this.width === 'string') {
                  h = +this.width * .5;
                } else {
                  h = this.width() *.5;
                }
                return h;
              },
              src: '',
              opacity: 1,
              x: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 7.4;
                }
                return $scope.size.width - ($scope.theme.isNikkei ? this.width($scope) : $scope.size.gridSize * 30.5);
              },
              y: function () {
                var paddingTop = $scope.theme.isNikkei ? 0 : $scope.size.gridSize * 2.91;
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.height - (this.height($scope) + paddingTop * 2.5);
                }
                return $scope.size.height - (this.height($scope) + paddingTop );
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: true,
              defaultFilter: '',
              editable: {
                src: {
                  'None': $scope.theme.images.blank,
                  'UNFPA Color': $scope.theme.images.logoSrc,
                  'UNFPA Dark': $scope.theme.images.logoBW,
                  'UNFPA White': $scope.theme.images.logoWhite,
                  'UNFPA Grey': $scope.theme.images.logoAltSrc,
                  'SWOP English': $scope.theme.images.nikkeiAsianReviewLogoWideSrc,
                  'SWOP English (White)': $scope.theme.images.SWOPwh,
                  'Global Goals': $scope.theme.images.GlobalgoalsSrc,
                  'Global Goals (White)': $scope.theme.images.GlobalgoalsSrcWhite,
                  'SWOP Français': $scope.theme.images.SWOPfr,
                  'SWOP Français (White)': $scope.theme.images.SWOPfrWh,
                  'SWOP Español': $scope.theme.images.SWOPes,
                  'SWOP Español (White)': $scope.theme.images.SWOPesWh,
                  'WPD English': $scope.theme.images.WPD,
                  'WPD English (White)':   $scope.theme.images.WPDwh,
                  'WPD Français': $scope.theme.images.WPDfr,
                  'WPD Français (White)': $scope.theme.images.WPDfrWh,
                  'WPD Español': $scope.theme.images.WPDes,
                  'WPD Español (White)': $scope.theme.images.WPDesWh,
                  'Master Narrative English (Lockup A)': $scope.theme.images.MN,
                  'Master Narrative English (Lockup A) White': $scope.theme.images.MNwh,
                  'Master Narrative English (Lockup B)': $scope.theme.images.MNverb,
                  'Master Narrative English (Lockup B) White': $scope.theme.images.MNverbWh,
                  'Master Narrative Arabic': $scope.theme.images.MNar,
                  'Master Narrative Chinese': $scope.theme.images.MNch,
                  'Master Narrative Français': $scope.theme.images.MNfr,
                  'Master Narrative Español': $scope.theme.images.MNes                  
                },
                width: true,
              },                       
            }];
          }
        }, {          
          name: 'Donate Now',
          elements: function ($scope) {
            return [{
              name: 'Background Colour',
              type: 'rect',
              controlsOrder: 17,
              height: function () {
                return $scope.size.height;
              },
              width: function () {
                return $scope.size.width;
              },
              fill: function () {
                return $scope.theme.background;
              },
              editable: {
                fill: 'picker'
              }              
            }, {
              name: 'Header Background',
              type: 'rect',
              controlsOrder: 15,
              height: function () {
                return $scope.size.gridSize * 3;
              },
              width: function () {
                return $scope.size.width;
              },
              y: 0,
              fill: function () {
                return $scope.theme.highlightColor;
              },
              editable: {
                fill: 'picker'
              }              
            }, {
              name: 'Logo',
              type: 'image',
              controlsOrder: 16,
              width: function () {
                return templateHelper.logo.width($scope);
              },
              height: function () {
                return templateHelper.logo.height($scope);
              },
              src: function () {
                return $scope.theme.images.logoSrc;
              },
              opacity: 1,
              x: function () {
                return templateHelper.logo.x($scope);
              },
              y: function () {
                var paddingTop = $scope.theme.isNikkei ? 0 : $scope.size.gridSize;
                return $scope.size.height - (this.height($scope) + paddingTop * -1.1);
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: {
                x: true,
                y: false
              },
              editable: {
                src: {
                  'UNFPA Color': $scope.theme.images.logoSrc,
                  'UNFPA Dark': $scope.theme.images.logoBW,
                  'UNFPA White': $scope.theme.images.logoWhite,
                  'UNFPA Grey': $scope.theme.images.logoAltSrc,
                  'SWOP': $scope.theme.images.nikkeiAsianReviewLogoWideSrc,
                  'Global Goals': $scope.theme.images.GlobalgoalsSrc,
                  'Global Goals (White)': $scope.theme.images.GlobalgoalsSrcWhite,
                },
                width: true,
              }                
            }, {
              name: 'Bookmark',
              type: 'image',
              controlsOrder: 16,
              width: function () {
                return $scope.size.gridSize;
              },
              height: function () {
                return $scope.size.gridSize * 2;
              },
              src: function () {
                return $scope.theme.images.bookmark;
              },
              opacity: 1,
              x: function () {
                return $scope.size.width - (this.width() + $scope.size.gridSize);
              },
              y: function () {
                return (($scope.size.gridSize * 3.5) - this.height()) / 2;
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true
            }, {
              name: 'Header Text',
              type: 'text',
              text: 'Donate Now',
              textTransform: 'uppercase',
              controlsOrder: 1,
              fill: function () {
                return $scope.theme.donate;
              },
              fontSize: function () {
                return ($scope.size.name === 'Twitter') ? 24 : 18;
              },
              fontFamily: function () {
                return $scope.theme.xrefFont;
              },
              textAnchor: 'start',
              x: function () {
                return $scope.size.gridSize;
              },
              y: function () {
                return $scope.size.gridSize * 2;
              },
              fontWeight: 500,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fontSize: {
                  'Small (18px)': 18,
                  'Standard (24px)': 24,
                  'Large (28px)': 28,
                },
                fill: 'picker'
              },
            }, {
              name: 'Credit',
              type: 'text',
              text: function () {
                if ($scope.size.name === 'Instagram') {
                 return 'You can deliver hope and health\nto women with this heartbreaking\ninjury of childbearing — and prevent it\nfrom occurring in the first place.\n\n$10\nfeeds a recovering fistula patient\nfor two weeks.\n\n$60\npays for a Caesarean section\nto prevent the problem.';
                }
                else return 'You can deliver hope and health to women\nwith this heartbreaking injury of childbearing.\n\n$10 feeds a recovering fistula patient for two weeks.\n$60 pays for a Caesarean section to prevent the problem.'
              },
              controlsOrder: 3,
              fill: function () {
                return $scope.theme.quote;
              },
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {
                  return 28;
                }
                else return ($scope.size.name === 'Twitter') ? 22 : 18;
              },              
              fontFamily: function () {
                return $scope.theme.creditFont;
              },
              textAnchor: 'start',
              textTransform: 'none',
              x: function () {
                return $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 10;
                }
                else return $scope.size.height - $scope.size.gridSize *11.5;
              },
              fontWeight: 500,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fontSize: {
                  'Small (18px)': 18,
                  'Large (22px)': 22,
                },
                fill: 'picker'
              },
            }, {
              name: 'Read more',
              type: 'text',
              text: 'Contribute now at unfpa.org/donate',
              controlsOrder: 4,
              fill: function () {
                return $scope.theme.highlightColor;
              },
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {
                  return 20;
                }
                else return ($scope.size.name === 'Twitter') ? 18 : 14;
              },
              fontFamily: function () {
                return $scope.theme.creditFont;
              },
              textAnchor: 'start',
              textTransform: 'uppercase',
              x: function () {
                return $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.height - $scope.size.gridSize * 1.2;
                }
                else return $scope.size.height - $scope.size.gridSize;
              },
              fontWeight: 500,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fontSize: {
                  'Small (14px)': 14,
                  'Standard (18px)': 18,
                  'Large (22px)': 22,
                },
                fill: 'picker'
              },
            }, {
              name: 'Quote',
              type: 'text',
              text: 'Help end fistula',
              fill: function () {
                return $scope.theme.quote;
              },
              controlsOrder: 2,
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {
                  return 65;
                } 
                else return ($scope.size.name === 'Twitter') ? 44 : 34;
              },
              fontFamily: function () {
                return $scope.theme.headlineFont;
              },
              textAnchor: 'start',
              x: function () {
                return $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 7;
                }                                
                else return $scope.size.gridSize * 6;
              },
              fontWeight: 600,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fontSize: {
                  'Small (32px)': 32,
                  'Standard (44px)': 44,
                  'Large (50px)': 50,
                },
                fill: 'picker'
              },
            }, {
              name: 'UNFPA Brand Extension Logos',
              type: 'image',
              width: function () {
                return $scope.size.width * 0.15;
              },
              controlsOrder: 20,
              height: function () {
                var h;
                if (typeof this.width === 'string') {
                  h = +this.width * .5;
                } else {
                  h = this.width() *.5;
                }
                return h;
              },
              src: '',
              opacity: 1,
              x: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 7.4;
                }
                return $scope.size.width - ($scope.theme.isNikkei ? this.width($scope) : $scope.size.gridSize * 30.5);
              },
              y: function () {
                var paddingTop = $scope.theme.isNikkei ? 0 : $scope.size.gridSize * 2.91;
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.height - (this.height($scope) + paddingTop * 2.5);
                }
                return $scope.size.height - (this.height($scope) + paddingTop );
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: true,
              defaultFilter: '',
              editable: {
                src: {
                  'None': $scope.theme.images.blank,
                  'UNFPA Color': $scope.theme.images.logoSrc,
                  'UNFPA Dark': $scope.theme.images.logoBW,
                  'UNFPA White': $scope.theme.images.logoWhite,
                  'UNFPA Grey': $scope.theme.images.logoAltSrc,
                  'SWOP English': $scope.theme.images.nikkeiAsianReviewLogoWideSrc,
                  'SWOP English (White)': $scope.theme.images.SWOPwh,
                  'Global Goals': $scope.theme.images.GlobalgoalsSrc,
                  'Global Goals (White)': $scope.theme.images.GlobalgoalsSrcWhite,
                  'SWOP Français': $scope.theme.images.SWOPfr,
                  'SWOP Français (White)': $scope.theme.images.SWOPfrWh,
                  'SWOP Español': $scope.theme.images.SWOPes,
                  'SWOP Español (White)': $scope.theme.images.SWOPesWh,
                  'WPD English': $scope.theme.images.WPD,
                  'WPD English (White)':   $scope.theme.images.WPDwh,
                  'WPD Français': $scope.theme.images.WPDfr,
                  'WPD Français (White)': $scope.theme.images.WPDfrWh,
                  'WPD Español': $scope.theme.images.WPDes,
                  'WPD Español (White)': $scope.theme.images.WPDesWh,
                  'Master Narrative English (Lockup A)': $scope.theme.images.MN,
                  'Master Narrative English (Lockup A) White': $scope.theme.images.MNwh,
                  'Master Narrative English (Lockup B)': $scope.theme.images.MNverb,
                  'Master Narrative English (Lockup B) White': $scope.theme.images.MNverbWh,
                  'Master Narrative Arabic': $scope.theme.images.MNar,
                  'Master Narrative Chinese': $scope.theme.images.MNch,
                  'Master Narrative Français': $scope.theme.images.MNfr,
                  'Master Narrative Español': $scope.theme.images.MNes                  
                },
                width: true,
              },                       
            }];
          }
        }, {          
          name: 'Event Announcement',
          elements: function ($scope) {
            return [{
              name: 'Background Colour',
              type: 'rect',
              controlsOrder: 17,
              height: function () {
                return $scope.size.height;
              },
              width: function () {
                return $scope.size.width;
              },
              fill: function () {
                return $scope.theme.background;
              },
              editable: {
                fill: 'picker'
              }
            }, {
              name: 'Image or CoSponsor Logo (Optional)',
              type: 'image',
              width: function () {
                return $scope.size.width * 0.6;
              },
              controlsOrder: 13,
              height: function () {
                var h;
                if (typeof this.width === 'string') {
                  h = +this.width;
                } else {
                  h = this.width();
                }
                return h;
              },
              src: '',
              opacity: 1,
              x: '0%',
              y: '0%',
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: true,
              defaultFilter: '',
              editable: {
                src: true,
                width: true,
                filters: [
                  'Grayscale'
                ],
              }                         
            }, {
              name: 'Header Background',
              type: 'rect',
              controlsOrder: 15,
              height: function () {
                return $scope.size.gridSize * 3;
              },
              width: function () {
                return $scope.size.width;
              },
              y: 0,
              fill: function () {
                return $scope.theme.eventColor;
              },
              draggable: true,
              editable: {
                fill: 'picker'
              }            
            }, {
              name: 'Bell',
              type: 'image',
              controlsOrder: 16,
              width: function () {
                return $scope.size.gridSize;
              },
              height: function () {
                return $scope.size.gridSize * 2;
              },
              src: function () {
                return $scope.theme.images.bell;
              },
              opacity: 1,
              x: function () {
                return $scope.size.width - (this.width() + $scope.size.gridSize);
              },
              y: function () {
                return (($scope.size.gridSize * 3.5) - this.height()) / 2;
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,                          
            }, {
              name: 'Banner Text',
              type: 'text',
              text: 'Event Announcement',
              textTransform: 'uppercase',
              controlsOrder: 1,
              fill: function () {
                return $scope.theme.event;
              },
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {
                  return 24;
                }
                else return ($scope.size.name === 'Twitter') ? 24 : 18;
              }, 
              fontFamily: function () {
                return $scope.theme.xrefFont;
              },
              textAnchor: 'start',
              x: function () {
                return $scope.size.gridSize;
              },
              y: function () {
                return $scope.size.gridSize * 2;
              },
              fontWeight: 500,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fontSize: {
                  'Small (18px)': 18,
                  'Standard (24px)': 24,
                  'Large (28px)': 28,
                },               
                fill: 'picker'
              },
            }, {
              name: 'Logo',
              type: 'image',
              controlsOrder: 13,
              width: function () {
                return templateHelper.logo.width($scope);
              },
              height: function () {
                return templateHelper.logo.height($scope);
              },
              src: function () {
                return $scope.theme.images.logoSrc;
              },
              opacity: 1,
              x: function () {
                return templateHelper.logo.x($scope);
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                return $scope.size.height - (this.height($scope) + $scope.size.gridSize * -0.9);
                }                                
                else return $scope.size.height - (this.height($scope) + $scope.size.gridSize * -1.1);
              },              
              preserveAspectRatio: 'xMinYMin meet',
              draggable: {
                x: true,
                y: true
              },
              editable: {
                src: {
                  'UNFPA Color': $scope.theme.images.logoSrc,
                  'UNFPA Dark': $scope.theme.images.logoBW,
                  'UNFPA White': $scope.theme.images.logoWhite,
                  'UNFPA Grey': $scope.theme.images.logoAltSrc,
                  'SWOP': $scope.theme.images.nikkeiAsianReviewLogoWideSrc,
                  'Global Goals': $scope.theme.images.GlobalgoalsSrc,
                  'Global Goals (White)': $scope.theme.images.GlobalgoalsSrcWhite,
                },                 
                width: true,
              }                           
            }, {
              name: 'When',
              type: 'text',
              text: '9:30 a.m. New York time, UTC -4',
              controlsOrder: 3,
              fill: function () {
                return $scope.theme.quote;
              },
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {
                  return 28;
                }
                else return ($scope.size.name === 'Twitter') ? 22 : 18;
              },   
              fontFamily: function () {
                return 'unfpasemibold';
              },
              textAnchor: 'start',
              textTransform: 'none',
              x: function () {
                return $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 12;
                }
                else return $scope.size.height - $scope.size.gridSize *10;
              },              
              fontWeight: 500,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fontSize: {
                  'Small (18px)': 18,
                  'Large (22px)': 22,
                },
                textAnchor: {
                  'left': 'start',
                  'center': 'middle',
                  'right': 'end',
                },                 
                fill: 'picker'
              },
            }, {
              name: 'Event details',
              type: 'text',
              text: function () {
                if ($scope.size.name === 'Instagram') {
                 return 'Got a question for the ED?\nYou can submit them now on Voices.';
                }
                else return 'Got a question for the ED? You can submit them now on Voices.'
              },              
              controlsOrder: 4,
              fill: function () {
                return $scope.theme.highlightColor;
              },
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {
                  return 22;
                }
                else return ($scope.size.name === 'Twitter') ? 18 : 14;
              },   
              fontFamily: function () {
                return $scope.theme.creditFont;
              },
              textAnchor: 'start',
              textTransform: 'none',
              x: function () {
                return $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 22;
                }
                else return $scope.size.height - $scope.size.gridSize *3;
              },      
              fontWeight: 500,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fontSize: {
                  'Small (14px)': 14,
                  'Standard (18px)': 18,
                  'Large (22px)': 22,
                },
                textAnchor: {
                  'start': 'start',
                  'middle': 'middle',
                  'end': 'end',
                },                 
                fill: 'picker'
              },
            }, {
              name: 'Where',
              type: 'text',
              text: 'Meet us in the Orange Café, \nor watch the livestream on Voices',
              controlsOrder: 3,
              fill: function () {
                return $scope.theme.quote;
              },
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {
                  return 25;
                }
                else return ($scope.size.name === 'Twitter') ? 18 : 14;
              },   
              fontFamily: function () {
                return $scope.theme.eventFont;
              },
              textAnchor: 'start',
              textTransform: 'none',
              x: function () {
                return $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 14;
                }
                else return $scope.size.height - $scope.size.gridSize * 7;
              },                 
              fontWeight: 500,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fontSize: {
                  'Small (14px)': 14,
                  'Standard (18px)': 18,
                  'Large (22px)': 22,
                },
                textAnchor: {
                  'left': 'start',
                  'center': 'middle',
                  'right': 'end',
                },                 
                fill: 'picker'
              },                  
            }, {
              name: 'What',
              type: 'text',
              text: 'General Staff Meeting',
              fill: function () {
                return $scope.theme.quote;
              },
              controlsOrder: 2,
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {
                  return 55;
                } 
                else return ($scope.size.name === 'Twitter') ? 44 : 34;
              },
              fontFamily: function () {
                return $scope.theme.headlineFont;
              },
              textAnchor: 'start',
              x: function () {
                return $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 7;
                }                                
                else return $scope.size.gridSize * 6;
              },
              fontWeight: 600,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fontSize: {
                  'Small (32px)': 32,
                  'Standard (44px)': 44,
                  'Large (50px)': 50,
                },
                textAnchor: {
                  'left': 'start',
                  'center': 'middle',
                  'right': 'end',
                },                 
                fill: 'picker'
              },
            }];
          }          
        }, {
          name: 'UNFPA Co-Sponsored -- Quote With Headshot (Fully Editable)',
          elements: function ($scope) {
            return [{
              name: 'Background Colour',
              type: 'rect',
              controlsOrder: 7,
              height: function () {
                return $scope.size.height;
              },
              width: function () {
                return $scope.size.width;
              },
              fill: function () {
                return $scope.theme.background;
              },
              editable: {
                fill: 'picker'
              }              
            }, {
              name: 'Image',
              type: 'image',
              width: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 30;
                }
                else return $scope.size.gridSize * 20;
              },
              controlsOrder: 2,
              height: function () {
                if (typeof this.width === 'function') {
                  return this.width();
                }
                return this.width;
              },
              src: function () {
                return $scope.theme.images.headshotSrc || '';
              },
              opacity: 1,
              x: function () {                                 
                var w;
                if (typeof this.width === 'function') {
                  w = this.width();
                } else {
                  w = +this.width;
                }
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.width - (w + $scope.size.gridSize *-7);
                }                
                else return $scope.size.width - (w + $scope.size.gridSize);
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 4;
                }
                else return $scope.size.gridSize;
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: true,
              defaultFilter: '',
              editable: {
                src: true,
                width: true,
                filters: [
                  'Grayscale'
                ],
              }          
            }, {
              name: 'Cross Reference Background',
              type: 'rect',
              controlsOrder: 5,
              height: function () {
                return $scope.size.gridSize * 3 + 5;
              },
              width: function () {
                return $scope.size.width + 10;
              },
              x: -5,
              y: function () {
                return $scope.size.height - this.height() + 5;
              },
              fill: function () {
                return $scope.theme.background;
              },
              stroke: function () {
                return $scope.theme.quote;
              }
            }, {
              name: 'Cosponsor Logo',
              type: 'image',
              width: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.width * 0.28;
                }              
                else return $scope.size.width * 0.24;
              },
              controlsOrder: 1,
              height: function () {
                var h;
                if (typeof this.width === 'string') {
                  h = +this.width;
                } else {
                  h = this.width();
                }
                return h;
              },
              src: function () {
                return $scope.theme.isNikkei ? $scope.theme.images.logoWideSrc : $scope.theme.images.GlobalgoalsSrc;
              },              opacity: 1,
              x: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.width - ($scope.theme.isNikkei ? this.width($scope) : $scope.size.gridSize * 10);
                }                
                else return $scope.size.width - ($scope.theme.isNikkei ? this.width($scope) : $scope.size.gridSize * 11);
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 26;
                }
                else return ($scope.size.name === 'Twitter') ? $scope.size.gridSize * 13.40 : $scope.size.gridSize *14.65;
              }, 
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: true,
              defaultFilter: '',
              editable: {
                src: true,
                width: true,
              }                
            }, {
              name: 'Logo',
              type: 'image',
              controlsOrder: 6,
              width: function () {
                return $scope.size.gridSize * ($scope.theme.isNikkei ? 10 : 5.5);
              },
              height: function () {
                return $scope.size.gridSize * ($scope.theme.isNikkei ? 3 : 5.5);
              },
              src: function () {
                return $scope.theme.isNikkei ? $scope.theme.images.logoWideSrc : $scope.theme.images.logoSrc;
              },
              opacity: 1,
              x: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize ;
                }                
                else return $scope.size.width - ($scope.theme.isNikkei ? this.width($scope) : $scope.size.gridSize * 39);
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 27.8;
                }
                else return ($scope.size.name === 'Twitter') ? $scope.size.gridSize *15.45 : $scope.size.gridSize *16.7;
              },     
              preserveAspectRatio: 'xMidYMid slice',
              draggable: true,
              showHoverArea: true,
              editable: {
                src: {
                  'UNFPA Color': $scope.theme.images.logoSrc,
                  'UNFPA Dark': $scope.theme.images.logoBW,
                  'UNFPA White': $scope.theme.images.logoWhite,
                  'UNFPA Grey': $scope.theme.images.logoAltSrc,
                  'SWOP English': $scope.theme.images.nikkeiAsianReviewLogoWideSrc,
                  'SWOP English (White)': $scope.theme.images.SWOPwh,
                  'Global Goals': $scope.theme.images.GlobalgoalsSrc,
                  'Global Goals (White)': $scope.theme.images.GlobalgoalsSrcWhite,
                  'SWOP Français': $scope.theme.images.SWOPfr,
                  'SWOP Français (White)': $scope.theme.images.SWOPfrWh,
                  'SWOP Español': $scope.theme.images.SWOPes,
                  'SWOP Español (White)': $scope.theme.images.SWOPesWh,
                  'WPD English': $scope.theme.images.WPD,
                  'WPD English (White)':   $scope.theme.images.WPDwh,
                  'WPD Français': $scope.theme.images.WPDfr,
                  'WPD Français (White)': $scope.theme.images.WPDfrWh,
                  'WPD Español': $scope.theme.images.WPDes,
                  'WPD Español (White)': $scope.theme.images.WPDesWh,
                  'Master Narrative English (Lockup A)': $scope.theme.images.MN,
                  'Master Narrative English (Lockup A) White': $scope.theme.images.MNwh,
                  'Master Narrative English (Lockup B)': $scope.theme.images.MNverb,
                  'Master Narrative English (Lockup B) White': $scope.theme.images.MNverbWh,
                  'Master Narrative Arabic': $scope.theme.images.MNar,
                  'Master Narrative Chinese': $scope.theme.images.MNch,
                  'Master Narrative Français': $scope.theme.images.MNfr,
                  'Master Narrative Español': $scope.theme.images.MNes                  
                },
                width: true,
              }
            }, {
              name: 'Credit',
              type: 'text',
              text: 'BABATUNDE OSOTIMEHIN on the\n#Goal5 target to #EndFGM',
              controlsOrder: 3,
              fill: function () {
                return $scope.theme.quote;
              },
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {              
                  return 22;
                }
                else return ($scope.size.name === 'Twitter') ? 22 : 16;
              },
              fontFamily: function () {
                return $scope.theme.creditFont;
              },
              textAnchor: 'start',
              textTransform: 'none',
              x: function () {
                  return $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {              
                  return $scope.size.height - $scope.size.gridSize * 12;
                }
                return $scope.size.height - $scope.size.gridSize * 6.5;
              },
              fontWeight: 500,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fontSize: {
                  'Small (16px)': 16,
                  'Large (22px)': 22,
                  'Larger (24px)': 24,
                  'X-Large (26px)': 26,
                },
                fontFamily: {
                  'Eureka Regular': 'eureka-regular',
                  'Eureka Bold': 'eureka-bold',
                  'Eureka Italic': 'eureka-italic',
                  'Eureka Medium': 'eureka-medium',
                  'UNFPA Text': 'unfpatext',
                  'UNFPA Text Italic': 'unfpatextitalic',
                  'UNFPA Semibold': 'unfpasemibold',
                  'UNFPA Semibold Italic': 'unfpasemibolditalic',
                  'UNFPA Bold': 'unfpabold',
                },
                fill: 'picker',
              },
            }, {
              name: 'Headline',
              type: 'text',
              text: 'There is absolutely no\nreason to cut anybody.\n\n'+
              'It’s child abuse.',
              fill: function () {
                return $scope.theme.quote;
              },
              controlsOrder: 1,
              fontSize: function () {
                if ($scope.size.name === 'Instagram') {
                  return 32;
                }
                return ($scope.size.name === 'Twitter') ? 32 : 24;
              },
              fontFamily: function () {
                return $scope.theme.headlineFont;
              },
              textAnchor: 'start',
              x: function () {
                return $scope.size.gridSize;
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 12;
                }
                return $scope.size.gridSize *3;
              },              
              fontWeight: 600,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fontSize: {
                  'Small (26px)': 26,
                  'Standard (32px)': 32,
                  'Large (40px)': 40,
                  'X-Large (50px)': 50,
                },
                fontFamily: {
                  'Eureka Regular': 'eureka-regular',
                  'Eureka Bold': 'eureka-bold',
                  'Eureka Italic': 'eureka-italic',
                  'Eureka Medium': 'eureka-medium',
                  'UNFPA Text': 'unfpatext',
                  'UNFPA Text Italic': 'unfpatextitalic',
                  'UNFPA Semibold': 'unfpasemibold',
                  'UNFPA Semibold Italic': 'unfpasemibolditalic',
                  'UNFPA Bold': 'unfpabold',
                },
                fill: 'picker',              
              },
            }, {
              name: 'UNFPA Brand Extension Logos',
              type: 'image',
              width: function () {
                return $scope.size.width * 0.15;
              },
              controlsOrder: 20,
              height: function () {
                var h;
                if (typeof this.width === 'string') {
                  h = +this.width * .5;
                } else {
                  h = this.width() *.5;
                }
                return h;
              },
              src: '',
              opacity: 1,
              x: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 7.4;
                }
                return $scope.size.width - ($scope.theme.isNikkei ? this.width($scope) : $scope.size.gridSize * 30.5);
              },
              y: function () {
                var paddingTop = $scope.theme.isNikkei ? 0 : $scope.size.gridSize * 2.91;
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.height - (this.height($scope) + paddingTop * 2.5);
                }
                return $scope.size.height - (this.height($scope) + paddingTop );
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: true,
              defaultFilter: '',
              editable: {
                src: {
                  'None': $scope.theme.images.blank,
                  'UNFPA Color': $scope.theme.images.logoSrc,
                  'UNFPA Dark': $scope.theme.images.logoBW,
                  'UNFPA White': $scope.theme.images.logoWhite,
                  'UNFPA Grey': $scope.theme.images.logoAltSrc,
                  'SWOP English': $scope.theme.images.nikkeiAsianReviewLogoWideSrc,
                  'SWOP English (White)': $scope.theme.images.SWOPwh,
                  'Global Goals': $scope.theme.images.GlobalgoalsSrc,
                  'Global Goals (White)': $scope.theme.images.GlobalgoalsSrcWhite,
                  'SWOP Français': $scope.theme.images.SWOPfr,
                  'SWOP Français (White)': $scope.theme.images.SWOPfrWh,
                  'SWOP Español': $scope.theme.images.SWOPes,
                  'SWOP Español (White)': $scope.theme.images.SWOPesWh,
                  'WPD English': $scope.theme.images.WPD,
                  'WPD English (White)':   $scope.theme.images.WPDwh,
                  'WPD Français': $scope.theme.images.WPDfr,
                  'WPD Français (White)': $scope.theme.images.WPDfrWh,
                  'WPD Español': $scope.theme.images.WPDes,
                  'WPD Español (White)': $scope.theme.images.WPDesWh,
                  'Master Narrative English (Lockup A)': $scope.theme.images.MN,
                  'Master Narrative English (Lockup A) White': $scope.theme.images.MNwh,
                  'Master Narrative English (Lockup B)': $scope.theme.images.MNverb,
                  'Master Narrative English (Lockup B) White': $scope.theme.images.MNverbWh,
                  'Master Narrative Arabic': $scope.theme.images.MNar,
                  'Master Narrative Chinese': $scope.theme.images.MNch,
                  'Master Narrative Français': $scope.theme.images.MNfr,
                  'Master Narrative Español': $scope.theme.images.MNes                  
                },
                width: true,
              },                       
            }];
          }
        }, {
          name: 'UNFPA Co-Sponsor Sidebar (Fully Editable)',
          elements: function ($scope) {
            return [{
              name: 'Background Colour',
              type: 'rect',
              controlsOrder: 10,
              height: function () {
                return $scope.size.height;
              },
              width: function () {
                return $scope.size.width;
              },
              fill: function () {
                return $scope.theme.background;
              },
              editable: {
                fill: 'picker'
              }
            }, {
              name: 'Any Image',
              type: 'image',
              width: function () {
                return $scope.size.width * 0.6;
              },
              controlsOrder: 3,
              height: function () {
                var h;
                if (typeof this.width === 'string') {
                  h = +this.width;
                } else {
                  h = this.width();
                }
                return h;
              },
              src: '',
              opacity: 1,
              x: '0%',
              y: '0%',
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: true,
              defaultFilter: '',
              editable: {
                src: true,
                width: true,
                filters: [
                  'Grayscale'
                ],
              }
            }, {
              name: 'Side Explanation Background',
              type: 'rect',
              controlsOrder: 10,
              height: function () {
                return $scope.size.height;
              },
              width: function () {
                return $scope.size.width * 0.3;
              },
              y: '0%',
              x: function () {
                return $scope.size.width - this.width();
              },
              fill: '#1e4b73',
              draggable: true,
              showHoverArea: true,
              editable: {
                fill: 'picker'
              }
            }, {
              name: 'Primary Logo',
              type: 'image',
              controlsOrder: 2,
              width: function () {
                return $scope.size.width * 0.3 - ($scope.size.gridSize * 2);
              },
              height: function () {
                return $scope.size.gridSize * 4;
              },
              src: function () {
                return $scope.theme.images.weekendSrc || $scope.theme.images.logoSrc;
              },
              opacity: 1,
              x: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.width - ($scope.size.gridSize * 8.5);
                }                
                else return $scope.size.width - ($scope.size.gridSize * 11);
              },
              y: function () {
                return $scope.size.gridSize;
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: true,
              editable: {
                src: {
                  'UNFPA Color': $scope.theme.images.logoSrc,
                  'UNFPA Dark': $scope.theme.images.logoBW,
                  'UNFPA White': $scope.theme.images.logoWhite,
                  'UNFPA Grey': $scope.theme.images.logoAltSrc,
                  'SWOP English': $scope.theme.images.nikkeiAsianReviewLogoWideSrc,
                  'SWOP English (White)': $scope.theme.images.SWOPwh,
                  'Global Goals': $scope.theme.images.GlobalgoalsSrc,
                  'Global Goals (White)': $scope.theme.images.GlobalgoalsSrcWhite,
                  'SWOP Français': $scope.theme.images.SWOPfr,
                  'SWOP Français (White)': $scope.theme.images.SWOPfrWh,
                  'SWOP Español': $scope.theme.images.SWOPes,
                  'SWOP Español (White)': $scope.theme.images.SWOPesWh,
                  'WPD English': $scope.theme.images.WPD,
                  'WPD English (White)':   $scope.theme.images.WPDwh,
                  'WPD Français': $scope.theme.images.WPDfr,
                  'WPD Français (White)': $scope.theme.images.WPDfrWh,
                  'WPD Español': $scope.theme.images.WPDes,
                  'WPD Español (White)': $scope.theme.images.WPDesWh,
                  'Master Narrative English (Lockup A)': $scope.theme.images.MN,
                  'Master Narrative English (Lockup A) White': $scope.theme.images.MNwh,
                  'Master Narrative English (Lockup B)': $scope.theme.images.MNverb,
                  'Master Narrative English (Lockup B) White': $scope.theme.images.MNverbWh,
                  'Master Narrative Arabic': $scope.theme.images.MNar,
                  'Master Narrative Chinese': $scope.theme.images.MNch,
                  'Master Narrative Français': $scope.theme.images.MNfr,
                  'Master Narrative Español': $scope.theme.images.MNes                  
                },
                width: true,
              }                         
            }, {
              name: 'Co-Sponsor Logo #2',
              type: 'image',
              width: function () {
                return $scope.size.width * 0.35;
              },
              controlsOrder: 2,
              height: function () {
                var h;
                if (typeof this.width === 'string') {
                  h = +this.width;
                } else {
                  h = this.width();
                }
                return h;
              },
              src: function () {
                return $scope.theme.isNikkei ? $scope.theme.images.logoWideSrc : $scope.theme.images.GlobalgoalsSrc;
              },
              opacity: 1,
              x: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.width - ($scope.theme.isNikkei ? this.width($scope) : $scope.size.gridSize * 21.5);
                }
                else return $scope.size.width - ($scope.theme.isNikkei ? this.width($scope) : $scope.size.gridSize * 26.5);
              },
              y: function () {
                var paddingTop = $scope.theme.isNikkei ? 0 : $scope.size.gridSize ;
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.height - (this.height($scope) + paddingTop *-3.8);
                }
                else return $scope.size.height - (this.height($scope) + paddingTop * -5);                                
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: true,
              defaultFilter: '',
              editable: {
                src: true,
                width: true,
              }
            }, {
              name: 'UNFPA Brand Extension Logos',
              type: 'image',
              width: function () {
                return $scope.size.width * 0.45;
              },
              controlsOrder: 1,
              height: function () {
                var h;
                if (typeof this.width === 'string') {
                  h = +this.width;
                } else {
                  h = this.width();
                }
                return h;
              },
              src: function () {
                return $scope.theme.images.MNar || $scope.theme.images.MNar;
              },
              opacity: 1,
              x: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 7.4;
                }
                return $scope.size.width - ($scope.theme.isNikkei ? this.width($scope) : $scope.size.gridSize * 30.5);
              },
              y: function () {
                var paddingTop = $scope.theme.isNikkei ? 0 : $scope.size.gridSize * 2.91;
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.height - (this.height($scope) + paddingTop * 2.5);
                }
                return $scope.size.height - (this.height($scope) + paddingTop );
              },
              preserveAspectRatio: 'xMinYMin meet',
              draggable: true,
              showHoverArea: true,
              defaultFilter: '',
              editable: {
                src: {
                  'UNFPA Color': $scope.theme.images.logoSrc,
                  'UNFPA Dark': $scope.theme.images.logoBW,
                  'UNFPA White': $scope.theme.images.logoWhite,
                  'UNFPA Grey': $scope.theme.images.logoAltSrc,
                  'SWOP English': $scope.theme.images.nikkeiAsianReviewLogoWideSrc,
                  'SWOP English (White)': $scope.theme.images.SWOPwh,
                  'Global Goals': $scope.theme.images.GlobalgoalsSrc,
                  'Global Goals (White)': $scope.theme.images.GlobalgoalsSrcWhite,
                  'SWOP Français': $scope.theme.images.SWOPfr,
                  'SWOP Français (White)': $scope.theme.images.SWOPfrWh,
                  'SWOP Español': $scope.theme.images.SWOPes,
                  'SWOP Español (White)': $scope.theme.images.SWOPesWh,
                  'WPD English': $scope.theme.images.WPD,
                  'WPD English (White)':   $scope.theme.images.WPDwh,
                  'WPD Français': $scope.theme.images.WPDfr,
                  'WPD Français (White)': $scope.theme.images.WPDfrWh,
                  'WPD Español': $scope.theme.images.WPDes,
                  'WPD Español (White)': $scope.theme.images.WPDesWh,
                  'Master Narrative English (Lockup A)': $scope.theme.images.MN,
                  'Master Narrative English (Lockup A) White': $scope.theme.images.MNwh,
                  'Master Narrative English (Lockup B)': $scope.theme.images.MNverb,
                  'Master Narrative English (Lockup B) White': $scope.theme.images.MNverbWh,
                  'Master Narrative Arabic': $scope.theme.images.MNar,
                  'Master Narrative Chinese': $scope.theme.images.MNch,
                  'Master Narrative Français': $scope.theme.images.MNfr,
                  'Master Narrative Español': $scope.theme.images.MNes                  
                },
                width: true,
              }                                   
            }, {
              name: 'Reference Text',
              type: 'text',
              text: 'Read more at\nunfpa.org/xxx',
              controlsOrder: 3,
              fill: function () {
                return $scope.theme.donate;
              },
              fontSize: function () {
                return ($scope.size.name === 'Twitter') ? 18 : 14;
              },
              fontFamily: function () {
                return $scope.theme.xrefFont;
              },
              textAnchor: 'start',
              x: function () {
                var w = $scope.size.width;
                return (w - w * 0.3) + $scope.size.gridSize;
              },
              y: function () {
                return $scope.size.height - ($scope.size.gridSize * 2 + 2);
              },
              fontWeight: 500,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fontFamily: {
                  'Eureka Regular': 'eureka-regular',
                  'Eureka Bold': 'eureka-bold',
                  'Eureka Italic': 'eureka-italic',
                  'Eureka Medium': 'eureka-medium',
                  'UNFPA Text': 'unfpatext',
                  'UNFPA Text Italic': 'unfpatextitalic',
                  'UNFPA Semibold': 'unfpasemibold',
                  'UNFPA Semibold Italic': 'unfpasemibolditalic',
                  'UNFPA Bold': 'unfpabold',
                },
                fontSize: {
                  'X-Small (12px)': 12,
                  'Smaller (14px)': 14,
                  'Smallish (16px)': 16,
                  'Small (18px)': 18,
                  'Standard (24px)': 24,
                  'Large (34px)': 34,
                }, 
                textAnchor: {
                  'left': 'start',
                  'center': 'middle',
                  'right': 'end',
                },                               
                fill: 'picker',                  
              },
            }, {
              name: 'Explanatory Text',
              type: 'text',
              text: 'Add text here -\nYou can also drag\nit around.\n\nIt can be over one\nline or several.',
              controlsOrder: 2,
              fill: function () {
                return $scope.theme.donate;
              },
              fontSize: function () {
                var w = $scope.size.width;
                if ($scope.size.name === 'Instagram') {                
                  return 24;
                }                
                else return ($scope.size.name === 'Twitter') ? 24 : 18;
              },
              fontFamily: 'eureka-regular',
              textAnchor: 'start',
              width: function () {
                return $scope.size.gridSize * 12;
              },
              x: function () {
                var w = $scope.size.width;
                if ($scope.size.name === 'Instagram') {
                  return (w - $scope.size.gridSize * 8.8);
                }
                else return (w - $scope.size.gridSize * 11);
              },
              y: function () {
                if ($scope.size.name === 'Instagram') {
                  return $scope.size.gridSize * 13;
                }                
                else return $scope.size.gridSize * 7;
              },
              fontWeight: 500,
              draggable: true,
              showHoverArea: true,
              editable: {
                text: true,
                fontSize: {
                  'X-Small (12px)': 12,
                  'Smaller (14px)': 14,
                  'Smallish (16px)': 16,
                  'Small (18px)': 18,
                  'Medium (20px)': 20,
                  'Standard (24px)': 24,
                  'Standard Plus (28px)': 28,
                  'Large (34px)': 34,
                  'X-Large (36px)': 36,
                  'XX-Large (44px)': 44,
                },
                fontFamily: {
                  'Eureka Regular': 'eureka-regular',
                  'Eureka Bold': 'eureka-bold',
                  'Eureka Italic': 'eureka-italic',
                  'Eureka Medium': 'eureka-medium',
                  'UNFPA Text': 'unfpatext',
                  'UNFPA Text Italic': 'unfpatextitalic',
                  'UNFPA Semibold': 'unfpasemibold',
                  'UNFPA Semibold Italic': 'unfpasemibolditalic',
                  'UNFPA Bold': 'unfpabold',
                },
                textAnchor: {
                  'left': 'start',
                  'center': 'middle',
                  'right': 'end',
                },                
                fill: 'picker',                  
              },
            }];
          }
        }
        ]);
      }
    };
  });
