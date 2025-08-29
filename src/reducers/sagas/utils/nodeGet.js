import { call, put } from 'redux-saga/effects';
import callApiNode from '@services/api/node';
import CONFIG from '@constants/configs';

export function* nodeGet(payload, apiUrl, sagaSuccess, sagaError, errorMessage, pdf = false) {

	const dados = { ...payload };
	
	let callbackSuccess = null;
	let callbackError = null;
	let callbackFinally = null;

	if ( payload && payload.callbackSuccess ) {
		callbackSuccess = payload.callbackSuccess;
		delete dados.callbackSuccess;
	}

	if ( payload && payload.callbackError ) {
		callbackError = payload.callbackError;
		delete dados.callbackError;
	}

	if ( payload && payload.callbackFinally ) {
		callbackFinally = payload.callbackFinally;
		delete dados.callbackFinally;
	}

	if ( !apiUrl ) {
		return false;
	}

	const endpoint = CONFIG.url + apiUrl;

	try {

		const response = yield call(callApiNode, {
		endpoint: endpoint,
		method: 'GET',
		params: dados,
		headers: pdf ? { Accept: 'application/pdf' } : { 'content-type': 'multipart/form-data' },
		responseType: pdf ? 'arraybuffer' : undefined,
		});

		if (response.status === 200) {
			if (sagaSuccess) {
				yield put({ type: sagaSuccess, payload: response.data });
			}
			callbackSuccess && callbackSuccess(response.data);
		} else {
			if ( sagaError ) {
				yield put({ type: sagaError, payload: {} });
			}
		}

		callbackFinally && callbackFinally(response);
	} catch (error) {
		console.warn('[ERROR ENDPOINT : GET NODE]', endpoint);
		console.warn('[ERROR : GET NODE]', error);
		callbackError && callbackError(error);
		callbackFinally && callbackFinally(error);
		if ( sagaError ) {
			yield put({ type: sagaError, payload: {} });
		}
	}
}
