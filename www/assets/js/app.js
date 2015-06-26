(function($){

  var oo = new Object();

  oo.req = function(data, callback){

    var url = data.action,
        method = data.method;

    delete data.action;
    delete data.method;

    $.ajax({
      method: method,
      url: url,
      data: data
    }).done(function( msg ) {
      console.log( "Data Saved: " + msg );
      return callback(null, msg);
    });

  };

  oo.clearRequired = function(){
    var inputs = document.getElementsByTagName('input');

    for(var i = 0, x = inputs.length; i < x; i++){
      if(inputs[i].hasAttribute('required')){
        inputs[i].removeAttribute('required');
        var inputClassNames = inputs[i].className;
        inputs[i].className = inputClassNames + ' required';
      }
    };
  };

  oo.ifJS = function(){
    oo.clearRequired();
    return true;
  };

  oo.checkEmail = function(email){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  oo.validation = function(form, callback){

    var formParent = form.parentElement,
        errorBox = document.getElementById('js-errorbox-' + form.id),
        requireErrorMessage = document.getElementById(form.id + '-required-error'),
        required = form.getElementsByClassName('required'),
        globalError = false,
        requiredError = false;

    if(!errorBox){
      var errorBox = document.createElement('div');
      errorBox.id = 'js-errorbox-' + form.id;
      errorBox.className = 'js-errors errors front-end-errors';
      formParent.insertBefore(errorBox, form);
    }

    for(var i = 0, x = required.length; i < x; i++){

      var fieldError = false;

      if(!required[i].value){
        fieldError = true;
        requiredError = true;
        globalError = true;
      };

      if (required[i].name === 'email'){

        var isEmailValid = oo.checkEmail(required[i].value);

        if(!isEmailValid){
          // emailError = true;
          var emailErrorMsg = document.getElementById(form.id + '-email-error');
          if(!emailErrorMsg){
            var emailErrorMsg = document.createElement('div');
            emailErrorMsg.id = form.id + '-email-error';
            emailErrorMsg.innerHTML = 'Hmmm, there is a problem your email address.';
            errorBox.appendChild(emailErrorMsg);
            fieldError = true;
            globalError = true;
          }

        }
      }

      if(fieldError){
        $(required[i]).addClass('error');
      }

    };

    if(requiredError && (!requireErrorMessage)){
      var requireErrorMessage = document.createElement('div');
      requireErrorMessage.id = form.id + '-required-error';
      requireErrorMessage.innerHTML = 'How can we notify you without an email address?';
      errorBox.appendChild(requireErrorMessage);
    }

    if(globalError){
      return callback(true, null);
    } else {
      if(errorBox){
        errorBox.parentNode.removeChild(errorBox);
      }
      return callback(null, true);
    }


  };


  oo.params = function(form, callback){
    var params = {},
        inputs = form.getElementsByTagName('input');
    params.action = form.action;
    params.method = form.method;

    for(var i = 0, x = inputs.length; i< x; i++){
      var name = inputs[i].getAttribute('name'),
          val = inputs[i].value;
      if(name){
        params[name] = val;
      }
    };
    callback(null, params);
  };



  oo.imageLoader = function(imgs){
    for(var i = 0, x = imgs.length; i < x; i++){
      if(i != 0){
        imgs[i].src = imgs[i].getAttribute('data-src');
      }
    }
  };

  console.log(oo.ifJS());

  var images = document.getElementsByTagName('img');

  if(images && (images.length > 0)){
    oo.imageLoader(images)
  };


  $('form').on('submit', function( event ) {
    event.preventDefault();
    var form = this;
    oo.validation(form, function(err, ok){
      if(ok){
        oo.params(form, function(err, params){
          if(err){

          }
          if(params){
            oo.req(params, function(err, res){
              if(err){

              }
              if(res){
                console.log(res);
              }
            });
          }
        });
      }
    });
  });


})(jQuery);
