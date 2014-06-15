//$({ "nodeName": "img", "src": "images/pig-green.png", "id": "pig", "style": "position:absolute;width:3%;top:45%;right:5%;" })
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

Pig.prototype.speak = function() {
  return Animal.prototype.speak.call(this) + ". Snork";
};

Eisbein.prototype.speak = function() {
  return Pig.prototype.speak.call(this) + ". Sizzle";
};
//<-- Animal, Pig, Eisbein and String

//--> Pig#attach -> 'pig'
Pig.prototype.attach = function(id) {
  var el = document.getElementById(id);
  el.onclick = function() {
    alert(this.speak());
  }
}
pig.attach('pig');

//--> Pig#attach with self -> 'pig'
Pig.prototype.attach = function(id) {
  var el = document.getElementById(id),
      self = this;
  el.onclick = function() {
    alert(self.speak());
  }
}
pig.attach('pig');

//--> Pig#attach with bind -> 'pig'
Pig.prototype.attach = function(id) {
  var el = document.getElementById(id);
  el.onclick = function() {
    alert(this.speak());
  }.bind(this)
}
pig.attach('pig');

//--> once and speakOnce
function once(fn, ctx) {
  var fired = false;
  return function() {
    if(fired) {
      return;
    } else {
      fired = true;
      return fn.apply(
        ctx,
        arguments
      );
    }
  }
}

var speakOnce = once(pig.speak, pig);
console.log(speakOnce());
console.log(speakOnce());

//--> Function#only, EisbeinFactory
Function.prototype.only = function(times, ctx) {
  var fn = this;
  return function() {
    if(times > 0) {
      times--;
      return fn.apply(
        ctx,
        arguments
      )
    }
  }
}

function EisbeinFactory(pig) {
  this.makeEisbein = function() {
    this.legs--;
    return new Eisbein();
  }.only(4, pig)
}

var f = new EisbeinFactory(pig);
console.log(f.makeEisbein().speak());
console.log(f.makeEisbein().speak());
console.log(f.makeEisbein().speak());
console.log(f.makeEisbein().speak());
// This one breaks:
console.log(f.makeEisbein().speak());
console.log(pig.countLegs());
