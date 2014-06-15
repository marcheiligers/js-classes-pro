define(["text", "coffee-script", "typescript.compile", "traceur.compile", "code", "parts", "objects", "language"],
  function(_, CoffeeScript, TypeScript, Traceur, Code, Parts, Objects, Language) {
  // TODO:
  // - add a way of showing the full src (including hidden)
  function Editor(elem) {
    this.elem = elem
    this.ace = ace.edit(elem)
    this.setMode()
    this.initializeAce()

    require(["text!src/" + elem.id], this.onLoaded.bind(this))
  }

  var LANGUAGES = {
    'js': 'javascript',
    'es6': 'javascript',
    'ts': 'javascript',
    'coffee': 'coffee'
  }

  Editor.prototype.setMode = function() {
    this.mode = this.elem.id.split('.')[1]
  }

  Editor.prototype.initializeAce = function() {
    this.ace.setTheme("ace/theme/monokai")
    this.ace.getSession().setMode("ace/mode/" + LANGUAGES[this.mode])
    this.ace.getSession().setTabSize(2)

    this.ace.commands.addCommand({
      name: "blur",
      bindKey: {win: "Ctrl-B", mac: "Command-B"},
      exec: this.ace.blur.bind(this.ace)
    })

    this.ace.commands.addCommand({
      name: "next",
      bindKey: {win: "Ctrl-N", mac: "Command-N"},
      exec: function(editor) {
        editor.blur()
        Reveal.right()
      }
    })

    this.ace.commands.addCommand({
      name: "prev",
      bindKey: {win: "Ctrl-P", mac: "Command-P"},
      exec: function(editor) {
        editor.blur()
        Reveal.left()
      }
    })

    for(var i = 0; i < 10; ++i) {
      this.ace.commands.addCommand({
        name: "correct" + i,
        bindKey: {win: "Ctrl-" + i, mac: "Command-" + i},
        exec: this.showPart.bind(this, i)
      })
    }

    this.ace.commands.addCommand({
      name: "run",
      bindKey: {win: "Ctrl-R", mac: "Command-R"},
      exec: this.run.bind(this)
    })

    this.ace.on("blur", this.onBlur.bind(this))
    this.ace.on("focus", this.onFocus.bind(this))

    this.elem.parentNode.setAttribute('data-state', this.elem.id)
  }

  Editor.prototype.onFocus = function() {
    this.parts.show()
    this.objects.show()
    this.language.show()
  }

  Editor.prototype.onBlur = function() {
    this.parts.hide()
    this.language.hide()
  }

  Editor.prototype.onLoaded = function(src) {
    this.src = Code(src, LANGUAGES[this.mode])
    this.parts = new Parts(this.src)
    this.objects = new Objects(this.src)
    this.language = new Language(this.mode)
    this.setSrc(this.src.display)

    Reveal.addEventListener(this.elem.id, this.ace.focus.bind(this.ace))
    Reveal.addEventListener('slidechanged', this.objects.hide.bind(this.objects))
  }

  Editor.prototype.showPart = function(part) {
    var parts = this.src.parts.slice(0, part).map(function(p) {
      return p.src
    }).join("\n")
    this.setSrc((this.src.display ? this.src.display + "\n" : "") + parts)
  }

  Editor.prototype.insertResults = function(src, results, error) {
    console.log(this.elem.id, results, error)
    var index = 0,
        temp = results.slice(0),
        marker = this.src.comment + "=> "

    if(error) temp.push(error);
    var newSrc = src.replace(/console\.log(.*)/g, function(orig) {
      var result = temp[index++]
      var insert = orig + "\n"
      if(result != null) {
        insert += result.toString().split("\n").map(function(line) {
          return marker + line
        }).join("\n")
      } else {
        insert += marker + "null"
      }
      return insert
    });

    if(index < temp.length - 1) {
      var insert = temp.slice(index).map(function(result) {
        return result.toString().split("\n").map(function(line) {
          return marker + line
        }).join("\n")
      }).join("\n")
      newSrc += "\n" + insert
    }

    this.setSrc(newSrc);
  }

  Editor.prototype.getSrc = function() {
    return this.ace.getValue();
  }

  Editor.prototype.cleanSrc = function() {
    var clean = RegExp(this.src.comment + "=>.*\n?", "g")
    return this.getSrc().replace(clean, "")
  }

  Editor.prototype.runnableSrc = function(src) {
    var runnable = this.src.hidden + src
    switch(this.mode) {
      case "coffee":
        runnable = CoffeeScript.compile(runnable)
        break
      case "ts":
        runnable = TypeScript.compile(runnable)
        break
      case "es6":
        runnable = Traceur.compile(runnable)
        break
    }
    this.src.replacements.forEach(function(s) {
      runnable = runnable.replace(RegExp(s.regexp, "g"), s.replacement)
    });
    return runnable.replace(/console.log(.*)/g, "results.push $1")
  }

  Editor.prototype.run = function() {
    var src,
        results = [],
        error

    try {
      src = this.cleanSrc()
      console.log(this.runnableSrc(src))
      eval(this.runnableSrc(src))
    } catch(e) {
      error = e
    }
    this.insertResults(src, results, error)
  }

  Editor.prototype.setSrc = function(src) {
    this.ace.setValue(src)
    this.ace.clearSelection()
  }

  window.onerror = function(e) {
    alert(e)
    console.log(e)
  }


  return Editor
})
