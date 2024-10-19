import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../../serviceUrl/AxiosURL';

export const createQualification = createAsyncThunk("createQualification", async (data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/qualification/", {
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

export const showQualification=createAsyncThunk("showQualification", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/qualification/",{
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

export const deleteQualification = createAsyncThunk("deleteQualification", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/qualification/${id}`, {
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
export const editQualification = createAsyncThunk("editQualification", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+`api/qualification/${data.id}`, {
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

export const qualificationSlice = createSlice({
  name:"qualificationSlice",
  initialState:{
    qualificationsTypes:[], 
    loading: false, 
    error : null, 
  },
    //For handling result in following ways-- (3 cases to handle state and action)
  extraReducers : (builder)=>{
    //For Showing
    builder.addCase(showQualification.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(showQualification.fulfilled, (state, action)=>{
      state.loading=false
      state.qualificationsTypes=action.payload
      state.error=''
      console.log("editQualificationType==== "+action.payload)
    })
    builder.addCase(showQualification.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
    //For Delete
    builder.addCase(deleteQualification.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(deleteQualification.fulfilled, (state, action)=>{
      state.loading=false
      //state.departments=action.payload
      console.log("state.departments===="+state.departments)
    })
    builder.addCase(deleteQualification.rejected, (state, action)=>{
      console.log("action.payload===="+action.payload)
      state.loading=false
      state.error=action.payload
    })
    //For create
    builder.addCase(createQualification.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(createQualification.fulfilled, (state, action)=>{
      state.loading=false
      //state.qualificationsTypes=action.payload
      state.error=''
    })
    builder.addCase(createQualification.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
    //Edit 
    builder.addCase(editQualification.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(editQualification.fulfilled, (state, action)=>{
      state.loading=false
      //state.departments=action.payload
      //state.error=''
    })
    builder.addCase(editQualification.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
  }
  
});

export default qualificationSlice.reducer;
