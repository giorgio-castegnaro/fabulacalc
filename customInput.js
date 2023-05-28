$( document ).ready(function() {
    
    $('.btnPlus').each(function(){
        $(this).on('click', function(){
            this.parentNode.querySelector('input[type=number]').stepUp();
        });
    });
    
    $('.btnMinus').each(function(){
        $(this).on('click', function(){
            this.parentNode.querySelector('input[type=number]').stepDown();
        });
    });
    
    
});