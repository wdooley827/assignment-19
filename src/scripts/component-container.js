const React = require('react');

const ContainerComponent = React.createClass({
   render: function(){
      return (
         <div className={this.props.containerClassName || ""}>
            {this.props.dataList.map((elData, i)=>{
               return React.cloneElement(this.props.children, {data: elData, key: `${(new Date()).getTime()}-${i}`})
            })}
         </div>
      )
   }
})

module.exports = ContainerComponent
