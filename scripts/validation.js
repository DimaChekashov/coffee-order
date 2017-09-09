(function(window){
  'use strict';
  var App = window.App || {};

  var Validation = {
    isCompanyEmail: function(email){
      return /.+@bignerdranch\.com$/.test(email);
    },
    isDecaf: function(word){
      return !(/decaf/.test(word));
    },
    isNum: function(num){
      return num < 20;
    }
  };

  App.Validation = Validation;
  window.App = App;
})(window);