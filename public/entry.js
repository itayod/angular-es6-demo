import angular from "angular";
import app from "./components/app/app.js";

console.log(app)

angular.module('linnovate-test',[app.name])

//kick start angular on doc ready.
angular.element(document).ready(function(){
  angular.bootstrap(document,['linnovate-test'])
})
