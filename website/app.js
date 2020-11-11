/* Global Variables */
const url = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=93911338b1c8f3ee848c28671fda9b1d&units=imperial";

let date = new Date();
let month = date.getMonth() + 1;
let dateNow = month + "." + date.getDate() + "." + date.getFullYear();

//Async fetching data from api
const getData = async (url, zipCode, apiKey) => {
  const req = await fetch(url + zipCode + apiKey);
  try {
    const res = await req.json();
    return res;
  } catch (err) {
    return err;
  }
};

//Async posting data to postData
const postData = async (url = "", inp = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inp),
  });
  try {
    const res = await req.json();
    return res;
  } catch (err) {
    return err;
  }
};

//Async update UI
const update = async () => {
  const req = await fetch("api/getData");
  try {
    const res = await req.json();
    document.getElementById(
      "temperature"
    ).innerHTML = `Temperature: ${res.temprature}`;
    document.getElementById("date").innerHTML = `Date: ${res.date}`;
    document.getElementById("feeling").innerHTML = `I feel ${res.feeling}`;
  } catch (err) {
    return err;
  }
};

//Event listener on click of button
document.getElementById("submitBtn").addEventListener("click", () => {
  const zipCode = document.getElementById("zipCode").value;
  const feeling = document.getElementById("feelings").value;

  getData(url, zipCode, apiKey).then(function (res) {
    console.log(res);
    postData("api/postData", {
      temprature: res.main.temp,
      date: date,
      feeling: feeling,
    }).then(update());
  });
});
