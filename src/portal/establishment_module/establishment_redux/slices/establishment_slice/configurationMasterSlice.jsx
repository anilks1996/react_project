import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../../serviceUrl/AxiosURL';


export const createConfigurationMaster = createAsyncThunk("createConfigurationMaster", async (data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/configmaster/create/", {
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

export const updateConfigurationMaster=createAsyncThunk("updateConfigurationMaster", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+`api/configmaster/update/${data.id}`, {  
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

export const deleteConfigurationMaster = createAsyncThunk("deleteConfigurationMaster", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/configmaster/delete/${id}`, {
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

export const findAllConfigurationMasters=createAsyncThunk("findAllConfigurationMasters", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/configmaster/all/",{
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

export const findConfigurationMasterById=createAsyncThunk("findConfigurationMasterById", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
const response=await fetch(BASE_URL+`api/configmaster/${id}`,{
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
export const findConfigurationMasterByKey=createAsyncThunk("findConfigurationMasterByKey", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/configmaster/byConfigKey/${data}`,{
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
export const filterConfigurationMasterByKey=createAsyncThunk("filterConfigurationMasterByKey", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/configmaster/filter/${data}`,{
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

export const findConfigValueByConfigKey=createAsyncThunk("findConfigValueByConfigKey", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(`api/configmaster/valueByKey/${data}`,{
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

export const popupConfigurationMaster=createAsyncThunk("popupConfigurationMaster", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/configmaster/popup/",{
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

export const selectionConfigurationMaster=createAsyncThunk("selectionConfigurationMaster", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/configmaster/selection/",{
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

export const configurationMasterSlice = createSlice({
    name:"configurationMasterSlice",
    initialState:{
        configMasters:[], 
        configMaster:[],
        configMasterCol:[],
        selectionCMstr:[],
        configValue:[],
        cmLoading: false, 
        error : null, 
    },

    extraReducers : (builder)=>{
        //Institution
        builder.addCase(createConfigurationMaster.pending, (state)=>{ state.cmLoading=true; })
        builder.addCase(createConfigurationMaster.fulfilled, (state, action)=>{ state.cmLoading=false;state.configMaster=action.payload; state.error=''; })
        builder.addCase(createConfigurationMaster.rejected, (state, action)=>{state.cmLoading=false; state.error=action.payload;})
        
        builder.addCase(updateConfigurationMaster.pending, (state)=>{ state.cmLoading=true; })
        builder.addCase(updateConfigurationMaster.fulfilled, (state, action)=>{state.cmLoading=false; state.configMaster=action.payload; state.error=''})
        builder.addCase(updateConfigurationMaster.rejected, (state, action)=>{state.cmLoading=false; state.error=action.payload;})

        builder.addCase(deleteConfigurationMaster.pending, (state)=>{ state.cmLoading=true; })
        builder.addCase(deleteConfigurationMaster.fulfilled, (state, action)=>{state.cmLoading=false; state.configMaster=action.payload; state.error='';})
        builder.addCase(deleteConfigurationMaster.rejected, (state, action)=>{state.cmLoading=false; state.error=action.payload;})

        builder.addCase(findAllConfigurationMasters.pending, (state)=>{ state.cmLoading=true; })
        builder.addCase(findAllConfigurationMasters.fulfilled, (state, action)=>{state.cmLoading=false; state.configMasters=action.payload;state.configMaster=null; state.error='';})
        builder.addCase(findAllConfigurationMasters.rejected, (state, action)=>{state.cmLoading=false; state.error=action.payload;})

        builder.addCase(findConfigurationMasterById.pending, (state)=>{ state.cmLoading=true; })
        builder.addCase(findConfigurationMasterById.fulfilled, (state, action)=>{state.cmLoading=false; state.configMasters=action.payload; state.error='';})
        builder.addCase(findConfigurationMasterById.rejected, (state, action)=>{state.cmLoading=false; state.error=action.payload;})

        builder.addCase(filterConfigurationMasterByKey.pending, (state)=>{ state.cmLoading=true; })
        builder.addCase(filterConfigurationMasterByKey.fulfilled, (state, action)=>{state.cmLoading=false; state.configMasters=action.payload; state.error='';})
        builder.addCase(filterConfigurationMasterByKey.rejected, (state, action)=>{state.cmLoading=false; state.error=action.payload;})

        builder.addCase(popupConfigurationMaster.pending, (state)=>{ state.cmLoading=true; })
        builder.addCase(popupConfigurationMaster.fulfilled, (state, action)=>{state.cmLoading=false; state.configMasterCol=action.payload; state.error='';})
        builder.addCase(popupConfigurationMaster.rejected, (state, action)=>{state.cmLoading=false; state.error=action.payload;})

        builder.addCase(findConfigurationMasterByKey.pending, (state)=>{ state.cmLoading=true; })
        builder.addCase(findConfigurationMasterByKey.fulfilled, (state, action)=>{state.cmLoading=false; state.configMaster=action.payload; state.error='';})
        builder.addCase(findConfigurationMasterByKey.rejected, (state, action)=>{state.cmLoading=false; state.error=action.payload;})

        builder.addCase(findConfigValueByConfigKey.pending, (state)=>{ state.cmLoading=true; })
        builder.addCase(findConfigValueByConfigKey.fulfilled, (state, action)=>{state.cmLoading=false; state.configValue=action.payload; state.error='';})
        builder.addCase(findConfigValueByConfigKey.rejected, (state, action)=>{state.cmLoading=false; state.error=action.payload;})

        builder.addCase(selectionConfigurationMaster.pending, (state)=>{ state.cmLoading=true; })
        builder.addCase(selectionConfigurationMaster.fulfilled, (state, action)=>{state.cmLoading=false; state.selectionCMstr=action.payload; state.error='';})
        builder.addCase(selectionConfigurationMaster.rejected, (state, action)=>{state.cmLoading=false; state.error=action.payload;})

        
    }
})

export default configurationMasterSlice.reducer;