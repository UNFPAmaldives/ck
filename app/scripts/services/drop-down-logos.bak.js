            }, {
              name: 'UNFPA Brand Extension Logos',
              type: 'image',
              width: function () {
                return $scope.size.width * 0.45;
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