//Importamos la función createTask para que luego que nos lea lo que se guardó nos cree las cards de las tareas que leyó.
import { createTask } from "./addTask.js";
//Importamos nuestra función que está en dateElement.js
import dateElement from "./dateElement.js";
//Importaremos la función uniqueDates que hace que nuestras fechas no se repitan en nuestra lista de tareas.
import { uniqueDates, orderDates } from "../services/date.js";

//Exportaremos nuestra función para poder utilizarla fuera.
//Creamos nuestra función para que lea lo que tenemos almacenado.
export const displayTasks = ( ) => {
    //Vemos como funciona  la librería uuid que nos ayudará con los identificadores únicos para cada tarea.
    //console.log(uuid.v4());

    //Vamos aquí a seleccionar la lista (ul) a la cual nosotros vamos a querer agregar nuestras tareas que ya tenemos almacenadas.
    const list = document.querySelector("[data-list]");

    //Accedemos al localStorage
    //Decimos que queremos obtener la información con getItem
    //Información de lo que está dentro de los paréntesis, en este caso del objeto tasks.
    //JSON.parse : Como nos devolverá el objeto en formato JSON para manipularlo debemos convertirlo a formato JavaScript con eso.
    //En caso de que venga vacío o nulo con nuestro || pipe le decimos
    //Que va a tener por defecto el valor de un string vacío.
    const tasksList = JSON.parse(localStorage.getItem("tasks")) || [];

    //Vamos a crear una constante que será igual a nuestra función uniqueDates que evita que se repitan las fechas.
    //A la cual le pasaremos con (taskList) nuestro arreglo de tareas que tenemos almacenada en el localStorage.
    const dates = uniqueDates(tasksList);
    //Veremos que tiene nuestra  lista unica
    //console.log(dates);

    //Vamos a mandar a llamar nuestra función orderDates para que ordene las fechas.
    //El parámetro dates es el arreglo de las fechas únicas que generamos arribita.
    orderDates(dates);

    //Imprimiremos  cada una de las fechas que se tienen almacenadas en nuestro arreglo.
    //1. Por cada uno de los elementos que existen dentro de nuestro arreglo dates.
    dates.forEach(date => {

        //Vamos a generar un nuevo objeto moment tanto  la fecha única de nuestro arreglo date
        // Ponemos la fecha en formato Moment para poder acceder a un método que se llama div, que es justamente de moment.
        const dateMoment = moment(date, "DD/MM/YYYY");

        //Queremos es que se cree solamente la fecha por cada uno de los elementos que existen dentro de date.
        list.appendChild(dateElement(date));


        //2. Le decimos vas a ir al arreglo taskList 
        //Usaremos forEach para recorrer el arreglo, for Each solo funciona para arrays.
        //Y le decimos con los paréntesis que para cada elemento del arreglo queremos que nos haga algo.
        //Dentro de nuestros paréntesis va a recibir un arrow function o función anónima.
        // Recibirá un parámetro llamado task que será cada uno de los elementos de nuestro arreglo, cada una de las tareas.
        tasksList.forEach( (task) => {
            //Vamos a crear nuestro objeto moment para cada tarea en formato de fecha Dia/Mes/Año.
            const taskDate = moment(task.dateFormat, "DD/MM/YYYY");
            
            //Vamos a agregar a cuál es la diferencia entre una fecha y otra con dateMoment.diff
            //Le pasamos como parametro cuál va a ser la siguiente fecha.
            // O de cuál va a sacar la diferencia, que en este caso va a ser taskDate.
            const diff = dateMoment.diff(taskDate);

            //Si la diferencia entre dateMoment y taskDate es exactamente igual a cero, significa que es la misma fecha. 
            if (diff === 0){
                //vamos a mandar este formato o esa tarea, que tiene un formato de objeto, que tiene la llave value como la llave dateFormat.
                //y lo mandamos entonces a nuestra función createTask que nos va a regresar toda la estructura HTML con todo ya definido
                //y lo último que vamos a hacer entonces es irlo agregando a nuestra lista.
                list.appendChild(createTask(task));
            };

            //Vamos a decirle que por cada tarea que está dentro del local storage
            // Agrega nuestro dateElement con la fecha (date.Format) que tiene cada tarea.

            //3. Y le decimos vas a cada uno de ellos generando esta estructura
            //Eliminamos esto de aquí arriba porque no queremos que se cree para cada elemento
            //Lo que queremos es que se cree solamente por cada uno de los elementos que existen dentro de dates (ver linea 35).
            //list.appendChild(dateElement(task.dateFormat));
            

            //Haremos que nos muestre el return de Task que es crear la estructura de una card.
            // Y le diremos que reciba como parametro a task o sea que lo haga para cada elemento que tenemos almacenado en localStorage.
            //console.log(createTask(task));

            //Sustituimos ese console.log de arriba por esto (línea 60).
        
        });
    });
 
}; 