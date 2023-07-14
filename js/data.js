
let plot = (data) => { 
  const ctx = document.getElementById('myChart');
  const dataset = {
    labels: data.hourly.time, /* ETIQUETA DE DATOS */
    datasets: [{
        label: 'Temperatura', /* ETIQUETA DEL GRÁFICO */
        data: data.hourly.temperature_2m, /* ARREGLO DE DATOS */
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
};
const config = {
  type: 'line',
  data: dataset,
};
const chart = new Chart(ctx, config);

 }
 
let plot1 = (data) => { 
  const ctx = document.getElementById('myChart1');
  const dataset = {
    labels: data.daily.time, /* ETIQUETA DE DATOS */
    datasets: [{
        label: 'Temperatura', /* ETIQUETA DEL GRÁFICO */
        data: data.daily.temperature_2m_max, /* ARREGLO DE DATOS */
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
};
const config = {
  type: 'bar',
  data: dataset,
};
const chart = new Chart(ctx, config);

 }

 let plot2 = (data) => { 
  const ctx = document.getElementById('myChart2');
  const dataset = {
    labels: data.daily.time, /* ETIQUETA DE DATOS */
    datasets: [{
        label: 'Indíce rayos UV', /* ETIQUETA DEL GRÁFICO */
        data: data.daily.uv_index_max, /* ARREGLO DE DATOS */
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
};
const config = {
  type: 'bar',
  data: dataset,
};
const chart = new Chart(ctx, config);

 }

let load=(data) =>{

  let timezone=data["timezone"]
  let timezoneHTML=document.getElementById("timezone")    
  timezoneHTML.textContent=timezone;

  let latitude=data["latitude"]
  let latitudeHTML=document.getElementById("latitude")    
  latitudeHTML.textContent=latitude;  

  let longitude=data["longitude"]
  let longitudeHTML=document.getElementById("longitude")    
  longitudeHTML.textContent=longitude;  

  let elevation=data["elevation"]
  let elevationHTML=document.getElementById("elevation")    
  elevationHTML.textContent=elevation; 
  
  plot(data)
  plot1(data)
  plot2(data)

 }

 let loadInocar = () => {   
  let URL_proxy = 'https://cors-anywhere.herokuapp.com/';
 //let URL_proxy='http://localhost:8080/' 
 let URL = URL_proxy+'https://www.inocar.mil.ec/mareas/consultan.php';

fetch(URL)
     .then(response => response.text())
      .then(data => {
         const parser = new DOMParser();
         const xml = parser.parseFromString(data, "text/html");
         let contenedorMareas = xml.getElementsByClassName('container-fluid')[0];
         let contenedorHTML = document.getElementById('table-container');
         contenedorHTML.innerHTML = contenedorMareas.innerHTML;
         console.log(xml);
      })
      .catch(console.error); }

(function () {

  let meteo = localStorage.getItem('meteo');
  if(meteo == null) {
  let URL = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relativehumidity_2m&daily=temperature_2m_max,uv_index_max&timezone=auto";
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
 
    
    load(data);
    localStorage.setItem("meteo", JSON.stringify(data))

    console.log(data);
    }).catch(console.error);
  }else{
    load(JSON.parse(meteo));
  }
    
  //loadInocar();

})();











