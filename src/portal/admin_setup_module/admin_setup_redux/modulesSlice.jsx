import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../../serviceUrl/AxiosURL";


export const createModules = createAsyncThunk("createModules",async(data,{rejectWithValue})=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/module/create", {
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

export const updateModules=createAsyncThunk("updateModules", async(data, {rejectWithValue})=>{
const currentUser=localStorage.getItem("current-jwtToken");
const response=await fetch(BASE_URL+`api/module/edit/${data.id}`, {
    method:"PUT",
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
export const deleteModules=createAsyncThunk("deleteModules", async(id)=>{
const currentUser=localStorage.getItem("current-jwtToken");
const response=await fetch(BASE_URL+`api/module/delete/${id}`, {
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

export const findModulesById=createAsyncThunk("findModulesById", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/module/${id}`, {
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

export const findAllModules=createAsyncThunk("findAllModules", async(id)=>{
const currentUser=localStorage.getItem("current-jwtToken");
const response=await fetch(BASE_URL+"api/module/list", {
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



export const modulesSlice = createSlice({
    name:'modulesSlice',
    initialState:{
        module:[],
        modules:[],
        group:[],
        rmLoading:[],
        mloading:false,
        error:null,
    },
    extraReducers : (builder)=>{
        builder.addCase(createModules.pending, (state)=>{state.mloading=true; })
        builder.addCase(createModules.fulfilled, (state, action)=>{ state.mloading=false; state.module=action.payload; state.error=''; })
        builder.addCase(createModules.rejected, (state, action)=>{state.mloading=false; state.error=action.payload; })
       
        builder.addCase(updateModules.pending, (state)=>{state.mloading=true; })
        builder.addCase(updateModules.fulfilled, (state, action)=>{ state.mloading=false; state.module=action.payload; state.error=''; })
        builder.addCase(updateModules.rejected, (state, action)=>{state.mloading=false; state.error=action.payload; })
       
        builder.addCase(deleteModules.pending, (state)=>{state.mloading=true; })
        builder.addCase(deleteModules.fulfilled, (state, action)=>{ state.mloading=false; state.modules=action.payload; state.error=''; })
        builder.addCase(deleteModules.rejected, (state, action)=>{state.mloading=false; state.error=action.payload; })
       
        builder.addCase(findModulesById.pending, (state)=>{state.mloading=true; })
        builder.addCase(findModulesById.fulfilled, (state, action)=>{ state.mloading=false; state.module=action.payload; state.error=''; })
        builder.addCase(findModulesById.rejected, (state, action)=>{state.mloading=false; state.error=action.payload; })
       
        builder.addCase(findAllModules.pending, (state)=>{state.mloading=true; })
        builder.addCase(findAllModules.fulfilled, (state, action)=>{ state.mloading=false; state.modules=action.payload; state.error=''; })
        builder.addCase(findAllModules.rejected, (state, action)=>{state.mloading=false; state.error=action.payload; })
       

    }
})

export default modulesSlice.reducer;