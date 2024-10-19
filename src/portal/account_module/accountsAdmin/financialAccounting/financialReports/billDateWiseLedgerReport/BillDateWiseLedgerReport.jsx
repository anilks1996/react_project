import { Card,Button,CardHeader, CardFooter } from 'reactstrap';
import { useNavigate } from 'react-router-dom';


const BillDateWiseLedgerReport = () => {

  const navigate = useNavigate();

  return (
  <div>
  <form>
  <span><Card style={{height:'3rem', width:'75rem', background:'lightgrey'}}>Home / financial reports / Bill DateWise Ledger Report

  </Card></span><br/>
  <Card>
  <CardHeader>
  <Button onClick={() => navigate("/AccountsProfile")} color="danger">Back</Button>{' '}
  <Button color="dark">Download Excel</Button>{' '}
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

<div class="row">
<div class="col">

</div> 
<div class="col">
<Button color="secondary">Filter</Button>{' '}
</div> 
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

export default BillDateWiseLedgerReport;