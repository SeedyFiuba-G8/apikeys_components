module.exports = async function $apikeys(config, fetch, urlFactory) {
	const { baseUrl, key } = config.services.apikeys;

	const url = urlFactory('/keys', baseUrl);
	const headers = { [key.name]: key.value };

	const keys = await fetch(url, { headers }).then(({ data }) => data);

	console.log('Received keys:', keys);

	const mockKeys = {
		core: 'core-apikey',
		sc: 'sc-apikey',
		users: 'users-apikey',
	};
	console.log('Returning mock keys temporary:', mockKeys);

	return mockKeys;
};
