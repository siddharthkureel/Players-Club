import { useState, useEffect } from 'react';
import authService from '../components/api-authorization/AuthorizeService';

export default () => {
    const [auth, setAuth] = useState(false);
    
    useEffect(() => {
        (async () => {
            const [isAuthenticated] = await Promise.all([authService.isAuthenticated()])
            setAuth(isAuthenticated);
        })();
    }, []);
    
    return [auth];
}