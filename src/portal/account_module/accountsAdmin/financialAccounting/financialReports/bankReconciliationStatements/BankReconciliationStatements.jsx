import { Card,Button,CardHeader, CardFooter } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';


const BankReconciliationStatements = () => {

  const navigate = useNavigate();

  return (
  <div>
  <form>
  <span><Card style={{height:'3rem', width:'70rem', background:'lightgrey'}}>Home / financial reports / bank reconciliation statement

  </Card></span><br/>
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
<table class="forumline" border="0" cellspacing="0" cellpadding="0">
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
<table class="forumline" border="0" cellspacing="0" cellpadding="0">
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
<table class="forumline" border="0" cellspacing="0" cellpadding="0">
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
<table class="forumline" border="0" cellspacing="0" cellpadding="0">
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
<table class="forumline" border="0" cellspacing="0" cellpadding="0">
<tr>
<td nowrap align="left"><span class="required" style={{color:'red'}}>*</span><label>Date From :</label></td>
</tr>
</table>
</tr>
</div>


<div class="col">
<tr>
<table class="forumline" border="0" cellspacing="0" cellpadding="0">
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
<table class="forumline" border="0" cellspacing="0" cellpadding="0">
<tr>
<td nowrap align="left"><span class="required" style={{color:'red'}}> *</span>
<label> Date To :</label></td>
</tr>
</table>
</tr>
</div>


<div class="col">
<tr>
<table class="forumline" border="0" cellspacing="0" cellpadding="0">
<tr>
<td nowrap>
<input type="date" id="startDate" name="startDate" size="" value="01/04/2023"class="form-control"/>					        	
</td>
</tr>
</table>
</tr>
</div>

<span><br/></span>

<div class="row">
<div class="col">
<tr>
<table class="forumline" border="0" cellspacing="0" cellpadding="0">
<tr>
<td nowrap align="left"><span class="required" style={{color:'red'}}>*</span><label>Bank Book : </label>
</td>
</tr>
</table>
</tr>
</div>


<div class="col">
<tr>
<table class="forumline" border="0" cellspacing="0" cellpadding="0">
<tr>
<td width="180px" align="right">
<Form.Select aria-label="Default select example" class="form-control" tabindex="-1" id="accountChart.id" name="accountChart.id">
				<option value="" selected>--Select--</option>	  		
				<option  value="905511735" title="HDFC BANK FDR ">HDFC BANK FDR </option>
				<option  value="905511738" title="Equitas Bank FDR">Equitas Bank FDR</option>
				<option  value="905511825" title="FD A C ICICI Bank">FD A C ICICI Bank</option>
				<option  value="905511932" title="FD A C IDFC Bank">FD A C IDFC Bank</option>
				<option  value="905511946" title="FD A C ICICI Bank Medical College">FD A C ICICI Bank Medical College</option>
				<option  value="905511948" title="Yes Bank  010594600000702">Yes Bank  010594600000702</option>
				<option  value="905511949" title="Indusind Bank FD A c">Indusind Bank FD A c</option>
				<option  value="905511950" title="FD A C Yes Bank">FD A C Yes Bank</option>
				<option  value="905511951" title="IDFC Bank A c 10029241600">IDFC Bank A c 10029241600</option>
				<option  value="905511970" title="Punjab National Bank Sb A/c no. 12372043000624">Punjab National Bank Sb A/c no. 12372043000624</option>
				<option  value="905511971" title="Canara Bank FDR">Canara Bank FDR</option>
				<option  value="905511975" title="State Bank of India FDR">State Bank of India FDR</option>
				<option  value="905511978" title="Punjab National Bank FDR">Punjab National Bank FDR</option>
				<option  value="905511979" title="Equitas bank saving Account no.100047098087">Equitas bank saving Account no.100047098087</option>
				<option  value="905511980" title="Indusind Bank S/b A/c no. 100180369536">Indusind Bank S/b A/c no. 100180369536</option>
				<option  value="905511992" title="Induslnd A c No 100059799914">Induslnd A c No 100059799914</option>
				<option  value="905512089" title="Bank Ac PnB A c No 1183005900001644">Bank Ac PnB A c No 1183005900001644</option>
				<option  value="905512095" title="Utkarsh Bank  1376010000000084">Utkarsh Bank  1376010000000084</option>
				<option  value="905512103" title="ICICI Bank Ltd   165101001252">ICICI Bank Ltd   165101001252</option>
				<option  value="905512111" title="FD A C Utkarash Small Finance Bank">FD A C Utkarash Small Finance Bank</option>
				<option  value="905512134" title="ICICI BANK LTD 165101001688 Link deposit">ICICI BANK LTD 165101001688 Link deposit</option>
				<option  value="905512151" title="Icici Bank Collections A c No 103105003176">Icici Bank Collections A c No 103105003176</option>
				<option  value="905512224" title="ICICI bank Link Deposit  165113013230">ICICI bank Link Deposit  165113013230</option>
				<option  value="905512225" title="ICICI bank Link Deposit  165113013231">ICICI bank Link Deposit  165113013231</option>
				<option  value="905512244" title="Axis Bank FDR">Axis Bank FDR</option>
				<option  value="905512245" title="State Bank Of India Account no. 40181953796">State Bank Of India Account no. 40181953796</option>
				<option  value="905512246" title="HDFC BANK LIMITED ACCOUNT NO. 50100442837630">HDFC BANK LIMITED ACCOUNT NO. 50100442837630</option>
				<option  value="905512248" title="UJJIVAN SMALL FINANCE BANK 2349110110052778">UJJIVAN SMALL FINANCE BANK 2349110110052778</option>
				<option  value="905512249" title="HDFC BANK LIMITED 50100204416075">HDFC BANK LIMITED 50100204416075</option>
				<option  value="905512250" title="Kotak Mahindra Bank -5946149943">Kotak Mahindra Bank -5946149943</option>
				<option  value="905512252" title="FD AC IDFC BANK">FD AC IDFC BANK</option>
				<option  value="905512288" title="FD AC IDBI BANK">FD AC IDBI BANK</option>
				<option  value="905512470" title="ICICI BANK LINK FD 165101001252">ICICI BANK LINK FD 165101001252</option>
				<option  value="905512498" title="ICICI Bank Ltd   165105001570">ICICI Bank Ltd   165105001570</option>
				<option  value="905512505" title="ICICI BANK LTD 165101001924 LINK DEPOSIT">ICICI BANK LTD 165101001924 LINK DEPOSIT</option>
				<option  value="905512508" title="State Bank Of India A c no 38515901919">State Bank Of India A c no 38515901919</option>
				<option  value="905512540" title="ICICI BANK Link Deposit 1688 (Deposit No.165113012506)">ICICI BANK Link Deposit 1688 (Deposit No.165113012506)</option>
				<option  value="905512541" title="Induslnd A c No 100059799914 Flexi Deposit">Induslnd A c No 100059799914 Flexi Deposit</option>
				<option  value="905512544" title="Equitas Small Finance Bank 100005082020">Equitas Small Finance Bank 100005082020</option>
				<option  value="905512545" title="Axix bank Ltd S/B A/c no. 920010058084607">Axix bank Ltd S/B A/c no. 920010058084607</option>
				<option  value="905512546" title="Indusind Bank S/b Account no. 100118467372">Indusind Bank S/b Account no. 100118467372</option>
				<option  value="905512709" title="ICICI BANK 165101001688">ICICI BANK 165101001688</option>
				<option  value="916815872" title="AU Small Finance Bank Ltd S/b Account no. 2301240349428290">AU Small Finance Bank Ltd S/b Account no. 2301240349428290</option>
				<option  value="905512499" title="ICICI 165101001924">ICICI 165101001924</option>
				<option  value="940670976" title="AU Small Finance Bank Ltd  FDR">AU Small Finance Bank Ltd  FDR</option>
</Form.Select>
</td>
</tr>
</table>
</tr>
</div>

<div class="col">
<tr>
<table class="forumline" border="0" cellspacing="0" cellpadding="0">
<tr>
<td nowrap align="left" width="250px">
<span class="required" style={{color:'red'}}>*</span>
 Closing Balance From Your Bank Statement :
</td>
</tr>
</table>
</tr>
</div>


<div class="col">
<tr>
<table class="forumline" border="0" cellspacing="0" cellpadding="0">
<tr>
<td width="180px" align="right">
<input type="text" class="form-control"/>					        	
</td>
</tr>
</table>
</tr>
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


export default BankReconciliationStatements