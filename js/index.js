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

inicializarSlider();
playVideoOnScroll();



/*
  cambios

*/


/*
  funcion para mostra todos los datos
*/
/* function mostrartodo(event){
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


function filtroPrecios(event){
  //event.preventDefault();

  let menor =$('.irs-from').text().replace('$', '').replace(',', '').replace(' ', '');
  
  let mayor= $('.irs-to').text().replace('$', '').replace(',', '').replace(' ', '');
  
  alert(' '+menor+' '+mayor);
  let form = new FormData();
  form.append("valormenor",menor);
  form.append("valormayor",mayor);
  form.append("tipo","filtroPrecio");
  //alert("mayor "+mayor+" menor: "+menor);
  alert();

  
  $.ajax({
    url:'./index.php',
    dataType:'text',
    cache: false,
    contentType: false,
    processData: false,
    data:form,
    type:'POST',
    success:(data)=>{
      let arr=JSON.parse(data);
      //let campos="";
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

      //alert(campos);
      //alert(data);
    },
    error:(err)=>{

    }

  })
  

}*/

/*
$(function(){
  $("#mostrarTodos").click(mostrartodo);


  $("#selectCiudad").css("display","block");
  $("#selectTipo").css("display","block");

  $("#selectCiudad").load(llenado("Ciudad"));
})
$(function(){
  $("#selectTipo").load(llenado("Tipo"));


})
$(function(){
   $("#submitButton").click(filtroPrecios());
})

*/
$(function(){
  
  var filtrar={
    btnMostrar: $("#mostrarTodos"),
    selectCiudad:$("#selectCiudad"),
    selectTipo:$("#selectTipo"),

    Init:function(){
      var self=this
      $("#selectCiudad").css("display","block")
      $("#selectTipo").css("display","block")
      self.mostrarTodos()
      self.mostrarSelect(selectCiudad,"Ciudad")
      self.mostrarSelect(selectTipo,"Tipo")

    },
    mostrarTodos:function(){
      let self = this
      self.btnMostrar.on('click',(e)=>{
        let tipo='todos'
        var form={tipo: tipo}
        self.enviarDatos("index.php",form,"")

      })  
    },
    mostrarSelect:function(selector,campo){
      let self =this
      let form={campo:campo}
      self.enviarDatos("llenado.php",form,selector)
    },
    enviarDatos:function(accion,form, selector){
      let self =this
      $.ajax({
        url:'./'+accion,
        data:form,
        type:'POST'
      }).done(function(response){
          var arr = JSON.parse(response)

          if(accion=='index.php'){
            self.llenarContenido(arr)
          }else{
            self.llenarSelect(arr,selector)
          }
      })
    },
    llenarContenido:function(arr){
    
      for (var i = 0; i <= arr.length - 1; i++) {

          var ht='<div class="itemMostrado">'+
                  '<img src="img/home.jpg" />'+
                    '<div class="card-stacked">' +
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
    llenarSelect:function(arr,selector){
      let self = this
      let tex="";
      //for (var i = 0; i <= arr.length - 1; i++) {
      for(value in arr)
        tex +='<option value="'+arr[value]+'">'+arr[value]+'</option>';
      //}
      $("#"+selector.id).append(tex);
    }


  }
  filtrar.Init();
})