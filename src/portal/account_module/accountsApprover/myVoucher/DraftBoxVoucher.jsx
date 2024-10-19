import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardFooter, CardHeader, Col, Row, Spinner, Table } from 'reactstrap';
import { findDraftVoucherWorkflowByEmployeeId } from '../../../employeeusr_module/inboxEmployeeSlice';
import DateDisplay from '../../../employeeusr_module/DateDisplay';
import { Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { createVoucherEntry, deleteVoucherEntry, showVoucherEntryById } from '../../accounts_redux/slices/accounts_approver_slice/voucherEntrySlice';

const DraftBoxVoucher = () => {
    const {activeUserId,userLoading} = useSelector((state)=>state.allstorereducer.user_token);
    const {inboxEmployees,draftVoucherItems,dvloading} = useSelector((state)=>state.allstorereducer.inboxEmployee);
    const {voucher,vloading}=useSelector((state)=>state.allstorereducer.voucherEntry);
    const dispatch=useDispatch();
    const [userToken,setUserToken]=React.useState('');
    const navigatePage=useNavigate();

    useEffect(()=>{
        window.scrollTo({top:'0', left:'0', behavior:'smooth'});
          
        const uToken = localStorage.getItem('user-token');
        if(uToken!=null && uToken!=""){
            setUserToken(uToken);
        }
        dispatch(findDraftVoucherWorkflowByEmployeeId(activeUserId));
        dispatch(createVoucherEntry("voucher"));

    },[]);

    function getFormattedDate(date) {
        if(date.getFullYear()!=1970){
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
          const day = String(date.getDate()).padStart(2, '0'); // Adding leading zero if needed
          return `${day}-${month}-${year}`;
        }
    }
    const editVoucher=(e,voucherid)=>{
        //dispatch(showVoucherEntryById(voucherid));
        //alert("edit Voucher Id = "+voucherid);
        navigatePage(`/createVoucherSteps/${voucherid}/${'Draft'}`);
    }
    const deleteVoucher=(e,vouId)=>{
        //alert("Voucher Id="+e.target.value+", id="+vouId);
        if(window.confirm("Are you sure to delete?")){
            dispatch(deleteVoucherEntry(vouId));
            dispatch(findDraftVoucherWorkflowByEmployeeId(activeUserId));
            navigatePage("/myVoucherInbox");
        }
        
    }   
  return (
    <div>
        <Card className='mt-0' style={{width:'74rem', fontSize:'0.85rem',marginLeft:'0.5rem',fontStyle:'serif'}}>
            <CardHeader>Draft Vouchers</CardHeader>
            <CardBody>
            {
            dvloading===true?
                <Row>
                    <Col width={6}></Col>
                    <Col width={3}>Loading... <Spinner style={{color:'brown'}}/></Col>
                    <Col width={3}></Col>                                
                </Row>
                :
                <Table striped>
                    <thead>
                        <tr>
                            <th>Draft</th>
                            <th>Status</th>
                            <th>Voucher</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            draftVoucherItems && draftVoucherItems.map((item)=>(
                                <tr>                                    
                                    <td>{item && item.modifiedBy} </td>
                                    <td>{item && item.status} </td>
                                    <td>Voucher {" "}<strong>[ <i style={{color:'blue'}}>(Date:{getFormattedDate(new Date(item && item.voucherDate))}</i>){" "} {item && item.voucherNo}]</strong> {" "}{"... "}
                                    <button name={item.id} style={{color:'green',width:'auto',border:'none'}} onClick={(e)=>{editVoucher(e,item.id)}}> <Edit /></button>{" "} 
                                    {" "}<button style={{color:'red',width:'auto',border:'none'}} onClick={(e)=>{deleteVoucher(e,item.id)}}><Delete /></button> </td>
                                    <td><DateDisplay date={new Date(item && item.modifiedDate)}  /> </td>                                                                         
                                 </tr> 
                             ))
                        }
                    </tbody>
                </Table>
            }
            </CardBody>
            <CardFooter>Welcome</CardFooter>
        </Card>
    </div>
  )
}

export default DraftBoxVoucher;