export const addToDo = (toDo) => {
	return ({
		type: 'ADD_TODO',
		data: toDo
	});
}

export const updateToDo = (toDo) => {
	return ({
		type: 'UPDATE_TODO',
		data: toDo
	});
}

export const removeToDo = () => {
	return ({
		type: 'REMOVE_TODO',
		data: null
	});
}

export const addCompletedToDo = (toDo) => {
	return ({
		type: 'ADD_COMPLETED_TODO',
		data: toDo
	});
}

export const updateCompletedToDo = (toDo) => {
	return ({
		type: 'UPDATE_COMPLETED_TODO',
		data: toDo
	});
}

export const updateActiveToDo = () => {
	return ({
		type: 'UPDATE_ACTIVE_TODO',
		data: null
	});
}

export const addActiveToDo = (toDo) => {
	return ({
		type: 'ADD_ACTIVE_TODO',
		data: toDo
	});
}

export const removeCompletedToDo = () => {
	return ({
		type: 'REMOVE_COMPLETED_TODO',
		data: []
	});
}