const { url } = require("inspector");
const boyerMooreSearch = require("./boore-more");
const getFirstNumericValue = require("./lastnumericvalue");
const axios = require("axios");
const fs = require("fs");
//Control Parameters of Mortgage

const pattrenForMortgage = "£<!-- -->";
const mortgagedifferCount = 8;
const mortgageAdditionOnTheEnd = 20;

const patternForIntrestRate = "%</p>"; //intrest rate is behind the pattren wiht total of 3 character
const intrestratedifferCount = -5;
const inrestrateadditionOntheend = 5;

const patternForMonthlyCost = "monthly cost";
const monthlyCostDifferCount = 53;
const monthlyCostadditionOntheend = 10;
//length of the mortgage should be to the lenght of availvable numbers
function createCSVString(includeHeader, ...args) {
  if (args.length % 2 !== 0) {
    throw new Error("Arguments must be in pairs of column name and value.");
  }

  const columnNames = [];
  const columnValues = [];

  for (let i = 0; i < args.length; i += 2) {
    const columnName = args[i];
    const columnValue = args[i + 1];

    columnNames.push(`"${columnName}"`);
    columnValues.push(`"${columnValue}"`);
  }

  let csvString = "";

  if (includeHeader) {
    const headerRow = columnNames.join(",");
    csvString += `${headerRow}\n`;
  }

  const dataRow = columnValues.join(",");
  csvString += `${dataRow}`;

  return csvString;
}
function createCSVString(includeHeader, ...args) {
  if (args.length % 2 !== 0) {
    throw new Error("Arguments must be in pairs of column name and value.");
  }

  const columnNames = [];
  const columnValues = [];

  for (let i = 0; i < args.length; i += 2) {
    const columnName = args[i];
    const columnValue = args[i + 1];

    columnNames.push(`"${columnName}"`);
    columnValues.push(`"${columnValue}"`);
  }

  let csvString = "";

  if (includeHeader) {
    const headerRow = columnNames.join(",");
    csvString += `${headerRow}\n`;
  }

  const dataRow = columnValues.join(",");
  csvString += `${dataRow}`;

  return csvString;
}

function appendToCSVFile(csvString, filePath) {
  // Append the CSV string to the specified file
  fs.appendFileSync(filePath, csvString + "\n", "utf-8");
}
function getRandomInt(min, max) {
  // Use Math.floor() to round down to the nearest integer
  // Use Math.random() to generate a random decimal between 0 (inclusive) and 1 (exclusive)
  // Multiply by the range and add the minimum value to get a random integer in the desired range
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
async function apicallFetch(household_income = 20000, deposit = 80000) {
  console.log("insit");
  let config = {
    method: "get",

    url: `https://www.tembomoney.com/mortgage-calculator?purpose=buy&household_income=${household_income}&deposit=${deposit}&property_value=&booster_income=0&booster_savings=0&booster_property_value=0&mortgage_balance=&additional_borrowing_amount=0`,
  };

  let response = await fetch(config.url);

  let result = await response.text();

  console.log("fetched");
  console.log(response.body);
  const mortgageStart = boyerMooreSearch(result, pattrenForMortgage);
  let text = "";

  for (
    let i = mortgageStart + mortgagedifferCount;
    i < mortgageStart + mortgagedifferCount + mortgageAdditionOnTheEnd;
    i++
  ) {
    text = text + result[i];
  }
  let availableMortgage = getFirstNumericValue(text);

  const intrestrateStart = boyerMooreSearch(result, patternForIntrestRate);
  text = "";
  for (
    let i = intrestrateStart + intrestratedifferCount;
    i < intrestrateStart + intrestratedifferCount + inrestrateadditionOntheend;
    i++
  ) {
    text = text + result[i];
  }
  let availableIntrestRate = getFirstNumericValue(text);
  const monthlyCostStart = boyerMooreSearch(result, patternForMonthlyCost);
  text = "";
  for (
    let i = monthlyCostStart + monthlyCostDifferCount;
    i < monthlyCostStart + monthlyCostDifferCount + monthlyCostadditionOntheend;
    i++
  ) {
    text = text + result[i];
  }
  let availableMonthlyCost = getFirstNumericValue(text);

  const csvString = createCSVString(
    false,
    "household income",
    household_income,
    "deposit",
    deposit,
    "mortgage",
    availableMortgage,
    "interestRate",
    availableIntrestRate,
    "monthlyCost",
    availableMonthlyCost
  );
  appendToCSVFile(csvString, "./data.csv");
  console.log(csvString);
}
let household_income = 10000;
let deposit = 80000;
async function start() {
  while (true) {
    household_income = getRandomInt(10000, 50000);
    deposit = getRandomInt(100000, 999999);

    console.log("run");
    try {
      await apicallFetch(household_income, deposit);
    } catch (e) {
      console.log("error");
    }
    await sleep(13000);
  }
}
start();
