import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import * as toDoActions from "../toDoActions";
import ToDoList from "./ToDoList";

const AddToDo = ({ todos, toDoActions }) => {

  const [toDo, setToDo] = useState('');
  
  const handleChange = (event) => {
	  setToDo(event.target.value);
  }
  
  const handleKeyDown = (event) => {
	  if (event.key === 'Enter') {
		  toDoActions.addToDo(toDo);
		  toDoActions.addActiveToDo(toDo);
	  }
  }
  
  return (
    <div className="container">
		<div className="jumbotron mt-5">
			<h1 className="display-4">todos!</h1>
			<p className="lead">This is a simple React todo application supported by Redux.</p>
			<hr className="my-4" />
			<div className="row mt-5">
				<div className="col-8 ml-5">
					<input 
						type="text"
						className="form-control" 
						value={toDo}
						onChange={handleChange} 
						onKeyDown={handleKeyDown}
						placeholder="Add ToDo" 
						aria-label="ToDo" 
					/>
				</div>
			</div>
			<ToDoList />
		</div>
	</div>
  );
}

AddToDo.propTypes = {
	todos: PropTypes.array
};

const mapStateToProps = (state) => ({
  todos: state.root.todos
})

const mapDispatchToProps = (dispatch) => ({
  toDoActions: bindActionCreators(toDoActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps) (AddToDo);