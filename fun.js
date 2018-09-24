// Implement modulo without using the (%) operator.
const modulo = (a, b) => {
  return a - b * Math.floor(a / b);
};

// Take an input string and determine if exactly 3 question marks
// exist between every pair of numbers that add up to 10.
// If so, return true, otherwise return false.
const question_mark = (s) => {
  for(var i = 0; i < s.length(); i++){
    if(s.charAt(i).isNumber()){
      var numQ = 0;
      for(var j = i + 1; j < s.length(); j++){
        if(s.charAt(j) === '?') numQ++;
        else if(s.charAt(j).isNumber() && s.charAt(i) + s.charAt(j) === 10){
          if(numQ === 3) return true;
        }
      }
    }
  }

};
