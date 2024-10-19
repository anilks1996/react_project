import { ArrowBack, DeleteOutline } from "@mui/icons-material";
import React, { useState } from "react";
import { FaPencilAlt, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {Button,Card,CardBody,CardFooter,CardHeader,Table,Modal,ModalHeader,ModalBody,ModalFooter} from "reactstrap";
import { useEffect } from "react";
import {showCity,showCityById,showCityByStateId,showCountry,showLocationInCity,showLocationInCityByCityId,showState, showStateByCountryId} from "../../../../../establishment_module/establishment_redux/slices/establishment_slice/countryStateCityLocationSlice";
import { createAccCompany, deleteAccCompany, editAccCompany, showAccCompany } from "../../../../accounts_redux/slices/accounts_slice/accCompanyFinancialSlice";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer, toast } from 'react-toastify';



const Organization = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const {accCompany,accCompanies,acLoading} = useSelector((state)=>state.allstorereducer.acfy);
  const {city,cities,states,locationInCities,countries} = useSelector((state)=>state.allstorereducer.cscLocation);
  const toggle = () => {
    setModal(!modal);
    //setUpdateOrg(null);
  };
  const dispatch = useDispatch();
  const [updateOrg, setUpdateOrg] = useState(null);
  const goback = () => { window.history.back();};
  const [startDateValue,setStartDateValue] = useState();
  const [endDateValue,setEndDateValue] = useState();

  const handleChange = (e) => {
    //alert(e.target.name);
    if(e.target.name==="accCompany.code"){
      setUpdateOrg({ ...updateOrg, ["code"]:e.target.value });
    }
    if(e.target.name==="accCompany.name"){
      setUpdateOrg({ ...updateOrg, ["name"]:e.target.value });
    }
    if(e.target.name==="accCompany.address"){
      setUpdateOrg({ ...updateOrg, ["address"]:e.target.value });
    }
    if(e.target.name==="accCompany.country.id"){
      dispatch(showStateByCountryId(e.target.value));
      setUpdateOrg({ ...updateOrg, ["country"]:{"id":e.target.value,"code":"sbi"} });
    }
    if(e.target.name==="accCompany.state.id"){
      dispatch(showCityByStateId(e.target.value));
      setUpdateOrg({ ...updateOrg, ["state"]:{"id":e.target.value,"code":"sbi"} });
    }
    if(e.target.name==="accCompany.city.id"){
      dispatch(showLocationInCityByCityId(e.target.value));
      setUpdateOrg({ ...updateOrg, ["city"]:{"id":e.target.value,"code":"sbi"} });
    }
    if(e.target.name==="accCompany.email"){
      setUpdateOrg({ ...updateOrg, ["email"]:e.target.value });
    }
    if(e.target.name==="accCompany.mobile"){
      setUpdateOrg({ ...updateOrg, ["mobile"]:e.target.value });
    }
    if(e.target.name==="accCompany.panNo"){
      setUpdateOrg({ ...updateOrg, ["panNo"]:e.target.value });
    }
    if(e.target.name==="accCompany.tanNo"){
      setUpdateOrg({ ...updateOrg, ["tanNo"]:e.target.value });
    }
    if(e.target.name==="accCompany.gstNo"){
      setUpdateOrg({ ...updateOrg, ["gstNo"]:e.target.value });
    }
    if(e.target.name==="accCompany.fax"){
      setUpdateOrg({ ...updateOrg, ["fax"]:e.target.value });
    }
    if(e.target.name==="accCompany.phone"){
      setUpdateOrg({ ...updateOrg, ["phone"]:e.target.value });
    }
    if(e.target.name==="accCompany.pincode"){
      setUpdateOrg({ ...updateOrg, ["pincode"]:e.target.value });
    }
    if(e.target.name==="financialYear.startDate"){
      setStartDateValue(e.target.value);
      setUpdateOrg({ ...updateOrg, ["startDate"]:e.target.value });
    }
    if(e.target.name==="financialYear.endDate"){
      setEndDateValue(e.target.value);
      setUpdateOrg({ ...updateOrg, ["endDate"]:e.target.value });
    }  
    console.log(updateOrg);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("updateOrg.code="+updateOrg.code)
    if(updateOrg.code==null && updateOrg.name==null){
      toast.info("Code / Name can not be empty!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    return false;
    }
    const acfyear={
      ["accCompany"]:updateOrg,
      ["financialYear"]:{"startDate":startDateValue,"endDate":endDateValue,"status":1}
    };
    console.log(acfyear);
    dispatch(createAccCompany(acfyear));
    setModal(false);
    dispatch(showAccCompany());
    setUpdateOrg(null);
    toast.info("Data saved successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
  });
  };

  useEffect(() => {
    window.scrollTo({ top: "0", left: "0", behavior: "smooth" });
    dispatch(showAccCompany());
    //dispatch(showOrganizationType());
    dispatch(showCity());
    dispatch(showCountry());
    dispatch(showState());
    dispatch(showLocationInCity());
    
  }, []);

  const updateOrgzn = (empObj) => {
    setModal(true);
    if(empObj && empObj.city && empObj.city.id){
      dispatch(showCityById(empObj.city.id));
      dispatch(showLocationInCityByCityId(empObj.city.id));
    }
    setUpdateOrg(empObj);
    setStartDateValue(getFormattedDate(new Date(empObj && empObj.startDate)));
    setEndDateValue(getFormattedDate(new Date(empObj && empObj.endDate)));
    // navigatePage(`/establishmentSetup/editEmployeeType/${id}`);
  };

  function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
    const day = String(date.getDate()).padStart(2, '0'); // Adding leading zero if needed
    return `${day}-${month}-${year}`;
  }

  const updateOrganization = (empObj) => {
    dispatch(editAccCompany(empObj));
    setModal(false);
    dispatch(showAccCompany());
  };

  const deleteOrg = (id) => {
    if (window.confirm("Are you sure? to delete record")) {
      dispatch(deleteAccCompany(id));
      
      setModal(false);
    }
    dispatch(showAccCompany());
  };


  return (
    <div>
      <form>
          <Card
            className="p-3 mt-3"
            style={{
              height: "3.5rem",
              background: "lightgrey",
              width: "80rem",
            }}
          >
            home/ accounts master/ organization
          </Card>
       
        <Card className="form-shadow" style={{minWidth:'80rem'}}>
          <CardHeader>
            <Button onClick={() => navigate("/AccountsProfile")} color="danger">Back</Button>{" "}
            <Button color="dark" onClick={toggle}> Add </Button>
          </CardHeader>

          <CardHeader>Total:</CardHeader>
          <Table bordered>
            <thead>
              <tr>
                <th scope="row">Sr. No.</th>
                <th scope="row">Organization Code</th>
                <th scope="row">Organization Name</th>
                <th scope="row">Address</th>
                <th scope="row">Actions</th>
              </tr>
            </thead>
            <tbody>
              {accCompanies && accCompanies.map((ele) => (
                  <tr key={ele.id}>
                    <td key={ele.id}>1</td>
                    <td>{ele.code}</td>
                    <td>{ele.name}</td>
                    <td>{ele.address}</td>
                    <td> <Link onClick={(e) => {updateOrgzn(ele); }}>
                        <FaPencilAlt color="green" />
                      </Link>
                      <Link
                        onClick={(e) => {
                          deleteOrg(ele.id);
                        }}
                      >
                        <DeleteOutline style={{ color: "red" }} />
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>

          <CardFooter>
            © 2023 GMDA All rights reserved. Version: 4...
          </CardFooter>
        </Card>

        <Modal isOpen={modal} toggle={toggle} fullscreen="sm" size="xl">
          <ModalHeader toggle={toggle}>Account Company</ModalHeader>
          <ModalBody>
            
                      <table>
                        <tbody>
                          <tr>
                            <td width="35%" height="19" align="right">
                              <span class="required">*</span>
                              <label>Organization Code :</label>
                            </td>
                            <td width="50%" height="19">
                              <input
                                id="accCompany.code"
                                type="text"
                                name="accCompany.code"
                                class="form-control"
                                onChange={handleChange}
                                value={updateOrg && updateOrg.code}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td width="35%" height="19" align="right">
                              <span class="required">*</span>
                              <label>Organization Name :</label>
                            </td>
                            <td width="50%" height="19">
                              <input
                                id="accCompany.name"
                                type="text"
                                name="accCompany.name"
                                class="form-control"
                                onChange={handleChange}
                                value={updateOrg && updateOrg.name}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td width="35%" height="19" align="right">
                              <span class="required">*</span>
                              <label>Address :</label>
                            </td>
                            <td width="50%" height="19">
                              <textarea
                                wrap="soft"
                                id="accCompany.address"
                                name="accCompany.address"
                                maxlength="255"
                                rows="3"
                                cols="25"
                                class="form-control"
                                onChange={handleChange}
                                value={updateOrg && updateOrg.address}
                              ></textarea>
                              <span class="help-block" id="limit_text">
                                "Characters left: "
                                <span id="accCompany.address_div">256</span>
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td width="35%" height="19" align="right">
                              <span class="required">*</span>
                              <label>Country :</label>
                            </td>
                            <td width="50%" height="19">
                              <select id="accCompany.country.id" name="accCompany.country.id" className="form-control"  onChange={handleChange}
                                value={ updateOrg && updateOrg.country && updateOrg.country.id }
                              >
                                <option value={-1}>-- select --</option>
                                {countries.map((cty) => (
                                  <option value={cty.id}>{cty.name}</option>
                                ))}
                              </select>
                            </td>
                          </tr>
                          
                          <tr>
                            <td width="35%" height="19" align="right">
                              <span class="required">*</span>
                              <label>State:</label>
                            </td>
                            <td width="50%" height="19">
                              <select class="form-control" tabindex="-1" id="accCompany.state.id" name="accCompany.state.id"  onChange={handleChange}
                                value={  updateOrg && updateOrg.state && updateOrg.state.id }
                              >
                                <option value="-1">--Select--</option>
                                {states.map((stat) => (
                                  <option value={stat.id}>{stat.name}</option>
                                ))}                                
                              </select>
                            </td>
                          </tr>

                          <tr>
                            <td width="35%" height="19" align="right">
                              <span class="required">*</span>
                              <label>City:</label>
                            </td>
                            <td width="50%" height="19">
                              <select class="form-control" tabindex="-1" id="accCompany.city.id" name="accCompany.city.id" onChange={handleChange}
                                value={ updateOrg && updateOrg.city &&  updateOrg.city.id }
                              >
                                <option value="-1">--Select--</option>
                                {cities.map((city) => (
                                  <option value={city.id}>{city.name}</option>
                                ))}
                                {/* <option  value="3276800" title="Maharashtra">Delhi</option>
                      <option  value="5341185" title="Kerala">Gurugram</option>
                      <option  value="5341186" title="Tamil Nadu">Faridabad</option> */}
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <td width="35%" height="19" align="right">
                              <label>Pin Code :</label>
                            </td>
                            <td width="50%" height="19">
                              <input
                                id="accCompany.pincode"
                                type="text"
                                name="accCompany.pincode"
                                maxlength="32"
                                size="50"
                                class="form-control"
                                onChange={handleChange}
                                value={updateOrg && updateOrg.pinCode}
                              />
                            </td>
                          </tr>

                          <tr>
                            <td width="35%" height="19" align="right">
                              <span class="required">*</span>
                              <label>Phone :</label>
                            </td>
                            <td width="50%" height="19">
                              <input
                                id="accCompany.phone"
                                type="text"
                                name="accCompany.phone"
                                maxlength="32"
                                size="50"
                                class="form-control"
                                onChange={handleChange}
                                value={updateOrg && updateOrg.phone}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td width="35%" height="19" align="right">
                              <label>Mobile :</label>
                            </td>
                            <td width="50%" height="19">
                              <input
                                id="accCompany.mobile"
                                type="text"
                                name="accCompany.mobile"
                                maxlength="32"
                                size="50"
                                class="form-control"
                                onChange={handleChange}
                                value={updateOrg && updateOrg.mobile}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td width="35%" height="19" align="right">
                              <label>Fax :</label>
                            </td>
                            <td width="50%" height="19">
                              <input
                                id="accCompany.fax"
                                type="text"
                                name="accCompany.fax"
                                maxlength="32"
                                size="50"
                                class="form-control"
                                onChange={handleChange}
                                value={updateOrg && updateOrg.fax}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td width="35%" height="19" align="right">
                              <label>Email :</label>
                            </td>
                            <td width="50%" height="19">
                              <input
                                id="accCompany.email"
                                type="text"
                                name="accCompany.email"
                                maxlength="32"
                                size="50"
                                class="form-control"
                                onChange={handleChange}
                                value={updateOrg && updateOrg.email}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td width="35%" height="19" align="right">
                              <label>PAN :</label>
                            </td>
                            <td width="50%" height="19">
                              <input
                                id="accCompany.panNo"
                                type="text"
                                name="accCompany.panNo"
                                maxlength="32"
                                size="50"
                                class="form-control"
                                onChange={handleChange}
                                value={updateOrg && updateOrg.panNo}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td width="35%" height="19" align="right">
                              <label>TAN :</label>
                            </td>
                            <td width="50%" height="19">
                              <input
                                id="accCompany.tanNo"
                                type="text"
                                name="accCompany.tanNo"
                                maxlength="32"
                                size="50"
                                class="form-control"
                                onChange={handleChange}
                                value={updateOrg && updateOrg.tanNo}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td width="35%" height="19" align="right">
                              <label>GST No :</label>
                            </td>
                            <td width="50%" height="19">
                              <input
                                id="accCompany.gstNo"
                                type="text"
                                name="accCompany.gstNo"
                                maxlength="32"
                                size="50"
                                class="form-control"
                                onChange={handleChange}
                                value={updateOrg && updateOrg.gstNo}
                              />
                            </td>
                          </tr>
                          
                          <tr>
                            <td width="35%" height="19" align="right">
                              <label>Tax Deductor Category :</label>
                            </td>
                            <td width="50%" height="19">
                              <select  class="form-control" tabindex="-1"
                                id="accCompany.taxDeductorCategory"
                                name="accCompany.taxDeductorCategory"
                                onChange
                              >
                                <option value={-1}>-- Select --</option>
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <td align="right">
                              <span class="required">*</span>
                              <label> Financial Year Start Date :</label>
                            </td>
                            <td>
                              <input
                                type="date"
                                id="financialYear.startDate" name="financialYear.startDate"
                                class="form-control"
                                onChange={handleChange}
                                value={startDateValue}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td align="right">
                              <span class="required">*</span>
                              <label> Financial Year End Date :</label>
                            </td>
                            <td>
                              <input
                                type="date"
                                id="financialYear.endDate" name="financialYear.endDate"
                                class="form-control"
                                onChange={handleChange}
                                value={endDateValue}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    
          </ModalBody>
          <ModalFooter>
            {updateOrg && updateOrg.id !== undefined ? (
              <Button color="success" onClick={(e) => {  updateOrganization(updateOrg);}} >
                Update
              </Button>
            ) : (
              <Button color="success" onClick={handleSubmit}> Save </Button>
            )}{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Organization;
