import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../serviceUrl/AxiosURL';


//Work Flow Type
export const createWorkFlowType = createAsyncThunk("createWorkFlowType", async (data, {rejectWithValue})=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/wf/create/wftype/", {
      method:"POST",
      headers:{"Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify(data)
    });
    try{
      const result=response.json();
      return result;
    }catch(error){
      return rejectWithValue(error.response);
    }
});
export const deleteWorkFlowType = createAsyncThunk("deleteWorkFlowType", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/wf/delete/wftype/${id}`, {
      method:"DELETE",
      headers:{"Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
      const result=response.json();
      console.log("result==="+result)
      return result;
    }catch(error){
      console.log("error= "+error);
    }
  })
export const findWorkflowTypeById=createAsyncThunk("findWorkflowTypeById", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/wf/wftbyId/${id}`, {
    method:"GET",
    headers:{"Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
})
export const findAllWorkflowType=createAsyncThunk("findAllWorkflowType", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/wf/wftAll", {
      method:"GET",
      headers:{"Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
      const result=response.json();
      return result;
    }catch(error){
      //rejectWithValue(error.response);
    }
})
export const updateWorkflowType=createAsyncThunk("updateWorkflowType", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+`api/wf/update/${data.id}`, {  
    method:"PUT",
    headers:{"Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify(data)
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
})

//Work Flow Privilege
export const createWorkFlowPrivilege = createAsyncThunk("createWorkFlowPrivilege", async (data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/wf/create/wfp/", {
      method:"POST",
      headers:{"Authorization":`Bearer ${currentUser}`,"content-type":"application/json"},
      body:JSON.stringify(data)
    });
    try{
      const result=response.json();
      return result;
    }catch(error){
      return rejectWithValue(error.response);
    }
});
export const updateWorkFlowPrivilege=createAsyncThunk("updateWorkFlowPrivilege", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+`api/wf/update/wfp/${data.id}`, {  
    method:"PUT",
    headers:{"Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify(data)
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
})
export const deleteWorkFlowPrivilege = createAsyncThunk("deleteWorkFlowPrivilege", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/wf/delete/wfp/${id}`, {
      method:"DELETE",
      headers:{"Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
      const result=response.json();
      console.log("result==="+result)
      return result;
    }catch(error){
      console.log("error= "+error);
    }
  })
export const findWorkFlowPrivilegeById=createAsyncThunk("findWorkFlowPrivilegeById", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/wf/wfpbyId/${id}`, {
      method:"GET",
      headers:{"Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
})
export const findWorkFlowPrivilegeByEmployeeId=createAsyncThunk("findWorkFlowPrivilegeByEmployeeId", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/wf/wfpbyempId/${id}`, {
      method:"GET",
      headers:{"Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
      const result=response.json();
      return result;
    }catch(error){
      //rejectWithValue(error.response);
    }
})
export const findWorkFlowPrivilegeBywftId=createAsyncThunk("findWorkFlowPrivilegeBywftId", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/wf/wfpBywftId/${id}`, {
      method:"GET",
      headers:{"Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
      const result=response.json();
      return result;
    }catch(error){
      //rejectWithValue(error.response);
    }
})
export const findAllWorkFlowPrivilege=createAsyncThunk("findAllWorkFlowPrivilege", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/wf/wfpAll", {
      method:"GET",
      headers:{"Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
      const result=response.json();
      return result;
    }catch(error){
      //rejectWithValue(error.response);
    }
})

//AlertWorkFlow
export const createAlertWF = createAsyncThunk("createAlertWF", async (data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/wf/create/awf/", {
      method:"POST",
      headers:{"Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify(data)
    });
    try{
      const result=response.json();
      return result;
    }catch(error){
      return rejectWithValue(error.response);
    }
});
export const updateAlertWF=createAsyncThunk("updateAlertWF", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+`api/wf/update/awf/${data.id}`, {  
    method:"PUT",
    headers:{"Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify(data)
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
})
export const deleteAlertWF = createAsyncThunk("deleteAlertWF", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/wf/delete/awf/${id}`, {
      method:"DELETE",
      headers:{"Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
      const result=response.json();
      console.log("result==="+result)
      return result;
    }catch(error){
      console.log("error= "+error);
    }
  })
export const findAlertWFById=createAsyncThunk("findAlertWFById", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/wf/awfbyId/${id}`, {
      method:"GET",
      headers:{"Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
})
export const findAlertWFByName=createAsyncThunk("findAlertWFByName", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/wf/awfName/${data}`, {
      method:"GET",
      headers:{"Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
      const result=response.json();
      return result;
    }catch(error){
      //rejectWithValue(error.response);
    }
})
export const findAlertWFBywftId=createAsyncThunk("findAlertWFBywftId", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/wf/awfbywftId/${id}`, {
      method:"GET",
      headers:{"Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
      const result=response.json();
      return result;
    }catch(error){
      //rejectWithValue(error.response);
    }
})
export const findAllAlertWF=createAsyncThunk("findAllAlertWF", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/wf/awfAll", {
      method:"GET",
      headers:{"Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
      const result=response.json();
      return result;
    }catch(error){
      //rejectWithValue(error.response);
    }
})

export const isForwardRoleByempId=createAsyncThunk("isForwardRoleByempId", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/wf/forward/${id}`, {
    method:"GET",      
      headers: {'Authorization': `Bearer ${currentUser}`,
        'Content-Type': 'text/plain',
      },
  });
  try{
    const result=response.text();
    return result;
  }catch(error){
  }
})
export const isApprovalRoleByempId=createAsyncThunk("isApprovalRoleByempId", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/wf/approve/${id}`, {
    method:"GET",      
      headers: {'Authorization': `Bearer ${currentUser}`,
        'Content-Type': 'text/plain',
      },
  });
  try{
    const result=response.text();
    return result;
  }catch(error){
  }
})
export const isRejectRoleByempId=createAsyncThunk("isRejectRoleByempId", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/wf/reject/${id}`, {
    method:"GET",      
      headers: {'Authorization': `Bearer ${currentUser}`,
        'Content-Type': 'text/plain',
      },
  });
  try{
    const result=response.text();
    return result;
  }catch(error){
  }
})
export const isRejectPrivilegeByempId=createAsyncThunk("isRejectPrivilegeByempId", async({param1,param2})=>{
  const params = new URLSearchParams({param1,param2 }).toString();
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/wf/rejectpriv?${params}`, {
    method:"GET",      
      headers: {'Authorization': `Bearer ${currentUser}`,
        'Content-Type': 'text/plain',
      },
  });
  try{
    const result=response.text();
    return result;
  }catch(error){
  }
})
export const isApprovePrivilegeByempId=createAsyncThunk("isApprovePrivilegeByempId", async({param1,param2})=>{
  const params = new URLSearchParams({param1,param2 }).toString();
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/wf/approvepriv?${params}`, {
    method:"GET",      
      headers: {'Authorization': `Bearer ${currentUser}`,
        'Content-Type': 'text/plain',
      },
  });
  try{
    const result=response.text();
    return result;
  }catch(error){
  }
})
export const isForwardPrivilegeByempId=createAsyncThunk("isForwardPrivilegeByempId", async({param1,param2})=>{
  const params = new URLSearchParams({param1,param2 }).toString();
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/wf/forwardpriv?${params}`, {
    method:"GET",      
      headers: {'Authorization': `Bearer ${currentUser}`,
        'Content-Type': 'text/plain',
      },
  });
  try{
    const result=response.text();
    return result;
  }catch(error){
  }
})
//Approving Employees
export const findAllEmployeesInAReqWorkFlow=createAsyncThunk("findAllEmployeesInAReqWorkFlow", async({param1,param2})=>{
  const params = new URLSearchParams({param1,param2 }).toString();
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/leaveApp/nextEmployee?${params}`, {
    method:"GET",      
      headers: {"content-type":"application/json",'Authorization': `Bearer ${currentUser}`,
        'Content-Type': 'text/plain',
      },
      body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
  }
})
export const findAllEmployeesByWorkFlowName=createAsyncThunk("findAllEmployeesByWorkFlowName", async({param1,param2})=>{
  const params = new URLSearchParams({param1,param2 }).toString();
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/leaveApp/nextEmployeeBywfName?${params}`, {
    method:"GET",      
      headers: {'Authorization': `Bearer ${currentUser}`,"content-type":"application/json"},
      body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
  }
})

