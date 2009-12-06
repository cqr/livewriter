(function($) {
//turns a div into a textarea
$.fn.fakeInput = function(options) {
  var opts = $.extend({}, $.fakeInput, options);
  return this.each(function() {
    
    var $this = $(this);
    var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
    
    //if there are no lines in our textarea yet, we need to add one.
    if(!$this.children('.line').size()){
      $this.append('<div class="'+o.lineclass+'"></div>');
    }
    
    // Set up the text for the caret
    caret_text = '<span id="fakeinput_caret">'+o.caret+'</span>';
    
    // Find the line where we are going to add the caret
    if(o.caret_line == 0 ) {
      var $cur_line = $this.children('.line:first');
    } else if (o.caret_line == 'end'){
      var $cur_line = $this.children('.line:last');
    } else {
      var $cur_line = $this.children('.line').slice(o.caret_line,1);
    }
    
    // Find the position in the text were we are going to add the caret
    if(o.caret_pos == 'end'){
      $cur_line.append(caret_text);
    } else {
      $cur_line.text($cur_line.text().slice(0,o.caret_pos) + caret_text + $cur_line.text().slice(o.caret_pos));
    }
    
    blinkopts = {};
    if(o.caret_blink_speed){
      blinkopts.speed = o.caret_blink_speed;
    }
    
    caret = $('#fakeinput_caret').blink(blinkopts).css('width',0).css('margin',0).css('padding',0);
    $this.keyTyped = function(func){
      debug('keyTyped was bound to a function.');
    };
    $this.keyup(function(key){
      alert('asf');
      debug(key.which);
    });
    
    $(document)
    .keypress(function(key){
      debug(key.which)
      switch(key.which){
        case 97:
          caret.before('a');
          break;
        case 8:
          return false;
          break;
        case 37:
          caret.before()
      }
    })
    .mouseover(function(){
      $this.focus();
    })
    .mouseout(function(){
      $this.blur();
    })
    .focus(function(){
      caret.show();
    })
    .blur(function(){
      caret.hide();
    });
    
    debug('Bound to an element.');
    debug('Using ".' + o.lineclass + '" for lines and ".' + o.containerclass + '" for container');
  });

  // private function for debugging
  function debug($obj) {
    if (window.console && window.console.log) {
      window.console.log($obj);
    }
  }
  
};

// default options
$.fakeInput = {
  lineclass: 'line',
  caret_line:0,
  caret_pos: 'end',
  caret: '|'
};

$.blink = {
  speed: 500
}

$.fn.blink = function(opts){
  return this.each(function(){
    $obj = $(this);
    $opts = $.extend({}, $.blink, opts);
    color = $obj.css('color');
    $obj.css('color','transparent');
    setTimeout(function(){$obj.css('color',color);},$opts.speed);
    setTimeout(function(){$obj.blink(opts);},($opts.speed * 2));
  })
  
  // private function for debugging
  function debug($obj) {
    if (window.console && window.console.log) {
      window.console.log($obj);
    }
  }
}

})(jQuery);