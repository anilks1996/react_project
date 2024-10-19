import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../../serviceUrl/AxiosURL';


export const createCodeMaster = createAsyncThunk("createCodeMaster", async (data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/codeMaster/create", {
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

export const updateCodeMaster=createAsyncThunk("updateCodeMaster", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+`api/codeMaster/update/${data.id}`, {  
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

export const deleteCodeMaster = createAsyncThunk("deleteCodeMaster", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/codeMaster/delete/${id}`, {
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

export const findAllCodeMaster=createAsyncThunk("findAllCodeMaster", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/codeMaster/",{
    method:"GET",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    //rejectWithValue(error.response);
  }
  })
export const findCodeMasterById=createAsyncThunk("findCodeMasterById", async(id)=>{
const currentUser=localStorage.getItem("current-jwtToken");
const response=await fetch(BASE_URL+`api/codeMaster/${id}`,{
      method:"GET",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
});
try{
  const result=response.json();
  return result;
}catch(error){
  //rejectWithValue(error.response);
}
})
export const findCodeMasterByCode=createAsyncThunk("findCodeMasterByCode", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/codeMaster/code/${data}`,{
      method:"GET",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
      const result=response.json();
      return result;
    }catch(error){
      //rejectWithValue(error.response);
    }
})
export const findCodeMasterByCodeList=createAsyncThunk("findCodeMasterByCodeList", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/codeMaster/codes/${data}`,{
      method:"GET",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
      const result=response.json();
      return result;
    }catch(error){
      //rejectWithValue(error.response);
    }
})
export const popupCodeMasterByCodeList=createAsyncThunk("popupCodeMasterByCodeList", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/codeMaster/code/popup/${data}`,{
      method:"GET",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
      const result=response.json();
      return result;
    }catch(error){
      //rejectWithValue(error.response);
    }
})


export const codeMasterSlice = createSlice({
    name:"codeMasterSlice",
    initialState:{
        codeMasters:[], 
        codeMaster:[],
        codeMasterCol:[],
        codeLoading: false, 
        error : null, 
    },

    extraReducers : (builder)=>{
        //Institution
        builder.addCase(createCodeMaster.pending, (state)=>{ state.codeLoading=true; })
        builder.addCase(createCodeMaster.fulfilled, (state, action)=>{ state.codeLoading=false;state.codeMaster=action.payload; state.error=''; })
        builder.addCase(createCodeMaster.rejected, (state, action)=>{state.codeLoading=false; state.error=action.payload;})
        
        builder.addCase(updateCodeMaster.pending, (state)=>{ state.codeLoading=true; })
        builder.addCase(updateCodeMaster.fulfilled, (state, action)=>{state.codeLoading=false; state.codeMaster=action.payload; state.error=''})
        builder.addCase(updateCodeMaster.rejected, (state, action)=>{state.codeLoading=false; state.error=action.payload;})

        builder.addCase(deleteCodeMaster.pending, (state)=>{ state.codeLoading=true; })
        builder.addCase(deleteCodeMaster.fulfilled, (state, action)=>{state.codeLoading=false; state.codeMaster=action.payload; state.error='';})
        builder.addCase(deleteCodeMaster.rejected, (state, action)=>{state.codeLoading=false; state.error=action.payload;})

        builder.addCase(findAllCodeMaster.pending, (state)=>{ state.codeLoading=true; })
        builder.addCase(findAllCodeMaster.fulfilled, (state, action)=>{state.codeLoading=false; state.codeMasters=action.payload;state.codeMaster=null; state.error='';})
        builder.addCase(findAllCodeMaster.rejected, (state, action)=>{state.codeLoading=false; state.error=action.payload;})

        builder.addCase(findCodeMasterById.pending, (state)=>{ state.codeLoading=true; })
        builder.addCase(findCodeMasterById.fulfilled, (state, action)=>{state.codeLoading=false; state.codeMaster=action.payload; state.error='';})
        builder.addCase(findCodeMasterById.rejected, (state, action)=>{state.codeLoading=false; state.error=action.payload;})

        builder.addCase(findCodeMasterByCode.pending, (state)=>{ state.codeLoading=true; })
        builder.addCase(findCodeMasterByCode.fulfilled, (state, action)=>{state.codeLoading=false; state.codeMasters=action.payload; state.error='';})
        builder.addCase(findCodeMasterByCode.rejected, (state, action)=>{state.codeLoading=false; state.error=action.payload;})

        builder.addCase(findCodeMasterByCodeList.pending, (state)=>{ state.codeLoading=true; })
        builder.addCase(findCodeMasterByCodeList.fulfilled, (state, action)=>{state.codeLoading=false; state.codeMasters=action.payload; state.error='';})
        builder.addCase(findCodeMasterByCodeList.rejected, (state, action)=>{state.codeLoading=false; state.error=action.payload;})

        builder.addCase(popupCodeMasterByCodeList.pending, (state)=>{ state.codeLoading=true; })
        builder.addCase(popupCodeMasterByCodeList.fulfilled, (state, action)=>{state.codeLoading=false; state.codeMasterCol=action.payload; state.error='';})
        builder.addCase(popupCodeMasterByCodeList.rejected, (state, action)=>{state.codeLoading=false; state.error=action.payload;})

        
    }
})

export default codeMasterSlice.reducer;