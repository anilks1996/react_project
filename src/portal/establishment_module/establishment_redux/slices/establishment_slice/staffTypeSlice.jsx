import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../../serviceUrl/AxiosURL';

export const createStaffType = createAsyncThunk("createStaffType", async (data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/staffType/", {
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

export const showStaffType=createAsyncThunk("showStaffType", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/staffType/",{
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


export const deleteStaffType = createAsyncThunk("deleteStaffType", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/staffType/${id}`, {
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
export const editStaffType = createAsyncThunk("editStaffType", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+`api/staffType/${data.id}`, {
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

export const staffTypeSlice = createSlice({
  name:"staffTypeSlice",
  initialState:{
    staffTypes:[], 
    loading: false, 
    error : null, 
  },
    //For handling result in following ways-- (3 cases to handle state and action)
  extraReducers : (builder)=>{
    //For Showing
    builder.addCase(showStaffType.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(showStaffType.fulfilled, (state, action)=>{
      state.loading=false
      state.staffTypes=action.payload
      state.error=''
    })
    builder.addCase(showStaffType.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
    //For Delete
    builder.addCase(deleteStaffType.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(deleteStaffType.fulfilled, (state, action)=>{
      state.loading=false
      //state.staffTypes=action.payload
      console.log("state.staffTypes===="+state.departments)
    })
    builder.addCase(deleteStaffType.rejected, (state, action)=>{
      console.log("action.payload===="+action.payload)
      state.loading=false
      state.error=action.payload
    })
    //For create
    builder.addCase(createStaffType.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(createStaffType.fulfilled, (state, action)=>{
      state.loading=false
      //state.staffTypes=action.payload
      state.error=''
    })
    builder.addCase(createStaffType.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
    //Edit 
    builder.addCase(editStaffType.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(editStaffType.fulfilled, (state, action)=>{
      state.loading=false
      //state.departments=action.payload
      //state.error=''
    })
    builder.addCase(editStaffType.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
  }
  
});

export default staffTypeSlice.reducer;
