let test = '{"heartrate":"-1","Strengths":[-49,-100,-100,-40,-100,-43]}'.replace({"\'" : "\""})
console.log(test);
let readings = JSON.parse(test);
console.log(readings);