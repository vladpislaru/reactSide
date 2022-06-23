import React, {  useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import LoginNav from "../components/Navs/loginNav"
import AzureAwsGcp from "../static/vortex.jpg"
import { useHistory } from "react-router-dom";
import AuthSession from '../Utils/AuthSession'

import axios from "../Utils/axios_main";
const SignUpForm = () => {
  const criptare = require(process.env.REACT_APP_CRYPTING)
  let navigate = useHistory();
  const nameRef = useRef();
  const errMsgRef = useRef();
  const {auth, setAuth} = useContext(AuthSession);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [hasAgreed, setHasAgreed] = useState(false); 
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  
  //La prima incarcare in DOM se face focus pe campul de nume
  useEffect(() => {
    
    nameRef.current.focus();
  }, []);

  //La modificarea uneia dintre valori se sterge mesajul de eroare
  useEffect(() => {
    setErrMsg('');
  }, [name, password, email, hasAgreed]);

  const handleSubmit= async (e)=> {
    e.preventDefault();

    //Verifcari standard ale campurilor
    if (email ==""){
      setErrMsg("Nu ati completat adresa de Email !")
      
      return
    }

    if(password ==""){
      setErrMsg("Nu ati completat adresa de Parola !")
      return
    }

    if(name ==""){
      setErrMsg("Nu ati completat adresa de Nume !")
      return
    }

    if(hasAgreed !== true){
      setErrMsg("Nu ati acceptat termenii si conditiile !")
      return
    }

    if(password.length < 8){
      setErrMsg("Parola trebuie sa contina minim 8 caractere !");
      return
    }

    

    try{
      const response = await axios.post('/register', 
        JSON.stringify({
          name: name,
          email: email,
          password: criptare(password)
        }),
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
        
      )

      //const data = await response.json();

      console.log(response);
      
      setAuth({
        email, 
        name,
        password: criptare(password),
      })
      navigate.push('/')
      
    }catch (err){
      console.log(err)
      if(!err?.response){
        setErrMsg("SERVICIUL ESTE MOMENTAN INDISPONIBIL! ")
      }else if ( err.response?.status === 409){
        setErrMsg("Aceasta adresa de email este deja inregistrata !");
      }else {
       
        setErrMsg("A aparut o problema cu server-ul");
      }
    }
    
  }

  
  return (
    <>
      <div className="appAside" >
          <img src={AzureAwsGcp}></img>
      </div>
      <div className="appForm">
          <LoginNav/>
          <div>
            <h3 className="errMsg">{(errMsg != "" ) ?  errMsg : "" }</h3>
          </div>
          <div className="formCenter">
              <form onSubmit={(e) => handleSubmit(e)} className="formFields">
              <div className="formField">
                  <label className="formFieldLabel" htmlFor="name">
                  Full Name
                  </label>
                  <input
                  type="text"
                  id="name"
                  autoComplete="off"
                  className="formFieldInput"
                  placeholder="Enter your full name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value) }
                  ref={nameRef}
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
                  <label className="formFieldLabel" htmlFor="email">
                  E-Mail Address
                  </label>
                  <input
                  type="email"
                  id="email"
                  autoComplete="off"
                  className="formFieldInput"
                  placeholder="Enter your email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />
              </div>

              <div className="formField">
                  <label className="formFieldCheckboxLabel">
                  <input
                      className="formFieldCheckbox"
                      type="checkbox"
                      name="hasAgreed"
                      value={hasAgreed}
                      onChange={(e) => setHasAgreed(e.target.checked)}
                  />{" "}
                  I agree all statements in{" "}
                  <a href="null" className="formFieldTermsLink">
                      terms of service
                  </a>
                  </label>
              </div>

              <div className="formField">
                  <button className="formFieldButton">Sign Up</button>{" "}
                  <Link to="/login/sign-in" className="formFieldLink">
                  I'm already member
                  </Link>
              </div>
              </form>
          </div>
      </div>
    </>
  );
  
}
export default SignUpForm;