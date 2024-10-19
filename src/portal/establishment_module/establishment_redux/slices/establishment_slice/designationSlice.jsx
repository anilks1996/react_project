import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../../serviceUrl/AxiosURL';

export const createDesignation = createAsyncThunk("createDesignation", async (data, {rejectWithValue})=>{
  //const response=await fetch(BASE_URL+"designationList", {
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/designation/", {
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
}) ;

export const showDesignation=createAsyncThunk("showDesignation", async()=>{
  //const response=await fetch(BASE_URL+"designationList");
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/designation/", {
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

export const deleteDesignation = createAsyncThunk("deleteDesignation", async(id)=>{
   // const response=await fetch(BASE_URL+`designationList/${id}`, {
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/designation/${id}`, {
      method:"DELETE",
      headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
      const result=response.json();
      console.log("result==="+result)
      return result;
    }catch(error){
      //rejectWithValue(error.response);
      console.log("error= "+error);
    }
  })
export const editDesignation = createAsyncThunk("editDesignation", async(data)=>{
  //const response = await fetch(BASE_URL+`designationList/${data.id}`, {
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+`api/designation/${data.id}`, {
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

export const designationSlice = createSlice({
  name:"designationSlice",
  initialState:{
    designations:[], 
    loading: false, 
    error : null, 
  },
    //For handling result in following ways-- (3 cases to handle state and action)
  extraReducers : (builder)=>{
    //For Showing
    builder.addCase(showDesignation.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(showDesignation.fulfilled, (state, action)=>{
      state.loading=false
      state.designations=action.payload
      state.error=''
    })
    builder.addCase(showDesignation.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
    //For Delete
    builder.addCase(deleteDesignation.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(deleteDesignation.fulfilled, (state, action)=>{
      state.loading=false
      //state.departments=action.payload
      console.log("state.departments===="+state.departments)
    })
    builder.addCase(deleteDesignation.rejected, (state, action)=>{
      console.log("action.payload===="+action.payload)
      state.loading=false
      state.error=action.payload
    })
    //For create
    builder.addCase(createDesignation.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(createDesignation.fulfilled, (state, action)=>{
      state.loading=false
      //state.designations=action.payload
      state.error=''
    })
    builder.addCase(createDesignation.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
    //Edit 
    builder.addCase(editDesignation.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(editDesignation.fulfilled, (state, action)=>{
      state.loading=false
      //state.departments=action.payload
      //state.error=''
    })
    builder.addCase(editDesignation.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
  }
  
});

export default designationSlice.reducer;
