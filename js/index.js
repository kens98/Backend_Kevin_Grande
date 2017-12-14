/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}


/*
  funcion para mostra todos los datos
*/
 function mostrartodo(event){
  event.preventDefault();
  let tipo="todos";
  let form = new FormData();
  form.append('tipo',tipo);
  $.ajax({
        url:'./index.php',
        dataType:'text',
        cache: false,
        contentType: false,
        processData: false,
        data:form,
        type:'POST',
        success:function(response){
              

                var arr=JSON.parse(response);
                  //$('.colContenido').append(response[0].Ciudad);
                  
                  for (var i = 0; i <= arr.length - 1; i++) {

                    var ht='<div class="itemMostrado"><img src="img/home.jpg" /><div class="card-stacked">' +
                    '<p class="card-action"><strong>Direccion:</strong> '+arr[i]["Direccion"]+'</p>'+
                    '<p class="card-action"><strong>Ciudad:</strong> '+arr[i]["Ciudad"]+'</p>'+
                    '<p class="card-action"><strong>Telefono:</strong> '+arr[i]["Telefono"]+'</p>'+
                    '<p class="card-action"><strong>Codigo Postal:</strong> '+arr[i]["Codigo_Postal"]+'</p>'+
                    '<p class="card-action"><strong>Tipo:</strong> '+arr[i]["Tipo"]+'</p>'+
                    '<p class="card-action"><strong>Precio:</strong> <span class="precioTexto">'+arr[i]["Precio"]+'</span></p>'+
                    
                    '</div>'+

                    '</div>';

                    $('.colContenido').append(ht);
                    
                  }
          
        },
        error:function(er){
            alert(er);
        }
  });
  
}

 function llenado(campo){
  let selector="select"+campo;

  let form= new FormData();
  form.append("campo",campo);
  $.ajax({
    url:"./llenado.php",
    dataType:'text',
    cache: false,
    contentType: false,
    processData: false,
    data:form,
    type:'POST',
    success: (response)=>{
     let arr=JSON.parse(response);
      
      let tex="";
      //for (var i = 0; i <= arr.length - 1; i++) {
      for(value in arr)
        tex +='<option value="'+arr[value]+'">'+arr[value]+'</option>';
      //}
      $("#"+selector).append(tex);
    },
    error: (err)=>{
      alert(err);
    }

  })

}

$(function(){
  $("#mostrarTodos").click(mostrartodo);


  $("#selectCiudad").css("display","block");
  $("#selectTipo").css("display","block");

  $("#selectCiudad").load(llenado("Ciudad"));
})
$(function(){
  $("#selectTipo").load(llenado("Tipo"));
})
  
 




inicializarSlider();
playVideoOnScroll();
