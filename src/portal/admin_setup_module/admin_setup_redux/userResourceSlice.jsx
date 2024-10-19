import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../../serviceUrl/AxiosURL";


export const createUserResource = createAsyncThunk("createUserResource",async(data,{rejectWithValue})=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/userResource/create", {
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

export const updateUserResource=createAsyncThunk("updateUserResource", async(data, {rejectWithValue})=>{
const currentUser=localStorage.getItem("current-jwtToken");
const response=await fetch(BASE_URL+`api/userResource/edit/${data.id}`, {
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
export const deleteUserResource=createAsyncThunk("deleteUserResource", async(id)=>{
const currentUser=localStorage.getItem("current-jwtToken");
const response=await fetch(BASE_URL+`api/userResource/delete/${id}`, {
    method:"DELETE",
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

export const findUserResourceById=createAsyncThunk("findUserResourceById", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/userResource/${id}`, {
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

export const findAllUserResources=createAsyncThunk("findAllUserResources", async(id)=>{
const currentUser=localStorage.getItem("current-jwtToken");
const response=await fetch(BASE_URL+"api/userResource/list", {
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



export const userResourceSlice = createSlice({
    name:'userResourceSlice',
    initialState:{
        userResource:[],
        userResources:[],
        group:[],
        loading:false,
        error:null,
    },
    extraReducers : (builder)=>{
        builder.addCase(createUserResource.pending, (state)=>{state.loading=true; })
        builder.addCase(createUserResource.fulfilled, (state, action)=>{ state.loading=false; state.userResource=action.payload; state.error=''; })
        builder.addCase(createUserResource.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       
        builder.addCase(updateUserResource.pending, (state)=>{state.loading=true; })
        builder.addCase(updateUserResource.fulfilled, (state, action)=>{ state.loading=false; state.userResource=action.payload; state.error=''; })
        builder.addCase(updateUserResource.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       
        builder.addCase(deleteUserResource.pending, (state)=>{state.loading=true; })
        builder.addCase(deleteUserResource.fulfilled, (state, action)=>{ state.loading=false; state.userResources=action.payload; state.error=''; })
        builder.addCase(deleteUserResource.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       
        builder.addCase(findUserResourceById.pending, (state)=>{state.loading=true; })
        builder.addCase(findUserResourceById.fulfilled, (state, action)=>{ state.loading=false; state.userResource=action.payload; state.error=''; })
        builder.addCase(findUserResourceById.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       
        builder.addCase(findAllUserResources.pending, (state)=>{state.loading=true; })
        builder.addCase(findAllUserResources.fulfilled, (state, action)=>{ state.loading=false; state.userResources=action.payload; state.error=''; })
        builder.addCase(findAllUserResources.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
       

    }
})

export default userResourceSlice.reducer;