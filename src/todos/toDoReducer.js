import { combineReducers } from 'redux';

const initialState = {
  todos: [],
  completedToDos: [],
  activeToDos: []
}

const toDoStateManager = (state = initialState, action) => {
	
	switch (action.type) {
		
		case 'ADD_TODO':
		
		return {
			...state, 
			todos: [ ...state.todos, action.data ]
			};
			
		case 'UPDATE_TODO':
		
		let updateCopyOfToDos = [...state.todos];
		updateCopyOfToDos.splice(action.data.index, 1, action.data.value);
		
		return {
			...state,
			todos: updateCopyOfToDos
		};
		
		case 'REMOVE_TODO':
		
		let modifyCopyOfToDos = [...state.todos];
		let removedCopyOfCompletedToDos = [...state.completedToDos];
		removedCopyOfCompletedToDos.forEach((value) => {
			modifyCopyOfToDos.splice(modifyCopyOfToDos.findIndex(element => element === value), 1);
		});
		
		return {
			...state,
			todos: modifyCopyOfToDos
		};
		
		case 'ADD_COMPLETED_TODO':
		
		return {
			...state,
			completedToDos: [...state.completedToDos, action.data]
		};
		
		case 'UPDATE_COMPLETED_TODO':
		
		return {
			...state,
			completedToDos: state.completedToDos.filter(element => element !== action.data)
		};
		
		case 'UPDATE_ACTIVE_TODO':
		
		let updateCopyOfActiveToDos = [...state.todos];
		let copyOfCompletedToDos = [...state.completedToDos];
		copyOfCompletedToDos.forEach((value) => {
			updateCopyOfActiveToDos.splice(updateCopyOfActiveToDos.findIndex(element => element === value), 1);
		});
		
		return {
			...state,
			activeToDos: updateCopyOfActiveToDos
		};
		
		case 'ADD_ACTIVE_TODO':
		
		return {
			...state,
			activeToDos: [...state.activeToDos, action.data]
		};
		
		case 'REMOVE_COMPLETED_TODO':
		
		return {
			...state,
			completedToDos: action.data
		};
		
		default:
		
		return state;
	}
}

export default combineReducers({ toDoStateManager });