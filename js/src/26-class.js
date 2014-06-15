//s/[^\.]Class\./this.Class.
String.prototype.VOWELS = ["a", "e", "i", "o", "u"];
String.prototype.articulize = function() {
  var char = this[0].toLowerCase();
  if(this.VOWELS.indexOf(char) >= 0) {
    return "an " + this;
  } else {
    return "a " + this;
  }
};
//<-- String#articulize
//--> Class IFFE
(function(global) {
  var isFn = function(fn) {
    return typeof fn == "function";
  };

  global.Class = function() {};
  global.Class.create = function(props) {
    var klass = function(magic) {
      if(magic != isFn && isFn(this.initialize)) {
        this.initialize.apply(this, arguments);
      }
    };
    klass.prototype = new this(isFn);

    for(key in props) {
      (function(prop, superProp) {
        klass.prototype[key] = !isFn(prop) || !isFn(superProp) ? prop :
          function() {
            this.super = superProp;
            return prop.apply(this, arguments);
          };
      })(props[key], klass.prototype[key]);
    }

    klass.prototype.constructor = klass;
    klass.extend = this.extend || this.create;

    return klass;
  };
})(this);

//--> Animal class
var Animal = Class.create({
  initialize: function() {
    this.name = "animal";
  },
  speak: function() {
    return "I'm " + this.name.articulize();
  },
  toString: function() {
    return "[" + this.name + " Animal]";
  }
});

var animal = new Animal();
console.log(animal.toString());
console.log(animal.speak());

//--> Pig class
var Pig = Animal.extend({
  initialize: function() {
    this.name = "pig";
  },
  speak: function() {
    return this.super() + ". Snork";
  }
});

var pig = new Pig();
console.log(pig.toString());
console.log(pig.speak());

//--> Eisbein class
var Eisbein = Pig.extend({
  speak: function() {
    return this.super() + ". Sizzle";
  }
});

var eisbein = new Eisbein();
console.log(eisbein.toString());
console.log(eisbein.speak());
