Hi!

# 1. Who Am I?
My name is Marc Heiligers and I'm marcheiligers everywhere on the internet
that is important.

# 2.
I'm the CTO at Mad Mimi.
Who here knows what Mad Mimi is?
Not so many of you... we're an Email Service Provider. We send and track around
40M emails a day for our customers.

# 3.
I'm also the organiser of Rubyfuza which is still the only Ruby-language
conference in Africa. Next year will be our 5th year.

# 4.
I'm ultimately a Ruby-guy.

# 5.
But, like many of you, I have a Microsoft development background.

# 5.1.
Speaking of which: I'd like to thank Microsoft for sponsoring this great venue.

# 5.2.
And also thank-you to BBD, Entelect and Amazon Development Center.

# 5.3.
And if you'd like to reach down to PE, we sure could use your help getting some
kind of regular developer meetup going there.

# 5.4. Anyway, back to our regular scheduled programming

# 6.
Sometime between the introduction of television to South Africa,
and the invention of the World Wide Web by Tim Berners Lee...

# 6.1.
...My Grandfather bought me a computer. It was one of these. A Commodore 64.
(My joystick had red buttons)

# 6.2.
It had awesome games like this one. This game is called Wizball, and I
absolutely loved it.

But games were expensive (they still are) and you'd soon run out of them.

# 6.3.
Luckily the Commodore 64 came with manuals that explained everything about
how the computer worked. From circuit diagrams, to BASIC programming, to the
underlying CPU architecture. <more: figuring out how games worked... printer and RPGs> I programmed an Assembler in BASIC amongst other
things.

# 6.4.
So from there through school and university I learnt:
- Commodore 64 BASIC
- Commodore 64 Assembly
- GW BASIC
- Turbo Pascal
- Turbo C
- Java
- Classic ASP
- Sun Spark Assembly
- GNU and MS C++

# 7.
Of these, the most important, at least for the purposes of this talk, was
Classic ASP...

...because you could do this...

...Server side JavaScript in the 90's.

# 8.
So that was when I fell in love with JavaScript...

...JavaScript looked like C and Java...
...It ran in the browser...
...And on the server...
...And it wasn't VB

I was pretty tired of BASIC languages by this time but enjoyed the freedom
of being weakly typed and expressive.

For my Honours year project I was supposed to develop an internal system for
tracking reasearch outputs of the Comp.Sci. department. What I did, to a very
large extent, was develop a in-browser tree navigation system, much like
Windows Explorer, which was used by the rest of my class in their projects.

## 8.1. Not here to talk about me
Anyway we're not here to talk about my history. If we were we'd also have to
note that I was a lot shorter once and didn't have this fur on my face.

## 8.2. JavaScript
What we are here to talk about is JavaScript. And specifically about classes
and inheritance in JavaScript.

# 9. What are Classes?
Or at least, what do we care about?
First I'd like to make a disclaimer:

...We come in peace...

There's a lot of disagreement and discussion around what OOP is,
whether JS is OOP or Object-based or something else entirely. I'm not here
to discuss these topics. I'm here to describe how JavaScript implements classes
and inheritence from the view of a classical OOP developer using a language such
as C#. Also, not everything I say here is strictly true. For the purposes of
this discussion everything I say is true enough.

...When I lie to you, I'll mark it with a dagger.

## 9.1. Classes...
- define reusable properties and methods
- can inherit functionality from a superclass
- can override functionality of their superclass
- can call their superclass methods
- are open (can be Monkey-patched)
(that last one, from a Rubyist perspective)

## 9.2. JavaScript
Does not have classical classes. To understand them we need to unlearn some of
the things we learnt in classic OOP languages.

But it is possible to treat JavaScript "classes" very much like classical
classes while also taking advantage of some of the dynamic nature of JS.

# 10. Objects
Everything in JavaScript is an object. Strings are objects. Numbers are objects.
Functions are objects. And Objects are objects.

So some of what is immediately ahead is basic stuff that most of you know. That
being said these are important fundamentals that will inform the rest of this
talk.

If you're bored with the following few slides, I fully understand. Concentrate
on trying to spot the gorilla.

# 11. Properties
Objects are what you might call a dictionary or map in other languages. They
have properties which are a key and a value.

Keys are strings.

Values can be anything:
- A number or a string or other type
- Another object or array (which is an object)
- Or a function (method)


