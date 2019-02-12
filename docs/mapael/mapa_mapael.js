var gzzColor_bck_1 = '#bac0af'; // appVars.less -> @gzzColor-bck-1
var gzzColor_bck_2 = '#cbd0c1'; // appVars.less -> @gzzColor-bck-2
var gzzColor_bck_3 = '#eaede4'; // appVars.less -> @gzzColor-bck-3
var gzzColor_bck_5 = '#ffffff'; // appVars.less -> @gzzColor-bck-5
var gzzColor_bck_dark = '#333333'; // appVars.less -> @gzzColor-bck-5
var gzzColor_green = '#63944e'; // appVars.less -> @gzzColor-green
var gzzColor_orange = '#ff9933'; // appVars.less -> @gzzColor-orange
var gzzColor_violet = '#9393d1'; // appVars.less -> @gzzColor-violet

// Relación de idNames con el Nombre real de la región (me lo pasa Pablo)
var names = {
  'pobra': 'A Pobra do Brollón',
  'boveda': 'Bóveda',
  'castrocaldelas': 'Castro Caldelas',
  'chantada': 'Chantada',
  'esgos': 'Esgos',
  'monforte': 'Monforte de Lemos',
  'montederramo': 'Montederramo',
  'ramuin': 'Nogueira de Ramuín',
  'peroxa': 'A Peroxa',
  'teixeira': 'A Teixeira',
  'panton': 'Pantón',
  'paradadesil': 'Parada de Sil',
  'paradela': 'Paradela',
  'xunqueira': 'Xunqueira de Espadanedo',
  'portomarin': 'Portomarín',
  'quiroga': 'Quiroga',
  'ribasdesil': 'Ribas de Sil',
  'savinao': 'Saviñao',
  'sober': 'Sober',
  'taboada': 'Taboada',
  'carballedo': 'Carballedo'
}

// Guardo el idName de la región
var regionIdName = false;

$( document ).ready( function() {
  $( '.mapaRibeiraSacra' ).mapael( {
    map: {
      name: 'ribeirasacra',
      zoom: {
        enabled: false
      },
      defaultArea : {
        attrs: {
          fill: gzzColor_bck_3,
          stroke: gzzColor_bck_1
        },
        attrsHover: {
          fill: gzzColor_orange,
          animDuration: 0
        },
        eventHandlers: {
          click: function( e, id, mapElem, textElem, elemOptions ) {
            var newData = { 'areas': {} };
            // Reseteamos la área al color por defecto
            newData.areas[regionIdName] = {
              attrs: { fill: gzzColor_bck_3 }
            };
            // Coloreamos la nueva zona tras el click
            newData.areas[id] = {
              attrs: { fill: gzzColor_orange }
            };

            regionIdName = id;
            $( '.mapaRibeiraSacra' ).trigger( 'update', [ { mapOptions: newData } ] );
            $( '.concello' ).html( names[regionIdName] );
          },
          mouseover: function( e, id, mapElem, textElem, elemOptions ) {
            $( '.concello' ).html( names[id] );
          },
          mouseout: function( e, id, mapElem, textElem, elemOptions ) {
            if( regionIdName !== false ) {
              $( '.concello' ).html( names[regionIdName] );
            }
            else {
              $( '.concello' ).html('');
            }
          }
        }
      }
    }
  } );
} );
