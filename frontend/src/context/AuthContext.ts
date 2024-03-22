import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";

const AuthContext = createContext({
    loginUser: "",
    logoutUser: "",
    user_id_exists: null,
}
);


export const AuthProvider = ({children:any}) => {
    const cookies = new Cookies();
    const user_id_exists = cookies.get('user_id') ? true : false;

    const navigate = useNavigate();

    const loginUser = async(e) => {
        navigate('/login');
    }

    const logoutUser = async() => {
        cookies.remove("user_id");
        navigate('/login');
    }

    let context_data = {
        loginUser: loginUser,
        logoutUser: logoutUser,
        user_id_exists: user_id_exists,
    }

    return(
        <AuthContext.Provider value={context_data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;