/*EJ:
*
    function algo(){
        console.log("algo")
    };

    Si yo hago console.log(algo) me muestra el espacio de memoria de la funcion algo, pero,
    si hago algo(); es decir, ejecuto la funcion, se ejecuta el código que contiene esa funcion, ese espacio de memoria. Me muestra: "algo"

    En HTML podemos tener PRIMERO el/los archivo con las declaraciones de las funciones,
        y por otro lado el archivo que EJECUTA las funciones.

    Excepto el Objeto.window,  el resto de los espacios de memoria que yo genere son privados. Es decir, nada que no sea un elemento dentro de la funcion X tiene acceso a la memoria, por eso la necesidad de hacer un "return"

    JS maneja la asincronía a través de las funciones callback-> funciones que se pasan como parametro a otra y se ejecuta dentro de esa funcion que la recibe.


    setTimeout(nombreFuncion, tiempo) ej setTimeout(funcionX, 1000) (es en milisegundos)

    Peticiones AJAX->> JS Asincrónico y XML: trabajan con protocolo HTTP (en js necesitamos trabajar con el objeto HMLHttpRequest - XHR), html,css,js
        Obtienen info, usando el protocolo HTTP(XMLHttpRequest), y luego las renderizan (mostramos en el navegador). (Consumimos info de una API)
    Actualmente las peticiones AJAX se hacen trabajando con los archivos JSON (texto escrito como si fuera un objeto plano)

    APIs-> tienen lo que conocemos como "ENDPOINT"-> tienen como trabajo almacenar info


    Tener en cuenta los CODIGOS DE RESPUESTA (100-199: info, 200-299: ok, 300-399: re-direccionando ,400-499: errores de cliente, 500: errores del servidor)

    
    */
   
   //Conversión objeto plano a JSON:
//    const obj={
//        id: 1,
//        nombre: "Noelia",
//        apellido: "podmoguilny"
//     }
//     const ojtJSON= JSON.stringify(obj); //usamos el metodo JSON.stringify()
//     console.log(ojtJSON);
//     //Cuando hacemos una petición, nos llega como JSON y debemos convertirla a objeto plano:
//     const objPlano=JSON.parse(ojtJSON);
//     console.log(objPlano); //lo arma por orden alfabetico, primero apellido, desp id, despues nombre
    
// // Cuando hacemos una petición AJAX tenemos que configurarla. Tenemos que, como minimo indicar:
// //     - cuál es el TIPO de peticion (get, put, delete, post),
// //     - cual es el TIPO de dato que estamos esperando (JSON, BLOB...)
    
// (()=>{
//     //URL que contiene la info que quiero obtener:
//     const endpoint = "https://jsonplaceholder.typicode.com/users";
//     // objeto XHR que me permite configurar la peticion
//     const xhr = new XMLHttpRequest();
//     //Apertura (open)-> tipo de peticion y endpoint que la recibe
//     xhr.open("GET", endpoint); 
//     //Tipo de dato esperado:
//     xhr.responseType ="json";
//     //Envío la petición:
//     xhr.send();


//     //Manejo de la respuesta de la petición (evento respuesta)
//    //si la petición pasó, se ejecuta el evento "load"(el servidor recibió la petición y mandó una resp) 
//     xhr.addEventListener("load", function(){
//         if(xhr.status===200){
//             console.log(xhr.response);
//         }else{
//             console.log(`Error ${xhr.status}: ${xhr.statusText}`);

//         }
//     } );


//     //nunca llega la petición al servidor, evento "error":
//     xhr.addEventListener("error", function(){
//         console.log("error de red");
//     });
// })();

// //las url de las API rest(endpoint) pueden recibir parametros de busqueda:
// //el endpoint NO es una url en sí.
// //por eso tengo que crear una url y desde ahi pasarle el parametro de busqueda
// (()=>{
//     const xhr = new XMLHttpRequest();

//     const endpointPersonalizado= new URL("https://jsonplaceholder.typicode.com/comments");
//     const claveJSON= "postId";
//     const valorJSON= "1";
//     endpointPersonalizado.searchParams.set(claveJSON, valorJSON);

//     xhr.open("GET", endpointPersonalizado);
//     xhr.send();

//     xhr.onload = function (){
//         if(xhr.status!==200){
//             console.log(`Error ${xhr.status}: ${xhr.statusText}`);
//         }else{
//            console.log(JSON.parse(xhr.response)); 
//         };
//     };
//     xhr.onerror = function (){
        
//     }
// })();

// //Para usar una DB "casera" debemos usar minimamente el LiveServer
// (()=>{
//     const xhr = new XMLHttpRequest();
//     //LiveServer: la peticion parte de "http://127.0.0.1.5500"
//     //Podemos pasarle una ruta relativa: (nombre del archivo): bd.json
//      xhr.open("GET", "bd.json");
//      xhr.send();

//      xhr.addEventListener("load", ()=>{
//         if(xhr.status===200){
//            console.log(xhr.response); 
//         }else{
//             console.log(`Error ${xhr.status}: ${xhr.statusText}`);
//         };
//      }); 

// })();
//<<<< Cada API tiene el tipo de resp que devuelve, ver en la docu!!! >>>>

/*Puedo usar el html para hacer peticiones ajax, por ejemplo:
    1. Tengo mi index.html ppal, donde agrego una section con id="home",
    2. Tengo la vista1 que voy a mostrar en mi index ppal,
    3. Hago la petición con el endpoint de esa vista1, de donde voy a traer la info y renderizarla en el index ppal,
    4. Para eso, cuando tengo la respuesta ok, voy a tomar el elemento (section) del index ppal, donde voy a "pegar" esa vista1
    5. Y luego a ese elemento le hago un innnerHTML de la respuesta (o sea, la vista1)
*/

// (()=>{
//     const xhr= new XMLHttpRequest();
//     xhr.open("GET", "pages/vista1.html");
//     xhr.send();

//     xhr.addEventListener("load", ()=>{
//         if(xhr.status===200){
//             const home = document.getElementById("home");
//             home.innerHTML = xhr.response;
//         }else{
//             console.log(xhr.status)
//         }
//     })
// })();

//Mostrar una vista como consecuencia de una peticion:

document.querySelector("form").addEventListener("submit", handleSubmit);

function handleSubmit(e){
    e.preventDefault();

    //Traemos el JSON con datos de usuario:
    const xhr = new XMLHttpRequest();
    xhr.responseType="json";

     xhr.open("GET", "bd.json");
     xhr.send();

     xhr.addEventListener("load", ()=>{
        if(xhr.status===200){
           const users = xhr.response
           const dataForm = document.querySelectorAll("form input")
        //    console.log(dataForm);
           const username = dataForm[0]
        //    console.log(username);
           const pass = dataForm[1]
        //    console.log(pass);
        for (const user of users) {
            if(user.nombre/*esto debe coincidir con la base de datos!!*/ === username.value/*y esto con lo que escribimos en el input del form*/&& user.pass === pass.value){
                //Acá hacemos una nueva petición para agregar la vista1:
                // const htmlxhr= new XMLHttpRequest();
                // htmlxhr.open("GET", "pages/vista1.html");
                // htmlxhr.send();

                // htmlxhr.addEventListener("load", ()=>{
                //     if(htmlxhr.status===200){
                //         const home = document.getElementById("home");
                //         home.innerHTML = htmlxhr.response;
                //     }else{
                //         console.log(htmlxhr.status)
                //     };
                // })


                //o puedo redireccionar al archivo "inicio.html":

                location.href = "inicio.html"
            };
            };
        };
    });
};