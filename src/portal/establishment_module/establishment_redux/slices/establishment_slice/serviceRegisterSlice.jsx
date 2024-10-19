import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../../serviceUrl/AxiosURL';

export const createServiceRegister=createAsyncThunk("createServiceRegister", async(data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/serviceRegister/create/",{
    method:"POST",
        headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
        body:JSON.stringify(data)
    });
    try{
        const result=response.json();
        return result;
    }catch(error){
        return rejectWithValue(error.response);
    }   
})

export const createPromotionWithIncrement=createAsyncThunk("createPromotionWithIncrement",async(data,{rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");  
  const response=await fetch(BASE_URL+"api/serviceRegister/createPromotionwithIncrement/",{
        method:"POST",
        headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
        body:JSON.stringify(data)
    });
    try {
        const result=response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error.response);
    }
})

export const createTerminationService=createAsyncThunk("createTerminationService", async(data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/serviceRegister/createTermination/",{
  method:"POST",
      headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify(data)
  });
  try{
      const result=response.json();
      return result;
  }catch(error){
      return rejectWithValue(error.response);
  }   
})

export const updateServiceRegister=createAsyncThunk("updateServiceRegister", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");  
  const response=await fetch(BASE_URL+`api/serviceRegister/update/${data.id}`,{
    method:"PUT",
        headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
        body:JSON.stringify(data)
    });
    try{
        const result=response.json();
        return result;
    }catch(error){
        console.log(error.response);
    }   
})

