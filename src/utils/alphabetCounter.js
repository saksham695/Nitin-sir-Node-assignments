const alphabetCounter = (filedata) => {
  lowerCaseFileData = filedata.toUpperCase();
  const TOTAL_ENGLISH_ALPHABETS = 26;
  const INITIAL_COUNT_OF_ALPHABETS = 0;
  const hashingCounter = new Array(TOTAL_ENGLISH_ALPHABETS).fill(
    INITIAL_COUNT_OF_ALPHABETS
  );

  for (let itr = 0; itr < lowerCaseFileData.length; itr++) {
    const charToAscii = lowerCaseFileData.charCodeAt(itr);
    if (charToAscii > 64 && charToAscii < 91) {
      hashingCounter[charToAscii - 65]++;
    }
  }
  const mappingOfAlphabets = {};
  for (let itr = 0; itr < TOTAL_ENGLISH_ALPHABETS; itr++) {
    mappingOfAlphabets[String.fromCharCode(itr + 65)] = hashingCounter[itr];
  }
  return mappingOfAlphabets;
};
module.exports = alphabetCounter;
