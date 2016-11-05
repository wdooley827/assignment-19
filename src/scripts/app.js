const ReactDOM = require('react-dom');
const React = require('react')
const Backbone = require('backbone');
const NormalMode = require('./view-normal.js');

const AppRouter = Backbone.Router.extend({
   routes: {
      "": "showHomeView"
   },

   showHomeView: function(){
      console.log('hiiii')
      ReactDOM.render(<NormalMode/>, document.querySelector("#app-container"))
   },

   initialize: function(obj){
      Backbone.history.start()
   }
})



new AppRouter()
