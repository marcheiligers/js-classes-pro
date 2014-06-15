(function() {
  requirejs.config({
      baseUrl: 'js/livecoding',
      paths: {
          src: '../src'
      },
      shim: {
        'mousetrap.min': {
          exports: 'Mousetrap'
        },
        'typescript.min': {
          exports: 'TypeScript'
        },
        'traceur': {
          exports: 'traceur'
        }
      }
  })

  require(["mousetrap.min"], function(Mousetrap) {
    Mousetrap.bind("mod+n", function(e) { Reveal.right(); return false })
    Mousetrap.bind("mod+p", function(e) { Reveal.left(); return false })
    Mousetrap.bind("mod+b", function(e) { return false }) // Blur
  })

  require(["ace/ace-builds/src-noconflict/ace", "editor"], function(_, Editor) {
    var editors = document.getElementsByClassName('editor');
    for(var i = 0, l = editors.length; i < l; ++i) {
      new Editor(editors[i])
    }
  })
})()