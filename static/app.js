

let planetsTBody = document.querySelector('.planets')
let nextBtn = document.getElementById('next')
let previousBtn =document.getElementById('previous')
const showModal=document.querySelector('#show-modal')
const backdrop=document.querySelector('#backdrop');
const closeModalBtn=document.querySelector('.modal__actions')
const variable = 'https://swapi.dev/api/planets/?page=1'

    closeModalBtn.addEventListener('click',function(){
           showModal.classList.toggle('open-table')
            backdrop.classList.toggle('open-table')
    })



async function getPlanets(planetsEndpoint) {
    let count = parseInt(planetsEndpoint[planetsEndpoint.length-1])
    planetsTBody.innerHTML = ''
    let data = await fetch(`${planetsEndpoint}`)

    let jsonData = await data.json()
    nextBtn.setAttribute('data-fetch', jsonData.next)
    if (jsonData.next === null) {
        nextBtn.setAttribute('disabled', true)
    } else {
        nextBtn.removeAttribute('disabled')
    }
    previousBtn.setAttribute('data-fetch', jsonData.previous)
    if (jsonData.previous === null) {
        previousBtn.setAttribute('disabled', true)
    } else {
        previousBtn.removeAttribute('disabled')
    }
    let resultData = jsonData.results




    for (let i=0; i<10; i++) {
        let planetsTr = document.createElement('tr')
        planetsTBody.appendChild(planetsTr)
        let tdElementDiez = document.createElement('td')
        tdElementDiez.innerHTML = `<th> ${i+1+(count-1)*10} </th>`
        planetsTr.appendChild(tdElementDiez)
        let tdElementName = document.createElement('td')
        // tdElement.classList.add('td-element')
        tdElementName.innerHTML = `<td>${resultData[i].name}</td>`
        planetsTr.appendChild(tdElementName)
        let tdElementDiam = document.createElement('td')
        tdElementDiam.innerHTML = `<td> ${numberWithCommas(resultData[i].diameter)} km </td>`
        planetsTr.appendChild(tdElementDiam)
        let tdElementClimate = document.createElement('td')
        tdElementClimate.innerHTML = `<td> ${resultData[i].climate} </td>`
        planetsTr.appendChild(tdElementClimate)
        let tdElementTerrain = document.createElement('td')
        tdElementTerrain.innerHTML = `<td> ${resultData[i].terrain}</td>`
        planetsTr.appendChild(tdElementTerrain)
        let tdElementSWater = document.createElement('td')
        tdElementSWater.innerHTML = `<td> ${resultData[i].surface_water}</td>`
        planetsTr.appendChild(tdElementSWater)
        let tdElementPopulation = document.createElement('td')
        tdElementPopulation.innerHTML = `<td> ${numberWithCommas(resultData[i].population)}</td>`
        planetsTr.appendChild(tdElementPopulation)
        let tdElementResidents=document.createElement('td');
        planetsTr.appendChild(tdElementResidents)
        let residentsLength=resultData[i].residents.length

        if (residentsLength === 0) {
            tdElementResidents.innerHTML = `No known residents`
        }else{tdElementResidents.innerHTML=`<button>${residentsLength }  resident(s)</button>`
            tdElementResidents.setAttribute('data-residents',`${resultData[i].residents}`);
           tdElementResidents.setAttribute('data-planet', `<strong>${resultData[i].name}</strong>`)
            tdElementResidents.addEventListener('click', openModal);
        }
        }
            }



function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
    nextBtn.addEventListener('click', ()=>{
        let nextUrlData = document.querySelector('#next')
        let nextUrl = nextUrlData.dataset.fetch
        if (nextUrl !== null) {
            getPlanets(nextUrl)

        }
    })
    previousBtn.addEventListener('click', ()=>{

        let prevUrlData = document.querySelector('#previous')
        let prevUrl = prevUrlData.dataset.fetch
        if (prevUrl !== null) {
            getPlanets(prevUrl)
        }
    })




function openModal() {
    const divPlanet = document.querySelector('.planet')
        const planetName = this.getAttribute('data-planet')
        console.log(planetName)
        divPlanet.innerHTML = `<h6>Residents of ${planetName}</h6>`

    const allResidents=this.getAttribute('data-residents').split(',')
    const tableModalData = document.querySelector('.modal_table_data')
        tableModalData.innerHTML = ""
       showModal.classList.toggle('open-table');
        backdrop.classList.toggle('open-table')

    const accesResident=()=>{
               allResidents.forEach(async resident=>{
               let trModalData = document.createElement('tr')
               const residentDetails = await fetch(`${resident}`)
                const residentJson = await residentDetails.json()


                trModalData.innerHTML = `       <td>${residentJson.name}</td>
                                                <td>${residentJson.height}</td>
                                                <td>${residentJson.mass}</td>
                                                <td>${residentJson.hair_color}</td>
                                                <td>${residentJson.skin_color}</td>
                                                <td>${residentJson.eye_color}</td>
                                                <td>${residentJson.birth_year}</td>
                                                <td>${residentJson.gender}</td>`
                       tableModalData.appendChild(trModalData)
                   })
    }
    accesResident()
            }

getPlanets(variable)





