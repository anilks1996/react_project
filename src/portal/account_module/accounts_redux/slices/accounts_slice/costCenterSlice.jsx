import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../../serviceUrl/AxiosURL';


export const createCostCenter = createAsyncThunk("createCostCenter", async (data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/costCenter/create", {
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

export const showCostCenter=createAsyncThunk("showCostCenter", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/costCenter/", {
    method:"GET",
    headers:{"Authorization":`Bearer ${currentUser}`},
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

export const showCostCenterById=createAsyncThunk("showCostCenterById", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/costCenter/${id}`, {
      method:"GET",
      headers:{"Authorization":`Bearer ${currentUser}`},
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

export const populateCostCenterList=createAsyncThunk("populateCostCenterList", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/costCenter/list", {
    method:"GET",
    headers:{"Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
})
export const populateTransTypes=createAsyncThunk("populateTransTypes", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/costCenter/crdr", {
    method:"GET",
    headers:{"Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
})

export const deleteCostCenter = createAsyncThunk("deleteCostCenter", async(id)=>{
    //const response=await fetch(BASE_URL+`employeeTypeList/${id}`, {
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/costCenter/delete/${id}`, {
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
export const editCostCenter = createAsyncThunk("editCostCenter", async(data)=>{
  //const response = await fetch(BASE_URL+`employeeTypeList/${data.id}`, {
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+`api/costCenter/edit/${data.id}`, {  
    method:"PUT",
    headers:{"Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify(data)
  })
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
});


export const costCenterSlice = createSlice({
  name:"costCenterSlice",
  initialState:{
    costCenter:[],
    costCenters:[],
    costCenterList:[], 
    transTypes:[],
    loading:false,
    error : null, 
  },
    //For handling result in following ways-- (3 cases to handle state and action)
  extraReducers : (builder)=>{
    //For AccCompany
    builder.addCase(createCostCenter.pending, (state)=>{state.loading=true;})
    builder.addCase(createCostCenter.fulfilled, (state, action)=>{
      state.loading=false; state.costCenter=action.payload; state.error='';
    })
    builder.addCase(createCostCenter.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })

    builder.addCase(showCostCenter.pending, (state)=>{state.loading=true;})
    builder.addCase(showCostCenter.fulfilled, (state, action)=>{
      state.loading=false; state.costCenters=action.payload; state.error='';
    })
    builder.addCase(showCostCenter.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })

    builder.addCase(showCostCenterById.pending, (state)=>{state.loading=true;})
    builder.addCase(showCostCenterById.fulfilled, (state, action)=>{
      state.loading=false; state.costCenter=action.payload; state.error='';
    })
    builder.addCase(showCostCenterById.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })

    builder.addCase(populateCostCenterList.pending, (state)=>{state.loading=true;})
    builder.addCase(populateCostCenterList.fulfilled, (state, action)=>{
      state.loading=false; state.costCenterList=action.payload; state.error='';
    })
    builder.addCase(populateCostCenterList.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })

    builder.addCase(populateTransTypes.pending, (state)=>{state.loading=true;})
    builder.addCase(populateTransTypes.fulfilled, (state, action)=>{
      state.loading=false; state.transTypes=action.payload; state.error='';
    })
    builder.addCase(populateTransTypes.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })


    builder.addCase(deleteCostCenter.pending, (state)=>{state.loading=true;})
    builder.addCase(deleteCostCenter.fulfilled, (state, action)=>{
      state.loading=false; state.costCenter=action.payload; state.error='';
    })
    builder.addCase(deleteCostCenter.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })

    builder.addCase(editCostCenter.pending, (state)=>{state.loading=true;})
    builder.addCase(editCostCenter.fulfilled, (state, action)=>{
      state.loading=false; state.costCenter=action.payload; state.error='';
    })
    builder.addCase(editCostCenter.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
    
     
   
  }
  
});

export default costCenterSlice.reducer;
