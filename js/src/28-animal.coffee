# --> CoffeeScript Animal Class #speak and #toString
class Animal
  constructor: ->
    @name = "animal"

  speak: ->
    "I'm a " + @name

  toString: ->
    "[#{@name} Animal]"

animal = new Animal
console.log animal.speak()

# --> String#articulize
String::articulize = ->
  vowels = ['a', 'e', 'i', 'o', 'u']
  article = if @[0..0].toLowerCase() in vowels then 'an' else 'a'
  "#{article} #{@}"

console.log "Pig".articulize()
console.log "Eisbein".articulize()

Animal::speak = ->
  "I'm #{@name.articulize()}"

console.log animal.speak()

# --> Pig Class
class Pig extends Animal
  constructor: ->
    @name = "pig"
  speak: ->
    "#{super}. Snork"

pig = new Pig
console.log pig.speak()

# --> Eisbein Class
class Eisbein extends Pig
  speak: ->
    "#{super}. Sizzle"

eisbein = new Eisbein
console.log eisbein.speak()
