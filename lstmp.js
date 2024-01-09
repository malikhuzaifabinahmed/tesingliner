const { LinearRegression } = require("./linerRegresion");

const fs = require("fs");
const csv = require("csv-parser");

const filePath = "./data.csv";

// Create an array to store the parsed CSV data
const csvData = [];
let inputs = [];
let outputs = [];

// Read the CSV file and parse its content
fs.createReadStream(filePath)
  .pipe(csv())
  .on("data", (row) => {
    // Process each row of the CSV file
    csvData.push(row);
  })
  .on("end", () => {
    // All rows have been read and processed
    csvData.map(({ household_income, deposit, mortgage }) => {
      inputs.push([household_income, deposit]);
      outputs.push([mortgage]);
    });
    console.log(outputs);
    const model = new LinearRegression(inputs, outputs);

    // Train the model
    model.train();

    // Use the trained model to make predictions
    const output = model.predict([[329412, 55808339]]);
    console.log(output);
  })
  .on("error", (error) => {
    // Handle errors during the file reading or parsing process
    console.error("Error:", error.message);
  });

// 57287399
