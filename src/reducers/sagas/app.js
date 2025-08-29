import { call, put, take, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nodePost } from './utils/nodePost';
import { nodeGet } from './utils/nodeGet';

function* getStoredTheme() {
  const storedTheme = yield call(AsyncStorage.getItem, 'appTheme');
  if (storedTheme) {
    yield put({ type: 'SET_THEME', payload: storedTheme });
  }
}

function* sendEmailValidationCode({payload}) {
	const apiUrl = '/email-validation-codes/';
	yield nodePost(
		payload,
		apiUrl,
		'Ocorreu um erro ao enviar o código de validação de e-mail'
	);
}

function* validateEmailValidationCode({payload}) {
	const apiUrl = '/email-validation-codes/validate';
	yield nodePost(
		payload,
		apiUrl,
		'Ocorreu um erro ao validar o código de validação de e-mail'
	);
}

function* registerUser({payload}) {
  const apiUrl = '/auth/register/';
  delete payload.values.password_repeat; // Remover campo desnecessário
  delete payload.values.code; // Remover campo desnecessário
  yield nodePost(
    payload,
    apiUrl,
    'Ocorreu um erro ao criar a conta'
  );
}

function* gMe({payload}) {
    let apiUrl = '/users/';
    yield nodeGet(
        payload, 
        apiUrl,
        'GET_ME_SUCCESS',
        'GET_ME_FAILED',
        'Ocorreu um erro ao buscar os dados do usuário'
    );
}

export default function* app() {
  yield takeLatest('GET_STORED_THEME', getStoredTheme);
	yield takeLatest('SEND_EMAIL_VALIDATION_CODE', sendEmailValidationCode);
  yield takeLatest('VALIDATE_EMAIL_VALIDATION_CODE', validateEmailValidationCode);
  yield takeLatest('REGISTER_USER', registerUser);
  yield takeLatest('GET_ME', gMe)
}
