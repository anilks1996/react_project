import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../../serviceUrl/AxiosURL';


export const createAccCompany = createAsyncThunk("createAccCompany", async (data, {rejectWithValue})=>{
  console.log("accCompany data "+data.accCompany.code);
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/accCompany/create", {
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
});

export const showAccCompany=createAsyncThunk("showAccCompany", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/accCompany/", {
    method:"GET",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
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

export const showAccCompanyById=createAsyncThunk("showAccCompanyById", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/accCompany/${id}`, {
      method:"GET",
      headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
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

export const showAccCompanyList=createAsyncThunk("showAccCompanyList", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/accCompany/list/", {
    method:"GET",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
})

export const deleteAccCompany = createAsyncThunk("deleteAccCompany", async(id)=>{
    //const response=await fetch(BASE_URL+`employeeTypeList/${id}`, {
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/accCompany/delete/${id}`, {
      method:"DELETE",
      headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
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
export const editAccCompany = createAsyncThunk("editAccCompany", async(data)=>{
  //const response = await fetch(BASE_URL+`employeeTypeList/${data.id}`, {
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+`api/accCompany/edit/${data.id}`, {  
    method:"PUT",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify(data)
  })
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
});

//AccCompanyFinancialYear
export const createAccCompanyFinancialYear = createAsyncThunk("createAccCompanyFinancialYear", async (data, {rejectWithValue})=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/acfy/create", {
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
  });
  
  export const showAccCompanyFinancialYear=createAsyncThunk("showAccCompanyFinancialYear", async()=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/acfy/", {
      method:"GET",
      headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
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

  export const showAccCompanyFinancialYearById=createAsyncThunk("showAccCompanyFinancialYearById", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/acfy/${id}`, {
      method:"GET",
      headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
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
  
  export const populateAccCompanyFinancialYearList=createAsyncThunk("populateAccCompanyFinancialYearList", async()=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/acfy/list", {
      method:"GET",
      headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
      const result=response.json();
      return result;
    }catch(error){
      console.log(error);
    }
  })
  export const getActiveAccCompanyFinancialYear=createAsyncThunk("getActiveAccCompanyFinancialYear", async()=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/acfy/activeFY", {
      method:"GET",
      headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
      const result=response.json();
      return result;
    }catch(error){
      console.log(error);
    }
  })
  
  export const deleteAccCompanyFinancialYear = createAsyncThunk("deleteAccCompanyFinancialYear", async(id)=>{
      //const response=await fetch(BASE_URL+`employeeTypeList/${id}`, {
      const currentUser=localStorage.getItem("current-jwtToken");
      const response=await fetch(BASE_URL+`api/acfy/delete/${id}`, {
        method:"DELETE",
        headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
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
  export const editAccCompanyFinancialYear = createAsyncThunk("editAccCompanyFinancialYear", async(data)=>{
    //const response = await fetch(BASE_URL+`employeeTypeList/${data.id}`, {
    const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+`api/acfy/edit/${data.id}`, {  
      method:"PUT",
      headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify(data)
    })
    try{
      const result=response.json();
      return result;
    }catch(error){
      console.log(error);
    }
  });

export const accCompanyFinancialSlice = createSlice({
  name:"employeeTypeSlice",
  initialState:{
    accCompany:[],
    accCompanies:[],
    accCompanyList:[],
    acfy:[],
    acfys:[],
    acfyList:[],
    acLoading: false, 
    acfyLoading:false,
    error : null, 
  },
    //For handling result in following ways-- (3 cases to handle state and action)
  extraReducers : (builder)=>{
    //For AccCompany
    builder.addCase(createAccCompany.pending, (state)=>{state.acLoading=true;})
    builder.addCase(createAccCompany.fulfilled, (state, action)=>{
      state.acLoading=false; state.accCompany=action.payload; state.error='';
    })
    builder.addCase(createAccCompany.rejected, (state, action)=>{state.acLoading=false; state.error=action.payload; })

    builder.addCase(showAccCompany.pending, (state)=>{state.acLoading=true;})
    builder.addCase(showAccCompany.fulfilled, (state, action)=>{
      state.acLoading=false; state.accCompanies=action.payload; state.error='';
    })
    builder.addCase(showAccCompany.rejected, (state, action)=>{state.acLoading=false; state.error=action.payload; })

    builder.addCase(showAccCompanyById.pending, (state)=>{state.acLoading=true;})
    builder.addCase(showAccCompanyById.fulfilled, (state, action)=>{
      state.acLoading=false; state.accCompany=action.payload; state.error='';
    })
    builder.addCase(showAccCompanyById.rejected, (state, action)=>{state.acLoading=false; state.error=action.payload; })

    builder.addCase(showAccCompanyList.pending, (state)=>{state.acLoading=true;})
    builder.addCase(showAccCompanyList.fulfilled, (state, action)=>{
      state.acLoading=false; state.accCompanyList=action.payload; state.error='';
    })
    builder.addCase(showAccCompanyList.rejected, (state, action)=>{state.acLoading=false; state.error=action.payload; })

    builder.addCase(deleteAccCompany.pending, (state)=>{state.acLoading=true;})
    builder.addCase(deleteAccCompany.fulfilled, (state, action)=>{
      state.acLoading=false; state.accCompany=action.payload; state.error='';
    })
    builder.addCase(deleteAccCompany.rejected, (state, action)=>{state.acLoading=false; state.error=action.payload; })

    builder.addCase(editAccCompany.pending, (state)=>{state.acLoading=true;})
    builder.addCase(editAccCompany.fulfilled, (state, action)=>{
      state.acLoading=false; state.accCompany=action.payload; state.error='';
    })
    builder.addCase(editAccCompany.rejected, (state, action)=>{state.acLoading=false; state.error=action.payload; })
    
    //For AccCompanyFinancialYear
    builder.addCase(createAccCompanyFinancialYear.pending, (state)=>{state.acfyLoading=true;})
    builder.addCase(createAccCompanyFinancialYear.fulfilled, (state, action)=>{
      state.acfyLoading=false; state.acfy=action.payload; state.error='';
    })
    builder.addCase(createAccCompanyFinancialYear.rejected, (state, action)=>{state.acfyLoading=false; state.error=action.payload; })

    builder.addCase(showAccCompanyFinancialYear.pending, (state)=>{state.acfyLoading=true;})
    builder.addCase(showAccCompanyFinancialYear.fulfilled, (state, action)=>{
      state.acfyLoading=false; state.acfys=action.payload; state.error='';
    })
    builder.addCase(showAccCompanyFinancialYear.rejected, (state, action)=>{state.acfyLoading=false; state.error=action.payload; })
    
    builder.addCase(showAccCompanyFinancialYearById.pending, (state)=>{state.acfyLoading=true;})
    builder.addCase(showAccCompanyFinancialYearById.fulfilled, (state, action)=>{
      state.acfyLoading=false; state.acfy=action.payload; state.error='';
    })
    builder.addCase(showAccCompanyFinancialYearById.rejected, (state, action)=>{state.acfyLoading=false; state.error=action.payload; })


    builder.addCase(populateAccCompanyFinancialYearList.pending, (state)=>{state.acfyLoading=true;})
    builder.addCase(populateAccCompanyFinancialYearList.fulfilled, (state, action)=>{
      state.acfyLoading=false; state.acfyList=action.payload; state.error='';
    })
    builder.addCase(populateAccCompanyFinancialYearList.rejected, (state, action)=>{state.acfyLoading=false; state.error=action.payload; })

    builder.addCase(getActiveAccCompanyFinancialYear.pending, (state)=>{state.acfyLoading=true;})
    builder.addCase(getActiveAccCompanyFinancialYear.fulfilled, (state, action)=>{
      state.acfyLoading=false; state.acfy=action.payload; state.error='';
    })
    builder.addCase(getActiveAccCompanyFinancialYear.rejected, (state, action)=>{state.acfyLoading=false; state.error=action.payload; })


    builder.addCase(deleteAccCompanyFinancialYear.pending, (state)=>{state.acfyLoading=true;})
    builder.addCase(deleteAccCompanyFinancialYear.fulfilled, (state, action)=>{
      state.acfyLoading=false; state.acfy=action.payload; state.error='';
    })
    builder.addCase(deleteAccCompanyFinancialYear.rejected, (state, action)=>{state.acfyLoading=false; state.error=action.payload; })

    builder.addCase(editAccCompanyFinancialYear.pending, (state)=>{state.acfyLoading=true;})
    builder.addCase(editAccCompanyFinancialYear.fulfilled, (state, action)=>{
      state.acfyLoading=false; state.acfy=action.payload; state.error='';
    })
    builder.addCase(editAccCompanyFinancialYear.rejected, (state, action)=>{state.acfyLoading=false; state.error=action.payload; })
    
   
  }
  
});

export default accCompanyFinancialSlice.reducer;
