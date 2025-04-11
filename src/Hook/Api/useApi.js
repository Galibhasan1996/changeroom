import { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';
import { styleConsole } from '../../util/helper/Helper';

const useApi = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const controllerRef = useRef(new AbortController());

    const makeRequest = useCallback(async (method, requestData = null, params = {}, headers = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios({ method, url, data: requestData, params, headers, signal: controllerRef.current.signal });
            setData(response.data);
        } catch (err) {
            styleConsole("🚀 ~ useApi.js:19 ~ makeRequest ~ err:", "error", err.message)
            if (axios.isCancel(err)) {
                styleConsole("🚀 ~ useApi.js:26 ~ makeRequest ~ err:", 'Request cancelled:', err.message)
            } else {
                setError(err.response?.data || err.message);
            }
        } finally {
            setLoading(false);
        }
    }, [url, controllerRef]);

    useEffect(() => {
        return () => {
            controllerRef.current.abort();
        };
    }, []);

    return { data, error, loading, makeRequest };
};

export default useApi;




