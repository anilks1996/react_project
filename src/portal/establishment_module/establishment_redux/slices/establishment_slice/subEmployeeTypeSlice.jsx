import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../../serviceUrl/AxiosURL';

export const createSubEmployeeType = createAsyncThunk("createSubEmployeeType", async (data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/subEmployeeType/", {
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

export const showSubEmployeeType=createAsyncThunk("showSubEmployeeType", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/subEmployeeType/",{
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

export const deleteSubEmployeeType = createAsyncThunk("deleteSubEmployeeType", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/subEmployeeType/${id}`, {
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
export const editSubEmployeeType = createAsyncThunk("editSubEmployeeType", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+`api/subEmployeeType/${data.id}`, {
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

export const subEmployeeTypeSlice = createSlice({
  name:"subEmployeeTypeSlice",
  initialState:{
    subEmployeeTypes:[], 
    loading: false, 
    error : null, 
  },
    //For handling result in following ways-- (3 cases to handle state and action)
  extraReducers : (builder)=>{
    //For Showing
    builder.addCase(showSubEmployeeType.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(showSubEmployeeType.fulfilled, (state, action)=>{
      state.loading=false
      state.subEmployeeTypes=action.payload
      state.error=''
    })
    builder.addCase(showSubEmployeeType.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
    //For Delete
    builder.addCase(deleteSubEmployeeType.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(deleteSubEmployeeType.fulfilled, (state, action)=>{
      state.loading=false
      //state.departments=action.payload
      console.log("state.departments===="+state.departments)
    })
    builder.addCase(deleteSubEmployeeType.rejected, (state, action)=>{
      console.log("action.payload===="+action.payload)
      state.loading=false
      state.error=action.payload
    })
    //For create
    builder.addCase(createSubEmployeeType.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(createSubEmployeeType.fulfilled, (state, action)=>{
      state.loading=false
      //state.subEmployeeTypes=action.payload
      state.error=''
    })
    builder.addCase(createSubEmployeeType.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
    //Edit 
    builder.addCase(editSubEmployeeType.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(editSubEmployeeType.fulfilled, (state, action)=>{
      state.loading=false
      //state.departments=action.payload
      //state.error=''
    })
    builder.addCase(editSubEmployeeType.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
  }
  
});

export default subEmployeeTypeSlice.reducer;
