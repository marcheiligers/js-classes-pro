define(function() {
  var Comments = {
    javascript: "//",
    coffee: "# "
  }

  function getSrcParts(src, language) {
    var srcObj = {
      display: src,
      language: language,
      comment: Comments[language],
      hidden: "",
      parts: [],
      replacements: [],
      objects: []
    }
    getReplacements(srcObj)
    getObjects(srcObj)
    getHiddenSrc(srcObj)
    getLiveSrc(srcObj)
    return srcObj
  }

  function getReplacements(srcObj) {
    // Search for s//, these comments define replacements for eval to work
    var lines = srcObj.display.split("\n"),
        marker = RegExp(srcObj.comment + "s\/(.*)\/(.*)")

    for(var i = 0, l = lines.length; i < l; ++i) {
      var match = lines[i].match(marker)
      if(match) {
        srcObj.replacements.push({
          regexp: match[1],
          replacement: match[2]
        })
      }
    }
    srcObj.display = srcObj.display.replace(RegExp(srcObj.comment + "s\/.*\/.*\n", "g"), '');
  }

  function getObjects(srcObj) {
    // Search for $(), these comments define objects
    var lines = srcObj.display.split("\n"),
        marker = RegExp(srcObj.comment + "\\$\\((.*)\\)")

    for(var i = 0, l = lines.length; i < l; ++i) {
      var match = lines[i].match(marker)
      if(match) {
        srcObj.objects.push(JSON.parse(match[1]))
      }
    }
    srcObj.display = srcObj.display.replace(RegExp(srcObj.comment + "s\/.*\/.*\n", "g"), '');
  }

  function getHiddenSrc(srcObj) {
    // Search for <--, code before this marker is the hidden source (usually from previous slides)
    var lines = srcObj.display.split("\n"),
        marker = RegExp(srcObj.comment + "<--")

    for(var i = 0, l = lines.length; i < l; ++i) {
      if(lines[i].match(marker)) {
        srcObj.hidden = lines.slice(0, i).join("\n")
        srcObj.display = lines.slice(i + 1).join("\n")
        return
      }
    }
  }

  function getLiveSrc(srcObj) {
    // Search for -->, code after this marker is the live coding source
    var lines = srcObj.display.split("\n"),
        marker = RegExp(srcObj.comment + "-->\\s*(.*)"),
        first,
        index,
        prev

    for(var i = 0, l = lines.length; i < l; ++i) {
      var match = lines[i].match(marker)
      if(match) {
        setPart(srcObj, prev, index, i, lines)
        index = i
        first = first == null ? index : first
        prev = match
      }
    }
    setPart(srcObj, prev, index, lines.length, lines)

    if(prev) {
      srcObj.display = lines.slice(0, first).join("\n")
    }
  }

  function setPart(srcObj, match, index, i, lines) {
    if(match) {
      srcObj['parts'][srcObj['parts'].length] = {
        name: match[1],
        src: lines.slice(index + 1, i).join("\n")
      }
    }
  }

  return getSrcParts
})
