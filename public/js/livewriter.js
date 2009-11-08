(function($){
    function setActivePage(name){$('#navbar a.active').removeClass('active').unbind();$('#navbar a#'+name).addClass('active').click(function(){$(this).blur();return false;})}
    
    app = $.sammy(function(){with(this){
     post('#/signup', function(){
         alert(this.params['email'])
     });
     get('#/about',function(){
         setActivePage('about');
     });
     get('#/',function(){
         setActivePage('home');
     });
     get('#/signup',function(){
         setActivePage('signup');
     })

    }});
    
    $(function(){
        app.run();
        $('a').each(function(){$(this).attr('href','#'+$(this).attr('href'))});
        $('#closed')
            .dialog({modal:true,
                buttons:{
                    Ok: function(){
                        if($('#email').val() == 'Email Address'){
                            dialog = $(this).parent();
                            errors = $('#errors')
                                .text('Please enter your Email Address.')
                                .addClass('ui-state-error');
                            dialog.effect('shake',{times:2},70)
                        }else{   
                            $(this).children('form').submit();
                            $(this).dialog('close');
                        }
                    },
                    'Alpha Login': function(){
                        $(this).dialog('close');
                        $(location).attr('href','/#/login');
                    }
                },
                width:400,
                height:350
                })
            .css('text-align','justify').children('form').attr('action','#/signup')
            .children('label').hide()
            .siblings('#email').val('Email Address').css('display','block').css('margin-left','auto').css('margin-right','auto').blur()
            .focus(function(){if($(this).val()=='Email Address'){$(this).val('')}})
            .siblings('button').hide();
        cur_location = $(location)
        if(!cur_location.attr('href').match(/#/)){cur_location.attr('href','#/')}
    });
    
})(jQuery);
