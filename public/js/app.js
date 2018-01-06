var app=angular.module("myApp", []);
app.controller("myCtrl", function($scope, $http){
	$scope.newStudent={};

	$scope.allData=[];


	$scope.save=function(){
		//console.log($scope.newStudent);
		$http({
			method : "POST",
			url : "/student/savedata",
			data : $scope.newStudent
		}).then(function(res){
			console.log(res.data.data.value);
			if($scope.newStudent._id){
				for(var i=0; i<$scope.allData.length; i++)
				{
					if($scope.allData[i]._id == res.data.data.value._id)
					{
						$scope.allData[i]=res.data.data.value;
					}
				}
			}
			else{
				$scope.allData.push(res.data.data);
			}

		});
	}

	$scope.getData=function(){
		$http({
			method : "GET",
			url : '/student/getdata'
		}).then(function(res){
			console.log(res, '-----------');
			$scope.allData=res.data.data;
		});
	}

	$scope.ask_delete=function(obj){
		$scope.selectedObj=obj;
	}
	$scope.conf_delete=function(){
		// console.log($scope.selectedObj);
		$http({
			method : "POST",
			url : '/student/deleteData',
			data : $scope.selectedObj
		}).then(function(res){
			console.log(res.data.data.value, '-----------');
			console.log($scope.allData, '-----------');
			// $scope.allData.splice(res.data.data.value, 1);
			// var index=$scope.allData.indexOf(res.data.data.value);
			// console.log(index);
			for(var i=0; i<$scope.allData.length; i++)
			{
				if($scope.allData[i]._id == res.data.data.value._id)
				{
					$scope.allData.splice(i, 1);
				}
			}
		});
	}

	$scope.ask_edit=function(obj){
		//$scope.newStudent=obj;
		angular.copy(obj, $scope.newStudent);	 // one way binding
	}


});