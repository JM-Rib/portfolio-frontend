import { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../providers/AuthProvider';
import { APP_ROUTES } from '../utils/constants';

const RequireAuth = () => {
    const { verifiedUser } = useAuth();
    const location = useLocation();
    const [verified, setVerified] = useState(null);
    
    useEffect( () => {
        verifiedUser().then( (r) => {
            setVerified(r);
        });
    }, []); 
    
    return (
        <>
        {verified === null ?
            null
            :
            verified === true
                ? <Outlet />
                : <Navigate to={APP_ROUTES.LOGIN} state={{ from: location }} replace />
        }
        </>
    );
}

export default RequireAuth;