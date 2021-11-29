let productosCarrito = [];
let importePorcentual = [];

/*función para actualizar el subtotal de los productos al modificar las cantidades de los mismos*/
function updateProductoSubtotal(cantidad, costo, id) {
  document.getElementById(id).innerHTML = cantidad * costo;
  updateTotal();
}

/*función showCarrito para que aparezca el subtotal del producto en base a la cantidad y precio unitario*/
function showCarrito() {
  let index = 0;
  /*se muestran los productos del carrito con el input correspondiente a la cantidad*/
  let htmlToAppend = "";
  for (let article of productosCarrito) {
    index++;
    id = index;
    let subtotal = parseInt(article.count) * parseInt(article.unitCost);
    htmlToAppend += `
        <tr>
        <td><img src="${article.src}" class = "img-fluid" style ="max-width:50px!important"></td>
        <td class="align-middle">${article.name}</td>
        <td class="align-middle">${article.currency} ${article.unitCost}</td>
        <td class="align-middle"><input type="number"  min ="1" value=${article.count}  onChange="updateProductoSubtotal(this.value, ${article.unitCost},${id})"></td>
        <td  id="${id}" class="subtotal align-middle">${subtotal}</td>



        <td><button id="btnEliminar" class="btn btn-danger btn-sm rounded-0"  type="button" data-toggle="tooltip" data-placement="top" title="Eliminar" onclick="borrar(${article}); productosCarrito(carrito); costoEnvio(tasaDeEnvio)">
      <article class="fa fa-trash"></article></button>
      </td>
        </tr>`;
  }
  document.getElementById("carrito").innerHTML = htmlToAppend;
}

function getCarrito(url) {
  return fetch(url).then((respuesta) => {
    return respuesta.json();
  });
}

//uso el que tiene dos productos
document.addEventListener("DOMContentLoaded", function (e) {
  getCarrito("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(
    (respuesta) => {
      productosCarrito = respuesta.articles;
      showCarrito();
      updateTotal();
      finalTotal()
      
    }
  );
});


function updateTotal() {
  let total = 0;
  let subtotales = document.getElementsByClassName("subtotal");
  for (let iterator of subtotales) {
    total += parseInt(iterator.innerHTML);
  }

  document.getElementById("Total").innerHTML = total;
  
  document.getElementById("NuevoTotal").innerHTML = total;
  
}

//funcion para que cuando pueda hacer lo del envío se sume el id sería "CostoFinal", de mientras dejo por lo menos lo del producto
function finalTotal(){
  document.getElementById("NuevoTotal").innerHTML=total;
}


 /*funcion para que cuando pueda hacer lo del envío se sume el id sería "CostoFinal", de mientras dejo por lo menos lo del producto
 function finalTotal() {
  let total = 0;
  let totales = document.getElementsByClassName("Total");
  for (let iterator of totales) {
    total += parseInt(iterator.innerHTML);
  }
  document.getElementById("importePorcentual").innerHTML = total;
  }


function costoEnvío() {
  let envioerpremiumHTML = document.getElementById("premium");
  let envioexpressHTML = document.getElementById("express");
  let enviostandardHTML = document.getElementById("standard");

  envioerpremiumHTML.innerHTML = enviopremium;
  envioexpressHTML.innerHTML = envioexpress;
  enviostandardHTML.innerHTML = enviostandard;

  document.getElementById("importePorcentual").innerHTML = total;
}
*/



document.addEventListener("DOMContentLoaded", function (e) {
 

  document
  .getElementById("premiumadio")
  .addEventListener("change", () => {
      importePorcentual = 0.15;
      updateTotalCosts();
    });

  document
    .getElementById("expressdradio")
    .addEventListener("change", function () {
      importePorcentual = 0.07;
      updateTotalCosts();
    });

  document
    .getElementById("standardradio")
    .addEventListener("change", function () {
      importePorcentual = 0.05;
      updateTotalCosts();
    });

  });

 




  

  //Se agrega una escucha en el evento 'submit' que será
  //lanzado por el formulario cuando se seleccione 'Vender'.
document.addEventListener("finalizarCompra", function (e) {
    let inputCalle = document.getElementById("productName");
    let inputNumero = document.getElementById("inputNumero");
    let inputEsquina = document.getElementById("inputEsquinaInput");
    let infoMissing = false;

    //Quito las clases que marcan como inválidos
    inputCalle.classList.remove("is-invalid");
    inputNumero.classList.remove("is-invalid");
    inputEsquina.classList.remove("is-invalid");

    //Se realizan los controles necesarios,
    //En este caso se controla que se haya ingresado el nombre y categoría.
    //Consulto por el nombre del producto
    if (inputCalle.value === "") {
      inputCalle.classList.add("is-invalid");
      infoMissing = true;
    }

    //Consulto por el numero
    if (inputNumero.value === "") {
      inputNumero.classList.add("is-invalid");
      infoMissing = true;
    }

    //Consulto por la esquina
    if (inputEsquina.value <= "") {
      inputEsquina.classList.add("is-invalid");
      infoMissing = true;
    }

    if (!infoMissing) {
      //Aquí ingresa si pasó los controles, irá a enviar
      //la solicitud para crear la publicación.

      getJSONData(CART_BUY_URL).then(function (resultObj) {
        let msgToShowHTML = document.getElementById("resultSpan");
        let msgToShow = "";

        //Si la publicación fue exitosa, devolverá mensaje de éxito,
        //de lo contrario, devolverá mensaje de error.
        if (resultObj.status === "ok") {
          msgToShow = resultObj.data.msg;
          document.getElementById("alertResult").classList.add("alert-success");
        } else if (resultObj.status === "error") {
          msgToShow = ERROR_MSG;
          document.getElementById("alertResult").classList.add("alert-danger");
        }

        msgToShowHTML.innerHTML = msgToShow;
        document.getElementById("alertResult").classList.add("show");
      });
    }

    //Esto se debe realizar para prevenir que el formulario se envíe (comportamiento por defecto del navegador)
    if (e.preventDefault) e.preventDefault();
    return false;
  });