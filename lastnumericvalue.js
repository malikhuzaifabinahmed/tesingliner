function getFirstNumericValue(inputString) {
  // Use a regular expression to match the first numeric value in the string
  const match = inputString.match(/\d{1,3}(,\d{3})*(?:\.\d+)?/);

  // Check if a match is found
  if (match) {
    // Remove commas and return the matched numeric value
    return parseFloat(match[0].replace(/,/g, ""));
  } else {
    // Return an appropriate value if no numeric value is found
    return null;
  }
}
module.exports = getFirstNumericValue;
