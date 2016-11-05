const Backbone = require('backbone');

module.exports =   Backbone.Model.extend({
   initialize: function(obj){
      this.set(obj)
   }
})
