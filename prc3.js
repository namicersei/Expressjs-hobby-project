var string1 = "i am Lord Voldemort";
var string2 = "tom marvolo riddle";

let newString1 = string1.split('').filter(c => c!=' ').sort().join().toLowerCase();
let newString2 = string2.split('').filter(c => c!=' ').sort().join();

console.log(newString1);
// if(new)