export const editTerminationSR=createAsyncThunk("editTerminationSR", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/serviceRegister/editTermination/${data.id}`,{
  method:"PUT",
      headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify(data)
  });
  try{
      const result=response.json();
      return result;
  }catch(error){
      console.log(error.response);
  }   
})

export const showServiceRegistersByStatus=createAsyncThunk("showServiceRegistersByStatus", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/serviceRegister/listbystatus/${data}`,{
    method:"GET",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
})
export const showServiceRegisterById=createAsyncThunk("showServiceRegisterById", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/serviceRegister/bysrId/${id}`,{
    method:"GET",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
})
export const showServiceRegistersByTypesStatus=createAsyncThunk("showServiceRegistersByTypesStatus", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/serviceRegister/listByTypesStatus/",{
    method:"POST",
        headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
        body:JSON.stringify(data)
    });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
})
export const showPromotionApprovalList=createAsyncThunk("showPromotionApprovalList", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/serviceRegister/listByPromotion/",{
    method:"POST",
        headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
        body:JSON.stringify(data)
    });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
})
export const showServiceRegistersByEmployeeId=createAsyncThunk("showServiceRegistersByEmployeeId", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/serviceRegister/listByEmpId/${id}`,{
    method:"GET",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
})
//Show Service Register Employee workwise
export const getJoiningCollSR=createAsyncThunk("getJoiningCollSR", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/serviceRegister/joining/${id}`,{
    method:"GET",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
})
export const getPromotionCollSR=createAsyncThunk("getPromotionCollSR", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/serviceRegister/promotion/${id}`,{
    method:"GET",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
})
export const getTansferCollSR=createAsyncThunk("getTansferCollSR", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/serviceRegister/transfer/${id}`,{
    method:"GET",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
})
export const getIncrementCollSR=createAsyncThunk("getIncrementCollSR", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/serviceRegister/increment/${id}`,{
    method:"GET",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
})
export const getTerminationCollSR=createAsyncThunk("getTerminationCollSR", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/serviceRegister/termination/${id}`,{
    method:"GET",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
})
export const getDeputationListSR=createAsyncThunk("getDeputationListSR", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/serviceRegister/deputation/${id}`,{
    method:"GET",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
})
export const getJobLocationListSR=createAsyncThunk("getJobLocationListSR", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/serviceRegister/jobLocation/${id}`,{
    method:"GET",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
})
//

export const serviceRegisterSlice = createSlice({
    name:"serviceRegisterSlice",
    initialState:{
        serviceRegisters:[],
        serviceRegister:[],
        srjoinings:[],
        srpromotions:[],
        srtransfers:[],
        srincrements:[],
        srterminations:[],
        srdeputations:[],
        srjoblocations:[],
        srloading: false, 
        error : null, 
    },

    extraReducers : (builder)=>{
       //Create Service register
        builder.addCase(createServiceRegister.pending, (state)=>{ state.srloading=true; })
        builder.addCase(createServiceRegister.fulfilled, (state, action)=>{
        state.srloading=false;
        state.serviceRegister=action.payload;
        state.error='';
        })
        builder.addCase(createServiceRegister.rejected, (state, action)=>{ state.srloading=false; state.error=action.payload; })       
        //Create Service register
        builder.addCase(createPromotionWithIncrement.pending, (state)=>{ state.srloading=true; })
        builder.addCase(createPromotionWithIncrement.fulfilled, (state, action)=>{
        state.srloading=false;
        state.serviceRegister=action.payload;
        state.error='';
        })
        builder.addCase(createPromotionWithIncrement.rejected, (state, action)=>{ state.srloading=false; state.error=action.payload; })      
        //Create Termination Service register
        builder.addCase(createTerminationService.pending, (state)=>{ state.srloading=true; })
        builder.addCase(createTerminationService.fulfilled, (state, action)=>{
        state.srloading=false;
        state.serviceRegister=action.payload;
        state.error='';
        })
        builder.addCase(createTerminationService.rejected, (state, action)=>{ state.srloading=false; state.error=action.payload; })      
        
        //Update Service register
        builder.addCase(updateServiceRegister.pending, (state)=>{ state.srloading=true; })
        builder.addCase(updateServiceRegister.fulfilled, (state, action)=>{
        state.srloading=false
        state.serviceRegister=action.payload
        state.error=''
        })
        builder.addCase(updateServiceRegister.rejected, (state, action)=>{state.srloading=false; state.error=action.payload; })
        //update User register
        builder.addCase(showServiceRegisterById.pending, (state)=>{ state.srloading=true; })
        builder.addCase(showServiceRegisterById.fulfilled, (state, action)=>{
        state.srloading=false
        state.serviceRegister=action.payload
        state.error=''
        })
        builder.addCase(showServiceRegisterById.rejected, (state, action)=>{
        state.srloading=false
        state.error=action.payload
        })
        //edit Termination SR
        builder.addCase(editTerminationSR.pending, (state)=>{ state.srloading=true; })
        builder.addCase(editTerminationSR.fulfilled, (state, action)=>{
        state.srloading=false
        state.serviceRegister=action.payload
        state.error=''
        })
        builder.addCase(editTerminationSR.rejected, (state, action)=>{
        state.srloading=false
        state.error=action.payload
        })
        //Show User pending register
        builder.addCase(showServiceRegistersByEmployeeId.pending, (state)=>{ state.srloading=true; })
        builder.addCase(showServiceRegistersByEmployeeId.fulfilled, (state, action)=>{
        state.srloading=false
        state.serviceRegisters=action.payload
        state.error=''
        })
        builder.addCase(showServiceRegistersByEmployeeId.rejected, (state, action)=>{
        state.srloading=false
        state.error=action.payload
        })
        //Show User Approved register
        builder.addCase(showServiceRegistersByStatus.pending, (state)=>{ state.srloading=true; })
        builder.addCase(showServiceRegistersByStatus.fulfilled, (state, action)=>{
        state.srloading=false
        state.serviceRegisters=action.payload
        state.error=''
        })
        builder.addCase(showServiceRegistersByStatus.rejected, (state, action)=>{
        state.srloading=false
        state.error=action.payload
        })
        //Show Termination list register showServiceRegistersByTypesStatus
        builder.addCase(showServiceRegistersByTypesStatus.pending, (state)=>{ state.srloading=true; })
        builder.addCase(showServiceRegistersByTypesStatus.fulfilled, (state, action)=>{
        state.srloading=false
        state.serviceRegisters=action.payload
        state.error=''
        })
        builder.addCase(showServiceRegistersByTypesStatus.rejected, (state, action)=>{
        state.srloading=false
        state.error=action.payload
        })
        //Show Promotion Approval list register 
        builder.addCase(showPromotionApprovalList.pending, (state)=>{ state.srloading=true; })
        builder.addCase(showPromotionApprovalList.fulfilled, (state, action)=>{
        state.srloading=false
        state.serviceRegisters=action.payload
        state.error=''
        })
        builder.addCase(showPromotionApprovalList.rejected, (state, action)=>{
        state.srloading=false
        state.error=action.payload
        })
        //Showing Servivce Register Workwise
        builder.addCase(getJoiningCollSR.pending, (state)=>{ state.srloading=true; })
        builder.addCase(getJoiningCollSR.fulfilled, (state, action)=>{
        state.srloading=false; state.srjoinings=action.payload; state.error=''
        })
        builder.addCase(getJoiningCollSR.rejected, (state, action)=>{
        state.srloading=false; state.error=action.payload;
        })
        //end
        builder.addCase(getPromotionCollSR.pending, (state)=>{ state.srloading=true; })
        builder.addCase(getPromotionCollSR.fulfilled, (state, action)=>{
        state.srloading=false; state.srpromotions=action.payload; state.error=''
        })
        builder.addCase(getPromotionCollSR.rejected, (state, action)=>{
        state.srloading=false; state.error=action.payload;
        })
        //end
        builder.addCase(getTansferCollSR.pending, (state)=>{ state.srloading=true; })
        builder.addCase(getTansferCollSR.fulfilled, (state, action)=>{
        state.srloading=false; state.srtransfers=action.payload; state.error=''
        })
        builder.addCase(getTansferCollSR.rejected, (state, action)=>{
        state.srloading=false; state.error=action.payload;
        })
        //end
        builder.addCase(getIncrementCollSR.pending, (state)=>{ state.srloading=true; })
        builder.addCase(getIncrementCollSR.fulfilled, (state, action)=>{
        state.srloading=false; state.srincrements=action.payload; state.error=''
        })
        builder.addCase(getIncrementCollSR.rejected, (state, action)=>{
        state.srloading=false; state.error=action.payload;
        })
        //end
        builder.addCase(getTerminationCollSR.pending, (state)=>{ state.srloading=true; })
        builder.addCase(getTerminationCollSR.fulfilled, (state, action)=>{
        state.srloading=false; state.srterminations=action.payload; state.error=''
        })
        builder.addCase(getTerminationCollSR.rejected, (state, action)=>{
        state.srloading=false; state.error=action.payload;
        })
        //end
        builder.addCase(getDeputationListSR.pending, (state)=>{ state.srloading=true; })
        builder.addCase(getDeputationListSR.fulfilled, (state, action)=>{
        state.srloading=false; state.srdeputations=action.payload; state.error=''
        })
        builder.addCase(getDeputationListSR.rejected, (state, action)=>{
        state.srloading=false; state.error=action.payload;
        })
        //end
        builder.addCase(getJobLocationListSR.pending, (state)=>{ state.srloading=true; })
        builder.addCase(getJobLocationListSR.fulfilled, (state, action)=>{
        state.srloading=false; state.srjoblocations=action.payload; state.error=''
        })
        builder.addCase(getJobLocationListSR.rejected, (state, action)=>{
        state.srloading=false; state.error=action.payload;
        })
        //end

    }
})

export default serviceRegisterSlice.reducer;