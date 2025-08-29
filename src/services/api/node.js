import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import qs from 'qs';
import { Platform } from 'react-native';

const callApiNode = async (call) => {
    let {
        endpoint,
        method = 'GET',
        params = null,
        data = null,
        headers = {},
        showJSON = false,
        responseType = undefined,
    } = call

    let url = endpoint
    let defaultHeaders = {};

    // Merge headers info
    if ( method == 'POST' || method == 'PUT' || method == 'PATCH' ) {
        defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        };
    } else {
        defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
    }

    const authToken = await AsyncStorage.getItem('bearerToken');

    console.log('Bearer -> ' + authToken);

    if ( authToken != null ) {
        defaultHeaders = Object.assign(defaultHeaders, {'Authorization': `Bearer ${authToken}`});
    }

    // Adiciona o header de plataforma
    defaultHeaders['x-platform-os'] = Platform.OS;

    headers = Object.assign({}, defaultHeaders, headers);

    console.debug('[CALL API URL]', url);
    console.debug('[CALL API COMPLETE]', { headers, method, url, params, data });

    if (showJSON)
        console.log('[CALL API JSON DATA]', JSON.stringify(data));

    let request = {
        headers,
        method,
        url,
        paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
    };

    if (params) request.params = params;
    if (data) request.data = data;
    if (responseType) request.responseType = responseType;

    console.log('[REQUEST]', request)

    return axios(request);
}

export default callApiNode;