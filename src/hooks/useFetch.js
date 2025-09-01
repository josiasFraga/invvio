import { useState, useEffect, useCallback } from 'react';
import callApiNode from '@services/api/node';
import CONFIG from '@constants/configs';

/**
 * Hook personalizado para buscar dados de uma API.
 *
 * @param {string} endpoint - O endpoint da API a ser chamado.
 * @param {object} options - Opções para a requisição (método, parâmetros, cabeçalhos, etc.).
 * @param {boolean} immediate - Se a busca deve ocorrer imediatamente ao montar o componente.
 *
 * @returns {object} - Contém os dados, estado de loading e possíveis erros.
 */
const useFetch = (endpoint, options = {}, immediate = true) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(immediate && endpoint);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {

        if ( !endpoint ) {
            return;            
        }
    
        setLoading(true);
        setError(null);
        try {

            // Configura os parâmetros padrão se não estiverem definidos
            const params = {
                ...options.params,
            };

            // Faz a chamada à API
            const response = await callApiNode({
                endpoint: `${CONFIG.url}${endpoint}`,
                method: options.method || 'GET',
                params,
                headers: options.headers || {
                    'content-type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setData(response.data);
            } else {
                setError(response.status || 'Erro desconhecido');
                console.error('Erro ao buscar dados:', response.status);
            }
        } catch (err) {
            setError(err.message || 'Erro ao buscar dados');
            console.error('Erro ao buscar dados:', err.message);
            console.log(`${CONFIG.url}${endpoint}`);
        } finally {
            setLoading(false);
        }
    }, [endpoint, options]);

    useEffect(() => {
        if (immediate) {
            fetchData();
        }
    }, [fetchData, immediate]);

    return { data, loading, error, refetch: fetchData };
};

export default useFetch;
