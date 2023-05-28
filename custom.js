$( document ).ready(function() {
    $('.bg-dark').find('*').each(function(){
        switch($(this).prop("tagName")){
            case 'H3':
            case 'DIV':
            case 'SPAN':
            case 'LABEL':
            case 'BUTTON':
            case 'INPUT':
            case 'SELECT':
                if(!$(this).hasClass('bg-dark')){
                    $(this).addClass('bg-dark');
                    $(this).addClass('text-white');
                }
                break;
        }
        
        
    });
});