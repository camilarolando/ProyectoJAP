let productosCarrito=[];




/*función para actualizar el subtotal del producto al modificar la cantidad del mismo*/
function updateProductoSubtotal(cantidad, costo, id){
    
   document.getElementById(id).innerHTML = cantidad*costo;
   updateTotal();
}

/*función showCarrito para que aparece el subtotal del producto en base a la cantidad y precio unitario*/
function showCarrito(){
    let index = 0;
    /*se muestran los productos del carrito con el input correspondiente a la cantidad*/
    let htmlToAppend = "";
    for(let article of productosCarrito){
        index++;
        id=index;
        let subtotal = parseInt(article.count) * parseInt(article.unitCost);
        htmlToAppend += `
        <tr>
        <td><img src="${article.src}" class = "img-fluid" style ="max-width:50px!important"></td>
        <td class="align-middle">${article.name}</td>
        <td class="align-middle">${article.currency} ${article.unitCost}</td>
        <td class="align-middle"><input type="number"  min ="1" value=${article.count}  onChange="updateProductoSubtotal(this.value, ${article.unitCost},${id})"></td>
        <td  id="${id}" class="subtotal align-middle">${subtotal}</td>
        </tr>`
                        
                       
       
    }
    document.getElementById("carrito").innerHTML = htmlToAppend;


}



function getCarrito(url){
    
    return fetch(url)
    .then(respuesta=>{
        return respuesta.json();
    })
    
}
//uso el que tiene dos productos
document.addEventListener("DOMContentLoaded", function(e){
getCarrito("https://japdevdep.github.io/ecommerce-api/cart/654.json")
    .then(respuesta=>{
        productosCarrito = respuesta.articles;
        showCarrito();
        updateTotal()
    })
})


function updateTotal(){
    let total = 0;
    let subtotales = document.getElementsByClassName("subtotal");
    for (let iterator of subtotales) {
        total += parseInt(iterator.innerHTML);
    }
  
    document.getElementById("Total").innerHTML=total;
    document.getElementById("NuevoTotal").innerHTML=total;

    // como no puedo hacer funcionar la parte del envío muestro en el total por lo menos lo de los productos
    document.getElementById("CostoFinal").innerHTML=total;

}


/*INTENTO DE HACER FUNCIONAR EL ENVIO no termine pero lo dejo por aca me base en el de sell 


function costoEnvío(){

let comissionPercentage = 0.13;
let MONEY_SYMBOL = "$";
let DOLLAR_CURRENCY = "Dólares (USD)";
let PESO_CURRENCY = "Pesos Uruguayos (UYU)";
let DOLLAR_SYMBOL = "USD ";
let PESO_SYMBOL = "UYU ";
let PERCENTAGE_SYMBOL = '%';

    let envioerapidoHTML = document.getElementById("rapido");
    let envioestandarHTML = document.getElementById("estandar");
    let enviogratisHTML = document.getElementById("gratis");

    let enviorapido = MONEY_SYMBOL + productCost;
    let envioestandar = Math.round((comissionPercentage * 100)) + PERCENTAGE_SYMBOL;
    let enviogratis = MONEY_SYMBOL + (Math.round(productCost * comissionPercentage * 100) / 100);

    envioerapidoHTML.innerHTML = enviorapido;
    envioestandarHTML.innerHTML = envioestandar;
    enviogratisHTML.innerHTML = enviogratisToShow;

    document.getElementById("importePorcentual").innerHTML=total;

[]
    let enviogratis = document.getElementsByClassName("");
    for (let iterator of subtotales) {
        total += parseInt(iterator.innerHTML);
    }
  
    document.getElementById("importePorcentual").innerHTML=total;
}


//funcion para que cuando pueda hacer lo del envío se sume el id sería "CostoFinal", de mientras dejo por lo menos lo del producto
function finalTotal(){
     document.getElementById("NuevoTotal").innerHTML=total;
}*/