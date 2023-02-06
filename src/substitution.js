// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const substitutionModule = (function () {
  // you can add any code you want within this function scope
  const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

  function hasRepeats (str) {
    return /(.).*\1/.test(str);
  }

  function substitution(input, alphabet, encode = true) {
    if(!alphabet || alphabet.length !== 26 || hasRepeats(alphabet) ){
      return false
    }
    
    let returnString = "";
    const regexSpace = new RegExp(" ");

    if(encode){
      for(i = 0; i<input.length; i++){
        if(regexSpace.test(input[i])){
          returnString += input[i];
        }else{
          returnString += alphabet[ALPHABET.indexOf(input[i])];
        }
      }     
    }else{
      for(i = 0; i<input.length; i++){
       
        if(regexSpace.test(input[i])){
          returnString += input[i];
        }else{
          returnString += ALPHABET[alphabet.indexOf(input[i])];
        }
      }
    }

    return returnString
  }

  return {
    substitution,
  };
})();

module.exports = { substitution: substitutionModule.substitution };
