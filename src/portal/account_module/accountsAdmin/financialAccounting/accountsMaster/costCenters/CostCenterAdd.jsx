import React from 'react'
import { Card,CardBody,Button,CardHeader, CardFooter } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const CostCenterAdd = () => {

  const navigate = useNavigate();

  return (
     <div>
      <form name="openingBalanceFrm" method="post" class="ng-pristine ng-valid">
      <span><Card style={{height:'3rem', width:'70rem', background:'lightgrey'}}>home/ accounts master/ cost center
      </Card></span><br/>

      <Card>
      <CardHeader>
      <Button onClick={()=>navigate("/AccountsProfile")}color="danger">Back</Button>{' '}
      <Button onClick={()=>navigate("/AccountsProfile")}color="secondary">Search</Button>{' '}
      <Button onClick={()=>navigate("/AccountsProfile")}color="primary">Save</Button>{' '}
      </CardHeader>

      <table width="100%" border="0" cellspacing="10" cellpadding="0">
        <tr>
          <td>
            <table width="50%" border="0" cellpadding="5" align="center">
              <tbody>
                <tr>
                  <td align="right" width="50%">
                    <span class="required">*</span>
                    <label>Accounts Organization :</label>
                  </td>
                  <td align="left" width="50%">GMDA
                  <input type="hidden" name="company.id" id="company.id" value="373882880"/></td>
                </tr>
                <tr>
                  <td align="right">
                    <span class="required">*</span>
                    <label>Code :</label>
                  </td>
                  <td>
                    <input id="costCenter.code" type="text" name="costCenter.code" maxlength="64"class="form-control"/>
                    <input type="button" name="codeButton" value="Check Availability" onclick="javaScript:checkCodeAvailability();"/>
                  </td>
                </tr>
                <tr>
                  <td align="right">
                    <span class="required">*</span>
                    <label>Name :</label>
                  </td>
                  <td>
                    <input id="costCenter.name" type="text" name="costCenter.name" size="64" maxlength="256" class="form-control"/>
                  </td>
                </tr>
<input type="hidden" name="parentCatId" id="parentCatId" value/>
<input type="hidden" name="parentCompId" id="parentCompId" value/>
<tr>
  <td align="right">
    <label>Parent Cost Center :</label>
  </td>
  <td>
    <input type="text" name="parentCatName" id="parentCatName" readonly size="40" value/>
    <input type="button" name="grpBtn" value="---" alt="--Select Cost Center--" title="--Select Cost Center--" onclick="javaScript:openCostCenterTreePopup();"/>
  </td>
</tr>
<tr>
  <td align="right">
    <label> Type :</label>
  </td>
  <td width="10%" align="left">
  <select class="form-control" tabindex="-1" id="costCenter.type" name="costCenter.type" onChange="">
				<option value="" selected>Select</option>	  		
				<option  value="Normal" title="Normal">Normal</option>
				<option  value="Project" title="Project">Project</option>
				<option  value="Scheme" title="Scheme">Scheme</option>
				<option  value="Plan" title="Plan">Plan</option>
				<option  value="Non-Plan" title="Non-Plan">Non-Plan</option>
				<option  value="EDC" title="EDC">EDC</option>
		</select>
    </td>
						    </tr>
						    <tr>
						    	 
								 <td align="right">
								        <label>Accounts Project Type :</label>
							     </td>
								<td width="10%" align="left">
		<select class="form-control" tabindex="-1" id="costCenter.projectType" name="costCenter.projectType" onChange="">
				<option value="" selected>Select</option>	  		
				<option  value="Research" title="Research">Research</option>
				<option  value="Special Assistance" title="Special Assistance">Special Assistance</option>
				<option  value="Sponsored Programme" title="Sponsored Programme">Sponsored Programme</option>
				<option  value="Sponsored Fellowship" title="Sponsored Fellowship">Sponsored Fellowship</option>
				<option  value="Other" title="Other">Other</option>
		</select>
  </td>
</tr>
              </tbody>
            </table>
          </td>
        </tr>
      </table>
      </Card>
      </form>
      </div>
	   






  
  )
}

export default CostCenterAdd