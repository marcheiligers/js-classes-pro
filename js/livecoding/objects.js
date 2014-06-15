define(function() {
  function Objects(src) {
    this.objects = src.objects.map(function(obj) {
          var el = document.createElement(obj.nodeName || "div")

          delete obj.nodeName
          for(prop in obj) {
            el.setAttribute(prop, obj[prop])
          }
          el.style.display = "none"
          el.style.zIndex = 100
          document.body.appendChild(el)

          return el
        })
  }

  Objects.prototype.show = function() {
    this.objects.forEach(function(el) {
      el.style.display = "block"
    })
  }

  Objects.prototype.hide = function() {
    this.objects.forEach(function(el) {
      el.style.display = "none"
    })
  }

  return Objects
})