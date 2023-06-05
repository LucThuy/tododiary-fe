import { useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../actions';

function OAuth2Redirect() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getUrlParameter = useCallback(
        (name) => {
            name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\[]');
            const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            const results = regex.exec(location.search);
            return results === null
                ? ''
                : decodeURIComponent(results[1].replace(/\+/g, ' '));
        },
        [location.search]
    );

    useEffect(() => {
        const token = getUrlParameter('token');

        if (token) {
            localStorage.setItem('token', token);

            dispatch(loginSuccess(token));

            navigate('/todaytodo');
        }
    }, [getUrlParameter, navigate, dispatch]);

    return;
}

export default OAuth2Redirect;
