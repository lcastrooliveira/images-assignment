(function() {
  "use strict";

  angular
    .module("spa-demo.authn")
    .component("sdSignup", {
      templateUrl: templateUrl,
      controller: SignupController,
    });


  templateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function templateUrl(APP_CONFIG) {
    return APP_CONFIG.authn_signup_html;
  }    

  SignupController.$inject = ["$scope","$state",
                              "spa-demo.authn.Authn", 
                              "spa-demo.layout.DataUtils",
                              "spa-demo.subjects.Image",];
  function SignupController($scope, $state, Authn, DataUtils, Image) {
    var vm=this;
    vm.signupForm = {}
    vm.signup = signup;
    vm.setImageContent = setImageContent;

    vm.$onInit = function() {
      console.log("SignupController",$scope);
      vm.item = new Image();
      vm.item.profile = true;
      console.log("vm.item: ", vm.item);
    }
    return;
    //////////////
    function signup() {
      console.log("signup...");
      $scope.signup_form.$setPristine();
      Authn.signup(vm.signupForm).then(
        function(response){
          vm.id = response.data.data.id;
          console.log("signup complete", response.data, vm);
          console.log("saving image", vm.item);
          vm.item.$save().then(
            function(){
               $state.go("home"); 
            },
            function(error) {console.log(error)});
        },
        function(response){
          vm.signupForm["errors"]=response.data.errors;
          console.log("signup failure", response, vm);          
        }
      );
    }

    function setImageContent(dataUri) {
      console.log("setImageContent", dataUri ? dataUri.length : null);      
      vm.item.image_content = DataUtils.getContentFromDataUri(dataUri);
    }

  }
})();