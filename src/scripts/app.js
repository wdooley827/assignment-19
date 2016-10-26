import React from 'react'
import ReactDOM from 'react-dom'

const app = function() {

	const Header = React.createClass({
		render: () => {
			return (
				<div>
					<h1>YOLO</h1>
				   <a href="./about">Go To About Page</a>
				</div>
			)
		}
	})

	ReactDOM.render(<Header/>,document.querySelector('.container'))
}

app()
