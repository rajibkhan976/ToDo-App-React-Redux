import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import * as toDoActions from "../toDoActions";
import UpdateToDo from "./UpdateToDo";
import update from 'immutability-helper';

const ToDoList = ({ todos, completedToDos, activeToDos, toDoActions }) => {
	
  const [selectedToDoIndex, setSelectedToDoIndex] = useState([]);
  const [checkCompletedItem, setcheckCompletedItem] = useState([]);
  const [renderToDoList, setRenderToDoList] = useState([]);
  
  useEffect(() => {
	  setRenderToDoList(todos);
  }, [todos]);
  
  const addSelectedToDoIndex = (event, index) => {
	  event.stopPropagation();
	  let selectedIndex = [];
	  selectedIndex.push(index);
	  setSelectedToDoIndex(selectedIndex);
  }
  
  const removeSelectedToDoIndex = () => {
	  selectedToDoIndex.pop();
  }
  
  const markCompletedItem = (event, index, item) => {
	if (!checkCompletedItem.includes(item)) {
	  setcheckCompletedItem([...checkCompletedItem, item]);
	  toDoActions.addCompletedToDo(item);
	  toDoActions.updateActiveToDo();
	} else {
	  let updateItemArray = checkCompletedItem;
	  updateItemArray.splice(updateItemArray.findIndex(element => element === item), 1);
	  setcheckCompletedItem(updateItemArray);
	  toDoActions.updateCompletedToDo(item);
	  toDoActions.addActiveToDo(item);
	}
  }
  
  const removeCompletedToDos = (event) => {
	  let removedItemArray = checkCompletedItem;
	  completedToDos.forEach((value) => {
		removedItemArray.splice(removedItemArray.findIndex(element => element === value), 1);
	  });
	  setcheckCompletedItem(removedItemArray);
	  toDoActions.removeToDo();
	  toDoActions.removeCompletedToDo();
  }
  
  const renderAllToDos = (event) => {
	  setRenderToDoList(todos);
  }
  
  const renderActiveToDos = (event) => {
	  setRenderToDoList(activeToDos);
  }
  
  const renderCompletedToDos = (event) => {
	  setRenderToDoList(completedToDos);
  }
  
  return (
    <div className="row">
		<div className="col-8 ml-5">
			<ul className="list-group">
				{renderToDoList.map((element, index) => {
					return <div key={index}>
								<li className="list-group-item">
								{(selectedToDoIndex.includes(index) && 
								!checkCompletedItem.includes(element)) ?
								<UpdateToDo 
								selectedToDoIndex={selectedToDoIndex}
								selectedToDoItem={element}
								removeSelectedToDoIndex={removeSelectedToDoIndex}
								/>
								:
								<div>
								<div>
								<input 
								className="float-left mt-1" 
								type="checkbox"
								onChange={(event) => markCompletedItem(event, index, element)}
								aria-label="Checkbox for completed item"
								checked={
									(checkCompletedItem.includes(element) && 
									completedToDos.includes(element)) ? 
									true 
									: 
									false}
								/>
								</div>
								<div 
								className="ml-4"
								onClick={(event) => addSelectedToDoIndex(event, index)} 
								style={
									(checkCompletedItem.includes(element) && 
									completedToDos.includes(element)) ? 
									{ textDecoration: 'line-through' } 
									: 
									{}}>
								{element}
								</div>
								</div>
								}
								</li>
						   </div>
				})}
				{(todos.length !== 0) ?
					<div>
					<li className="list-group-item">
					<span className="badge badge-pill badge-info float-left">
					{(activeToDos.length !== 0) ? 
					activeToDos.length 
					: 
					(completedToDos.length === todos.length) ? 
					activeToDos.length 
					: 
					todos.length} items left</span>
					<span onClick={(event) => renderAllToDos(event)} className="badge badge-pill badge-primary">
						All
					</span>
					<span onClick={(event) => renderActiveToDos(event)} className="badge badge-pill badge-success ml-2">
						Active
					</span>
					<span onClick={(event) => renderCompletedToDos(event)} className="badge badge-pill badge-danger ml-2">
						Completed
					</span>
					{(completedToDos.length !== 0) ?
					<span className="badge badge-pill badge-warning float-right" onClick={(event) => removeCompletedToDos(event)}>
					Clear {completedToDos.length} completed items
					</span>
					:
					null
					}
					</li>
				</div>
				:
				null
				}
		   </ul>
		</div>
	</div>
  );
}

ToDoList.propTypes = {
	todos: PropTypes.array,
	completedToDos: PropTypes.array,
	activeToDos: PropTypes.array
};

const mapStateToProps = (state) => ({
  todos: state.root.todos,
  completedToDos: state.root.completedToDos,
  activeToDos: state.root.activeToDos
})

const mapDispatchToProps = (dispatch) => ({
  toDoActions: bindActionCreators(toDoActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps) (ToDoList);