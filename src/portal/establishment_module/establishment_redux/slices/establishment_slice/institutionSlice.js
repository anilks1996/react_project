import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../../serviceUrl/AxiosURL';

export const showOrganization=createAsyncThunk("showOrganization", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"institutionDropdownList",{
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

export const createInstitutions = createAsyncThunk("createInstitutions", async (data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(+BASE_URL+"api/institution/create", {
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

export const updateInstitutions=createAsyncThunk("updateInstitutions", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+`api/institution/update/${data.id}`, {  
  method:"PUT",
  headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
  body:JSON.stringify(data)
});
try{
  const result=response.json();
  return result;
}catch(error){
  console.log(error);
}
})

export const deleteInstitutions = createAsyncThunk("deleteInstitutions", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/institution/delete/${id}`, {
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

export const findAllInstitutions=createAsyncThunk("findAllInstitutions", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/institution/",{
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
export const findInstitutionById=createAsyncThunk("findInstitutionById", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/institution/${id}`,{
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
export const filterInstitutionById=createAsyncThunk("filterInstitutionById", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/institution/filter/${id}`,{
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



export const showBanks=createAsyncThunk("showBanks", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/bank/all/",{
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
export const showSalarySlab=createAsyncThunk("showSalarySlab", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/salarySlab/",{
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

//showing User bookmark
export const showUserBookmarkByModelType=createAsyncThunk("showUserBookmarkByModelType", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/userBookmark/${data}`,{
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


export const institutionSlice = createSlice({
    name:"institutionSlice",
    initialState:{
        institutions:[], 
        institution:[],
        banks:[],
        salarySlabs:[],
        userRegisters:[],
        userRegister:[],
        pendingUserRegisters:[],
        approvedUserRegisters:[],
        rejectedUserRegisters:[],
        userBookmarks:[],
        loading: false, 
        error : null, 
    },

    extraReducers : (builder)=>{
        //Institution
        builder.addCase(createInstitutions.pending, (state)=>{ state.loading=true; })
        builder.addCase(createInstitutions.fulfilled, (state, action)=>{ state.loading=false;state.institution=action.payload; state.error=''; })
        builder.addCase(createInstitutions.rejected, (state, action)=>{state.loading=false; state.error=action.payload;})
        
        builder.addCase(updateInstitutions.pending, (state)=>{ state.loading=true; })
        builder.addCase(updateInstitutions.fulfilled, (state, action)=>{state.loading=false; state.institution=action.payload; state.error=''})
        builder.addCase(updateInstitutions.rejected, (state, action)=>{state.loading=false; state.error=action.payload;})

        builder.addCase(deleteInstitutions.pending, (state)=>{ state.loading=true; })
        builder.addCase(deleteInstitutions.fulfilled, (state, action)=>{state.loading=false; state.institution=action.payload; state.error='';})
        builder.addCase(deleteInstitutions.rejected, (state, action)=>{state.loading=false; state.error=action.payload;})

        builder.addCase(findAllInstitutions.pending, (state)=>{ state.loading=true; })
        builder.addCase(findAllInstitutions.fulfilled, (state, action)=>{state.loading=false; state.institutions=action.payload;state.institution=null; state.error='';})
        builder.addCase(findAllInstitutions.rejected, (state, action)=>{state.loading=false; state.error=action.payload;})

        builder.addCase(findInstitutionById.pending, (state)=>{ state.loading=true; })
        builder.addCase(findInstitutionById.fulfilled, (state, action)=>{state.loading=false; state.institution=action.payload; state.error='';})
        builder.addCase(findInstitutionById.rejected, (state, action)=>{state.loading=false; state.error=action.payload;})

        //Company/Organization
        builder.addCase(showOrganization.pending, (state)=>{ state.loading=true; })
        builder.addCase(showOrganization.fulfilled, (state, action)=>{state.loading=false; state.institutions=action.payload;state.error='';})
        builder.addCase(showOrganization.rejected, (state, action)=>{state.loading=false; state.error=action.payload;})
        //show banks
        builder.addCase(showBanks.pending, (state)=>{ state.loading=true; })
        builder.addCase(showBanks.fulfilled, (state, action)=>{state.loading=false; state.banks=action.payload; state.error='';})
        builder.addCase(showBanks.rejected, (state, action)=>{state.loading=false; state.error=action.payload;})
        //show salary slabs
        builder.addCase(showSalarySlab.pending, (state)=>{ state.loading=true; })
        builder.addCase(showSalarySlab.fulfilled, (state, action)=>{
        state.loading=false; state.salarySlabs=action.payload; state.error='';})
        builder.addCase(showSalarySlab.rejected, (state, action)=>{state.loading=false; state.error=action.payload;})
       
        //showing user bookmark
        builder.addCase(showUserBookmarkByModelType.pending, (state)=>{ state.loading=true; })
        builder.addCase(showUserBookmarkByModelType.fulfilled, (state, action)=>{state.loading=false;state.userBookmarks=action.payload; state.error=''})
        builder.addCase(showUserBookmarkByModelType.rejected, (state, action)=>{ state.loading=false; state.error=action.payload; })
        
        builder.addCase(filterInstitutionById.pending, (state)=>{ state.loading=true; })
        builder.addCase(filterInstitutionById.fulfilled, (state, action)=>{state.loading=false;state.institutions=action.payload; state.error=''})
        builder.addCase(filterInstitutionById.rejected, (state, action)=>{ state.loading=false; state.error=action.payload; })
        

    }
})

export default institutionSlice.reducer;