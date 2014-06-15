//s/Eisbein\./this.Eisbein.
//--> Pig object
var Pig = {
  _count: 0,
  total: function() {
    return Pig._count;
  },
  birth: function() {
    return ++Pig._count;
  }
};

Pig.birth();
console.log(Pig.total());
//--> Access private _count
console.log(Pig._count);
Pig._count = 10;
console.log(Pig.total());

//--> Eisbein IIFE
(function(global) {
  var count = 4;
  global.Eisbein = {
    total: function() {
      return count;
    },
    cook: function() {
      return --count;
    }
  }
})(this)

Eisbein.cook();
console.log(Eisbein.total());
//--> Try access private count
// Doesn't work:
console.log(Eisbein.count);
Eisbein.count = 10;
console.log(Eisbein.total());
