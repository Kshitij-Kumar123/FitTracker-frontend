import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
    return (
        <Auth0Provider
            domain={process.env.REACT_APP_AUTHO_DOMAIN}
            clientId={process.env.REACT_APP_AUTHO_CLIENT_ID}
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: process.env.REACT_APP_AUTHO_AUDIENCE,
            }}
        >
            {children}
        </Auth0Provider>
    );
};
export default Auth0ProviderWithHistory;