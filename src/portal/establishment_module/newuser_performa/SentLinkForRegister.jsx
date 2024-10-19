import React, { useEffect } from 'react'
import { CardBody, Container, Spinner, Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { showUserBookmarkByModelType } from '../establishment_redux/slices/establishment_slice/institutionSlice';


const SentLinkForRegister = () => {
    const goback=()=>{
        window.history.back();
    }
    const {userBookmarks,loading} = useSelector((state)=>state.allstorereducer.org);
    const dispatch=useDispatch();

    useEffect(()=>{
      window.scrollTo({top:'0', left:'0', behavior:'smooth'});
      dispatch(showUserBookmarkByModelType("69"));
    }, []);

    if(loading){
      <Spinner></Spinner>
    }
   
  return (
    <div>
      <Container>
        <label>Link Sent</label>
        
              {userBookmarks.length>0?                       
                <CardBody className='form-shadow' style={{minWidth:'70rem'}}>
                    <Table striped>
                        <thead>
                          <tr>
                            <th scope='row'>#</th>
                            <th scope='row'>Email Id</th>
                            <th scope='row'>Details</th>                      
                            <th scope='row'>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {
                          userBookmarks && userBookmarks.map((ele,index)=>(
                            <tr key={ele.id}>     
                              <td style={{width:'5%'}}>{index+1}</td>                               
                              <td style={{width:'60%'}}>  {ele.url} {"    "}                                                                  
                              </td>
                              <td style={{width:'25%'}}>{ele.displayName}
                                
                              </td>
                              <td style={{width:'25%'}}>                               
                                  
                              </td>
                            </tr>
                          ))
                        }                      
                        </tbody>
                    </Table>
                </CardBody>
              :
                <p>No data available</p>
              }            
      </Container>
    </div>
  )
}

export default SentLinkForRegister;
