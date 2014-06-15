define(function() {
  function LanguageIndicator(language) {
    this.div = document.createElement('div')
    this.div.className = "language-indicator"
    this.div.innerHTML = language

    document.body.appendChild(this.div)
  }

  LanguageIndicator.prototype.show = function() {
    this.div.style.display = "block"
  }

  LanguageIndicator.prototype.hide = function() {
    this.div.style.display = "none"
  }

  return LanguageIndicator
})