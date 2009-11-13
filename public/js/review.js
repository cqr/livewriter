(function($){$(function(){
  //set some global variables we will probably be messing with often.
  input = $('input');
  input_el = document.getElementById('inputbox');
  pre_text = $('#pre_text');
  post_text = $('#post_text');
  lines_before = 0;
  lines_after = 0;
  
  $('body').mouseenter(function(){
    input.focus();
  })
  .mouseleave(function(){
    input.blur();
  });
  input.focus()
  .keypress(function(k){
    dolog('received event '+k.which);
    switch(k.which){
      case 13:
        post_text.prepend('<div class="line"></div>');
        pos = input.attr('selectionStart');
        str = input.val().slice(pos);
        input.val(input.val().slice(0,pos));
        moveCursorDown();
        input.val(str+input.val());
        moveCaretTo(0);
        break;
      case 8:
        dolog('backspace!');
        if(input.val().length == 0 && textAbove().is('.line')){
          moveCursorUp();
          moveCaretTo(80);
        } else if(input.attr('selectionStart') == 0 ) {
          //move text upword...
        } else {
          input.val(input.val().slice(0,-1));
        }
        return false;
      default:
        if(input.val().length >=80){
          moveCursorDown();
          //if(textAbove().text().match(/\s[!\s]$/)){
            array = textAbove().text().split(' ');
            textAbove().text(array.slice(0,-1).join(' '));
            input.val(array.slice(-1)+input.val());
          //}
        }
    }
  })
  .keydown(function(k){
    dolog('received event'+k.which);
    switch(k.which){
      case 9:
        pos = input.attr('selectionStart');
        input.val(input.val().slice(0,pos)+"	"+input.val().slice(pos));
        moveCaretTo(pos+1);
        return false;
        break;
      case 40:
        if(textBelow().is('.line')){
          moveCursorDown();
          return false;
        }
        break;
      case 38:
        if(textAbove().is('.line')){
          moveCursorUp();
        }
        return false;
        break;
      case 37:
        if(input.val().length == 0 && textAbove().is('.line')){
          moveCursorUp();
          moveCaretTo(80);
        }
        break;
      default: return true;
    }
  })
});

  function textAbove(){
    return pre_text.children('.line:last');
  }
  function textBelow(){
    return post_text.children('.line:first');
  }
  function moveCursorUp(){
    dolog('moving caret up');
    pos = input.attr('selectionStart');
    line = textAbove();
    post_text.prepend('<div class="line">'+input.val()+'</div>');
    input.val(line.text());
    line.remove();
    moveCaretTo(pos);
    lines_after++;
    lines_before--;
    if(lines_before < 0 ) {lines_before = 0 }
    dolog(lines_after + 'lines below caret');
  }
  function moveCursorDown(){
    dolog('moving caret down');
    pos = input.attr('selectionStart');
    line = textBelow();
    pre_text.append('<div class="line">'+input.val()+'</div>');
    input.val(line.text());
    line.remove();
    moveCaretTo(pos);
    lines_before++;
    lines_after--;
    if(lines_after < 0) { lines_after = 0 }
    dolog(lines_before + 'lines above caret');
  }
  function moveCaretTo(pos){
    dolog('moving caret to '+pos);
    input_el.setSelectionRange(pos,pos);
  }
  function dolog(msg){
    $('#stats').prepend('<div>'+msg+'</div>');
  }
})(jQuery);