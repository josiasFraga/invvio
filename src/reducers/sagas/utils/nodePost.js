import { call } from 'redux-saga/effects';
import callApiNode from '@services/api/node';
import CONFIG from '@constants/configs';

export function* nodePost(payload, apiUrl, errorMessage, method = 'POST') {
	try {

		let data = payload.values;
		let images = payload.images ? payload.images : null;
		const formData = new FormData();		

		if ( images ) {	
			for ( let key in data ) {
				const value = data[key];
				
				if (Array.isArray(value)) {
					value.forEach(item => {
					  formData.append(`${key}[]`, typeof item === 'object' ? JSON.stringify(item) : item);
					});
				} else {
					formData.append(key, value);
				}
			}
		
			for (let i = 0; i < images.length; i++) {
				formData.append(images[i].name, images[i].img);
			}
		} else {
			data = JSON.stringify(data);
		}


		const response = yield call(callApiNode, {
			endpoint: CONFIG.url + apiUrl,
			method: method,
			headers: images
			? { 'Content-Type': 'multipart/form-data' }
			: { 'Content-Type': 'application/json' },
			maxBodyLength: Infinity,
			data: images ? formData : data
		});


		if (response.status === 200 || response.status === 201) {
			if (payload.callbackSuccess) {
				console.log('-> Entrou no callbacksuccess');
				yield call([payload, 'callbackSuccess'], response.data);
			}
		} else {
			if (payload.callbackError) {
				yield call(payload.callbackError);
			}
		}

		if (payload.callbackFinally) {
			console.log('-> Entrou no callbackFinally');
			yield call([payload, 'callbackFinally'], response.data);
		}
	} catch (error) {
		console.debug(error);
		console.log(CONFIG.url + apiUrl);
		console.error(`[ERROR : ${method} ${apiUrl}]`, error);
		// Capturando detalhes do erro
		const status = error.response?.status;
		const errorData = error.response?.data;
		const errorDetails = errorData?.message || error.message || 'Erro desconhecido';

		if ( errorData && errorData.statusCode != 400 ) {
			console.warn(`[ERROR : ${method} ${apiUrl}]`, { status, errorDetails, errorData });
		}

		if (payload.callbackError) {
			yield call([payload, 'callbackError'], { status, errorData });
		}

		if (payload.callbackFinally) {
			yield call([payload, 'callbackFinally'], errorData);
		}
	}
}
