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
//<-- String#articulize and Animal Class

//--> Pig Class
function Pig() {
  this.name = "pig";
}
Pig.prototype = new Animal();
var pig = new Pig();

console.log(pig.speak());

//--> Animal#countLeg and Pig::legs
Animal.prototype.countLegs = function() {
  return this.legs || 0;
};
Pig.prototype.legs = 4;

var result = animal.speak() +
    " and I have " +
    animal.countLegs() + " legs"
console.log(result);

var result = pig.speak() +
    " and I have " +
    pig.countLegs() + " legs"
console.log(result);

//--> Eisbein Class
function Eisbein() {
  this.legs = 1;
}
Eisbein.prototype = new Pig();

var eisbein = new Eisbein();

var result = eisbein.speak() +
    " and I have " +
    eisbein.countLegs() + " leg"
console.log(result);
