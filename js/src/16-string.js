function Animal() {
  this.name = "animal";
}

Animal.prototype.speak = function() {
  return "I'm a " + this.name;
};

var animal = new Animal();
//<-- Animal Class
//--> log animal.speak
console.log(animal.speak());

//--> String#articulize
String.prototype.VOWELS = ["a", "e", "i", "o", "u"];
String.prototype.articulize = function() {
  var char = this[0].toLowerCase();
  if(this.VOWELS.indexOf(char) >= 0) {
    return "an " + this;
  } else {
    return "a " + this;
  }
};

console.log("Pig".articulize());
console.log("Elephant".articulize());

//--> Animal#speak with articulize
Animal.prototype.speak = function() {
  return "I'm " + this.name.articulize();
};

console.log(animal.speak());
