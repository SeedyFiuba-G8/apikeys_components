module.exports = function $cache() {
	let state = new Set();

	function exists(value) {
		return state.has(value);
	}

	function register(value) {
		return state.add(value);
	}

	return {
		exists,
		register,
	};
};
