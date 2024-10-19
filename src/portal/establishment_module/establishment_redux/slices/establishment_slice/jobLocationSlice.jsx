import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../../serviceUrl/AxiosURL';

export const createJobLocation = createAsyncThunk("createJobLocation", async (data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/jobLocation/", {
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

export const showJobLocation=createAsyncThunk("showJobLocation", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/jobLocation/",{
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

export const showJobLocationByEmployeeId=createAsyncThunk("showJobLocationByEmployeeId", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/jobLocation/employee/${id}`,{
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

export const deleteJobLocation = createAsyncThunk("deleteJobLocation", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/jobLocation/${id}`, { 
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
export const editJobLocation = createAsyncThunk("editJobLocation", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+`api/jobLocation/${data.id}`, {  
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

export const jobLocationSlice = createSlice({
  name:"jobLocationSlice",
  initialState:{
    jobLocations:[],
    jobLocationByEmpId:[], 
    loading: false, 
    error : null, 
  },
    //For handling result in following ways-- (3 cases to handle state and action)
  extraReducers : (builder)=>{
    //For Showing
    builder.addCase(showJobLocation.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(showJobLocation.fulfilled, (state, action)=>{
      state.loading=false
      state.jobLocations=action.payload
      state.error=''
    })
    builder.addCase(showJobLocation.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
    //Show JobLocation by Employee Id
    builder.addCase(showJobLocationByEmployeeId.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(showJobLocationByEmployeeId.fulfilled, (state, action)=>{
      state.loading=false
      state.jobLocationByEmpId=action.payload
      state.error=''
    })
    builder.addCase(showJobLocationByEmployeeId.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
    //For Delete
    builder.addCase(deleteJobLocation.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(deleteJobLocation.fulfilled, (state, action)=>{
      state.loading=false
      //state.departments=action.payload
      console.log("state.departments===="+state.departments)
    })
    builder.addCase(deleteJobLocation.rejected, (state, action)=>{
      console.log("action.payload===="+action.payload)
      state.loading=false
      state.error=action.payload
    })
    //For create
    builder.addCase(createJobLocation.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(createJobLocation.fulfilled, (state, action)=>{
      state.loading=false
      state.jobLocations=action.payload
      state.error=''
    })
    builder.addCase(createJobLocation.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
    //Edit 
    builder.addCase(editJobLocation.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(editJobLocation.fulfilled, (state, action)=>{
      state.loading=false
    })
    builder.addCase(editJobLocation.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
  }
  
});

export default jobLocationSlice.reducer;
