const countryName = new URLSearchParams(location.search).get("name");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=True`).then(
  (res) =>
    res.json().then((data) => {
      console.log(data[0]);
    })
);