export const leaveUserFormApproval=createAsyncThunk("leaveUserFormApproval", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/leaveApp/approve/leaveApproval/`, {
      method:"POST",
      headers:{"Authorization":`Bearer ${currentUser}`,"content-type":"application/json"},
      body:JSON.stringify(data)
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
  }
})

//Request Generator
export const findRequestGeneratorByModelId=createAsyncThunk("findRequestGeneratorByModelId", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/cwm/reqGenerator/${id}`, {
    method:"GET",
    headers:{"Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
})
//Request Approver
export const findRequestApproverByModelId=createAsyncThunk("findRequestApproverByModelId", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/cwm/reqApprover/${id}`, {
    method:"GET",
    headers:{"Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
})



export const workFlowAlertSlice = createSlice({
    name:"workFlowAlertSlice",
    initialState:{
        workFlowTypes:[],
        alertWFs:[],
        workFlowPrivileges:[],
        workFlowType:[],
        alertWF:[],
        workFlowPrivilege:[],
        wftloading: false,
        wfploading: false,
        awfloading: false,
        loading: false, 
        isApprove:[],
        isForward:[],
        isReject:[],
        reqApproval:[],
        nextEmployees:[],
        error : null, 
    },

    extraReducers : (builder)=>{
        builder.addCase(isRejectPrivilegeByempId.pending, (state)=>{ state.awfloading=true; })
        builder.addCase(isRejectPrivilegeByempId.fulfilled, (state, action)=>{state.awfloading=false; state.isReject=action.payload; state.error='';})
        builder.addCase(isRejectPrivilegeByempId.rejected, (state, action)=>{state.awfloading=false; state.error=action.payload; })
        
        builder.addCase(isApprovePrivilegeByempId.pending, (state)=>{ state.awfloading=true; })
        builder.addCase(isApprovePrivilegeByempId.fulfilled, (state, action)=>{state.awfloading=false; state.isApprove=action.payload; state.error='';})
        builder.addCase(isApprovePrivilegeByempId.rejected, (state, action)=>{state.awfloading=false; state.error=action.payload; })
        
        builder.addCase(isForwardPrivilegeByempId.pending, (state)=>{ state.awfloading=true; })
        builder.addCase(isForwardPrivilegeByempId.fulfilled, (state, action)=>{state.awfloading=false; state.isForward=action.payload; state.error='';})
        builder.addCase(isForwardPrivilegeByempId.rejected, (state, action)=>{state.awfloading=false; state.error=action.payload; })
      //Req Approval  
        builder.addCase(leaveUserFormApproval.pending, (state)=>{ state.awfloading=true; })
        builder.addCase(leaveUserFormApproval.fulfilled, (state, action)=>{state.awfloading=false; state.reqApproval=action.payload; state.error='';})
        builder.addCase(leaveUserFormApproval.rejected, (state, action)=>{state.awfloading=false; state.error=action.payload; })
    //approving employees  
      builder.addCase(findAllEmployeesInAReqWorkFlow.pending, (state)=>{ state.awfloading=true; })
      builder.addCase(findAllEmployeesInAReqWorkFlow.fulfilled, (state, action)=>{state.awfloading=false; state.nextEmployees=action.payload; state.error='';})
      builder.addCase(findAllEmployeesInAReqWorkFlow.rejected, (state, action)=>{state.awfloading=false; state.error=action.payload; })
      
      builder.addCase(findAllEmployeesByWorkFlowName.pending, (state)=>{ state.awfloading=true; })
      builder.addCase(findAllEmployeesByWorkFlowName.fulfilled, (state, action)=>{state.awfloading=false; state.nextEmployees=action.payload; state.error='';})
      builder.addCase(findAllEmployeesByWorkFlowName.rejected, (state, action)=>{state.awfloading=false; state.error=action.payload; })
    //Approving employee


        //Alert Workflow
        builder.addCase(createAlertWF.pending, (state)=>{ state.awfloading=true; })
        builder.addCase(createAlertWF.fulfilled, (state, action)=>{
        state.awfloading=false
        state.alertWF=action.payload
        state.error=''
        })
        builder.addCase(createAlertWF.rejected, 
            (state, action)=>{state.awfloading=false; state.error=action.payload; 
        })
        builder.addCase(deleteAlertWF.pending, (state)=>{ state.awfloading=true; })
        builder.addCase(deleteAlertWF.fulfilled, (state, action)=>{
        state.awfloading=false
        state.alertWF=action.payload
        state.error=''
        })
        builder.addCase(deleteAlertWF.rejected, 
            (state, action)=>{state.awfloading=false; state.error=action.payload; 
        })//update
        builder.addCase(updateAlertWF.pending, (state)=>{ state.awfloading=true; })
        builder.addCase(updateAlertWF.fulfilled, (state, action)=>{
        state.awfloading=false
        state.alertWF=action.payload
        state.error=''
        })
        builder.addCase(updateAlertWF.rejected, 
            (state, action)=>{state.awfloading=false; state.error=action.payload; 
        })//by Id
        builder.addCase(findAlertWFById.pending, (state)=>{ state.awfloading=true; })
        builder.addCase(findAlertWFById.fulfilled, (state, action)=>{
        state.awfloading=false
        state.alertWF=action.payload
        state.error=''
        })
        builder.addCase(findAlertWFById.rejected, 
            (state, action)=>{state.awfloading=false; state.error=action.payload; 
        })
        builder.addCase(findAlertWFByName.pending, (state)=>{ state.awfloading=true; })
        builder.addCase(findAlertWFByName.fulfilled, (state, action)=>{
        state.awfloading=false
        state.alertWF=action.payload
        state.error=''
        })
        builder.addCase(findAlertWFByName.rejected, 
            (state, action)=>{state.awfloading=false; state.error=action.payload; 
        })
        builder.addCase(findAlertWFBywftId.pending, (state)=>{ state.awfloading=true; })
        builder.addCase(findAlertWFBywftId.fulfilled, (state, action)=>{
        state.awfloading=false
        state.alertWFs=action.payload
        state.error=''
        })
        builder.addCase(findAlertWFBywftId.rejected, 
            (state, action)=>{state.awfloading=false; state.error=action.payload; 
        })
        //All
        builder.addCase(findAllAlertWF.pending, (state)=>{ state.awfloading=true; })
        builder.addCase(findAllAlertWF.fulfilled, (state, action)=>{
        state.awfloading=false
        state.alertWFs=action.payload
        state.error=''
        })
        builder.addCase(findAllAlertWF.rejected, 
            (state, action)=>{state.awfloading=false; state.error=action.payload; 
        })
        
        //WorkFlowPrivilege
        builder.addCase(createWorkFlowPrivilege.pending, (state)=>{ state.wfploading=true; })
        builder.addCase(createWorkFlowPrivilege.fulfilled, (state, action)=>{
        state.wfploading=false
        state.workFlowPrivilege=action.payload
        state.error=''
        })
        builder.addCase(createWorkFlowPrivilege.rejected, 
            (state, action)=>{state.wfploading=false; state.error=action.payload; 
        })
        builder.addCase(deleteWorkFlowPrivilege.pending, (state)=>{ state.wfploading=true; })
        builder.addCase(deleteWorkFlowPrivilege.fulfilled, (state, action)=>{
        state.wfploading=false
        state.workFlowPrivilege=action.payload
        state.error=''
        })
        builder.addCase(deleteWorkFlowPrivilege.rejected, 
            (state, action)=>{state.wfploading=false; state.error=action.payload; 
        })//update
        builder.addCase(updateWorkFlowPrivilege.pending, (state)=>{ state.wfploading=true; })
        builder.addCase(updateWorkFlowPrivilege.fulfilled, (state, action)=>{
        state.wfploading=false
        state.workFlowPrivilege=action.payload
        state.error=''
        })
        builder.addCase(updateWorkFlowPrivilege.rejected, 
            (state, action)=>{state.wfploading=false; state.error=action.payload; 
        })//by Id
        builder.addCase(findWorkFlowPrivilegeById.pending, (state)=>{ state.wfploading=true; })
        builder.addCase(findWorkFlowPrivilegeById.fulfilled, (state, action)=>{
        state.wfploading=false
        state.workFlowPrivilege=action.payload
        state.error=''
        })
        builder.addCase(findWorkFlowPrivilegeById.rejected, 
            (state, action)=>{state.wfploading=false; state.error=action.payload; 
        })
        builder.addCase(findWorkFlowPrivilegeByEmployeeId.pending, (state)=>{ state.wfploading=true; })
        builder.addCase(findWorkFlowPrivilegeByEmployeeId.fulfilled, (state, action)=>{
        state.wfploading=false
        state.workFlowPrivileges=action.payload
        state.error=''
        })
        builder.addCase(findWorkFlowPrivilegeByEmployeeId.rejected, 
            (state, action)=>{state.wfploading=false; state.error=action.payload; 
        })
        builder.addCase(findWorkFlowPrivilegeBywftId.pending, (state)=>{ state.wfploading=true; })
        builder.addCase(findWorkFlowPrivilegeBywftId.fulfilled, (state, action)=>{
        state.wfploading=false
        state.workFlowPrivileges=action.payload
        state.error=''
        })
        builder.addCase(findWorkFlowPrivilegeBywftId.rejected, 
            (state, action)=>{state.wfploading=false; state.error=action.payload; 
        })
        //All
        builder.addCase(findAllWorkFlowPrivilege.pending, (state)=>{ state.wfploading=true; })
        builder.addCase(findAllWorkFlowPrivilege.fulfilled, (state, action)=>{
        state.wfploading=false
        state.workFlowPrivileges=action.payload
        console.log("WorkFlowPrivilege===="+action.payload)
        state.error=''
        })
        builder.addCase(findAllWorkFlowPrivilege.rejected, 
            (state, action)=>{state.wfploading=false; state.error=action.payload; 
        })

        //WorkFlowType
        builder.addCase(createWorkFlowType.pending, (state)=>{ state.wftloading=true; })
        builder.addCase(createWorkFlowType.fulfilled, (state, action)=>{
        state.wftloading=false
        state.workFlowType=action.payload
        state.error=''
        })
        builder.addCase(createWorkFlowType.rejected, 
            (state, action)=>{state.wftloading=false; state.error=action.payload; 
        })
        builder.addCase(deleteWorkFlowType.pending, (state)=>{ state.wftloading=true; })
        builder.addCase(deleteWorkFlowType.fulfilled, (state, action)=>{
        state.wftloading=false
        state.workFlowType=action.payload
        state.error=''
        })
        builder.addCase(deleteWorkFlowType.rejected, 
            (state, action)=>{state.wftloading=false; state.error=action.payload; 
        })//update
        builder.addCase(updateWorkflowType.pending, (state)=>{ state.wftloading=true; })
        builder.addCase(updateWorkflowType.fulfilled, (state, action)=>{
        state.wftloading=false
        state.workFlowType=action.payload
        state.error=''
        })
        builder.addCase(updateWorkflowType.rejected, 
            (state, action)=>{state.wftloading=false; state.error=action.payload; 
        })//by Id
        builder.addCase(findWorkflowTypeById.pending, (state)=>{ state.wftloading=true; })
        builder.addCase(findWorkflowTypeById.fulfilled, (state, action)=>{
        state.wftloading=false
        state.workFlowType=action.payload
        state.error=''
        })
        builder.addCase(findWorkflowTypeById.rejected, 
            (state, action)=>{state.wftloading=false; state.error=action.payload; 
        })//All
        builder.addCase(findAllWorkflowType.pending, (state)=>{ state.wftloading=true; })
        builder.addCase(findAllWorkflowType.fulfilled, (state, action)=>{
        state.wftloading=false
        state.workFlowTypes=action.payload
        state.error=''
        })
        builder.addCase(findAllWorkflowType.rejected, 
            (state, action)=>{state.wftloading=false; state.error=action.payload; 
        })
        //Privileges Approve/Reject
        builder.addCase(isApprovalRoleByempId.pending, (state)=>{ state.loading=true; })
        builder.addCase(isApprovalRoleByempId.fulfilled, (state, action)=>{state.loading=false; state.isApprove=action.payload; console.log("isApprove = "+action.payload); state.error=''; })
        builder.addCase(isApprovalRoleByempId.rejected, (state, action)=>{state.loading=false; state.error=action.payload; console.log("isApprove = "+action.payload);})
        //Privileges Forward/Recommend
        builder.addCase(isForwardRoleByempId.pending, (state)=>{ state.loading=true; })
        builder.addCase(isForwardRoleByempId.fulfilled, (state, action)=>{state.loading=false; state.isForward=action.payload;  state.error=''; })
        builder.addCase(isForwardRoleByempId.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
        //Reject
        builder.addCase(isRejectRoleByempId.pending, (state)=>{ state.loading=true; })
        builder.addCase(isRejectRoleByempId.fulfilled, (state, action)=>{state.loading=false; state.isReject=action.payload;  state.error=''; })
        builder.addCase(isRejectRoleByempId.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
        
        //Req Generator
        builder.addCase(findRequestGeneratorByModelId.pending, (state)=>{ state.loading=true; })
        builder.addCase(findRequestGeneratorByModelId.fulfilled, (state, action)=>{state.loading=false; state.reqGenerator=action.payload;state.error='';})
        builder.addCase(findRequestGeneratorByModelId.rejected, (state, action)=>{state.loading=false; state.error=action.payload;  })
        //Req Approver
        builder.addCase(findRequestApproverByModelId.pending, (state)=>{ state.loading=true; })
        builder.addCase(findRequestApproverByModelId.fulfilled, (state, action)=>{state.loading=false; state.reqApprover=action.payload;state.error='';})
        builder.addCase(findRequestApproverByModelId.rejected, (state, action)=>{state.loading=false; state.error=action.payload;  })



    }
})

export default workFlowAlertSlice.reducer;