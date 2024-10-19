import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../../serviceUrl/AxiosURL';


export const createVoucherEntry = createAsyncThunk("createVoucherEntry", async (data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response1=await fetch(BASE_URL+"api/voucherEntry/create", {
    method:"POST",
    headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify(data)
  });
  try{
    const result=response1.json();
    return result;
  }catch(error){
    return rejectWithValue(error.response);
  }
});

export const showVoucherEntry=createAsyncThunk("showVoucherEntry", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/voucherEntry/", {
    method:"GET",
    headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  //const response=await fetch(BASE_URL+"employeeTypeList");
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
})

export const getTotalDrCrFromVoucher=createAsyncThunk("getTotalDrCrFromVoucher", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/voucherEntry/totalDrCr/${id}`, {
    method:"GET",
    headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  //const response=await fetch(BASE_URL+"employeeTypeList");
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
})

export const showVoucherEntryById=createAsyncThunk("showVoucherEntryById", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/voucherEntry/${id}`, {
      method:"GET",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    //const response=await fetch(BASE_URL+"employeeTypeList");
    try{
      const result=await response.json();
      return result;
    }catch(error){
      console.log(error);
    }
})

export const createVoucherTransaction = createAsyncThunk("createVoucherTransaction", async (data, {rejectWithValue})=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response2=await fetch(BASE_URL+"api/vt/create", {
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify(data)
    });
    try{
      const result=response2.json();
      return result;
    }catch(error){
      return rejectWithValue(error.response);
    }
  });

  export const showVTWithEmployeeByVoucherId=createAsyncThunk("showVTWithEmployeeByVoucherId", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/voucher/vt/emp/${id}`, {
      method:"GET",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    //const response=await fetch(BASE_URL+"employeeTypeList");
    try{
      const result=response.json();
      return result;
    }catch(error){
      console.log(error);
    }
})
export const showVTWithVendorByVoucherId=createAsyncThunk("showVTWithVendorByVoucherId", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/voucher/vt/vendor/${id}`, {
      method:"GET",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    //const response=await fetch(BASE_URL+"employeeTypeList");
    try{
      const result=response.json();
      return result;
    }catch(error){
      console.log(error);
    }
})
export const showVTWithOtherByVoucherId=createAsyncThunk("showVTWithOtherByVoucherId", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/voucher/vt/other/${id}`, {
      method:"GET",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    //const response=await fetch(BASE_URL+"employeeTypeList");
    try{
      const result=response.json();
      return result;
    }catch(error){
      console.log(error);
    }
})

export const showVoucherTransactionByVoucherId=createAsyncThunk("showVoucherTransactionByVoucherId", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/vt/voucher/${id}`, {
      method:"GET",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    //const response=await fetch(BASE_URL+"employeeTypeList");
    try{
      const result=response.json();
      return result;
    }catch(error){
      console.log(error);
    }
})

export const showVoucherTransactionById=createAsyncThunk("showVoucherTransactionById", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/vt/${id}`, {
      method:"GET",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    //const response=await fetch(BASE_URL+"employeeTypeList");
    try{
      const result=response.json();
      return result;
    }catch(error){
      console.log(error);
    }
})

export const deleteVoucherTransactionEntry = createAsyncThunk("deleteVoucherTransactionEntry", async(id)=>{
    //const response=await fetch(BASE_URL+`employeeTypeList/${id}`, {
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/vt/delete/${id}`, {
      method:"DELETE",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
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
export const editVoucherTransactionEntry = createAsyncThunk("editVoucherTransactionEntry", async(data)=>{
    //const response = await fetch(BASE_URL+`employeeTypeList/${data.id}`, {
    const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+`api/vt/edit/${data.id}`, {  
      method:"PUT",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify(data)
    })
    try{
      const result=response.json();
      return result;
    }catch(error){
      console.log(error);
    }
});

export const createAccChequeSplitup = createAsyncThunk("createAccChequeSplitup", async (data, {rejectWithValue})=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response3=await fetch(BASE_URL+"api/voucherEntry/cheque/create", {
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify(data)
    });
    try{
      const result=response3.json();
      return result;
    }catch(error){
      return rejectWithValue(error.response);
    }
  });

