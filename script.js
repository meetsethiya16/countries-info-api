const countryContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region");
const searchInput = document.querySelector(".search-container input");

let allCountriesData;

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data);
    allCountriesData = data;
  });

filterByRegion.addEventListener("change", (e) => {
  console.log(e.target.value);

  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries);
});

function renderCountries(data) {
  countryContainer.innerHTML = "";
  data.forEach((country) => {
    // console.log(country.name.common);
    // console.log(country.borders);
    const countryCard = document.createElement("a");
    countryCard.href = `/country.html?name=${country.name.common}`;
    countryCard.classList.add("country-card");

    countryCard.innerHTML = `
                    <img src="${
                      country.flags.svg
                    }" alt="{country.name.common} flag">
                      <div class="card-text">
                          <h3 class="card-title">${country.name.common}</h3>
                          <p><b>Population: </b>${new Intl.NumberFormat(
                            "en-IN",
                            { maximumSignificantDigits: 3 }
                          ).format(country.population)}</p>
                          <p><b>Region: </b>${country.region}</p>
                          <p><b>Capital: </b>${country.capital?.[0]}</p>
                      </div>`;
    countryContainer.appendChild(countryCard);
  });
}

searchInput.addEventListener("input", (e) => {
  // console.log(e.target.value);
  // console.log(allCountriesData);
  const filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  // console.log(filteredCountries);
  renderCountries(filteredCountries);
});
