let allCountries = []

const spinner = (status) => {
    if (status === true) {
        document.getElementById("spinner").classList.remove('hidden')
        document.getElementById("all_container").classList.add('hidden')
    } else {
        document.getElementById("spinner").classList.add('hidden')
        document.getElementById("all_container").classList.remove('hidden')
    }
}



const loadCountry = async () => {
    spinner(true)
    const url = `https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region`;

    let res = await fetch(url)
    let data = await res.json();

    spinner(false);

    allCountries = data
    displayCountryData(data);

}

const displayCountryData = (countries) => {
    const flagContainer = document.getElementById('flag_container');
    flagContainer.innerHTML = '';

    countries.forEach(country => {
        // console.log(country)
        const div = document.createElement('div')
        div.innerHTML = `
                    <div  class="flex justify-center items-center px-2 py-3 h-48 border bg-[#8080801f]  rounded shadow">
                 <div class=" space-y-2 ">
                    <p class="font-bold text-center text-[14px] text-white ">${country.name.common}</p>
                    <img src="${country.flags.svg}" alt="${country.flags.alt}" class="w-[100px] ">
                </div>
               </div>
           `
        div.querySelector('div').addEventListener('click', () => displayModal(country));
        flagContainer.appendChild(div);

    });
}

const displayModal = (info) => {
    // console.log(infos)

    const countryInfos = document.getElementById('country-infos');
    countryInfos.innerHTML = `
       <div class="space-y-3">
                            <div class="bg-white">
                                <img src="${info.flags.svg}" alt="${info.flags.alt}" >
                            </div>
                          <div class=" text-white text-2xl grid grid-cols-2 gap-y-2">
                                <span class="font-bold text-blue-700">Name:</span>
                                <span>${info.name.common}</span>

                                <span class="font-bold text-blue-700">Capital:</span>
                                <span>${info.capital && info.capital.length > 0 ? info.capital[0] : 'N/A'}</span>

                                <span class="font-bold text-blue-700">Population:</span>
                                <span class="text-yellow-500">${info.population}</span>

                                <span class="font-bold text-blue-700">Region:</span>
                                <span>${info.region}</span>
                            </div>
                        </div>
       `

    // countryInfos.appendChild(div)
    document.getElementById('my_modal_3').showModal()

};

document.getElementById('search_btn').addEventListener("click", () => {
    const input = document.getElementById('section_input');
    const searchInput = input.value.trim().toLowerCase();

    let filtered;

    if (searchInput === '') {
        filtered = allCountries;
    } else {
        filtered = allCountries.filter(country =>
            country.name.common.toLowerCase().includes(searchInput)
        );
    }

    if (filtered.length === 0) {
        document.getElementById('flag_container').innerHTML =
            `<p class="text-center text-red-500 text-xl">No country found</p>`;
    } else {
        displayCountryData(filtered);
    }
});








loadCountry()