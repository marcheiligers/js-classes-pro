String.prototype.articulize = function() {
  if(["a", "e", "i", "o", "u"].indexOf(this[0].toLowerCase()) >= 0) {
    return "an " + this;
  } else {
    return "a " + this;
  }
};
//<-- String
//--> TypeScript Animal
class Animal {
  name: string,
  constructor() {
    this.name = "animal";
  }
  speak() {
    return "I'm " + this.name.articulize();
  }
}

var animal = new Animal();
console.log(animal.speak());

//--> TS Pig
class Pig extends Animal {
  constructor() {
    this.name = "pig";
  }
  speak() {
    return super.speak() + ". Snork";
  }
}

var pig = new Pig();
console.log(pig.speak());

//--> TS Eisbein
class Eisbein extends Pig {
  speak() {
    return super.speak() + ". Sizzle";
  }
}

var eisbein = new Eisbein();
console.log(eisbein.speak());
