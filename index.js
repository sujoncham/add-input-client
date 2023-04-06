const myName= {name: "Rasel"};
const obj = Object.create(myName);
delete obj.name;
const result = obj.name;
console.log(myName)
console.log(result)