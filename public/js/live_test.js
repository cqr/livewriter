var LiveWriter = new (function ($) {
	// all code which goes here is inside of an anonymous function and
	// therefore is not accessible outside of this function unless a specific
	// hook is created by assigning a property to `this`
    
	// our caret object. Totally sweet.
    caret = {
        
        'position':    0,
        
        'dom':         null, //We need to wait until the DOM is loaded
        
        'move_left':   function (width) {
                          if (width === undefined) {
                              width = 1;
                          }
                          this.position -= width;
                          this.refresh();
                       },
                       
        'move_right':  function (width) {
                          if (width === undefined) {
                              width = 1;
                          }
                          this.position += width;
                          this.refresh();
                       },
                       
        'refresh':     function () {
                          this.dom.css('left',(8 * this.position) + 'px');
                       },
                       
        'blink':       function (rate) {
                          if (rate === undefined) {
                               rate = 400;
                           }
                           setInterval(function () {
                               caret.dom.css('border-color','#fff');
                               setTimeout(function () {
                                   caret.dom.css('border-color','#000');
                               },rate)
                           },rate*2)
                       }
    };
	  
	// our Line class
	function Line() {

	}

    $(function(){
        // code in this box will be executed after the dom has loaded and
        //and is ready to be manipulated.
		  
		caret.dom = $('#caret');
		caret.blink();
		  
		window.console.log('Livewriter coninuing....');
        $('*').keyTyped(function(key){
        
            // If the message is a browser command, let it through.
		    if (key.is_command) {
		        return true;
		    }
            else if (key.is_arrow) {
		        switch(key.pressed){
		        case '[left]':
		            caret.move_left();
		            break;
		        case '[right]':
		            caret.move_right();
		            break;
		        default:
		            window.console.log('Up and Down not yet implemented.');
		        }
            } else if (key.is_backspace) {
                var text = $('#textarea').html();
		        var pre_caret = text.substring(0,caret.position-1);
		        var post_caret = text.substring(caret.position);
		        $('#textarea').html(pre_caret+post_caret);
		        caret.move_left();
	        } else if (key.is_return){
                //oh god, how am I going to do it this time?
            } else if (key.is_visible || key.is_whitespace) {
                var text = $('#textarea').html();
                var pre_caret = text.substring(0,caret.position) +
                    key.character;
                var post_caret = text.substring(caret.position);
                caret.move_right(key.char_size);
                $('#textarea').html(pre_caret + post_caret);
		    } else {
                window.console.log(key);
            }
        
  		    key = null;
			
			//override default browser behavior.
			return false;
		});
	});
})(jQuery);