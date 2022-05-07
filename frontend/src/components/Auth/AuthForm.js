import { useState, useRef,useContext } from "react";
import {useNavigate} from "react-router-dom";


import AuthContext from '../../store/auth-context';
import Errors from '../Errors/Errors'


const AuthForm = () => {

    const baseUrl = "http://localhost:8080";
    const history = useNavigate();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    const surnameRef = useRef();
    const genderRef = useRef();


    const authContext = useContext(AuthContext);

    const [loggingIn, setLoggingIn] = useState(true);
    const [errors, setErrors] = useState({});

    const switchModeHandler = () =>{
        setLoggingIn((prevState) => !prevState);
        setErrors({});
    };


    const endpoint = loggingIn ? baseUrl+'/api/signin' : baseUrl+'/api/signup';

    async function submitHandler(event){
        event.preventDefault();
        setErrors({});

        const usernameValue = usernameRef.current.value;
        const passwordValue = passwordRef.current.value;
        // const nameValue = nameRef.current.value;
        // const surnameValue = surnameRef.current.value;
        // const genderValue = genderRef.current.value;

        try{
            
            const response =  await fetch(endpoint, 
                {
                    method: 'POST',
                    body: JSON.stringify({
                        Username: usernameValue,
                        Password: passwordValue,
                        // Name: nameValue,
                        // Surname: surnameValue,
                        // Gender: genderValue ? true: false
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    }

                }
                    
            );
            const data = await response.json();
            if(!response.ok){
                let errorText = loggingIn ? 'Login failed': 'Sign up failed';
                if (!data.hasOwnProperty('error')){
                    throw new Error(errorText);
                }
                if((typeof data['error']) === 'string'){
                    setErrors({"unknown": data['error']});
                }else {
                    setErrors(data['error']);
                }

            }else{
                authContext.login(data.jwt);
                history.replaceState('/');
            }
        }catch (error){
            setErrors({'error': error.message});

        }
    };

    const header = loggingIn ? 'Login': 'Sign up';
    const mainButtonText = loggingIn ? 'Login': 'Create account';
    const switchModeButtonText = loggingIn ? 'Create new account': 'Login with existing account';
    const errorContent = Object.keys(errors).length === 0 ? null : Errors(errors);


    return(
        <section>
            <h1 className="text-center">{header}</h1>
            <div className="container w-50">
                <form onSubmit={submitHandler}>
                    <div className="form-group pb-3">
                        <label htmlFor="username">Username</label>
                        <input id="username" type="text" className="form-control" required ref={usernameRef}></input>
                    </div>
                    <div className="form-group pb-3">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" className="form-control" required ref={passwordRef}></input>
                    </div>
                    {/* <div className="form-group pb-3">
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" className="form-control" required ref={nameRef}></input>
                    </div>
                    <div className="form-group pb-3">
                        <label htmlFor="surname">Surname</label>
                        <input id="surname" type="text" className="form-control" required ref={surnameRef}></input>
                    </div>
                    <div className="form-group pb-3">
                        <label htmlFor="gender" className="pr-3">Gender</label>
                        <select className="form-select" aria-label="Default select example" defaultValue={false} required ref={genderRef}>
                            <option value="false">Male</option>
                            <option value="true">Female</option>
                        </select>
                    </div> */}
                    <div className="pt-3 d-flex justify-content-between">
                        <button type="submit" className="btn btn-success">{mainButtonText}</button>
                        <button type=" button" className="btn btn-link" onClick={switchModeHandler}>{switchModeButtonText}</button>
                    </div>

                </form>
                {errorContent}

            </div>
        </section>
    );
}


export default AuthForm;