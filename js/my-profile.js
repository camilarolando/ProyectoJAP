/* INTENTO DEL DESAFIANTE
function previewFile(){
    let preview = document.getElementById('foto');
    let file = document.querySelector('input[type=file]').files[0];

    let reader = new FileReader();  // instancia de objeto
    //constructor

    if (file){
            reader.readAsDataURL(file);
        
    }else{
preview.scr = "img/avatar.png";
        }
        reader.onloadend = function(){
            preview.scr = reader.result;
        }
}*/






function guardar(){
    /*let preview = document.getElementById('foto'); */
    let perfil = {};

    perfil.Name =  document.getElementById('Name').value
    perfil.Lastname =  document.getElementById('Lastname').value
    perfil.Age =  document.getElementById('Age').value
    perfil.Email =  document.getElementById('Email').value
    perfil.Telephone =  document.getElementById('Telephone').value
   // perfil.imagen = preview.scr

   
   

    localStorage.setItem('usuario', JSON.stringify(perfil));
    alert ("Perfil guardado")

}
       

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
   // let preview = document.getElementById('foto');
    let perfil = JSON.parse(localStorage.getItem('usuario'));

    if(perfil != null){
        document.getElementById("Name").value = perfil.Name;
        document.getElementById("Lastname").value = perfil.Lastname;
        document.getElementById("Age").value = perfil.Age;
        document.getElementById("Email").value = perfil.Email;
        document.getElementById("Telephone").value = perfil.Telephone;

    }
    //else{        preview.scr = "img/avatar.png";}
   

   
    
});