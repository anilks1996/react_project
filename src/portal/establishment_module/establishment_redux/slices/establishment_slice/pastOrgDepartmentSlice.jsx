import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../../serviceUrl/AxiosURL';

export const createPastOrgDepartment = createAsyncThunk("createPastOrgDepartment", async (data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/pastOrgDepartment/", {
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

export const showPastOrgDepartment=createAsyncThunk("showPastOrgDepartment", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/pastOrgDepartment/",{
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

export const deletePastOrgDepartment = createAsyncThunk("deletePastOrgDepartment", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/pastOrgDepartment/${id}`, {
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
export const editPastOrgDepartment = createAsyncThunk("editPastOrgDepartment", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+`api/pastOrgDepartment/${data.id}`, {
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

export const pastOrgDepartmentSlice = createSlice({
  name:"pastOrgDepartmentSlice",
  initialState:{
    pastOrgDepartments:[], 
    loading: false, 
    error : null, 
  },
    //For handling result in following ways-- (3 cases to handle state and action)
  extraReducers : (builder)=>{
    //For Showing
    builder.addCase(showPastOrgDepartment.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(showPastOrgDepartment.fulfilled, (state, action)=>{
      state.loading=false
      state.pastOrgDepartments=action.payload
      state.error=''
    })
    builder.addCase(showPastOrgDepartment.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
    //For Delete
    builder.addCase(deletePastOrgDepartment.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(deletePastOrgDepartment.fulfilled, (state, action)=>{
      state.loading=false
      //state.departments=action.payload
      console.log("state.departments===="+state.departments)
    })
    builder.addCase(deletePastOrgDepartment.rejected, (state, action)=>{
      console.log("action.payload===="+action.payload)
      state.loading=false
      state.error=action.payload
    })
    //For create
    builder.addCase(createPastOrgDepartment.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(createPastOrgDepartment.fulfilled, (state, action)=>{
      state.loading=false
      //state.pastOrgDepartments=action.payload
      state.error=''
    })
    builder.addCase(createPastOrgDepartment.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
    //Edit 
    builder.addCase(editPastOrgDepartment.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(editPastOrgDepartment.fulfilled, (state, action)=>{
      state.loading=false
    })
    builder.addCase(editPastOrgDepartment.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
  }
  
});

export default pastOrgDepartmentSlice.reducer;
