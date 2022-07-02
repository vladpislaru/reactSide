import React, {  useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthSession from "../Utils/AuthSession";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import GlobalNav from "../components/Navs/searchBar";
import { Row, Container} from "react-bootstrap";
const Profile = () => {
    const {auth, setAuth} = useContext(AuthSession);
    const { currentImage, setCurrentImage} = useState({});
    var thisfileInput;
    //console.log(auth);
    const navigate = useHistory();
    const editImgRef = useRef();
    useEffect(()=>{
        
        //console.log(auth);
        if(!auth.email || !auth.password){
            navigate.push('/');
        }else{

        }
    }, [])

    const handleImageChange= (e) => {
        console.log("Click pe input")
    }

    const handleFakeEdit = () => {
        editImgRef.current.click();
    }

    return (
        <Container>
            <Row><GlobalNav></GlobalNav></Row>
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row">
                    <div className="col-md-3 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/>
                            <input 
                                style={{display: "none"}} 
                                type="file" 
                                onChange={(e) => handleImageChange(e)}
                                ref={editImgRef} />
                            <button className="editSpanButton" onClick={handleFakeEdit}>
                                <FontAwesomeIcon icon={faPenToSquare}/>
                            </button>
                            <span className="text-black-50">{auth.name}</span>
                            <span className="text-black-50">{auth.email}</span>
                            <span> </span>
                        </div>
                    </div>
                    <div className="col-md-5 border-right">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">Profile Settings</h4>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-12"><label className="labels">Nume de utilizator</label><input type="text" className="form-control" placeholder="Nume de utilizator" value=""/></div>

                                <div className="col-md-6"><label className="labels">Name</label><input type="text" className="form-control" placeholder="first name" value=""/></div>
                                <div className="col-md-6"><label className="labels">Surname</label><input type="text" className="form-control" value="" placeholder="surname"/></div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12"><label className="labels">Mobile Number</label><input type="text" className="form-control" placeholder="Nr. Telefon" value=""/></div>
                                <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control" placeholder="Tara" value=""/></div>
                                <div className="col-md-12"><label className="labels">Email</label><input type="text" className="form-control" placeholder="Email" value=""/></div>
                            </div>
                            
                            <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button">Save Profile</button></div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-3 py-5">
                            <div className="col-md-12"><label className="labels">Experience in Designing</label><input type="text" className="form-control" placeholder="experience" value=""/></div> <br/>
                            <div className="col-md-12"><label className="labels">Additional Details</label><input type="text" className="form-control" placeholder="additional details" value=""/></div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
        
    );
}

export default Profile;