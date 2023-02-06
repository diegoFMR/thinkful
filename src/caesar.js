// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const caesarModule = (function () {
  // you can add any code you want within this function scope
  const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

  function decodeChar(letter, shift){
    const indexFound = ALPHABET.indexOf(letter);
    let moveIndex;
    
    //positive shift
    if(shift > 0){
      moveIndex = indexFound - shift;
      if(moveIndex < 0 ){// moveIndex is negative
        return ALPHABET[(ALPHABET.length + moveIndex)]
      }
    }else{//negative shift
      shift = shift * -1;//convert shift to positive
      moveIndex = indexFound + shift;

      if(moveIndex >= ALPHABET.length){//moveIndex greater then alphabet length
        return ALPHABET[(moveIndex-ALPHABET.length)]
      }

    }//else ends

    return ALPHABET[moveIndex]
  }

  function encodeChar(letter, shift){
    const indexFound = ALPHABET.indexOf(letter);
    
    let moveIndex;
    //positive shift
    if(shift > 0){
      moveIndex = indexFound + shift;
      if(moveIndex > ALPHABET.length ){
        return ALPHABET[((ALPHABET.length-moveIndex)*-1) ]
      }
    }else{//negative shift
      
      moveIndex = indexFound + shift;
       
      if(moveIndex < 0){//negative moveIndex
        return ALPHABET[moveIndex+ALPHABET.length]
      }

    }//else ends

    return ALPHABET[moveIndex]
  }

  function caesar(input, shift, encode = true) {
    input = input.toLowerCase();
    if(!shift || shift == 0 || shift > 25 || shift < -25){
      return false
    }
    let returnString = "";
    const regex = new RegExp("[a-z]");

    let convertFunction = encode? encodeChar:decodeChar;

    for(let i =0; i< input.length; i++){
      //if the char is not al alphabet
      if(regex.test(input[i])){
        returnString += convertFunction(input[i], shift);
      }else{
        returnString += input[i];
      }
    }

    return returnString
  }

  return {
    caesar,
  };
})();

module.exports = { caesar: caesarModule.caesar };
