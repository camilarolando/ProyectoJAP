var product = {};
var comment = {};


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
//elementos HTML presentes.
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


            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            showCommentsProduct();
         }
    });
    
});