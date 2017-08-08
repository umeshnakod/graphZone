app.directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;

          element.bind('change', function(){
             scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
             });
          });
       }
    };
 }]);

 app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
       var fd = new FormData();
       fd.append('file', file);
        $http({
      method:'POST',
      url:uploadUrl,
      data:fd,
      header: {
                    'Content-Type': 'application/json'
              }

    }).then(function (result) {
      console.log("file uploaded succesfully")
    })

       // .error(function(){
       //  console.log("lochaa in uploading file")
       // });
    }
 }]);
app.controller('menuController',['Upload','$window',function ($scope,$state,$sessionStorage,$http,$rootScope,fileUpload,Upload,$window) {
 
  var vm = this;
        vm.submit = function(){ //function to call on form submit
            if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
                vm.upload(vm.file); //call upload function
            }
        }
        vm.upload = function (file) {
            Upload.upload({
                method: 'POST',
                url: '/fileUpload', //webAPI exposed to upload the file
                data:{file:file} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                if(resp.data.error_code === 0){ //validate success
                    $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                } else {
                    $window.alert('an error occured');
                }
            }, function (resp) { //catch error
                console.log('Error status: ' + resp.status);
                $window.alert('Error status: ' + resp.status);
            }, function (evt) { 
                console.log(evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });
        };






	var graphdef = {
  	categories : ['uvCharts'],
  	dataset : {
  		'uvCharts' : [
  			{ name : '2009', value : 32 },
  			{ name : '2010', value : 60 },
  			{ name : '2011', value : 97 },
  			{ name : '2012', value : 560 },
  			{ name : '2013', value : 999 }
  		]
  	}
  }

  var chart = uv.chart('Line', graphdef);
	
	$scope.data = {
		dataset0:[
			
  	      {x: 0, val_0: 0, val_1: 0, val_2: 0, val_3: 0},
  	      {x: 1, val_0: 0.993, val_1: 3.894, val_2: 8.47, val_3: 14.347},
  	      {x: 2, val_0: 1.947, val_1: 7.174, val_2: 13.981, val_3: 19.991},
       	  {x: 3, val_0: 2.823, val_1: 9.32, val_2: 14.608, val_3: 13.509},
          {x: 4, val_0: 3.587, val_1: 9.996, val_2: 10.132, val_3: -1.167},
          {x: 5, val_0: 4.207, val_1: 9.093, val_2: 2.117, val_3: -15.136},
          {x: 6, val_0: 4.66, val_1: 6.755, val_2: -6.638, val_3: -19.923},
          {x: 7, val_0: 4.927, val_1: 3.35, val_2: -13.074, val_3: -12.625}
		
		]
	}

	$scope.options = {
		series:[

			{
				axis:"y",
				dataset:"dataset0",
				key:"val_0",
				label: "An area series",
		        color: "#0075c2",
		        type: ['column'],
		        id: 'mySeries0'

			}
		],
		 axes: {x: {key: "x"}}

	}




  google.charts.load('current', {packages: ['corechart', 'line']});
  google.charts.load('current', {packages: ['corechart', 'bar']});
  google.charts.setOnLoadCallback(drawStacked);
  google.charts.setOnLoadCallback(drawCurveTypes);
  google.charts.setOnLoadCallback(drawChart);

  function drawCurveTypes() {
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'X');
        data.addColumn('number', 'Dogs');
        data.addColumn('number', 'Cats');

        data.addRows([
          [0, 0, 0],    [1, 10, 5],   [2, 23, 15],  [3, 17, 9],   [4, 18, 10],  [5, 9, 5],
          [6, 11, 3],   [7, 27, 19],  [8, 33, 25],  [9, 40, 32],  [10, 32, 24], [11, 35, 27],
          [12, 30, 22], [13, 40, 32], [14, 42, 34], [15, 47, 39], [16, 44, 36], [17, 48, 40],
          [18, 52, 44], [19, 54, 46], [20, 42, 34], [21, 55, 47], [22, 56, 48], [23, 57, 49],
          [24, 60, 52], [25, 50, 42], [26, 52, 44], [27, 51, 43], [28, 49, 41], [29, 53, 45],
          [30, 55, 47], [31, 60, 52], [32, 61, 53], [33, 59, 51], [34, 62, 54], [35, 65, 57],
          [36, 62, 54], [37, 58, 50], [38, 55, 47], [39, 61, 53], [40, 64, 56], [41, 65, 57],
          [42, 63, 55], [43, 66, 58], [44, 67, 59], [45, 69, 61], [46, 69, 61], [47, 70, 62],
          [48, 72, 64], [49, 68, 60], [50, 66, 58], [51, 65, 57], [52, 67, 59], [53, 70, 62],
          [54, 71, 63], [55, 72, 64], [56, 73, 65], [57, 75, 67], [58, 70, 62], [59, 68, 60],
          [60, 64, 56], [61, 60, 52], [62, 65, 57], [63, 67, 59], [64, 68, 60], [65, 69, 61],
          [66, 70, 62], [67, 72, 64], [68, 75, 67], [69, 80, 72]
        ]);

        var options = {
          hAxis: {
            title: 'Time'
          },
          vAxis: {
            title: 'Popularity'
          },
          series: {
            1: {curveType: 'function'}
          }
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, options);
  }
  
  function drawChart() {

    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Work',     11],
      ['Eat',      2],
      ['Commute',  2],
      ['Watch TV', 2],
      ['Sleep',    7]
    ]);

    var options = {
      title: 'My Daily Activities'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
  }




  function drawStacked() {
        var data = new google.visualization.DataTable();
        data.addColumn('timeofday', 'Time of Day');
        data.addColumn('number', 'Motivation Level');
        data.addColumn('number', 'Energy Level');

        data.addRows([
          [{v: [8, 0, 0], f: '8 am'}, 1, .25],
          [{v: [9, 0, 0], f: '9 am'}, 2, .5],
          [{v: [10, 0, 0], f:'10 am'}, 3, 1],
          [{v: [11, 0, 0], f: '11 am'}, 4, 2.25],
          [{v: [12, 0, 0], f: '12 pm'}, 5, 2.25],
          [{v: [13, 0, 0], f: '1 pm'}, 6, 3],
          [{v: [14, 0, 0], f: '2 pm'}, 7, 4],
          [{v: [15, 0, 0], f: '3 pm'}, 8, 5.25],
          [{v: [16, 0, 0], f: '4 pm'}, 9, 7.5],
          [{v: [17, 0, 0], f: '5 pm'}, 10, 10],
        ]);

        var options = {
          title: 'Motivation and Energy Level Throughout the Day',
          isStacked: true,
          hAxis: {
            title: 'Time of Day',
            format: 'h:mm a',
            viewWindow: {
              min: [7, 30, 0],
              max: [17, 30, 0]
            }
          },
          vAxis: {
            title: 'Rating (scale of 1-10)'
          }
        };

        var chart = new google.visualization.ColumnChart(document.getElementById('barChart_div'));
        chart.draw(data, options);
  }


    $scope.openModal = function ($uibModal ) {
    	modalInstance = $uibModal.open({
        template: '<div>Modal Content - <a ng-click="close()">Close</a></div>'
      });
    }


    function init() {
      //   var data = {      "host": "localhost",
      //   "user": "mylocal",
      //     "password": "123",
      //     "database": "sakila",
      //     "dbType":"sql"
      // }
      var data = {
        "host": "localhost",
        "user": "root",
          "password": "root",
          "database": "sakila",
          "dbType":"sql"
      }

      $http({
        method:'POST',
        url:'/getDataFromSql',
        data:data,
        header: {
          'Content-Type': 'application/json'
        }

      }).then(function (result) {
        $scope.tableList = result.data;

        $rootScope.$broadcast('sidebarValue',$scope.tableList)
        console.log(result)
      })

    }


    init();


}])