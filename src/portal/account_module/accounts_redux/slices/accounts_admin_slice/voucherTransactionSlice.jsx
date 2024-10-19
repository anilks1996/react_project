import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../../serviceUrl/AxiosURL';


export const findVTById=createAsyncThunk("findVTById", async(id)=>{
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

export const findVTByAccChartId=createAsyncThunk("findVTByAccChartId", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/vt/accChart/${id}`, {
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

export const findVTByCostCenterId=createAsyncThunk("findVTByCostCenterId", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/vt/costCenter/${id}`, {
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
export const findGeneralLedgerReport=createAsyncThunk("findGeneralLedgerReport", async(data)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/vt/generalLedger/", {
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify(data)
    });
    //const response=await fetch(BASE_URL+"employeeTypeList");
    try{
      const result=response.json();
      return result;
    }catch(error){
      console.log(error);
    }
})



export const voucherTransactionSlice = createSlice({
  name:"voucherTransactionSlice",
  initialState:{
    voucher:[],
    voucherTransaction:[],
    voucherTransactions:[],
    accountChart:[],
    costCenter:[],
    vtloading:[],
    error : null, 
  },
    //For handling result in following ways-- (3 cases to handle state and action)
  extraReducers : (builder)=>{
    builder.addCase(findVTById.pending, (state)=>{ state.vtloading=true; })
    builder.addCase(findVTById.fulfilled, (state, action)=>{ state.vtloading=false; state.voucherTransaction=action.payload;  state.error=''; })
    builder.addCase(findVTById.rejected, (state, action)=>{state.vtloading=false; state.error=action.payload; })
    //Logged Employee
    builder.addCase(findVTByAccChartId.pending, (state)=>{ state.vtloading=true; })
    builder.addCase(findVTByAccChartId.fulfilled, (state, action)=>{ state.vtloading=false; state.voucherTransactions=action.payload;  state.error=''; })
    builder.addCase(findVTByAccChartId.rejected, (state, action)=>{state.vtloading=false; state.error=action.payload; })
    
    builder.addCase(findVTByCostCenterId.pending, (state)=>{ state.vtloading=true; })
    builder.addCase(findVTByCostCenterId.fulfilled, (state, action)=>{ state.vtloading=false; state.voucherTransactions=action.payload;  state.error=''; })
    builder.addCase(findVTByCostCenterId.rejected, (state, action)=>{state.vtloading=false; state.error=action.payload; })
    
    builder.addCase(findGeneralLedgerReport.pending, (state)=>{ state.vtloading=true; })
    builder.addCase(findGeneralLedgerReport.fulfilled, (state, action)=>{ state.vtloading=false; state.voucherTransactions=action.payload;  state.error=''; })
    builder.addCase(findGeneralLedgerReport.rejected, (state, action)=>{state.vtloading=false; state.error=action.payload; })
    

  }
  
});

export default voucherTransactionSlice.reducer;