export const showAccChequeSplitupByVoucherId=createAsyncThunk("showAccChequeSplitupByVoucherId", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/voucherEntry/cheque/${id}`, {
      method:"GET",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    //const response=await fetch(BASE_URL+"employeeTypeList");
    try{
      const result=response.json();
      return result;
    }catch(error){
      console.log(error);
    }
})

export const deleteAccChequeSplitupEntry = createAsyncThunk("deleteAccChequeSplitupEntry", async(id)=>{
    //const response=await fetch(BASE_URL+`employeeTypeList/${id}`, {
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/voucherEntry/cheque/delete/${id}`, {
      method:"DELETE",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
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
export const editAccChequeSplitupEntry = createAsyncThunk("editAccChequeSplitupEntry", async(data)=>{
    //const response = await fetch(BASE_URL+`employeeTypeList/${data.id}`, {
    const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+`api/voucherEntry/cheque/edit/${data.id}`, {  
      method:"PUT",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify(data)
    })
    try{
      const result=response.json();
      return result;
    }catch(error){
      console.log(error);
    }
  });

export const createWorkflowModel = createAsyncThunk("createWorkflowModel", async (data, {rejectWithValue})=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response4=await fetch(BASE_URL+"api/voucherEntry/workflow/create", {
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify(data)
    });
    try{
      const result=response4.json();
      return result;
    }catch(error){
      return rejectWithValue(error.response);
    }
  });

export const showWorkflowModelByVoucherId=createAsyncThunk("showWorkflowModelByVoucherId", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/voucherEntry/workflows/${id}`, {
      method:"GET",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    //const response=await fetch(BASE_URL+"employeeTypeList");
    try{
      const result=response.json();
      return result;
    }catch(error){
      console.log(error);
    }
})

export const showWFMByVoucherId=createAsyncThunk("showWFMByVoucherId", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/voucherEntry/workflow/${id}`, {
    method:"GET",
    headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  //const response=await fetch(BASE_URL+"employeeTypeList");
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
})

export const populateVoucherNoColl=createAsyncThunk("populateVoucherNoColl", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/voucherEntry/voucherNoPopulate/${id}`, {
    method:"GET",
    headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  //const response=await fetch(BASE_URL+"employeeTypeList");
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
})

export const editWorkflowModel = createAsyncThunk("editWorkflowModel", async(data)=>{
    //const response = await fetch(BASE_URL+`employeeTypeList/${data.id}`, {
    const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+`api/voucherEntry/workflow/${data.id}`, {  
      method:"PUT",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify(data)
    })
    try{
      const result=response.json();
      return result;
    }catch(error){
      console.log(error);
    }
  });


export const deleteVoucherEntry = createAsyncThunk("deleteVoucherEntry", async(id)=>{
    //const response=await fetch(BASE_URL+`employeeTypeList/${id}`, {
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/voucherEntry/delete/${id}`, {
      method:"DELETE",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
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

export const editVoucherEntry = createAsyncThunk("editVoucherEntry", async(data)=>{
  //const response = await fetch(BASE_URL+`employeeTypeList/${data.id}`, {
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+`api/voucherEntry/edit/${data.id}`, {  
    method:"PUT",
    headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify(data)
  })
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
});

export const approveVoucherEntry = createAsyncThunk("approveVoucherEntry", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+`api/voucherEntry/approve/${data.id}`, {  
    method:"PUT",
    headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify(data)
  })
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
})

export const updateFinalizeVoucherEntry = createAsyncThunk("updateFinalizeVoucherEntry", async(data)=>{
  //const response = await fetch(BASE_URL+`employeeTypeList/${data.id}`, {
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+`api/voucherEntry/update/${data.id}`, {  
    method:"PUT",
    headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify(data)
  })
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
});

