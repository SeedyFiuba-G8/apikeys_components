module.exports = function $utils(config, errors) {
	return {
		headers,
	};

	function headers(value) {
		const apikeyHeader = config.services?.apikeys?.header;
		if (!apikeyHeader)
			throw errors.create(500, 'Missing apikey header in config');

		return {
			[apikeyHeader]: value,
		};
	}
};
