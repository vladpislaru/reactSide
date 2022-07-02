import React, { useContext, useState, useEffect } from 'react'
import { Container, Row, Col, Button, Dropdown, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import '../../static/CSS/add_products.css'
import imgAlt from '../../static/imgAlt.png'
import { useHistory } from "react-router-dom";
import Loading from '../Utils/Loading'
import AuthSession from '../../Utils/AuthSession'
import axios from '../../Utils/axios_main'
const AddProducts = (props) => {
  const {auth, setAuth} = useContext(AuthSession);
  const navigate = useHistory();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("")
  const [activeDeployOptions, setActiveDeployOptions] = useState([{
    provider:"",
    relativePath: "",
    terraformMain: "",
    mainResourceGroup: "",
    apiResourceName:"",
  }]);

  const [isLoading, setIsLoading] = useState(false);

  const providers = ["Azure", "AWS", "GCP"]
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpType, setPopUpType] = useState("Atentie !");
  const [popUpMessage, setPopUpMessage] = useState("Nothing");
  
  const deleteOption = function(indexSearched){
    const newArray = activeDeployOptions.filter(function(value , index){
      console.log("Searched" + indexSearched)
      console.log("Current" + index)
      return index != indexSearched
    })

    setActiveDeployOptions(newArray);
  }
  useEffect(()=>{
        
    //console.log(auth);
    if(!auth.email || !auth.password){
        navigate.push('/');
    }else{

    }
  }, [])
  const addOption = function(){
    
    const newArray = [...activeDeployOptions, {
      provider:{},
      relativePath: "",
      terraformMain: "",
      mainResourceGroup: "",
      apiResourceName:"",
    }]
    console.log(activeDeployOptions)
    setActiveDeployOptions(newArray);
  }

  const handleOoptionsModifications = (index, eventKey, value) => {
    var newArray = [...activeDeployOptions];
    newArray[index].provider = eventKey;
     setActiveDeployOptions(newArray);
  }

  const handleRelativePAth = (index, e) => {
    var newArray = [...activeDeployOptions];
    newArray[index].relativePath = e.target.value;
    setActiveDeployOptions(newArray);
  }

  const handleMainTerraform = (index, e) => {
    var newArray = [...activeDeployOptions];
    newArray[index].terraformMain = e.target.value;
    setActiveDeployOptions(newArray);
  }

  const handleMainResourceGroup = (index, e) => {
    var newArray = [...activeDeployOptions];
    newArray[index].mainResourceGroup = e.target.value;
    setActiveDeployOptions(newArray);
  }

  const handleMainResource = (index, e) => {
    var newArray = [...activeDeployOptions];
    newArray[index].apiResourceName = e.target.value;
    setActiveDeployOptions(newArray);
  }

  const handlePopUpClose  = () => setShowPopUp(false);
  const handlePopUpOpen  = () => setShowPopUp(true);
  var handleOk = handlePopUpClose;
  var handleCancel = handlePopUpClose;


  const handleSave = async () => {

    if(category == "" || name == "" || description == ""){
      setPopUpType("Eroare !");
      setPopUpMessage("Toate campurile cu steluta sunt obligatorii  !!");
      handleOk = () => {handlePopUpClose()}
      handleCancel = () => {handlePopUpClose()}
      setShowPopUp(true);
      return;
    }
    for(var i=0; i < activeDeployOptions.length; i++){
      if(activeDeployOptions[i].provider == "" || activeDeployOptions[i].relativePath == "" || activeDeployOptions[i].terraformMain == "" || activeDeployOptions[i].mainResourceGroup == "" || activeDeployOptions[i].apiResourceName == ""){
        setPopUpType("Eroare !");
        setPopUpMessage("Nu ati completat toatele campurile celei de a " + (i+1) + "-a optiuni");
        handleOk = () => {handlePopUpClose()}
        handleCancel = () => {handlePopUpClose()}
        setShowPopUp(true);
        return;
      }
    }

    setIsLoading(true);
    console.log("Aici in cerere de adaugare")
    try{
      const response = await axios.post('/products/add', 
        JSON.stringify({
          ownerId: auth.Id,
          product:{
            name,
            category,
            price,
            description,
            activeDeployOptions
          }
        }),
        {
          headers: {
            'Content-Type': 'application/json'
          },
          //withCredentials: true
        }
        
      )
      setIsLoading(false);
      navigate.push('/');
    }catch(err){
      setIsLoading(false);
      handleOk = () => {handlePopUpClose()}
      handleCancel = () => {handlePopUpClose()}
      if(!err?.response){
        setPopUpType("Eroare !");
        setPopUpMessage("SERVICIUL ESTE MOMENTAN INDISPONIBIL !! Salvarea nu a fost finalizata !");
        setShowPopUp(true);
      }else if ( err.response?.status === 409){
        console.log(err)
      }else {
      
        console.log(err);
      }
    }

  }
  return (
    <>
      {isLoading ? <Loading/> : ""}
      <Modal show={showPopUp} onHide={handlePopUpClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{popUpType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{popUpMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleOk}>
            Ok
          </Button>
          <Button variant="primary" onClick={handleCancel}>
            Renuntat
          </Button>
        </Modal.Footer>
      </Modal>
      <Container style={{backgroundColor:"white", padding:"20px", borderRadius:"8px"}}>
        <Row style={{width:"100%", heigh:"100px", margin:"auto"}}>
          <Col className='centerColItems' ><Button variant="outline-success" style={{width:"30%", fontWeight:"bold"}} onClick={handleSave}>Salvare</Button></Col>
          <Col className='centerColItems' ><Button variant="danger" style={{width:"30%", fontWeight:"bold"}}>Renunta</Button></Col>
        </Row>
        <Row style={{minHeight:"600px"}}>
          <Col className="centerColRows">
            <img className ="AddProductImg" src={imgAlt}></img>
            <div className='centerColItems'>
              <Button variant="outline-primary" style={{marginTop:"10px"}}>
                <FontAwesomeIcon icon={faPenToSquare}/>
              </Button>
            </div>
           
          </Col>
          <Col >
            <Container style={{backgroundColor:"white", padding:"50px"}}>
              <Row>
                <label >Denumire Produs *</label>
                <input  placeholder='Denumire' 
                        style={{width:"300px"}}
                        value={name}
                        onChange={(e) => setName(e.target.value)}>
                </input>
              </Row>
              <Row>
                <label>Categorie *</label>
                <input  placeholder='Categorie' 
                        style={{width:"200px"}} 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}>
                </input>
              </Row>
              <Row>
                <label>Pret($)</label>
                <input  placeholder='Pret' 
                        style={{width:"100px"}} 
                        type="number"
                        value={price}
                        onChange={(e) => {e.target.value > 0 ? setPrice(e.target.value) : setPrice(0)}}>
                  </input>
              </Row>
              <Row>
                <label >Descriere *</label>
                <textarea className="form-control"  
                          rows="6"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}>
                </textarea>
              </Row>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col className='centerColItems'><h1>Optiuni deployment</h1></Col> 
        </Row>
        {activeDeployOptions ? activeDeployOptions.map((dO,index) => 
          <Row style={{marginTop:"30px", height:"100px", border:"1px solid black"}}>
            <Col className='centerColItems' style={{width:"20%"}}>
              <Dropdown style={{height:"50%"}} variant="secondary" onSelect={(eventKey, eventObject) =>{handleOoptionsModifications(index, eventKey, eventObject)}}>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  {dO.provider ?  providers[dO.provider] : "Alege Furnizor" }
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey="0">Azure</Dropdown.Item>
                  <Dropdown.Item eventKey="1">AWS</Dropdown.Item>
                  <Dropdown.Item eventKey="2">GCP</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col className='centerColItems' style={{width:"20%"}}>
              <input  placeholder='Cale relativa' 
                      style={{width:"200px", height:"30%"}}e
                      value={dO.relativePath}
                      onChange={(e) => handleRelativePAth(index, e)}></input>
            </Col> 
            <Col className='centerColItems' style={{width:"20%"}}>
              <input  placeholder='Terraform principal' 
                      style={{width:"200px", height:"30%"}}
                      value={dO.terraformMain}
                      onChange={(e) => handleMainTerraform(index, e)}
                ></input>
            </Col>
            <Col className='centerColItems' style={{width:"15%"}}>
              <input  placeholder='Nume grup' 
                      style={{width:"200px", height:"30%"}}
                      value={dO.mainResourceGroup}
                      onChange={(e) => handleMainResourceGroup(index, e)}
              ></input>
            </Col>
            <Col className='centerColItems' style={{width:"20%" , height:"100%"}}>
              <input  placeholder='Resursa principala' 
                      style={{width:"200px", height:"30%"}}
                      value={dO.apiResourceName}
                      onChange={(e) => handleMainResource(index, e)}>
              </input>
            </Col>
            <Col className='centerColItems' style={{width:"5%"}}>
              <Button variant="outline-danger" style={{width:"40px", height:"30%", fontWeight:"bold", alignContent:"center", alignItems:"center", borderColor:"white"}} onClick={(e) => deleteOption(index)}>
                <FontAwesomeIcon icon={faTrash} style={{marginBottom:"6px"}} />
              </Button>
            </Col>
          </Row>

        ) : ""}
        <Row>
          <Col className='centerColItems'>
            <Button varian="outline-primary" style={{marginTop:"70px"}} onClick={(e) => addOption()}>
             <FontAwesomeIcon icon={faPlus}/>
            </Button>            
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default AddProducts
