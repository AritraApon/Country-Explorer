const loadCountry = async()=>{
    const url = `https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region`;

    let res = await fetch(url)
    let data = await res.json();
    displayCountryData(data)
}

const displayCountryData = (countries)=>{
    const flagContainer = document.getElementById('flag_container') ;
    flagContainer.innerHTML = '';

    countries.forEach(country => {
            console.log(country)
        const div = document.createElement('div')
           div.innerHTML= `
                    <div onclick="displayModal" class="flex justify-center items-center px-2 py-3 h-48 border bg-[#8080801f]  rounded shadow">
                 <div class=" space-y-2 ">
                    <p class="font-bold text-center text-[14px] text-white ">${country.name.common}</p>
                    <img src="${country.flags.svg}" alt="${country.flags.alt}" class="w-[100px] ">
                </div>
               </div>
           `
         flagContainer.appendChild(div)
    });
}

const displayModal = (infos) =>{
    
}

loadCountry()