We can access properties using the array like square bracket notation or the
shorter dot notation (assuming the keys aren't reserved keywords).

## 11.1
All objects inherit from Object.

...They get a toString method
...and a valueOf method
...and a whole whack of other methods (we're not interested in right now)

# 12. (Code: 11-objects.js)
We can create a new Object using the new syntax.
And we can add a property using the array-like syntax.
Typically we would then call methods like this using dot notation.
And access properties using the square bracket notation.

Or we can use the shorthand object literal syntax.
Which allows us to set properties easily.
And we can call methods using the array-like syntax.
And access properties using the dot notation.

# 13. Inheritance
So I mentioned that all objects inherit from Object. But how does that work?
Well, every instance has a secret magic property called __proto__ which points
at the [[prototype]] property of the Object used to create it.

What's interesting to note here is that Functions are used to create objects.
The Function used is the constructor and the [[prototype]] property of that
function is the what is inherited.

## 13.1
The magic new keyword does a bunch of work for us. It:

1. creates a fresh Object
2. sets the __proto__ property of the new object to point to the constructor's
[[prototype]] property, so it inherits those behaviours.
Note that the __proto__ property of this [[prototype]] points at the super class
[[prototype]] so we're setting up a prototype chain which the runtime will
traverse when looking for a property
3. calls the constructor function in the context of this fresh object, such that
this inside the constructor will be the fresh object, and pass any parameters
given to the function.
4. it returns the object

## 13.2
So by adding methods to the [[prototype]] of the constructor function we can
create functionality that will be inherited when we instantiate the Class.

And we can override methods likes this too.

# 14 (Code: 14-animal.js)
We create an Animal constructor where we assign a name instance variable. Then
we'll give it a speak method which says it's name. And then we can instantiate
this and call the speak method.

You can see that we've inherited from object if we call the toString and
valueOf methods.

And we can override those methods perhaps to make them more useful for
debugging.

# 15 Monkey-patching
Simply assign a new function to a key in the prototype of the object you want
to extend. *All* instances of the class will get the method
You can monkey-patch built in classes too with a couple of caveats:
- Don't extend Object
- Don't extend native DOM Classes like HTMLElement and HTMLDivElement
- Although MooTools and Prototype both do this
- And it's become more consistent over the years

# 16 (Code: 16-string.js)
Ok, so the Grammer Nazi's probably noticed that Animal says I'm *a* animal.
Let's sort that out. First We'll create this little array of vowels. And now
we'll extend String to add an articulize method which checks the first letter
of the string and if it's a vowel, gives us back *an* and otherwise *a* followed
by the string itself.

# 17 Inheritance
Ok, so we've seen how to create these constructor functions and how to add
methods to their prototype which all instances will have. How do we create a new
subclass? It's quite simple really:
- Create a new constructor function
- Assign a new instance of the super class to the prototype
which sets up the inheritance chain.

# 18 (Code: 18-pig.js)
Let's put all that together.

First I'll create a pig constructor function and set the name to 'pig' instead
of 'animal'. Then assign the Animal prototype so that if I call speak, I get the
expected response.

Now to keep things interesting, I'm going to add this countLegs method to Animal
and animals will have by default no legs at all. Pigs have 4 legs and you can
see that even though my Pig was instantiated before I added the countLegs method
I can call it.

Carrying on with that, Eisbeins are Pigs with one leg.

# 19 Super class methods
Remember I said Functions are Objects? Well Functions have methods too.
Function#call and #apply which allow you to call the function in the context of
another instance. The only difference between these two methods is that with
call you pass the arguments in the same way as when you calll the function
normallay... comma separated. With apply you pass the arguments as an array.
So you would use call to call the base class method in the context of the
current instance like this
Super.prototype.method.call(this);
Call is useful in many other places too, and you've probably seen this one:
Calling Array's slice method with an arguments which creates a real array from
the arguments oject

# 20 (Code: 20-pig.js)
So let's update the Pig and Eisbein speak methods.

First, in Pig we're going to make a call to Animal's speak method and then add a
little snork of our own. You see that we're calling speak in the context of this
object, so even though we're calling the Animal speak method, this.name is still
pig.

And then in Eisbein we'll call Pig's speak and add a sizzle. We didn't change
the name of the animal in Eisbein so it's still pig, but you can see we call
Pig's speak which in turn calls Animal's speak.

Simple right?

# 21 Privacy
So let's talk a little about privacy. We haven't touched on that at all yet,
although we've seen how we can override methods, extend Classes and essentially
touch anything attached to a prototype.

In everything we've done so far, nothing is private.

You might employ a convention of naming private keys with an underscore. Or
maybe 2. Or why not 2 in the front and 2 at the back?

This is like security through obscurity. A simple console.log or intelligent
IDE is going to show those private properties, and probably show them right at
the top because of the way they sort.

# 21.1 IFFE
Immediately-Invoked Function Expression or IFFE which is pronounced Iffy. These
functions are often incorrectly named a Self Invoking Function or SIF. Basically
they are made up of a function expression which is then immediately invoked.

The standard pattern looks something like this:
(function(global, undefined) {})(this)

We're passing in "this" which is the global object (window in the browser). Note
the second parameter of undefined. We've got this argument because it's
actually possible to redefine undefined in ES3 and ES5 non-strict code. By not
passing anything in for that argument, we know for sure we have a real undefined
inside our IFFE.

The great thing about IFFEs is that everything is private, unless you
specifically make it public and we don't polute the global namespace.

# 21.2 More uses for IFFEs
Pass more interesting things in to an IFFE too. For example if you're working
on a large project, or migrating from one library to another, you might do
something like this:

(function($) {})(jQuery)

# 22 (Code: 22-iffe.js)
Let's show off some of that. First I'm going to build a Pig object, with this
super secret underscore count property. We'll return that by calling count, and
we'll increment it when a pig gives birth. As you can see this works great.

But the underscore count property is public, and I can easily change it and
crook the books into saying I have more pigs than I really have.

On the other hand here's an Eisbein IFFE in which we define our count variable.
There's no need to use any weird conventions to mark it private, because it is
private. We're going to start with four and everytime we cook one (and
presumably eat it) we will have one less. I can call the methods I've exposed in
the return object

But no matter what I try I can't get at that private count variable. Even if I
change the public `total` and `cook` methods I cannot touch the private count.

# 23 Functions
- Are first class in JavaScript

And they have some useful methods like
- apply
- call
- bind
amongst others. We already saw the call method earlier when we we're calling
methods on our superclass.

#23.1 First class functions
Functions in JavaScript are First class citizens, but what does it mean
- Pass functions are arguments
- Return functons from functions
- Assign them to variables or in data structures
- Have anonymous functions

You can see from what we've done that in order for prototypal inheritance to
even work, JS has to have first class functions. The prototype is a data
structure, a simple object, that we assign functions to.

# 23.1 Closures
What are closures? A closure is a function that refers to an independant or free
variable. That is a variable in the scope in which the function was created.

When we create a function within another function we are, in fact, creating a
closure.

In the Eisbein IFFE we created just a few slides ago the `total` and `cook`
methods were closures and both of them referred to the `count` variable that we
defined in the IFFE.

# 23.2 Binding
We saw how we could use `call` to call a method in the context of another
object. `apply` does the same thing except that instead of passing the arguments
individually, with `apply` you pass an array of argments.

JavaScript has another method called `bind` which allows you to bind a function
to an object (so the `this` inside the function refers to the bound object).
When we call a method using instance dot method, the runtime ensures that the
function is bound to the instance.

However, if we assign a function from an object to something else, the binding
is lost. This comes up most often when you are assigning event handlers and the
way to get around this is to bind the function to the object.

# 23.3 Arguments
JS doesn't care about named vs unnamed arguments. If you give it a name it will
be assigned to the name. But you will never get Arity errors in JS. You can call
any function with any number of arguments and the only time you'll get any type
of argument error is if the function itself raises an error because it's
unhappy with the arguments.

# 24 (Code: 24-functional.js)
Ok, so that was quite a lot of stuff. Let's have a looksee at what that all
means.

You'll notice that little gree pig we have on the right there. So let's create
an attach method which attaches the pig's speak method to the onClick event of
some element. If we run this and then click on the pig, boom, it doesn't work.
That's because we lost the this in the onClick handler doesn't refer to the pig
instance anymore.

So we can use a closure to resolve that problem. By keeping a copy of this in
self in the closure we can get the desired result.

Or we can use JavaScript's built in bind method to achieve the same thing.

Closures and the ability to return functions from functions gives us some
interesting capabilities. For example, we might want a method to only be
callable once. We'll use a closure to save this boolean to see if the method
has been fired yet and then check in the function we return and only allow it
to be applied once.

To make something like that nicer to use, we might add it to the prototype of
Function itself. Say we wanted to create a function that can only be called
a specified number of times. Then we can use this to create an EisbeinFactory
which takes a Pig and cooks us soem Eisbein, but only 4 times (makes sense,
right?)

# 25 Easier classes
Now all of this seems like rather a lot of work just to have classes and
inheritance. To add methods, the syntax is complex using the prototype. Calling
superclass methods is a hassle with call. The actual inheritance step seems
daft and doesn't make sense unless you really try to wrap your head around it.

What if we could create a Class class that would make all of this easier?

# 26 (Code: 26-class.js)
Ok, so it takes some time to wrap your head around this code even given the
background of the last 20 odd slides. I'm not sure that I've completely wrapped
my head around it and I'm going to try and code this from memory. Wish me luck.

So first, we're going to do this in an IFFE so we don't drop anything into the
global namespace except for the Class construct that we actually want to.

Now we'll create this little helper function which tests whether it's argument
is a function. We're going to use this in a second role as a magic argument in a
bit. We could create another variable for this magic argument, but pffft, if we
have this handy, and this code mostly looks like magic anyway...

Ok, now we need a constructor function and this is really what we want to be
global, so we'll just assign it to the global object right away. It doesn't
actually need to do anything because we're actually going to do all the hard
work in the create method we'll write next.

Here's our Class create method which takes an object of properties that we want
our new class to have.

First our new class needs a constructor method. This method is where we need our
little magic. Remember JS will assign the first argument to our name. We're
going to call this method to setup the prototype chain shortly and we don't want
to call the constructor method when we do so we're using the magic argument to
ensure that we don't. If it's not us calling it, then we do want to call the
constructor method, which we're calling initialize, inspired by Ruby, and
passing all the arguments.

And now we're going to call our constructor function `this` with the magic
argument which allows us to set up the prototype chain without calling
initialize. That is probably the most difficult part of this whole Class thing
but if you follow the code (and maybe add a few console logs) you can follow
what's going on.

Next we're goign to loop through the properties that we want to build our class
out of. If neither the property or the property of the superclass is a function,
then we just assign the property. If it is a function, then we create a closure
which keeps a reference to the superclass method and returns the applied method.

Finally we set the constructor for consistency and add an copy of either the
original create method from Class or the extend of the superclass.

And that's our class.

Let's start by building our Animal class again. As you can the code looks a lot
more natural. We create the class out of the properties on this object.
Initialize has special meaning in that it's the constructor method. You can see
that we can create an instance and call these methods just like we did before.

How about inheritance? The Pig class uses Animal.extend and we override the
initialize and the speak methods. In speak, we call the superclass method, and
it's much cleaner.

For the Eisbein, we extend Pig and just override the speak method again.

After all this our class hierarchy is actually: Object -> Class -> Animal -> Pig
-> Eisbein. So we introduced a new object into the hierarchy, the Class object.

# 27 Other options
Transpiling
- CoffeeScript is white space sensitive and loved by Rubyists everywhere
- TypeScript reminds me a lot of ActionScript
- ES6 is the next generation of JavaScript and can be used today using something
like the Traceur compiler.

All of these require an extra step before running your code but why shouldn't
JavaScript developers have a build step?

# 28 (Code: CoffeeScript)
Coffee script has class key word and the special constructor function which is
similar to the initialize function we created.

We'll add a speak method and you see that we use the @ symbol to refer to this.

We'll also override toString and CoffeeScript has a nice method of templating
which is actually identical to Ruby.

And we'll create an instance and speak.


We can also override existing methods so let's create the articulize method and
then override the speak method in animal again.


We can extend a class by using the extends keyword and easily call the
superclass method using super.


And for completeness sake, let's do Eisbein.

# 29 (Code: TypeScript)
I don't know TypeScript very well at all, but unlike CoffeeScript it's not
whitespace sensitive. It does, however, give us much of the same functionality
that CoffeeScript gave us.

So we can create our Animal class...

Extend it to create a Pig...

and then create the Eisbein in much the same way.

# 30 (Code: ES6)
JavaScript is evolving and has learnt from the likes of CoffeeScript and
TypeScript. You'll see that this code is almost identical to the TypeScript
code except in the way that we call the super function.

# 31 Quote
I was chatting to Juriy the other day while we were digging into an apparent
jQuery bug, and I asked him if he uses any of these tools to build his own
projects. He responded that he wasn't.

He asked me if I was thinking of using one for our JavaScript.  We're currently
using Prototype which has a class construct, but we're migrating to jQuery.
We've basically grabbed the class construct out of Prototype so we don't have
to change too much existing code.

Personally, though, I wonder if that was a mistake. Although I'm not a huge fan
of whitespace sensitive languages (we use SCSS instead of SASS), being a
Ruby-shop I think we should use CoffeeScript.

The beauty of having these options, though, is that you have a choice. With
around 30 lines of code you can have a nice class construct and no build step,
or you can be forward thinking and use Traceur to give you tomorrow's JavaScript
today.

# 32 Questions

http://robotlolita.github.io/2011/10/09/understanding-javascript-oop.html














