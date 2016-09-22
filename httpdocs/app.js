// MODEL
var ListadoM = Backbone.Model.extend({
  defaults: {
    contenido: '',
    tipo: false
  }
});

var ListadoM_select = Backbone.Model.extend({
  defaults: {
    id: false,
    nombre: ''
  }
});


// COLLECTION
var ListadoC = Backbone.Collection.extend({
  url: 'datos.php',
  model: ListadoM,
  dimeEstado: function(){
    var that = this;

    console.log('Colección con ' + that.length + ' elementos.' );
    console.log( that.pluck('contenido') );
  }
});

var ListadoC_select = Backbone.Collection.extend({
  url: 'datosSelect.php',
  model: ListadoM_select
});


// VIEW
var ListadoV = Backbone.View.extend({
  el: '#AP',

  //listaTpl: _.template('<div class="elemento"><%- contenido %></div>'),
  listaTpl: _.template($('#templateElementoLista').html()),
  selectTpl: _.template($('#templateElementoSelect').html()),

  events: {
    'click #enviar': 'incluir',
  },

  initialize: function(){
    var that = this;

    that.render();
  },

  incluir: function() {
    var that = this;

    var cont = $('#texto').val();
    //var sele = document.getElementById('sel').value;
    //var sele = $('#sel option:selected').val();
    var sele = $('#sel option:selected').attr('value');

    $('#texto').val('');
    coleccionlista.add( {contenido:cont, tipo:sele} );

    console.log(coleccionlista.toJSON());
    coleccionlista.dimeEstado();
    that.render();
  },

  render: function(){
    var that = this;

    var ancla1 = $(that.$el).find('#renderDatos');
    ancla1.html('');
    coleccionlista.each( function(e,i){
      //ancla.prepend( e.get('contenido') + '<br>' );
      console.log(colleccionselect.get( e.get('tipo') ).get('nombre'));

      var fila = {
        contenido: e.get('contenido'),
        tipo: colleccionselect.get( e.get('tipo') ).get('nombre')
      };

      ancla1.prepend( that.listaTpl( fila ));
    });

    var ancla2 = $(that.$el).find('#sel');
    ancla2.html('');
    colleccionselect.each( function(e,i){
      ancla2.append( that.selectTpl( e.toJSON() ));
    });
  }
});


var vistaLista = false;
var coleccionlista = new ListadoC();
var colleccionselect = new ListadoC_select();


$(document).ready(function(){
  $.when(
    colleccionselect.fetch(), coleccionlista.fetch() //scheduleSubjects.fetch(), subjectList.fetch(), assignments.fetch()
  ).done( function(scheduleSubjects, subjectList, assignments) {
    vistaLista = new ListadoV();
  });
});


/*
$(document).ready(function(){
  coleccionlista.fetch({
    success: function(data){
      console.log(data);
      vistaLista = new ListadoV();
    }
  });
});
*/
