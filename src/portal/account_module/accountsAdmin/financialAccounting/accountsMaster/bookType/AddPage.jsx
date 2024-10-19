import React from 'react'
import { Card,Button,CardHeader, CardFooter } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const AddPage = () => {

  const navigate = useNavigate();
  return (

   <div>
    <form>
    <span><Card style={{height:'3rem', width:'70rem', background:'lightgrey'}}>home/ accounts master/ book type
      </Card></span><br/>

      <Card>
      <CardHeader>
      <Button onClick={()=>navigate("/AccountsProfile")}color="danger">Back</Button>{' '}
      <Button onClick={()=>navigate("/AccountsProfile")}color="secondary">Search</Button>{' '}
      <Button onClick={()=>navigate("/AccountsProfile")}color="primary">Save</Button>{' '}
      </CardHeader>
<table width="80%" border="0" cellspacing="1">
<tr>
				 		<td>
				 			<table width="70%" border="0" cellpadding="5" align="center" >	
								<tr>
									<td width="15%" align="right"><span class="required">*</span>	
								        <label>Name</label>
							        </td>
							       <td>		
	<input id="bookType.name" type="text" name="bookType.name" value="" size="32" maxlength='32' class="form-control"  />
		</td>
		<td align="right">
		<span class="required">*</span><label>Voucher Type</label>
		</td>
		<td>
		<select class="form-control" tabindex="-1" id="bookType.voucherType" name="bookType.voucherType">
				<option value="" selected>--Select--</option>	  		
				<option  value="Receipt" title="Receipt">Receipt</option>
				<option  value="Payment" title="Payment">Payment</option>
				<option  value="Journal" title="Journal">Journal</option>
				<option  value="Contra" title="Contra">Contra</option>
				<option  value="Generic" title="Generic">Generic</option>
		</select>
									</td>
								</tr>
								<tr>
									<td align="right">
								       <span class="required">*</span><label>Prefix</label>
								    </td>
								    <td>
	<input id="bookType.prefix" type="text" name="bookType.prefix" value="" size="10" maxlength='5' class="form-control"  />
									</td>
									<td align="right">
								    <label>Suffix</label>
								    </td>
								    <td>
	<input id="bookType.suffix" type="text" name="bookType.suffix" value="" size="10" maxlength='5' class="form-control"  />
									</td>
						         </tr>
						          <tr>
									<td align="right">
								       <span class="required">*</span><label>Start Numbering</label>
								    </td>
								    <td>
	<input id="bookType.startNumber" type="text" name="bookType.startNumber" value="" size="5" maxlength='5' class="form-control"  />
									</td>
									<td align="right">
								       <span class="required">*</span><label>Width</label>
								    </td>
								    <td>
	<input id="bookType.width" type="text" name="bookType.width" value="" size="6" maxlength='6' class="form-control"  />
									</td>
						         </tr>
							</table>
							</td>
							</tr>
							</table>



      <CardFooter>© 2023 GMDA All rights reserved. Version: 4...</CardFooter>
      </Card>
    </form>
   </div>
     
     
     
     
  )
}


export default AddPage