$(function(){
    $("#n52_211").load("modeshift_nav.html");
  });



submit();

function submit(){
    $('#n52_188').click(function(){
        var status=true;
        $('.required').each(function(){

            var element=$(this);
            var elementVal=$(this).val();
            var errorMsgId=element.attr('data-errorMsg');
            if(elementVal==''){
                $('.'+errorMsgId).show();
                element.addClass('errorField');
                status=false;
            }
            else{
                $('.'+errorMsgId).hide();
                element.removeClass('errorField');
                }
        });

        if(status) {
            $('.alert-success').show();
        }

    });
}