//Export default va a exportar directamente nuestra función para utilizarla fuera. 
//Será una arrow function que creará la estructura HTML para poder implementarla o poderla agregar al DOM. 
//Recibirá como parámetro la fecha (date)
export default (date) => {
        //Creamos nuestro dateElement que será un li porque va a vivir dentro de la lista.
        const dateElement = document.createElement("li");
        //Agregamos una clase a nuestro dateElement que se llamará date
        dateElement.classList.add("date");
        //Le diremos que el contenido del elemento li simplemente será date.
        dateElement.innerHTML = date;
        //Retornaremos nuestro dateElement que es toda la estructura que se está creando.
        return dateElement;
};