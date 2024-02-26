import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./Logout";
import LoginButton from "./Login";

const Profile = () => {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [token, setToken] = useState("")

    useEffect(() => {
        const custom = () => console.log("csutom");

        const getAccessToken = async () => {
            try {
                const token2 = await getAccessTokenSilently();
                setToken(token2)
            } catch (e) {
                console.log(e)
            }
        };

        if (isAuthenticated) custom()
        getAccessToken();

    }, [getAccessTokenSilently, isAuthenticated]);

    useEffect(() => {
        console.log("isAuthenticated: ", isAuthenticated)
    }, [isAuthenticated]);

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated ? (
            <div>
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                {/* {console.log(token)} */}
                <LogoutButton />
            </div>
        ) : <LoginButton />
    );
};

export default Profile;