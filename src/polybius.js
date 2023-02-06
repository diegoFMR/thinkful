// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const polybiusModule = (function () {
  //helper function to get the exceptions

  const GRID = [
    ['a','f','l','q','v'],
    ['b','g','m','r','w'],
    ['c','h','n','s','x'],
    ['d','i/j','o','t','y'],
    ['e','k','p','u','z']
  ];
  //The const having the position for the i/j exception. 
  const IJ_POSITION = {
    indexX: 3,
    indexY: 1
  } //on indexX-indexY format being x=3 and y=1. The value would be GRID[indexX][indexY]

  function getIandJ(){
    let returnObj = [];//return an array with all the alphabets found inside of the option string
    let option = GRID[IJ_POSITION.indexX][IJ_POSITION.indexY];//Accessing the GRID item that has an exception option
    let expression = new RegExp('[a-z]');//regular expression to test from a to z in the alphabet
    for(let i=0; i < option.length; i++){
      if(expression.test(option[i])){
        returnObj.push(option[i]);//add the char to the returnObj
      }
    }

    return returnObj
  }

  function decodeChar(input){
    
    let returnString = "";
    const regexNumeric = new RegExp("[0-9]");

    for(let i = 1; i<input.length; i+=2){
      let first = input[i-1];
      if(regexNumeric.test(first)){//if is a numeric
        let second = input[i];
        returnString += GRID[first-1][second-1];//insert the value found
      }else{//everything else (spaces, comas, etc)
        returnString += first;
        i--;//go back one position once the character is retrieved
      }
    }//for ends

    return returnString
  }

  function encodeChar(letter){
    let indexX;
    let indexY;//indexes on X and Y compared to the GRID position/index
    //Checking the i/j exception
    try{
      //IandJ validation
      let findValidation = getIandJ().find(item=>item === letter);
      if(!(findValidation === undefined)) return `${IJ_POSITION.indexX+1}${IJ_POSITION.indexY+1}`
      
    }catch(e){
      console.log('Error at IandJ validation');
      console.log(e)
    }
    
    //Looping through the grid [][]
    for(let i=0; i<GRID.length; i++){
      indexX = GRID[i].indexOf(letter);
      if(indexX !== -1) {
        indexY = i;
        break
      };
    }
    //adding +1 to the index founds since the arrays first index is 0
    indexX++;
    indexY++;
    return `${indexY}${indexX}`
  }

  function polybius(input, encode = true) {
    //decoding and the lenght is an odd number
   
    let returnString = "";
    if(encode){
      const regexAlphabet = new RegExp("[a-z]");
      for(let i=0; i<input.length; i++){
        //If it's not an alphabetic symbol (spaces, comas, dots, etc)
        if(regexAlphabet.test(input[i])){
          returnString += encodeChar(input[i]);
        }else{
          returnString += input[i];
        }
      }
    }else{
      const spaces = input.split(" ");
      let flag = false;
      spaces.forEach(element => {
        if((element.length %2)>0){
          flag = true;
        }
      });
      if(flag) return false

      returnString = decodeChar(input);
    }
    return returnString
  }

  return {
    polybius,
  };
})();

module.exports = { polybius: polybiusModule.polybius };
