const ReactDOM = require('react-dom');
const React = require('react')
const Backbone = require('backbone');

const ContainerComponent = require('./component-container.js');
const TodoItem = require('./model-todo.js');

let TodoComponent = React.createClass({
   _handleRemoveItem: function(){
      Backbone.Events.trigger("removeTodo", this.props.data)
   },

   render: function(){
      return (
         <div className="grid-container todo-item">
            <p className="sm-8-of-12 md-10-of-12 task">
               <label>
                  <input type="checkbox" />
                  <span>{this.props.data.get('task')}</span>
               </label>
            </p>
            <p className="sm-4-of-12 md-2-of-12 txt-right options">
               <i className="fa fa-remove fa-2x" onClick={this._handleRemoveItem}></i>
            </p>
            </div>
      )
   }
})

let NormalMode = React.createClass({
   getInitialState: function(){
      return {
         todoList: [
            new TodoItem({task: "wash cat", isComplete: true}),
            new TodoItem({task: "read book",  isComplete: false}),
            new TodoItem({task: "rethink my life",  isComplete: false}),
            new TodoItem({task: "go for a swim",  isComplete: false}),
         ]
      }
   },

   componentDidMount: function(){
      Backbone.Events.on('removeTodo', (mod)=>{
         let copyList = this.state.todoList.map(m => m)
         let foundI
         let filteredList = copyList.filter((m, i)=> {
             if (m.cid !== mod.cid){
                foundI = i
                return true
             }
         })

         this.setState({
            todoList: filteredList
         })

      })
   },

   _addToContainerList: function(evt){
      // console.log(evt.target.value)
      if(evt.keyCode === 13){
         let listCopy = this.state.todoList.map(m => m)
         listCopy.push(new TodoItem({task: evt.target.value, isComplete: false}))
         evt.target.value = ''
         this.setState({
            todoList: listCopy
         })
      }
   },

   render: function(){

      return (
         <div className="container-narrow">
            <div className="panel">
               <div className="header">
                  <h2>Todo List <small className="txt-muted">Normal Mode</small> </h2>
               </div>
               <div className="body">
                  <div className="submit-item">
                     <input type="text" onKeyDown={this._addToContainerList}/>
                     <button><i className="fa fa-plus"></i></button>
                  </div>
                  <hr/>
                  <ContainerComponent containerClassName="grid-container" dataList={this.state.todoList}>
                     <TodoComponent/>
                  </ContainerComponent>
               </div>
            </div>
         </div>
      )
   }
})




module.exports = NormalMode
