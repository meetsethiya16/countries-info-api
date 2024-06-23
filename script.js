const countryContainer = document.querySelector(".countries-container");

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((country) => {
      const countryCard = document.createElement("a");
      //   console.log(countryCard);
      countryCard.href = `/country.html?name=${country.name.common}`;
      //   countryCard.target = "_blank";
      countryCard.classList.add("country-card");

      countryCard.innerHTML = `
                    <img src="${country.flags.svg}" alt="flag">
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
  });
