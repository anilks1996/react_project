import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../serviceUrl/AxiosURL';



export const fetchCWMByReqEmployeeCode=createAsyncThunk("fetchCWMByReqEmployeeCode", async(data)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/cwm/byEmpCode/${data}`, {
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
export const fetchCWMByModelId=createAsyncThunk("fetchCWMByModelId", async(data)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/cwm/byModelId/${data}`, {
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
//For Inbox Item
export const findInboxWorkflowByEmployeeId=createAsyncThunk("findInboxWorkflowByEmployeeId", async(data)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/cwm/inbox/${data}`, {
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
//For Sent Item
export const findSentWorkflowByEmployeeId=createAsyncThunk("findSentWorkflowByEmployeeId", async(data)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/cwm/sent/${data}`, {
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
//For Draft Item
export const findDraftWorkflowByEmployeeId=createAsyncThunk("findDraftWorkflowByEmployeeId", async(data)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/cwm/draft/${data}`, {
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
//For Sent Item
export const findArchivedWorkflowByEmployeeId=createAsyncThunk("findArchivedWorkflowByEmployeeId", async(data)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/cwm/archived/${data}`, {
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
//For Next Employee
export const findNextEmployeeByEmployeeId=createAsyncThunk("findNextEmployeeByEmployeeId", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/cwm/nextEmployee/${id}`, {
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

//Voucher Workflow
export const findInboxVoucherWorkflowByEmployeeId=createAsyncThunk("findInboxVoucherWorkflowByEmployeeId", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/cwm/voucher/inbox/${data}`, {
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
//For Sent Item
export const findSentVoucherWorkflowByEmployeeId=createAsyncThunk("findSentVoucherWorkflowByEmployeeId", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/cwm/voucher/sent/${data}`, {
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
//For Draft Item
export const findDraftVoucherWorkflowByEmployeeId=createAsyncThunk("findDraftVoucherWorkflowByEmployeeId", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/cwm/voucher/draft/${data}`, {
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
//For Sent Item
export const findArchivedVoucherWorkflowByEmployeeId=createAsyncThunk("findArchivedVoucherWorkflowByEmployeeId", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/cwm/voucher/archived/${data}`, {
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



export const inboxEmployeeSlice = createSlice({
    name:"serviceRegisterSlice",
    initialState:{
        inboxItems:[],
        sentItems:[],
        draftItems:[],
        archivedItems:[],
        nextEmployee:[],
        reqGenerator:[],
        reqApprover:[],
        iloading: false,
        sloading: false,
        dloading: false,
        aloading: false,
        workflowModels:[],
        inboxVoucherItems:[],
        sentVoucherItems:[],
        draftVoucherItems:[],
        archivedVoucherItems:[],
        ivloading: false,
        svloading: false,
        dvloading: false,
        avloading: false,
        loading: false, 
        error : null, 
    },

    extraReducers : (builder)=>{
        //Showing Employees request
        builder.addCase(fetchCWMByReqEmployeeCode.pending, (state)=>{ state.loading=true; })
        builder.addCase(fetchCWMByReqEmployeeCode.fulfilled, (state, action)=>{
        state.loading=false; state.inboxEmployees=action.payload; state.error=''; })
        builder.addCase(fetchCWMByReqEmployeeCode.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
        
        builder.addCase(fetchCWMByModelId.pending, (state)=>{ state.loading=true; })
        builder.addCase(fetchCWMByModelId.fulfilled, (state, action)=>{
        state.loading=false; state.workflowModels=action.payload; state.error='';  })
        builder.addCase(fetchCWMByModelId.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
        //Showing Employees request in inbox
        builder.addCase(findInboxWorkflowByEmployeeId.pending, (state)=>{ state.iloading=true; })
        builder.addCase(findInboxWorkflowByEmployeeId.fulfilled, (state, action)=>{
        state.iloading=false; state.inboxItems=action.payload; })
        builder.addCase(findInboxWorkflowByEmployeeId.rejected, (state, action)=>{state.iloading=false; state.error=action.payload;  })
        
        //Showing Employees request in Sent Item
        builder.addCase(findSentWorkflowByEmployeeId.pending, (state)=>{ state.sloading=true; })
        builder.addCase(findSentWorkflowByEmployeeId.fulfilled, (state, action)=>{
        state.sloading=false; state.sentItems=action.payload; state.error=''; })
        builder.addCase(findSentWorkflowByEmployeeId.rejected, (state, action)=>{state.sloading=false; state.error=action.payload; })

        //Showing Employees request in Draft
        builder.addCase(findDraftWorkflowByEmployeeId.pending, (state)=>{ state.dloading=true; })
        builder.addCase(findDraftWorkflowByEmployeeId.fulfilled, (state, action)=>{
        state.dloading=false;  state.draftItems=action.payload; state.error='';  })
        builder.addCase(findDraftWorkflowByEmployeeId.rejected,  (state, action)=>{state.dloading=false; state.error=action.payload;})
        //Showing Employees request in Archived
        builder.addCase(findArchivedWorkflowByEmployeeId.pending, (state)=>{ state.aloading=true; })
        builder.addCase(findArchivedWorkflowByEmployeeId.fulfilled, (state, action)=>{
        state.aloading=false; state.archivedItems=action.payload;state.error='';})
        builder.addCase(findArchivedWorkflowByEmployeeId.rejected, (state, action)=>{state.aloading=false; state.error=action.payload;  })
        //Showing Next Employees
        builder.addCase(findNextEmployeeByEmployeeId.pending, (state)=>{ state.aloading=true; })
        builder.addCase(findNextEmployeeByEmployeeId.fulfilled, (state, action)=>{
        state.aloading=false;  state.nextEmployee=action.payload; state.error=''; })
        builder.addCase(findNextEmployeeByEmployeeId.rejected, (state, action)=>{state.aloading=false; state.error=action.payload; })
  
  //Voucher Workflow
        builder.addCase(findInboxVoucherWorkflowByEmployeeId.pending, (state)=>{ state.ivloading=true; })
        builder.addCase(findInboxVoucherWorkflowByEmployeeId.fulfilled, (state, action)=>{
        state.ivloading=false; state.inboxVoucherItems=action.payload; })
        builder.addCase(findInboxVoucherWorkflowByEmployeeId.rejected, (state, action)=>{state.ivloading=false; state.error=action.payload;  })
        
        //Showing Voucher request in Sent Item
        builder.addCase(findSentVoucherWorkflowByEmployeeId.pending, (state)=>{ state.svloading=true; })
        builder.addCase(findSentVoucherWorkflowByEmployeeId.fulfilled, (state, action)=>{
        state.svloading=false; state.sentVoucherItems=action.payload; state.error=''; })
        builder.addCase(findSentVoucherWorkflowByEmployeeId.rejected, (state, action)=>{state.svloading=false; state.error=action.payload; })

        //Showing Voucher request in Draft
        builder.addCase(findDraftVoucherWorkflowByEmployeeId.pending, (state)=>{ state.dvloading=true; })
        builder.addCase(findDraftVoucherWorkflowByEmployeeId.fulfilled, (state, action)=>{
        state.dvloading=false;  state.draftVoucherItems=action.payload; state.error='';  })
        builder.addCase(findDraftVoucherWorkflowByEmployeeId.rejected,  (state, action)=>{state.dvloading=false; state.error=action.payload;})
        //Showing Employees request in Archived
        builder.addCase(findArchivedVoucherWorkflowByEmployeeId.pending, (state)=>{ state.avloading=true; })
        builder.addCase(findArchivedVoucherWorkflowByEmployeeId.fulfilled, (state, action)=>{
        state.avloading=false; state.archivedVoucherItems=action.payload;state.error='';})
        builder.addCase(findArchivedVoucherWorkflowByEmployeeId.rejected, (state, action)=>{state.avloading=false; state.error=action.payload;  })
      

        
    }
})

export default inboxEmployeeSlice.reducer;