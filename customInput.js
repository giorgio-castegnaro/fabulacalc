$( document ).ready(function() {
    
    $('.btnPlus').each(function(){
        $(this).on('click', function(){
			$(this).prop('disabled', true);
            this.parentNode.querySelector('input[type=number]').stepUp();
			$(this).prop('disabled', false);
        });
    });
    
    $('.btnMinus').each(function(){
        $(this).on('click', function(){
			$(this).prop('disabled', true);
            this.parentNode.querySelector('input[type=number]').stepDown();
			$(this).prop('disabled', false);
        });
    });
    
    
});