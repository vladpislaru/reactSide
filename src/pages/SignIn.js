import React, { Component, useRef, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  FacebookLoginButton,
  InstagramLoginButton
} from "react-social-login-buttons";
import LoginNav from "../components/Navs/loginNav";
import AzureAwsGcp from "../static/vortex.jpg"
import AuthSession from "../Utils/AuthSession";
import { useHistory } from "react-router-dom";
import axios from '../Utils/axios_main'
import Loading from "../components/Utils/Loading";
const SignInForm = () => {

  const {setAuth} = useContext(AuthSession);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useHistory();
  const emailRef = useRef();
  const [isLoading, setIsLoading]= useState(false);
  //Numele algoritmul de criptare este pastrat variabila de mediu pentru a nu fi vizibila pentru utilizatori
  const criptare  = require(process.env.REACT_APP_CRYPTING);

  useEffect(() => {
    setAuth({});
    emailRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg("");
  },[email, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email ==""){
      setErrMsg( "Nu ati completat adresa de email !")
      return
    }

    if(password ==""){
      setErrMsg( "Nu ati completat campul parola !")
      return
    }

      setIsLoading(true);
      await axios.post('/login',
        JSON.stringify({
          email: email,
          password: criptare(password)
        }),
        {
          headers: {
            'Content-Type': 'application/json'
          },
          //withCredentials: true
        }
      ).then(response => {
        console.log(response);
        setAuth({
          email,
          name: response.data.name, 
          password: criptare(password),
          Id: response.data.Id
        })
        setIsLoading(false);
       navigate.push('/')
      }).catch(err => {
        setIsLoading(false);

        if( !err?.response){
          setErrMsg("SERVICIUL ESTE MOMENTAN INDISPONIBIL! ")
        }else if(err.response?.status === 404){
          setErrMsg("Adresa de email sau parola sunt gresite");
        }else if(err.response?.status === 401){
          setErrMsg("Acces neautorizat!")
        }else{
          setErrMsg("A aparut o problema cu server-ul");
          console.log(err.response.status)
        } 
        console.log(err);
      })

  }


    return (
    <>
        {isLoading ? <Loading/> : ""}
        <div className="appAside" >
            <img src={AzureAwsGcp}></img>
        </div>
        <div className="appForm">
            <LoginNav/>
            <div>
              <h2 className="errMsg">{(errMsg != "" ) ?  errMsg : "" }</h2>
            </div>
            <div className="formCenter">
                <form className="formFields" onSubmit={handleSubmit}>
                <div className="formField">
                    <label className="formFieldLabel" htmlFor="email">
                    E-Mail Address
                    </label>
                    <input
                    type="email"
                    id="email"
                    className="formFieldInput"
                    placeholder="Enter your email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ref={emailRef}
                    />
                </div>

                <div className="formField">
                    <label className="formFieldLabel" htmlFor="password">
                    Password
                    </label>
                    <input
                    type="password"
                    id="password"
                    className="formFieldInput"
                    placeholder="Enter your password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="formField">
                    <button className="formFieldButton" type="submit">Sign In</button>{" "}
                    <Link to="/login/" className="formFieldLink">
                    Create an account
                    </Link>
                </div>

                
                </form>
            </div>
        </div>
    </>
    );
}

export default SignInForm;