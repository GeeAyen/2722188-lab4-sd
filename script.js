
const myButton = document.getElementById('myButton');
const country_info = document.getElementById("country-info");;
const bordering_countries  = document.getElementById("bordering-countries");
const parag  = document.getElementById("parag");

console.log(myButton)
async function fetchCountryInfo(){
    try{
        const countryName = document.getElementById("nameOfCountry").value;
        const country = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        const data = await country.json();
        console.log(data);
    
        const capital = data[0].capital
        const population = data[0].population
        const region = data[0].region
        const flag = data[0].flags.png
        const borderCountries = data[0].borders


        const info = document.createElement("p")
        info.textContent = `Country name:  ${countryName} :`
        country_info.appendChild(info)

        const cCap = document.createElement("p")
        cCap.textContent = `Country capital:  ${capital} :`
        country_info.appendChild(cCap)

        const cpop = document.createElement("p")
        cpop.textContent = `Country population:  ${population} :`
        country_info.appendChild(cpop)

        const cReg = document.createElement("p")
        cReg.textContent = `Country Region:  ${region} :`
        country_info.appendChild(cReg)

        const countryFlag = document.createElement("img")
        countryFlag.src = flag;
        country_info.appendChild(countryFlag)

        for (let i = 0; i < borderCountries.length; i++) {
            const countryCode = borderCountries[i];
        
            // Create a container for the border country info
            const borderContainer = document.createElement("div");
        
            // Fetch details of the neighboring country
            fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
                .then(response => response.json())
                .then(borderData => {
                    const borderCountryName = borderData[0].name.common;
                    const borderFlag = borderData[0].flags.png;
        
                    // Create and append the country name
                    const bord = document.createElement("p");
                    bord.textContent = `Border: ${borderCountryName}`;
                    borderContainer.appendChild(bord);
        
                    // Create and append the country flag
                    const flagImg = document.createElement("img");
                    flagImg.src = borderFlag;
                    flagImg.alt = `Flag of ${borderCountryName}`;

        
                    borderContainer.appendChild(flagImg);
                    bordering_countries.appendChild(borderContainer);
                })
                .catch(error => console.error(`Error fetching ${countryCode}:`, error));
        }
        
        
    
    
    
    }catch(countryName){
        // console.log(error)
        console.log(countryName);
    }

}
