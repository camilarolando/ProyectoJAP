var product = {};
var comment = {};
var  productosrREL = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showCommentsProduct(){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){

comment = resultObj.data
let htmlContentToAppend = "";

    for(let i = 0; i < comment.length; i++){
    
        let comentarios = comment[i];

        htmlContentToAppend += `
        <div>
        <p>`+ comentarios.user + ` </p>

        <p>`+ comentarios.description + ` </p>
        
        <p>`+ comentarios.dateTime + ` </p> 

        
        <p>`+ comentarios.score + ` </p>
        </div>
        `

        document.getElementById("comment").innerHTML = htmlContentToAppend;
    }
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.'

//Aca voy a obtener todos los datos del producto.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCategoryHTML = document.getElementById("productCategory");
            let productCostHTML = document.getElementById("productCost");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCurrencyHTML = document.getElementById("productCurrency");
    
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
            productCurrencyHTML.innerHTML = product.currency;

        }
    
    });

    //Aca intento mostrar los productos relacionados

    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            let products = resultObj.data;
    
            let html ='';
            product.relatedProducts.forEach(function(listadoDeProductos) {
                let productosrREL = products[listadoDeProductos];
                html += ` 
                <div class="col-4">
                <div class="card" style="width: 18rem;">
                <img href="#" class="card-img-top" src="${productosrREL.imgSrc}">
                <div class="card-body">
                    <h5 class="card-title">${productosrREL.name}</h5>
                    <p class="card-text">${productosrREL.description}</p>
                    <a href="#" class="btn btn-primary">Ver producto</a>
                </div>
                </div>
                </div>
                `
            document.getElementById("relacionados").innerHTML = html;
            })
    //Muestro las imagenes en forma de galería
    showImagesGallery(product.images);
    showCommentsProduct();
        }
    });

    
})