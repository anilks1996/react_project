import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../../serviceUrl/AxiosURL';

export const createLocationInCity = createAsyncThunk("createLocationInCity", async (data, {rejectWithValue})=>{
  //const response=await fetch(BASE_URL+"pastOrgDepartmentList", {
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/locationInCity/", { 
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

export const showLocationInCity=createAsyncThunk("showLocationInCity", async()=>{
  //const response=await fetch(BASE_URL+"pastOrgDepartmentList");
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/locationInCity/", {
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

export const deleteLocationInCity = createAsyncThunk("deleteLocationInCity", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/locationInCity/${id}`, {  
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
export const editLocationInCity = createAsyncThunk("editLocationInCity", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+`api/locationInCity/${data.id}`, {  
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

export const locationInCitySlice = createSlice({
  name:"jobLocationSlice",
  initialState:{
    locationInCities:[], 
    loading: false, 
    error : null, 
  },
    //For handling result in following ways-- (3 cases to handle state and action)
  extraReducers : (builder)=>{
    //For Showing
    builder.addCase(showLocationInCity.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(showLocationInCity.fulfilled, (state, action)=>{
      state.loading=false
      state.locationInCities=action.payload
      state.error=''
    })
    builder.addCase(showLocationInCity.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
    //For Delete
    builder.addCase(deleteLocationInCity.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(deleteLocationInCity.fulfilled, (state, action)=>{
      state.loading=false
      //state.departments=action.payload
      console.log("state.departments===="+state.departments)
    })
    builder.addCase(deleteLocationInCity.rejected, (state, action)=>{
      console.log("action.payload===="+action.payload)
      state.loading=false
      state.error=action.payload
    })
    //For create
    builder.addCase(createLocationInCity.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(createLocationInCity.fulfilled, (state, action)=>{
      state.loading=false
      state.locationInCities=action.payload
      state.error=''
    })
    builder.addCase(createLocationInCity.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
    //Edit 
    builder.addCase(editLocationInCity.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(editLocationInCity.fulfilled, (state, action)=>{
      state.loading=false
    })
    builder.addCase(editLocationInCity.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
  }
  
});

export default locationInCitySlice.reducer;
