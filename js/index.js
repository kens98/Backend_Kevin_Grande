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
CAMBIOS
*/
$(function(){
  
  var filtrar={
    btnMostrar: $("#mostrarTodos"),
    selectCiudad:$("#selectCiudad"),
    selectTipo:$("#selectTipo"),
    formulario:$("#formulario"),

    Init:function(){
      var self=this
      $("#selectCiudad").css("display","block")
      $("#selectTipo").css("display","block")
      self.mostrarTodos()
      self.mostrarSelect(selectCiudad,"Ciudad")
      self.mostrarSelect(selectTipo,"Tipo")
      self.formulario.submit(function(event){
        event.preventDefault()
        self.filtrarDatos()
      })

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
    filtrarDatos:function(){
      let self= this
      let precioMenor=self.toNumero($('.irs-from').text())
      let precioMayor=self.toNumero($('.irs-to').text())
      let ciudad=$("#"+selectCiudad.id).val();
      let selecttipo=$("#"+selectTipo.id).val();

      let form={tipo:"filtro",menor:precioMenor,mayor:precioMayor,ciudad:ciudad,selecttipo:selecttipo}
      self.enviarDatos("index.php",form,"")

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
          }else if(accion=='llenado.php'){
            self.llenarSelect(arr,selector)
          }else{

          }
      })
    },
    llenarContenido:function(arr){
    $('.colContenido .itemMostrado').remove();
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
    },
    toNumero: function(num){
      var numero = num
      var newNumero = Number(numero.replace('$', '').replace(',', '').replace(' ', ''))
      return newNumero
    },


  }
  filtrar.Init();
})