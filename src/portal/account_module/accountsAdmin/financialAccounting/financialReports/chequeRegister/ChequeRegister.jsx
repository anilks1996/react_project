import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card,Button,CardHeader, CardFooter } from 'reactstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const ChequeRegister = () => {

  const navigate = useNavigate();

  return (
    <div>
    <form>
    <span><Card style={{height:'3rem', width:'70rem', background:'lightgrey'}}>Home / financial reports / cheque register

    </Card></span><br/>
    <Card>
    <CardHeader>
    <Button onClick={() => navigate("/AccountsProfile")} color="danger">Back</Button>{' '}
    <Button color="dark">Download Pdf</Button>{' '}
    </CardHeader>


  <Container>
  <Row sm={12}>
  <Col sm={4}>
  <tr>
  <table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
  <tr>
  <td align="right" nowrap ><span class="required" style={{color:'red'}}>*</span>
  <label>Organization :</label>
  </td>
  <tr>
  <td nowrap align="left" width='29%'>GMDA
  <input type="hidden" name="company.id" id="company.id" value="373882880"/>
  </td>
  </tr>
  </tr>
  </table>
  </tr>
  </Col>

  <Col sm={4}>
  <tr>
  <table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
  <tr>
  <td align="right" nowrap ><span class="required" style={{color:'red'}}>*</span>
  <label>Financial Year :</label>
  </td>
  <tr>
  <td nowrap align="left" width='29%'>01/04/2023 - 31/03/2024
  <input type="hidden" name="company.id" id="company.id" value="373882880"/>
  </td>
  </tr>
  </tr>
  </table>
  </tr>    
</Col>
      
  <Col sm={4}>
  <tr>
  <table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
  <tr>
  <td  align="right" width="25%"><span class="required" style={{color:'red'}}>*</span><label>Bank Book</label>
	</td>
  <tr>
  <td align="left">
	<Form.Select class="form-control" tabindex="-1" id="accountChart.id">
				<option value="" selected>--Select--</option>	  		
				<option  value="905511735" title="HDFC BANK FDR ">A02-01-05-03-HDFC BANK FDR </option>
				<option  value="905511738" title="Equitas Bank FDR">A02-01-05-04-Equitas Bank FDR</option>
				<option  value="905511825" title="FD A C ICICI Bank">A02-01-05-01-013-FD A C ICICI Bank</option>
				<option  value="905511932" title="FD A C IDFC Bank">A02-01-05-01-04-FD A C IDFC Bank</option>
				<option  value="905511946" title="FD A C ICICI Bank Medical College">A02-01-05-01-03-FD A C ICICI Bank Medical College</option>
				<option  value="905511948" title="Yes Bank  010594600000702">A02-01-05-01-010-Yes Bank  010594600000702</option>
				<option  value="905511949" title="Indusind Bank FD A c">A02-01-05-01-08-Indusind Bank FD A c</option>
				<option  value="905511950" title="FD A C Yes Bank">A02-01-05-01-09-FD A C Yes Bank</option>
				<option  value="905511951" title="IDFC Bank A c 10029241600">A02-01-05-01-02-IDFC Bank A c 10029241600</option>
				<option  value="905511970" title="Punjab National Bank Sb A/c no. 12372043000624">A02-01-05-01-06-Punjab National Bank Sb A/c no. 12372043000624</option>
				<option  value="905511971" title="Canara Bank FDR">A02-01-05-01-45-Canara Bank FDR</option>
				<option  value="905511975" title="State Bank of India FDR">A02-01-05-01-46-State Bank of India FDR</option>
				<option  value="905511978" title="Punjab National Bank FDR">A02-01-05-01-47-Punjab National Bank FDR</option>
				<option  value="905511979" title="Equitas bank saving Account no.100047098087">A02-01-05-01-48-Equitas bank saving Account no.100047098087</option>
				<option  value="905511980" title="Indusind Bank S/b A/c no. 100180369536">A02-01-05-01-49-Indusind Bank S/b A/c no. 100180369536</option>
				<option  value="905511992" title="Induslnd A c No 100059799914">A02-01-05-01-014-Induslnd A c No 100059799914</option>
				<option  value="905512089" title="Bank Ac PnB A c No 1183005900001644">A02-01-05-01-012-Bank Ac PnB A c No 1183005900001644</option>
				<option  value="905512095" title="Utkarsh Bank  1376010000000084">A02-01-05-01-07-Utkarsh Bank  1376010000000084</option>
				<option  value="905512103" title="ICICI Bank Ltd   165101001252">A02-01-05-01-011-ICICI Bank Ltd   165101001252</option>
				<option  value="905512111" title="FD A C Utkarash Small Finance Bank">A02-01-05-01-01-FD A C Utkarash Small Finance Bank</option>
				<option  value="905512134" title="ICICI BANK LTD 165101001688 Link deposit">A02-01-05-01-019-ICICI BANK LTD 165101001688 Link deposit</option>
				<option  value="905512151" title="Icici Bank Collections A c No 103105003176">A02-01-05-01-015-Icici Bank Collections A c No 103105003176</option>
				<option  value="905512224" title="ICICI bank Link Deposit  165113013230">A02-01-05-01-27-ICICI bank Link Deposit  165113013230</option>
				<option  value="905512225" title="ICICI bank Link Deposit  165113013231">A02-01-05-01-26-ICICI bank Link Deposit  165113013231</option>
				<option  value="905512244" title="Axis Bank FDR">A02-01-05-01-41-Axis Bank FDR</option>
				<option  value="905512245" title="State Bank Of India Account no. 40181953796">A02-01-05-01-42-State Bank Of India Account no. 40181953796</option>
				<option  value="905512246" title="HDFC BANK LIMITED ACCOUNT NO. 50100442837630">A02-01-05-01-33-HDFC BANK LIMITED ACCOUNT NO. 50100442837630</option>
				<option  value="905512248" title="UJJIVAN SMALL FINANCE BANK 2349110110052778">A02-01-05-01-32-UJJIVAN SMALL FINANCE BANK 2349110110052778</option>
				<option  value="905512249" title="HDFC BANK LIMITED 50100204416075">A02-01-05-01-43-HDFC BANK LIMITED 50100204416075</option>
				<option  value="905512250" title="Kotak Mahindra Bank -5946149943">A02-01-05-01-44-Kotak Mahindra Bank -5946149943</option>
				<option  value="905512252" title="FD AC IDFC BANK">A02-01-05-01-023-FD AC IDFC BANK</option>
				<option  value="905512288" title="FD AC IDBI BANK">A02-01-05-01-025-FD AC IDBI BANK</option>
				<option  value="905512470" title="ICICI BANK LINK FD 165101001252">A02-01-05-01-018-ICICI BANK LINK FD 165101001252</option>
				<option  value="905512498" title="ICICI Bank Ltd   165105001570">A02-01-05-01-022-ICICI Bank Ltd   165105001570</option>
				<option  value="905512505" title="ICICI BANK LTD 165101001924 LINK DEPOSIT">A02-01-05-01-020-ICICI BANK LTD 165101001924 LINK DEPOSIT</option>
				<option  value="905512508" title="State Bank Of India A c no 38515901919">A02-01-05-01-021-State Bank Of India A c no 38515901919</option>
				<option  value="905512540" title="ICICI BANK Link Deposit 1688 (Deposit No.165113012506)">A02-01-05-01-28-ICICI BANK Link Deposit 1688 (Deposit No.165113012506)</option>
				<option  value="905512541" title="Induslnd A c No 100059799914 Flexi Deposit">A02-01-05-01-30-Induslnd A c No 100059799914 Flexi Deposit</option>
				<option  value="905512544" title="Equitas Small Finance Bank 100005082020">A02-01-05-01-29-Equitas Small Finance Bank 100005082020</option>
				<option  value="905512545" title="Axix bank Ltd S/B A/c no. 920010058084607">A02-01-05-01-40-Axix bank Ltd S/B A/c no. 920010058084607</option>
				<option  value="905512546" title="Indusind Bank S/b Account no. 100118467372">A02-01-05-01-31-Indusind Bank S/b Account no. 100118467372</option>
				<option  value="905512709" title="ICICI BANK 165101001688">A02-01-05-01-05-ICICI BANK 165101001688</option>
				<option  value="916815872" title="AU Small Finance Bank Ltd S/b Account no. 2301240349428290">A02-01-05-01-50-AU Small Finance Bank Ltd S/b Account no. 2301240349428290</option>
				<option  value="905512499" title="ICICI 165101001924">A02-01-05-01-017-ICICI 165101001924</option>
				<option  value="940670976" title="AU Small Finance Bank Ltd  FDR">A02-01-05-01-60-AU Small Finance Bank Ltd  FDR</option>
  </Form.Select>
	</td>
  </tr>
  </tr>
  </table>
  </tr>   
  </Col>
  </Row>
  <span/><br/>

  <Row sm={12}>
  <Col sm={4}>
  <tr>
  <table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
  <tr>
  <td nowrap align="right"><span class="required" style={{color:'red'}}>*</span><label>Date From :</label></td>
	<td nowrap>
	<input type="date" id="startDate" name="startDate" class="form-control"/>
  </td>
  <tr>
  </tr>
  </tr>
  </table>
  </tr>
  </Col>

  <Col sm={4}>
  <tr>
  <table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
  <tr>
  <td nowrap align="right"><span class="required" style={{color:'red'}}>*</span><label>Date To :</label></td>
	<td nowrap>
	<input type="date" id="startDate" name="startDate" class="form-control"/>
  </td>
  <tr>
  </tr>
  </tr>
  </table>
  </tr>  
  </Col>
      
  <Col sm={4}>
  <tr>
  <table class="forumline" width="100%" border="0" cellspacing="0" cellpadding="10">
  <tr>
  <td  align="right" nowrap width="45%"><label>Voucher Type:</label>
  </td>
	<td  align="left" width="50%">
  <Form.Select class="form-control" tabindex="-1" id="voucherType">
	<option value="" selected>Select</option>	  		
	<option  value="Receipt" title="Receipt">Receipt</option>
	<option  value="Payment" title="Payment">Payment</option>
	<option  value="Contra" title="Contra">Contra</option>
  </Form.Select>
	</td>
  <td>
	<a class="btn btn-primary" href="javaScript:getVoucherTransactions();" style={{color : 'white'}}>Filter</a>	
	</td>
  </tr>
  </table>
  </tr>   
  </Col>
  </Row>

  <snap/><br/>

  <Row>
  <Col sm={8}>
  <tr>
							 		<td align="right" nowrap><label >Payment Mode:&nbsp;</label></td>
	            					<td colspan="3">	
	            						<span  ng-controller="cashBookController" ng-cloak ng-init="init()">
	            							<label class="radio-inline radio-success" ng-repeat="payIns in payModeColl"><input type="radio" name="paymentInstrument" id="paymentInstrument{{payIns.value}}" value="{{payIns.value}}" ng-model="paymentType"/></label>
						    	    		<label class="radio-inline radio-success">Cash<input type="radio" name="paymentInstrument" id="paymentInstrumentAll" value="ALL" ng-model="paymentType"/></label>
						    	    	</span>
					    	    	</td>
                      <td colspan="3">	
	            						
						    	    		<label class="radio-inline radio-success">Cheque/DD<input type="radio" name="paymentInstrument" id="paymentInstrumentAll" value="ALL" ng-model="paymentType"/></label>
						    	 
					    	    	</td>
                      <td colspan="3">	
	            						
						    	    		<label class="radio-inline radio-success">IMAP<input type="radio" name="paymentInstrument" id="paymentInstrumentAll" value="ALL" ng-model="paymentType"/></label>
						    	   
					    	    	</td>
                      <td colspan="3">	
	            						
						    	  <label class="radio-inline radio-success">NEFT<input type="radio" name="paymentInstrument" id="paymentInstrumentAll" value="ALL" ng-model="paymentType"/></label>
						    	 
					    	    </td>
                    <td colspan="3">	
	            						
						    	  <label class="radio-inline radio-success">RTGS<input type="radio" name="paymentInstrument" id="paymentInstrumentAll" value="ALL" ng-model="paymentType"/></label>
						    	 
					    	    </td>
                    <td colspan="3">	
						    	  <label class="radio-inline">ALL</label>
						    	   
					    	    	</td>
							 	</tr>

  </Col>
  </Row>
  </Container>
 





<CardFooter>© 2023 GMDA All rights reserved. Version: 4...</CardFooter>
</Card>
</form>
</div>
  

)
}

export default ChequeRegister;