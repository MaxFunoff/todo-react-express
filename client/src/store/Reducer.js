const Reducer = (state, action) => {
	switch (action.type) {
		case 'SET_TASKS':
			return {
				...state,
				tasks: action.payload,
			};
		case 'REMOVE_TASK':
			return {
				...state,
				tasks: state.tasks.filter((task) => task._id !== action.payload),
			};
		case 'SET_ERROR':
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default Reducer;
