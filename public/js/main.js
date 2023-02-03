
(function ($) {
    "use strict";

    
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;
        for(let i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        let x,y,z;
        for(let i=0; i<input.length; i++) {
            if($(input[i]).attr('name')=='password'){
                x = $(input[i]).val().trim();
            }
            else if($(input[i]).attr('name')=='confirmpassword'){
                z=input[i];
                y = $(input[i]).val().trim();
            }
        }
        if(x===y){
            return check;
        }
        else{
            check=false;
            showValidate(z);
        }
        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('name')=='firstname' || $(input).attr('name')=='lastname'){
            let ok = $(input).val().trim();
            if(ok==''){
                return false;
            }
            if(/[0-9]/.test(ok)){
                return false;
            }
        }
        else if($(input).attr('name')=='mobileno'){
            let ok = $(input).val().trim();
            if(ok.length!=10){
                return false;
            }
            console.log(ok);
            if(/[a-zA-Z]/.test(ok)){
                return false;
            }
        }
        else if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);