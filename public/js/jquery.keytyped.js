(function($) {
// adds a slightly more dom-capable callback, keyTyped, for
// dealing with text input
// woah. copyright(c) 2009 by chrisrhoden, all rights reserved
// released under the MIT License, so do what you will with it.

    var alph = "0|1|2|3|4|5|6|7|[backspace]|    |10|11|12|[return]|14|15|[shift]|17|[option]|19|[shift-lock]|21|22|23|24|25|26|27|28|29|30|31| |33|34|35|36|[left]|[up]|[right]|[down]|41|42|43|44|45|46|47|0|1|2|3|4|5|6|7|8|9|58|;|60|=|62|63|64|a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z|91|92|93|94|95|96|97|98|99|100|101|102|103|104|105|106|107|108|-|110|111|112|113|114|115|116|117|118|119|120|121|122|123|124|125|126|127|128|129|130|131|132|133|134|135|136|137|138|139|140|141|142|143|144|145|146|147|148|149|150|151|152|153|154|155|156|157|158|159|160|161|162|163|164|165|166|167|168|169|170|171|172|173|174|175|176|177|178|179|180|181|182|183|184|185|;|=|,|-|.|/|`|193|194|195|196|197|198|199|200|201|202|203|204|205|206|207|208|209|210|211|212|213|214|215|216|217|218|[|\\|]|'|223|224|225|226|227|228|229|230|231|232|233|234|235|236|237|238|239|240|241|242|243|244|245|246|247|248|249|250".split('|');
    var cap_alph = '0,1,2,3,4,5,6,7,[shift-backspace],[shift-tab],10,11,12,[shift-return],14,15,[shift],17,[option],19,[shift-lock],21,22,23,24,25,26,27,28,29,30,31, ,33,34,35,36,[left],[up],[right],[down],41,42,43,44,45,46,47,),!,@,#,$,%,^,&,*,(,58,:,60,+,62,63,64,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,_,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,:,+,<,_,>,?,~,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,{,|,},",223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250'.split(',');
    function Key(e){
        var k = e.keyCode;
        this.key_code = k;
        this.is_visible = ((k>64&&k<91)||(k>47&&k<62)||k==109||(k>185&&k<193)||
            (k>218&&k<223));
        this.is_whitespace = (k==9||k==10||k==32);
        this.is_return = (k==13);
        this.is_command = e.metaKey;
        this.is_shift = e.shiftKey;
        this.is_arrow =  k>36&&k<41;
        this.is_backspace = k==8;
        this.pressed = this.is_shift ? cap_alph[this.key_code] : 
            alph[this.key_code];
        if(this.is_visible||this.is_whitespace){
            this.character = this.pressed;
        } else {
            this.character ='';
        }
        this.char_size = this.character.length;
    }
    
    // These key mappings are based on Webkit/Firefox using a MacBook keyboard
    // and the keydown event. They should not be expected to (read: will not)
    // work for other events or other browsers. 
    

    $.fn.keyTyped = function(callback, options) {
        var opts = $.extend({}, $.fn.keyTyped.defaults, options);
    
        return this.each(function() {
            var $this = $(this);
            var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
        
            handler = function (k) {
                k = new Key(k);
                return callback(k);
            }
        
            if($.browser.safari || $.browser.mozilla){
                $this.keydown(handler);
            }
        
            if($.browser.mozilla){
                $this.keypress(function(){return false;});
            }
    
        });
    
    };
    
    $.keyTyped = {
        // Leaving this here in case I implement options in the future.
    };

})(jQuery);
