/**
 * http://github.com/CarlRevell/crutils
 *
 * a selection of handy JS utility functions all neatly-ish wrapped up
 * in the crutils instance
 *
 */

var crutils = crutils || {};

//
// C O R E  L A N G U A G E  H E L P E R S
//

/**
 * Searches for a given element in the array, returns -1 if it is not present.
 * @param {Number} [from] The index at which to begin the search
 */
crutils.indexOf = function(arr, elem, from){
    if (arr.indexOf) return arr.indexOf(elem, from);
    
    from = from || 0;
    var len = arr.length;
    
    if (from < 0) from += len;

    for (; from < len; from++){  
        if (from in arr && arr[from] === elem) {
            return from;
        }
    }  
    return -1;  
};

/**
 * Returns a unique (for this page refresh) sequence number 0..9,007,199,254,740,992 (I think)
 */
crutils.getNextSequenceId = (function(){
    var id = 0;
    return function(){ return id++; };
})();


//
// E V E N T  H E L P E R S
//

crutils.attach = function(elem, type, fn){
    if (elem.addEventListener){
        elem.addEventListener(type, fn, false);
    } else if (elem.attachEvent){
        elem.attachEvent('on' + type, fn);
    }
};
crutils.detach = function(elem, type, fn){
    if (elem.removeEventListener){
        elem.removeEventListener(type, fn, false);
    } else if (elem.attachEvent){
        elem.detachEvent('on' + type, fn);
    }
};

crutils.preventDefault = function(e){
    if (e.preventDefault){
        e.preventDefault();
    } else{
        e.returnValue = false;
    }
};


//
// D O M  H E L P E R S
//

/**
 * Creates and returns a DOM element from a string of HTML
 */
crutils.toElement = (function(){
    var div = document.createElement('div');
    return function(html){
        div.innerHTML = html;
        var element = div.firstChild;
        div.removeChild(element);
        return element;
    };
})();


crutils.addClass(elem, name) {
  if (!crutils.hasClass(elem, name)){
    elem.className += ' ' + name;
  }
  return this;
}

crutils.hasClass(elem, name) {
    var re = new RegExp('(^| )' + name + '( |$)');
    return re.test(elem.className);
}

crutils.removeClass(elem, name) {
  var re = new RegExp('(^| )' + name + '( |$)');
  elem.className = elem.className.replace(re, ' ').replace(/^\s+|\s+$/g, "");
  return this;
}
