import React from 'react'
import { Card, Button, CardHeader, CardFooter } from 'reactstrap';
import { DatePicker } from 'reactstrap-date-picker';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



const ShowAction = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


  return (
    <div>
      <form>
        <span><Card style={{ height: '3rem', background: 'lightgrey', width: '70rem' }}>home/ accounts master/ organization
        </Card></span><br />

        <Card>
          <CardHeader>
            <Button onClick={() => navigate("/financialAccounting/accountMaster/organization")} color="danger">Back</Button>{' '}
            <Button color="secondary">Search</Button>{' '}
            <Button color="primary">Save</Button>{' '}
          </CardHeader>

          <table>
            <tbody>
              <tr>
                <td>
                  <table class="forumline">
                    <tr height="24" class="headingbggray" align="left">
                      <label></label>
                    </tr>
                  </table>
                </td>
              </tr>


              <tr>
                <td>
                  <table>
                    <tbody>
                      <tr>
                        <td height="40" width="50%" class="dashboardbg">
                          <div class="page-header pull-left">
                            <div class="header-buttons">
                              <div class="collapse" id="header-buttons">
                                <div class="well">
                                  <a class="btn btn-primary " data-placement="bottom" href="javaScript:window.history.back();" title="Back" style={{ color: 'white', background: '#FF3366' }}>Back</a>
                                  <a class="btn btn-primary " data-placement="bottom" href="listAccCompany.action" title="Search" style={{ color: 'white' }}>Search</a>
                                  <a class="btn btn-info " data-placement="bottom" href="JavaScript:doAddSubmit();" style={{ color: 'white', title: 'Save' }}>Save</a>
                                </div>
                              </div>
                            </div>

                          </div>
                        </td>
                        <td height="40" width="50%" class="dashboardbg"></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table border="0" cellspacing="0" cellpadding="7">
                    <tbody>
                      <tr>
                        <td width="35%" height="19" align="right">
                          <span class="required">*</span>
                          <label>Organization Name :</label>
                        </td>
                        <td width="50%" height="19">
                          <input id="accCompany.name" type="text" name="accCompany.name" class="form-control" />
                        </td>
                      </tr>
                      <tr>
                        <td width="35%" height="19" align="right">
                          <span class="required">*</span>
                          <label>Address :</label>
                        </td>
                        <td width="50%" height="19">
                          <textarea wrap="soft" id="accCompany.address" name="accCompany.address" maxlength="255" rows="3" cols="25" class="form-control"></textarea>
                          <span class="help-block" id="limit_text">"Characters left: "
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
                          <select class="form-control" tabindex="-1" id="country.id" name="country.id" onchange="javaScript:showState();">
                          <option value="-1">--Select--</option>
                          <option value="3244032" title="India">India</option>
                          <option value="3244033" title="Others">Others</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%" height="19" align="right">
                          <span class="required">*</span>
                          <label>State :</label>
                        </td>
                        <td width="50%" height="19">
                          <select class="form-control" tabindex="-1" id="accCompany.state.id" name="accCompany.state.id" onchange="javaScript:showState();">
                            <option>--Select--</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%" height="19" align="right">
                          <span class="required">*</span>
                          <label>City :</label>
                        </td>
                        <td width="50%" height="19">
                          <select class="form-control" tabindex="-1" id="accCompany.city.id" name="accCompany.city.id" onchange>
                            <option>--Select--</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%" height="19" align="right">
                          <label>Pin Code :</label>
                        </td>
                        <td width="50%" height="19">
                          <input id="accCompany.pincode" type="text" name="accCompany.pincode" maxlength="32" size="50"></input>
                        </td>
                      </tr>

                      <tr>
                        <td width="35%" height="19" align="right">
                          <span class="required">*</span>
                          <label>Phone :</label>
                        </td>
                        <td width="50%" height="19">
                          <input id="accCompany.phone" type="text" name="accCompany.phone" maxlength="32" size="50"></input>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%" height="19" align="right">
                          <label>Mobile :</label>
                        </td>
                        <td width="50%" height="19">
                          <input id="accCompany.mobile" type="text" name="accCompany.mobile" maxlength="32" size="50"></input>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%" height="19" align="right">
                          <label>Fax :</label>
                        </td>
                        <td width="50%" height="19">
                          <input id="accCompany.fax" type="text" name="accCompany.fax" maxlength="32" size="50"></input>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%" height="19" align="right">
                          <label>Email :</label>
                        </td>
                        <td width="50%" height="19">
                          <input id="accCompany.email" type="text" name="accCompany.email" maxlength="32" size="50"></input>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%" height="19" align="right">
                          <label>PAN :</label>
                        </td>
                        <td width="50%" height="19">
                          <input id="accCompany.panNo" type="text" name="accCompany.panNo" maxlength="32" size="50"></input>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%" height="19" align="right">
                          <label>TAN :</label>
                        </td>
                        <td width="50%" height="19">
                          <input id="accCompany.tanNo" type="text" name="accCompany.tanNo" maxlength="32" size="50"></input>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%" height="19" align="right">
                          <label>GST No :</label>
                        </td>
                        <td width="50%" height="19">
                          <input id="accCompany.gstNo" type="text" name="accCompany.gstNo" maxlength="32" size="50"></input>
                        </td>
                      </tr>
                      <tr>
                        <td align="right" width="2%">
                          <label>Person Responsible for deducting Tax</label>
                        </td>
                        <td>
                          <div class="form-inline">
        
                            <input readonly type="button" id="accCompany.resEmployee.id_display" name="accCompany.resEmployee.id_display" value="--Select Employee--"/>
                            {/* <Button onClick={()=>navigate("/EmployeeModal")}color="secondary">Add</Button>{' '}  */}
                            <div>
                            <Button color="dark" onClick={toggle}>
        .....
      </Button>
      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalHeader toggle={toggle}>Employee List</ModalHeader>
        <ModalBody>
        1. Pooja 
        2. Shruti
        3. Anil
        4. Kanan
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td width="35%" height="19" align="right">
                          <label>Tax Deductor Category :</label>
                        </td>
                        <td width="50%" height="19">
                          <select class="form-control" tabindex="-1" id="accCompany.taxDeductorCategory" name="accCompany.taxDeductorCategory" onchange>
                            <option value selected>--Select--</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td width="3%" height="19" align="right">
                          <span class="required">*</span>
                          <label>Financial Year Start Date :</label>
                        </td>
                        <td>
                          <DatePicker dateFormat="DD/MM/YYYY" id="joinDate" value="" />  
                        
                          </td>
                          
                      </tr>
                      <tr>
                        <td align="right">
                          <span class="required">*</span>
                          <label> Financial Year End Date :</label>
                        </td>
                        <td>
                          <DatePicker dateFormat="DD/MM/YYYY" id="joinDate" value="" />
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>

        </Card>
        <CardFooter>© 2023 GMDA All rights reserved. Version: 4...</CardFooter>
      </form>
    </div>



  )
}

export default ShowAction;



