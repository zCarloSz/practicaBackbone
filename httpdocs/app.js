var ListadoM = Backbone.Model.extend({
  defaults: {
    contenido: ''
  }
});


var ListadoC = Backbone.Collection.extend({
  url: '/olamundo',
  model: ListadoM,
  dimeEstado: function(){
    var that = this;

    console.log('Colección con ' + that.length + ' elementos.' );
    console.log( that.pluck('contenido') );
  }
});


var ListadoV = Backbone.View.extend({
  el: '#AP',

  listaTpl: _.template('<div class="elemento"><%- contenido %></div>'),

  events: {
    'click #enviar': 'incluir'
  },

  initialize: function(){
    var that = this;
    that.render();
  },

  incluir: function() {
    var that = this;

    var cont =  $('#elemento').val();
    $('#elemento').val('');
    coleccionlista.add({contenido:cont});
    console.log(coleccionlista.toJSON());
    coleccionlista.dimeEstado();
    that.render();
  },

  render: function(){
    var that = this;

    var ancla = $(that.$el).find('#renderDatos');
    ancla.html('');
    coleccionlista.each( function(e,i){
      //ancla.prepend( e.get('contenido') + '<br>' );
      //ancla.prepend( that.listaTpl( e.toJSON() ) );
      //ancla.prepend($())
    });
  }
});





var coleccionlista = new ListadoC( [{contenido:'PRIME'}] );
var vistaLista = new ListadoV();
