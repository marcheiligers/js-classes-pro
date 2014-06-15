String.prototype.articulize = function() {
  if(["a", "e", "i", "o", "u"].indexOf(this[0].toLowerCase()) >= 0) {
    return "an " + this;
  } else {
    return "a " + this;
  }
};

function Animal() {
  this.name = "animal";
}

Animal.prototype.speak = function() {
  return "I'm " + this.name.articulize();
};

Animal.prototype.toString = function() {
  return "[" + this.name + " Animal]";
};

var animal = new Animal();

function Pig() {
  this.name = "pig";
}
Pig.prototype = new Animal();
var pig = new Pig();

Animal.prototype.countLegs = function() {
  return this.legs || 0;
};
Pig.prototype.legs = 4;

function Eisbein() {
  this.legs = 1;
}
Eisbein.prototype = new Pig;

var eisbein = new Eisbein();
//<-- Animal, Pig, Eisbein and String

//--> Pig and Eisbien#speak overides and superclass calls
Pig.prototype.speak = function() {
  return Animal.prototype.speak.call(this)
    + ". Snork";
};

console.log(pig.speak());

Eisbein.prototype.speak = function() {
  return Pig.prototype.speak.call(this)
    + ". Sizzle";
};

console.log(eisbein.speak());