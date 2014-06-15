define(['traceur'], function(traceur) {
  function compile(src) {
    return traceur.compile(src).js
  }
  return {
    compile: compile
  }
});
