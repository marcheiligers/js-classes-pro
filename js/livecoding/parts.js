define(function() {
  function PartsIndicator(src) {
    var parts = src.parts.map(function(part, index) {
          return "<span class='code-part-indicator'>" +
                  (index + 1) +
                  ": " +
                  part.name +
                  "</span>"
        }).join('')

    this.div = document.createElement('div')
    this.div.className = "code-parts-indicator"
    this.div.innerHTML = parts

    document.body.appendChild(this.div)
  }

  PartsIndicator.prototype.show = function() {
    this.div.style.display = "block"
  }

  PartsIndicator.prototype.hide = function() {
    this.div.style.display = "none"
  }

  return PartsIndicator
})