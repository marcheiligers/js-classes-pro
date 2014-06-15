//--> Animal Class
function Animal() {
  this.name = "animal";
}

Animal.prototype.speak = function() {
  return "I'm a " + this.name;
};

var animal = new Animal();
console.log(animal.speak());

//--> toString and valueOf
console.log(animal.toString())
console.log(animal.valueOf())

//--> Override toString and valueOf
Animal.prototype.toString = function() {
  return "[" + this.name + " Animal]";
};

Animal.prototype.valueOf = function() {
  return this.name;
};

console.log(animal.toString());
console.log(animal.valueOf());
