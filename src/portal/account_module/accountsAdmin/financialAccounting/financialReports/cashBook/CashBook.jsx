import { Card, Button, CardHeader, CardFooter } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

const CashBook = () => {

	const navigate = useNavigate();

  return (
  <div>
  <form>
  <span><Card style={{ height: '3rem', width: '75rem', background: 'lightgrey' }}>Home / financial      reports / cash book
  </Card></span><br />
<Card>
<CardHeader>
<Button onClick={() => navigate("/AccountsProfile")} color="danger">Back</Button>{' '}
<Button color="dark">Download Pdf</Button>{' '}
</CardHeader>
          
<table width="100%" border="0" cellspacing="1" />
  <div class="container text-center">
  <div class="row">

	<div class="col">
  <tr>
  <table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
  <tr>
  <td align="right" nowrap ><span class="required" style={{color:'red'}}>*</span>
  <label>Organization :</label>
  </td>
  </tr>
  </table>
  </tr>
  </div>

	<div class="col">
<tr>
<table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
<tr>
<td nowrap align="left" width='29%'>GMDA
<input type="hidden" name="company.id" id="company.id" value="373882880"/>
</td>
</tr>
</table>
</tr>
</div>

<div class="col">
<tr>
<table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
<tr>
<td nowrap align="left">
<span class="required" style={{color:'red'}}>*</span>
<label> Financial Year : </label>
</td>
</tr>
</table>
</tr>
</div>

<div class="col">
<tr>
<table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
<tr>
<td nowrap align="left">01/04/2023 - 31/03/2024
</td>
</tr>
</table>
</tr>
</div>
</div>



		<span><br/></span>

<div class="row">
<div class="col">
<tr>
<table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
<tr>
<td nowrap align="left"><span class="required" style={{color:'red'}}>*</span><label>Date From :&nbsp;</label></td>
</tr>
</table>
</tr>
</div>


<div class="col">
<tr>
<table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
<tr>
<td nowrap>
<input type="date" id="startDate" name="startDate" size="" value="01/04/2023"class="form-control"/>					        	
</td>
</tr>
</table>
</tr>
</div>


<div class="col">
<tr>
<table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
<tr>
<td nowrap align="left"><span class="required" style={{color:'red'}}> *</span>
<label> Date To :&nbsp;</label></td>
</tr>
</table>
</tr>
</div>


<div class="col">
<tr>
<table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
<tr>
<td nowrap>
<input type="date" id="startDate" name="startDate" size="" value="01/04/2023"class="form-control"/>					        	
</td>
</tr>
</table>
</tr>
</div>
</div>  

<span><br/></span>

<div class="row">
<div class="col">
<tr>
<table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
<tr>
<td nowrap align="left" width='15%'><span class="required" style={{color:'red'}}>*</span><label>Cash Book : </label>
</td>
</tr>
</table>
</tr>
</div>


<div class="col">
<tr>
<table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
<tr>
<td width='20%'>
		<Form.Select class="form-control" tabindex="-1" id="accountChart.id" name="accountChart.id" onChange="">
				<option value="" selected>--Select--</option>	  		
				<option  value="905511497" title="CASH Balance IN HAND">CASH Balance IN HAND</option>
		</Form.Select>
								 	</td> 
</tr>
</table>
</tr>
</div>


<div class="col">
<tr>
<table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
<tr>
<td nowrap align="left" width='15%'><span class="required" style={{color:'red'}}>*</span><label>Balancing Method : </label>
									</td>
</tr>
</table>
</tr>
</div>


<div class="col">
<tr>
<table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
<tr>
<td width='80%'>
<Form.Select class="form-control" tabindex="-1" id="printWay" name="printWay">
<option value="" selected>--Select--</option>	  		
<option  value="Daily" title="Daily">Daily</option>
<option  value="Monthly" title="Monthly">Monthly</option>
<option  value="Yearly" title="Yearly">Yearly</option>
</Form.Select>
</td> 
<td nowrap align="left">
<a class="btn btn-primary" style={{color : 'white'}}>Fetch</a>	
</td>
</tr>
</table>
</tr>
</div>

<span><br/></span>

<div class="row">
<div class="col">
<tr>
<table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
<tr>
<td align="left" width="10%" nowrap><span class="required"></span><label>Ledger Account :</label></td>
</tr>
</table>
</tr>
</div>


<div class="col">
<tr>
<table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
<tr>
<td width="20%" height="19" align="left">
	
<input type="hidden" name="ledgerAccount.id" id="ledgerAccount.id" value=""/>
<input type="text" class="form-control" autocomplete="off" maxLength='256'/>
</td>
</tr>
</table>
</tr>
</div>


<div class="col">
<tr>
<table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
<tr>
<td align="left" width="10%" nowrap><span class="required"></span><label> User :</label></td>
</tr>
</table>
</tr>
</div>


<div class="col">
<tr>
<table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
<tr>
<td width="20%" height="19" align="left">
	
<input type="hidden" name="ledgerAccount.id" id="ledgerAccount.id" value=""/>
<input type="text" class="form-control" autocomplete="off" maxLength='256'/>
</td>
</tr>
</table>
</tr>
</div>







 </div> 
 </div> 
 </div>      

            
          

<CardFooter>© 2023 GMDA All rights reserved. Version: 4...</CardFooter>
</Card>
</form>
</div>


  )
}

export default CashBook;