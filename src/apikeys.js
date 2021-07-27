module.exports = async function $apikeys(config, fetch, logger, urlFactory) {
	if (
		process.env.NODE_ENV === 'test'
		// || process.env.NODE_ENV === 'development'
	)
		return {
			core: 'core-fake-apikey',
			sc: 'sc-fake-apikey',
			users: 'users-fake-apikey',
		};

	const { baseUrl, key } = config.services.apikeys;
	const url = urlFactory('/keys', baseUrl);
	const headers = { [key.name]: key.value };

	let keys;
	try {
		keys = await fetch(url, { headers }).then(({ data }) => data);
	} catch (error) {
		logger.error({
			message: 'Error in fetch to API Keys',
		});
		process.exit();
	}

	logger.info('Retrieved keys from API Keys');
	return keys;
};
