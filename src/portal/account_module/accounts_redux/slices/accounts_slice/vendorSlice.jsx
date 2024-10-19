import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../../serviceUrl/AxiosURL';


export const createVendor = createAsyncThunk("createVendor", async (data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/vendor/create", {
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

export const showVendors=createAsyncThunk("showVendors", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/vendor/", {
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

export const showVendorsById=createAsyncThunk("showVendorsById", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/vendor/${id}`, {
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

export const populateVendorList=createAsyncThunk("populateVendorList", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/vendor/list", {
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
export const populateVendors=createAsyncThunk("populateVendors", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/vendor/type", {
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

export const deleteVendor = createAsyncThunk("deleteVendor", async(id)=>{
    //const response=await fetch(BASE_URL+`employeeTypeList/${id}`, {
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/vendor/delete/${id}`, {
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
export const editVendor = createAsyncThunk("editVendor", async(data)=>{
  //const response = await fetch(BASE_URL+`employeeTypeList/${data.id}`, {
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+`api/vendor/edit/${data.id}`, {  
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


export const vendorSlice = createSlice({name:"vendorSlice",
  initialState:{
    vendor:[],
    vendors:[],
    vendorList:[], 
    loading:false,
    error : null, 
  },
    //For handling result in following ways-- (3 cases to handle state and action)
  extraReducers : (builder)=>{
    //For AccCompany
    builder.addCase(createVendor.pending, (state)=>{state.loading=true;})
    builder.addCase(createVendor.fulfilled, (state, action)=>{
      state.loading=false; state.vendor=action.payload; state.error='';
    })
    builder.addCase(createVendor.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })

    builder.addCase(showVendors.pending, (state)=>{state.loading=true;})
    builder.addCase(showVendors.fulfilled, (state, action)=>{
      state.loading=false; state.vendors=action.payload; state.error='';
    })
    builder.addCase(showVendors.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })

    builder.addCase(showVendorsById.pending, (state)=>{state.loading=true;})
    builder.addCase(showVendorsById.fulfilled, (state, action)=>{
      state.loading=false; state.vendor=action.payload; state.error='';
    })
    builder.addCase(showVendorsById.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })

    builder.addCase(populateVendorList.pending, (state)=>{state.loading=true;})
    builder.addCase(populateVendorList.fulfilled, (state, action)=>{
      state.loading=false; state.vendorList=action.payload; state.error='';
    })
    builder.addCase(populateVendorList.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })

    builder.addCase(populateVendors.pending, (state)=>{state.loading=true;})
    builder.addCase(populateVendors.fulfilled, (state, action)=>{
      state.loading=false; state.vendors=action.payload; state.error='';
    })
    builder.addCase(populateVendors.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })


    builder.addCase(deleteVendor.pending, (state)=>{state.loading=true;})
    builder.addCase(deleteVendor.fulfilled, (state, action)=>{
      state.loading=false; state.vendor=action.payload; state.error='';
    })
    builder.addCase(deleteVendor.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })

    builder.addCase(editVendor.pending, (state)=>{state.loading=true;})
    builder.addCase(editVendor.fulfilled, (state, action)=>{
      state.loading=false; state.vendor=action.payload; state.error='';
    })
    builder.addCase(editVendor.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
    
     
   
  }
  
});

export default vendorSlice.reducer;
