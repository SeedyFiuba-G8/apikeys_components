module.exports = function $validateApikeyMiddleware(
	cache,
	config,
	errors,
	fetch,
	logger,
	urlFactory
) {
	return async function validateApikeyMiddleware(req, res, next) {
		if (!config?.services?.apikeys?.enabled) return next();

		const apikeyHeader = config.services?.apikeys?.header;
		if (!apikeyHeader)
			throw errors.create(500, 'Missing apikey header in config');

		const apikey = req.headers[apikeyHeader];
		console.log('APIKEY:', apikey);
		if (!apikey) return next(errors.create(404, 'Service not found'));

		// We check if it is cached
		if (cache.exists(apikey)) return next();

		console.log('No existe en la memoria!');

		// We try to validate it
		const { baseUrl, key } = config.services.apikeys;
		const url = urlFactory('/auth', baseUrl);
		const headers = { [key.name]: key.value };
		console.log('haciendo fetch!');
		try {
			await fetch(url, {
				method: 'POST',
				body: {
					apikey,
				},
				headers,
			});
		} catch (err) {
			console.log('fetch dio error:', err);
			return next(errors.create(404, 'Service not found'));
		}

		// Apikey is valid
		cache.register(apikey);
		logger.info('New apikey added to cache');

		next();
	};
};
