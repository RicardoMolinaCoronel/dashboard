
(function () {

  
  let URL = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&daily=uv_index_max&timezone=auto";
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
 
    
    load(data)
   

    console.log(data);
    })
    .catch(console.error);
  
    
    





   
      

})();




let plot = (data) => { 
  const ctx = document.getElementById('myChart');
  const dataset = {
    labels: data.hourly.time, /* ETIQUETA DE DATOS */
    datasets: [{
        label: 'Temperatura semanal', /* ETIQUETA DEL GRÁFICO */
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
        label: 'Temperatura semanal', /* ETIQUETA DEL GRÁFICO */
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
 }

 let plot3 = (data) => {  }

let load3 = (data) => {  }
  
let loadInocar = () => {   let URL = 'https://www.inocar.mil.ec/mareas/consultan.php';

fetch(URL)
     .then(response => response.text())
      .then(data => {
         const parser = new DOMParser();
         const xml = parser.parseFromString(data, "text/html");
         console.log(xml);
      })
      .catch(console.error); }

(
  function () { 
  	
  	loadInocar();
  }

)();



