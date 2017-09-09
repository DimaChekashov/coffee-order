(function(window){
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;
  var rangeSize = document.getElementById('range-size');

  function FormHandler(selector){
    if(!selector){
      throw new Error('No selector provided');
    };
    this.$formElement = $(selector);
    if(this.$formElement.length === 0){
      throw new Error('Could not find element with selector' + selector);
    };
  };

  FormHandler.prototype.addSubmitHandler = function(fn){
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function(event){
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function(item){
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      })
      console.log(data);
      fn(data);
      if(data.size === 'grande' && data.strength > 66){
        $('#myModal').modal('show')
      }
      this.reset();
      rangeSize.innerText = '';
      this.elements[0].focus();
    });
  };

  FormHandler.prototype.addInputHandler = function(fn){
    console.log('Setting input handler for form');
    this.$formElement.on('input', '[name="emailAddress"]', function(event){
      var emailAddress = event.target.value;
      var message = '';
      if(fn(emailAddress)){
        event.target.setCustomValidity('');
      }else {
        message = emailAddress + ' is not an authorized email address!'
        event.target.setCustomValidity(message);
      }
    });
  }

  FormHandler.prototype.addWordHandler = function(fn, fd){
    this.$formElement.on('input', '[name="coffee"]', function(event){
      var word = event.target.value;
      var message = '';
      if(fn(word)){
        event.target.setCustomValidity('');
      }else{
        message = word + ' is not valid word';
        event.target.setCustomValidity(message);
      }
    });
    this.$formElement.on('input', '[name="strength"]', function(event){
      var num = event.target.value;
      var message = '';
      if(fd(num)){
        event.target.setCustomValidity
      }else{
        message = num + ' is very hot';
        event.target.setCustomValidity(message);
      }
    });
  }

  document.getElementById('strengthLevel').addEventListener('change', function(){
    rangeSize.innerText = this.value;
    if(this.value < 33){
      rangeSize.style.color = 'green';
    }else if(this.value > 33 && this.value < 66){
      rangeSize.style.color = 'yellow';
    }else if(this.value > 66){
      rangeSize.style.color = 'red';
    }
  });
  App.FormHandler = FormHandler;
  window.App = App;

})(window);