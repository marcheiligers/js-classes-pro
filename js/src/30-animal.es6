String.prototype.articulize = function() {
  if(["a", "e", "i", "o", "u"].indexOf(this[0].toLowerCase()) >= 0) {
    return "an " + this;
  } else {
    return "a " + this;
  }
};
//<-- String
//--> ES6 Animal
class Animal {
  constructor() {
    this.name = "animal";
  }
  speak() {
    return "I'm " + this.name.articulize();
  }
}

var animal = new Animal();
console.log(animal.speak());

//--> ES6 Pig
class Pig extends Animal {
  constructor() {
    this.name = "pig";
  }
  speak() {
    return super() + ". Snork";
  }
}

var pig = new Pig();
console.log(pig.speak());

//--> ES6 Eisbein
class Eisbein extends Pig {
  speak() {
    return super() + ". Sizzle";
  }
}

var eisbein = new Eisbein();
console.log(eisbein.speak());
