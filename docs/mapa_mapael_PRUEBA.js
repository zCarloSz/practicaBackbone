/*
 *  FUNCIONAMIENTO
 *    - Poner la autonomía en uno de los dos arrays: comunidades_activas / comunidades_inactivas (por defecto las autonomías están inactivas)
 *    - Ir a la función: viewMap_mapael() y colocar al final de la función la nueva comunidad activa (copiar-pegar una comunidad activa anterior y cambiar el nombre de la comunidad)
 *    - Ir al html '/equipamiento-oncologico-para-la-salud-publica', y poner el segmento nuevo con la nueva comunidad y sus datos correspondientes (cambiar el data-comunidad="")
 *    - IMPORTANTE: la identificación de la comunidad tiene que ser siempre la misma en todos los sitios (html, este js, y el js del mapa en '/media/libs/jquery-mapael-2.1.0/js/maps/spain.js').
 *                  Como referencia se pillan las establecias en 'spain.js' y son las que se establecen en las variables comunidades_activas / comunidades_inactivas
 */


// Intercambiar las autonomias entre activas e inactivas según corresponda
var comunidades_activas = [ 'ca_galicia', 'ca_castilla-la-mancha' ]
var comunidades_inactivas = [ 'ca_pais-vasco', 'ca_cataluna', 'ca_andalucia', 'ca_asturias', 'ca_cantabria', 'ca_la-rioja', 'ca_region-de-murcia', 'ca_comunidad-valenciana', 'ca_aragon', 'ca_canarias', 'ca_navarra', 'ca_extremadura', 'ca_islas-baleares', 'ca_comunidad-de-madrid', 'ca_castilla-leon' ]

var mapaCargado = false;
var color_gris_claro = '#dedede'; // Corporativo FAO
var color_blanco = '#ffffff';
var color_mapa_default = '#ece0df'; // Color rosa claro
var color_comunidad = '#9dbed2';  // Color azul claro



$( document ).ready( function() {

  // Método que carga el mapa tras la recarga completa de un tab de bootstrap
  $( 'a.loadMap[data-toggle="tab"]' ).on( 'shown.bs.tab', function() {

    // Comunidades disabled en un select
    changeSelectComunidad( '-', true );
    $.each( comunidades_inactivas, function(index, element) {
      $( '.selectComunidad option[value="' + element + '"]' ).attr('disabled',true)
    } );

    if( $('#detectMediaqueriesStyles').css('content') !== '"xs"' ) {
      // Carga del mapa
      viewMap_mapael();
      comunidadesSetCursorPointer( comunidades_activas );
      mapaCargado = true;
    }

    // Show/hide texto de cada comunidad
    $( '.p-proyectos.p-oncologia .s-section.s-proyecto-opt .oncologia-inversion .selectComunidad').on( 'change', function() {
      var valueSelectCom = $( '.p-proyectos.p-oncologia .s-section.s-proyecto-opt .oncologia-inversion .selectComunidad option:selected').attr( 'value' );
      changeSelectComunidad( valueSelectCom, false );
    } );
  } );

} );

// Colocar un cursor: pointer, en cada comunidad activa
function comunidadesSetCursorPointer( comunidadesActivas ) {
  $.each( comunidadesActivas, function(index, element) {
    $( '.p-oncologia .oncologia-inversion .map svg path[data-id="' + element + '"]' ).on( 'mouseover', function(){
      $( this ).css( 'cursor', 'pointer' );
    } );
  } );
}

// Realizar cambios en el select según las opciones que debe cumplir
function changeSelectComunidad( valueCom, changeSelect ) {
  if( changeSelect ) {
    $( '.p-proyectos.p-oncologia .s-section.s-proyecto-opt .oncologia-inversion .selectComunidad').val( valueCom );
  }

  updateOptionsComunidad( valueCom, comunidades_activas );

  if( valueCom !== '-' ) {
    $( '.p-proyectos.p-oncologia .s-section.s-proyecto-opt .oncologia-inversion .comunidad-general').hide();
    $( '.p-proyectos.p-oncologia .s-section.s-proyecto-opt .oncologia-inversion .comunidad').hide();
    $( '.p-proyectos.p-oncologia .s-section.s-proyecto-opt .oncologia-inversion .comunidad[data-comunidad="' + valueCom + '"]' ).show();
  }
  else{
    $( '.p-proyectos.p-oncologia .s-section.s-proyecto-opt .oncologia-inversion .comunidad' ).hide();
    $( '.p-proyectos.p-oncologia .s-section.s-proyecto-opt .oncologia-inversion .comunidad-general').show();
  }
}

// Actualizar opciones de cada comunidad en Mapael
function updateOptionsComunidad( comunidad, comunidadesActivas ) {

  if( mapaCargado ) {
    var updatedOptions = {
      'areas': {}
    };

    $.each( comunidadesActivas, function(index, element) {
      updatedOptions.areas[element] = {
        attrs: {
          fill: color_mapa_default
        }
      };
    } );

    if( comunidad !== '-' ) {
      updatedOptions.areas[comunidad] = {
        attrs: {
          fill: color_comunidad
        }
      };
    }

    $( '.mapcontainer' ).trigger( 'update', [ {
      mapOptions: updatedOptions,
      animDuration: 500
    } ] );
  }
}

// Función para que se represente el mapa, y aquí se aplicarán las configuraciones neceserias que afecten al mapa y a las comunidades
function viewMap_mapael() {
  $( '.mapcontainer' ).mapael( {
    map: {
      name: 'spain',
      zoom: {
        enabled: false
      },
      defaultArea: {
        attrs: {
          fill: color_mapa_default,
          stroke: color_blanco
        },
        attrsHover: {
          fill: color_mapa_default
        }
      }
    },

    areas: {
      // Partes de paises que no se quieren destacar en el mapa
      '__marruecos': {
        attrs: {
          fill: color_blanco,
          stroke: color_gris_claro
        },
        attrsHover: {
          fill: color_blanco
        }
      },
      '__francia-mediterraneo': {
        attrs: {
          fill: color_blanco,
          stroke: color_blanco
        },
        attrsHover: {
          fill: color_blanco
        }
      },
      '__francia-cantabrico': {
        attrs: {
          fill: color_blanco,
          stroke: color_blanco
        },
        attrsHover: {
          fill: color_blanco
        }
      },
      '__portugal': {
        attrs: {
          fill: color_blanco,
          stroke: color_blanco
        },
        attrsHover: {
          fill: color_blanco
        }
      },

      // Comunidades Autónomas (poner las comunidades que estean activas)
      'ca_galicia': {
        attrs: {
          fill: color_mapa_default,
          stroke: color_blanco
        },
        attrsHover: {
          fill: color_comunidad,
          animDuration : 500
        },
        eventHandlers: {
          click: function ( e, id, mapElem, textElem ) {
            changeSelectComunidad( id, true );
          }
        }
      },
      'ca_castilla-la-mancha': {
        attrs: {
          fill: color_mapa_default,
          stroke: color_blanco
        },
        attrsHover: {
          fill: color_comunidad,
          animDuration : 500
        },
        eventHandlers: {
          click: function ( e, id, mapElem, textElem ) {
            changeSelectComunidad( id, true );
          }
        }
      }
    }
  } );
}
