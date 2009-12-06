var LiveWriter = new (function ($) {
	// all code which goes here is inside of an anonymous function and
	// therefore is not accessible outside of this function unless a specific
	// hook is created by assigning a property to `this`
	
	var maxline = 0;
    
	// our caret object. Totally sweet.
    caret = {
        
        'position':    0,
        
        'dom':         null, //We need to wait until the DOM is loaded
        
        'move_left':   function (width) {
                          if (width === undefined) {
                              width = 1;
                          }
                          this.position -= width;
                          if (this.position < 0) {
                              this.position = 0;
                          }
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
                          while (this.dom.html().length < this.position) {
                              this.dom.prepend('_');
                          }
                          while (this.dom.html().length > this.position) {
                              this.dom.html(this.dom.html().substr(1));
                          }
                       },
                       
        'blink':       function (rate) {
                          if (rate === undefined) {
                               rate = 400;
                           }
                           setInterval(function () {
                               caret.dom.css('border-width',0);
                               setTimeout(function () {
                                   caret.dom.css('border-width',1);
                               },rate)
                           },rate*2)
                       }
    };
    
    
	  
	// our Line class
	function Line(number) {
        this.number = number;
        this.dom = document.createElement('div');
        this.dom.className = 'line';
        //this.dom.id = number;
	}
	
	Line.prototype = {
	    
	    
	    
	    'length':   function () {
	        return this.html.length;
	    },
	    'add_character_at': function (str, pos) {
	        this.html = this.html.substring(0,pos) + str +
	            this.html.substring(pos);
	    },
	    'remove_character_at': function (pos) {
	        this.html = this.html.substring(0, pos - 1) +
	            this.html.substring(pos);
	    }
	}

    $(function(){
        // code in this box will be executed after the dom has loaded and
        //and is ready to be manipulated.
		
		if(window.console){
		    window.console.log('livewriter starting up');
		}
		
		caret.dom = $('#caret');
		maxline = $('.line:last').attr('id');
		window.console.log(maxline);
		caret.blink();
		  
		
        $(window).keyTyped(function(key){
        
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
                window.console.dir( key);
            }
            
            key = null;
			
			//override default browser behavior.
			return false;
		});
	});
})(jQuery);