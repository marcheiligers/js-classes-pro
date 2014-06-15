//--> var o1 = new Object();
var o1 = new Object();
o1['key'] = 'value';

console.log(o1.toString());
console.log(o1['key']);

//--> var o2 = {};
var o2 = {
  key: 'value'
};

console.log(o2['valueOf']());
console.log(o2.key);