export const voucherEntrySlice = createSlice({name:"voucherEntrySlice",
  initialState:{
    voucher:[],
    voucherCD:[],
    vouchers:[],
    voucherList:[], 
    voucherTrxn:[],
    voucherTrxns:[],
    voucherTrxnList:[],
    chequeSplitup:[],
    chequeSplitups:[],
    workflows:[],
    workflow:[],
    vloading:false,
    vtloading:false,
    chsloading:false,
    wloading:false,
    loading:false,
    error : null, 
  },
    //For handling result in following ways-- (3 cases to handle state and action)
  extraReducers : (builder)=>{
//Voucher
    builder.addCase(createVoucherEntry.pending, (state)=>{state.vloading=true;})
    builder.addCase(createVoucherEntry.fulfilled, (state, action)=>{state.vloading=false; state.voucher=action.payload; state.error='';})
    builder.addCase(createVoucherEntry.rejected, (state, action)=>{state.vloading=false; state.voucher=action.payload; })

    builder.addCase(showVoucherEntryById.pending, (state)=>{state.vloading=true;})
    builder.addCase(showVoucherEntryById.fulfilled, (state, action)=>{state.vloading=false; state.voucher=action.payload; state.error='';})
    builder.addCase(showVoucherEntryById.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })

    builder.addCase(getTotalDrCrFromVoucher.pending, (state)=>{state.vloading=true;})
    builder.addCase(getTotalDrCrFromVoucher.fulfilled, (state, action)=>{state.vloading=false; state.voucherCD=action.payload; state.error='';})
    builder.addCase(getTotalDrCrFromVoucher.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
//VoucherTransaction
    builder.addCase(createVoucherTransaction.pending, (state)=>{state.vtloading=true;})
    builder.addCase(createVoucherTransaction.fulfilled, (state, action)=>{state.vtloading=false; state.voucherTrxns=action.payload; state.error='';})
    builder.addCase(createVoucherTransaction.rejected, (state, action)=>{state.vtloading=false; state.error=action.payload; })

    builder.addCase(showVoucherTransactionByVoucherId.pending, (state)=>{state.vtloading=true;})
    builder.addCase(showVoucherTransactionByVoucherId.fulfilled, (state, action)=>{state.vtloading=false; state.voucherTrxns=action.payload; state.error='';})
    builder.addCase(showVoucherTransactionByVoucherId.rejected, (state, action)=>{state.vtloading=false; state.error=action.payload; })
    
    builder.addCase(showVoucherTransactionById.pending, (state)=>{state.vtloading=true;})
    builder.addCase(showVoucherTransactionById.fulfilled, (state, action)=>{state.vtloading=false; state.voucherTrxn=action.payload; state.error='';})
    builder.addCase(showVoucherTransactionById.rejected, (state, action)=>{state.vtloading=false; state.error=action.payload; })
//with emp/vendor/other
    builder.addCase(showVTWithEmployeeByVoucherId.pending, (state)=>{state.vtloading=true;})
    builder.addCase(showVTWithEmployeeByVoucherId.fulfilled, (state, action)=>{state.vtloading=false; state.voucherTrxns=action.payload; state.error='';})
    builder.addCase(showVTWithEmployeeByVoucherId.rejected, (state, action)=>{state.vtloading=false; state.error=action.payload; })
    
    builder.addCase(showVTWithVendorByVoucherId.pending, (state)=>{state.vtloading=true;})
    builder.addCase(showVTWithVendorByVoucherId.fulfilled, (state, action)=>{state.vtloading=false; state.voucherTrxns=action.payload; state.error='';})
    builder.addCase(showVTWithVendorByVoucherId.rejected, (state, action)=>{state.vtloading=false; state.error=action.payload; })
    
    builder.addCase(showVTWithOtherByVoucherId.pending, (state)=>{state.vtloading=true;})
    builder.addCase(showVTWithOtherByVoucherId.fulfilled, (state, action)=>{state.vtloading=false; state.voucherTrxns=action.payload; state.error='';})
    builder.addCase(showVTWithOtherByVoucherId.rejected, (state, action)=>{state.vtloading=false; state.error=action.payload; })
//end with emp/vendor/other

    builder.addCase(editVoucherTransactionEntry.pending, (state)=>{state.vtloading=true;})
    builder.addCase(editVoucherTransactionEntry.fulfilled, (state, action)=>{state.vtloading=false; state.voucherTrxns=action.payload; state.error='';})
    builder.addCase(editVoucherTransactionEntry.rejected, (state, action)=>{state.vtloading=false; state.error=action.payload; })
    
    builder.addCase(deleteVoucherTransactionEntry.pending, (state)=>{state.vtloading=true;})
    builder.addCase(deleteVoucherTransactionEntry.fulfilled, (state, action)=>{state.vtloading=false; state.voucherTrxns=action.payload; state.error='';})
    builder.addCase(deleteVoucherTransactionEntry.rejected, (state, action)=>{state.vtloading=false; state.error=action.payload; })
//AccChequeSplitup
    builder.addCase(createAccChequeSplitup.pending, (state)=>{state.chsloading=true;})
    builder.addCase(createAccChequeSplitup.fulfilled, (state, action)=>{state.chsloading=false; state.chequeSplitups=action.payload; state.error=''; })
    builder.addCase(createAccChequeSplitup.rejected, (state, action)=>{state.chsloading=false; state.error=action.payload; })

    builder.addCase(showAccChequeSplitupByVoucherId.pending, (state)=>{state.chsloading=true;})
    builder.addCase(showAccChequeSplitupByVoucherId.fulfilled, (state, action)=>{state.chsloading=false; state.chequeSplitups=action.payload; state.error='';})
    builder.addCase(showAccChequeSplitupByVoucherId.rejected, (state, action)=>{state.chsloading=false; state.error=action.payload; })

    builder.addCase(editAccChequeSplitupEntry.pending, (state)=>{state.chsloading=true;})
    builder.addCase(editAccChequeSplitupEntry.fulfilled, (state, action)=>{state.chsloading=false; state.chequeSplitups=action.payload; state.error='';})
    builder.addCase(editAccChequeSplitupEntry.rejected, (state, action)=>{state.chsloading=false; state.error=action.payload; })
    builder.addCase(deleteAccChequeSplitupEntry.pending, (state)=>{state.chsloading=true;})
    builder.addCase(deleteAccChequeSplitupEntry.fulfilled, (state, action)=>{state.chsloading=false; state.chequeSplitups=action.payload; state.error='';})
    builder.addCase(deleteAccChequeSplitupEntry.rejected, (state, action)=>{state.chsloading=false; state.error=action.payload; })
//WorkflowModel
    builder.addCase(createWorkflowModel.pending, (state)=>{state.wloading=true;})
    builder.addCase(createWorkflowModel.fulfilled, (state, action)=>{state.wloading=false; state.workflow=action.payload; state.error=''; })
    builder.addCase(createWorkflowModel.rejected, (state, action)=>{state.wloading=false; state.error=action.payload; })

    builder.addCase(showWorkflowModelByVoucherId.pending, (state)=>{state.wloading=true;})
    builder.addCase(showWorkflowModelByVoucherId.fulfilled, (state, action)=>{state.wloading=false; state.workflows=action.payload; state.error='';})
    builder.addCase(showWorkflowModelByVoucherId.rejected, (state, action)=>{state.wloading=false; state.error=action.payload; })
    
    builder.addCase(showWFMByVoucherId.pending, (state)=>{state.wloading=true;})
    builder.addCase(showWFMByVoucherId.fulfilled, (state, action)=>{state.wloading=false; state.workflow=action.payload; state.error='';})
    builder.addCase(showWFMByVoucherId.rejected, (state, action)=>{state.wloading=false; state.error=action.payload; })

    builder.addCase(populateVoucherNoColl.pending, (state)=>{state.vloading=true;})
    builder.addCase(populateVoucherNoColl.fulfilled, (state, action)=>{state.vloading=false; state.vouchers=action.payload; state.error='';})
    builder.addCase(populateVoucherNoColl.rejected, (state, action)=>{state.vloading=false; state.error=action.payload; })

    builder.addCase(editWorkflowModel.pending, (state)=>{state.wloading=true;})
    builder.addCase(editWorkflowModel.fulfilled, (state, action)=>{state.wloading=false; state.workflow=action.payload; state.error='';})
    builder.addCase(editWorkflowModel.rejected, (state, action)=>{state.wloading=false; state.error=action.payload; })

//Edit/Delete VoucherEntry
    builder.addCase(deleteVoucherEntry.pending, (state)=>{state.vloading=true;})
    builder.addCase(deleteVoucherEntry.fulfilled, (state, action)=>{state.vloading=false; state.voucher=action.payload; state.error='';})
    builder.addCase(deleteVoucherEntry.rejected, (state, action)=>{state.vloading=false; state.error=action.payload; })

    builder.addCase(editVoucherEntry.pending, (state)=>{state.vloading=true;})
    builder.addCase(editVoucherEntry.fulfilled, (state, action)=>{state.vloading=false; state.voucher=action.payload; state.error='';})
    builder.addCase(editVoucherEntry.rejected, (state, action)=>{state.vloading=false; state.error=action.payload; })
    
    builder.addCase(updateFinalizeVoucherEntry.pending, (state)=>{state.vloading=true;})
    builder.addCase(updateFinalizeVoucherEntry.fulfilled, (state, action)=>{state.vloading=false; state.voucher=action.payload; state.error='';})
    builder.addCase(updateFinalizeVoucherEntry.rejected, (state, action)=>{state.vloading=false; state.error=action.payload; })
     
    builder.addCase(approveVoucherEntry.pending, (state)=>{state.vloading=true;})
    builder.addCase(approveVoucherEntry.fulfilled, (state, action)=>{state.vloading=false; state.voucher=action.payload; state.error='';})
    builder.addCase(approveVoucherEntry.rejected, (state, action)=>{state.vloading=false; state.error=action.payload; })
    

   
  }
  
});

export default voucherEntrySlice.reducer;
