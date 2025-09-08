import { call, put, take, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nodePost } from './utils/nodePost';
import { nodeGet } from './utils/nodeGet';

function* login({payload}) {
    let apiUrl = '/auth/login';
    yield nodePost(
        payload, 
        apiUrl,
        'Ocorreu um erro ao deixar recusar a solicitação para seguir'
    );
}

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

function* doTransfer({payload}) {
    const apiUrl = '/transfers/';
    yield nodePost(
        payload,
        apiUrl,
        'Ocorreu um erro ao realizar a transferência'
    );
}

function* gMyBalance({payload}) {
    let apiUrl = '/users/balance/';
    yield nodeGet(
        payload, 
        apiUrl,
        'GET_MY_BALANCE_SUCCESS',
        'GET_MY_BALANCE_FAILED',
        'Ocorreu um erro ao buscar os dados do usuário'
    );
}

function* gTransfers({payload}) {
  let apiUrl = '/transfers/';

  if ( payload.offset === 0 ) {
    yield put({ type: 'RESET_TRANSFERS' });
  }
  
  yield nodeGet(
      payload, 
      apiUrl,
      'GET_TRANSFERS_SUCCESS',
      'GET_TRANSFERS_FAILED',
      'Ocorreu um erro ao buscar os dados das transferências'
  );
}

function* gNotifications({payload}) {
  let apiUrl = '/notifications/';

  if ( payload.offset === 0 ) {
    yield put({ type: 'RESET_NOTIFICATIONS' });
  }
  
  yield nodeGet(
      payload, 
      apiUrl,
      'GET_NOTIFICATIONS_SUCCESS',
      'GET_NOTIFICATIONS_FAILED',
      'Ocorreu um erro ao buscar os dados das notificações'
  );
}

function* changePassword({payload}) {
  const apiUrl = '/users/change-password/';
  yield nodePost(
    payload,
    apiUrl,
    'Ocorreu um erro ao alterar a senha',
    'PUT'
  );
}

function* changeProfileImage({payload}) {
	
  var { photo } = payload;

	if ( photo ) {
    if ( !payload.images ) {
      payload.images = [];
    }
    payload.images.push({img: photo, name: 'photo'});
    delete payload.photo;
  }
  
  const apiUrl = '/users/me/photo/';
  yield nodePost(
    payload,
    apiUrl,
    'Ocorreu um erro ao alterar a imagem de perfil',
    'PUT'
  );
}

function* saveNotificationsId() {
  // busca o id de notificações
  const id = yield call(AsyncStorage.getItem, 'notifications');

  if ( !id ) {
    return;
  }

  const apiUrl = '/users/me/notifications-id/';
  yield nodePost(
    {values: { notificationId: id }},
    apiUrl,
    'Ocorreu um erro ao salvar o ID de notificações'
  );
}

function* getNotificationsNotReadCount({payload}) {
  let apiUrl = '/notifications/count-not-read/';
  yield nodeGet(
      payload,
      apiUrl,
      'GET_NOTIFICATIONS_NOT_READ_COUNT_SUCCESS',
      'GET_NOTIFICATIONS_NOT_READ_COUNT_FAILED',
      'Ocorreu um erro ao buscar a contagem de notificações não lidas'
  );
}

function* markNotificationAsRead({payload}) {
  const apiUrl = `/notifications/mark-as-read/${payload.id}`;
  yield nodePost(
    { values: {} },
    apiUrl,
    'Ocorreu um erro ao marcar a notificação como lida'
  );
}

function* depositMoney({payload}) {
  const apiUrl = '/deposits/';
  yield nodePost(
    payload,
    apiUrl,
    'Ocorreu um erro ao realizar o depósito'
  );
}

function* gCharges({payload}) {
  let apiUrl = '/charges/';

  if ( payload.offset === 0 ) {
    yield put({ type: 'RESET_CHARGES' });
  }

  yield nodeGet(
      payload, 
      apiUrl,
      'GET_CHARGES_SUCCESS',
      'GET_CHARGES_FAILED',
      'Ocorreu um erro ao buscar os dados das cobranças'
  );
}

function* doCharge({payload}) {
    const apiUrl = '/charges/';
    yield nodePost(
        payload,
        apiUrl,
        'Ocorreu um erro ao realizar a cobrança'
    );
}

export default function* app() {
  yield takeLatest('LOGIN', login);
  yield takeLatest('GET_STORED_THEME', getStoredTheme);
	yield takeLatest('SEND_EMAIL_VALIDATION_CODE', sendEmailValidationCode);
  yield takeLatest('VALIDATE_EMAIL_VALIDATION_CODE', validateEmailValidationCode);
  yield takeLatest('REGISTER_USER', registerUser);
  yield takeLatest('GET_ME', gMe);
  yield takeLatest('DO_TRANSFER', doTransfer);
  yield takeLatest('GET_MY_BALANCE', gMyBalance);
  yield takeLatest('GET_TRANSFERS', gTransfers);
  yield takeLatest('GET_NOTIFICATIONS', gNotifications);
  yield takeLatest('CHANGE_PASSWORD', changePassword);
  yield takeLatest('CHANGE_PROFILE_IMAGE', changeProfileImage);
  yield takeLatest('SAVE_NOTIFICATIONS_ID', saveNotificationsId);
  yield takeLatest('GET_NOTIFICATIONS_NOT_READ_COUNT', getNotificationsNotReadCount);
  yield takeLatest('MARK_NOTIFICATION_AS_READ', markNotificationAsRead);
  yield takeLatest('GET_CHARGES', gCharges);
  yield takeLatest('DEPOSIT_MONEY', depositMoney);
  yield takeLatest('DO_CHARGE', doCharge);
}
