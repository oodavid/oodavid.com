// When the DOM is ready...
document.addEventListener('DOMContentLoaded', loadHtml, false);

// ...load all HTML fragments
function loadHtml(){
  // Get all elements with the [load-html] attribute
  var elements = document.querySelectorAll('[load-html]');
  // Loop through and load the HTML
  elements.forEach(function(element) {
    var src = element.getAttribute('load-html');
    var xhr= new XMLHttpRequest();
    xhr.open('GET', src, true);
    xhr.onreadystatechange= function() {
      if (this.readyState!==4) return;
      if (this.status!==200) return;
      element.innerHTML= this.responseText;
    };
    xhr.send();
  });
}
