import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../../serviceUrl/AxiosURL';

export const createDepartment = createAsyncThunk("createDepartment", async (data, {rejectWithValue})=>{
  //const response=await fetch(BASE_URL+"departmentCols", {
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/department/", {
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

export const showDepartment=createAsyncThunk("showDepartment", async()=>{
  //const response=await fetch(BASE_URL+"departmentCols");
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/department/", {
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

export const showDepartmentById=createAsyncThunk("showDepartmentById", async(id)=>{
  //const response=await fetch(BASE_URL+"departmentCols");
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/department/${id}`, {
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

//for deleting
// export const deleteDepartment = createAsyncThunk("deleteDepartment", async(id)=>{
//   const response=await fetch(BASE_URL+`departmentCols/${id}`);
//   try{
//     const result=response.json();
//     console.log("result==="+result)
//     return result;
//   }catch(error){
//     //rejectWithValue(error.response);
//     console.log("error= "+error);
//   }
// })
export const deleteDepartment = createAsyncThunk("deleteDepartment", async(id)=>{
    //const response=await fetch(BASE_URL+`departmentCols/${id}`, {
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/department/${id}`, { 
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
export const editDepartment = createAsyncThunk("editDepartment", async(data)=>{
  //const response = await fetch(BASE_URL+`departmentCols/${data.id}`, {
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+`api/department/${data.id}`, {
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

export const departmentSlice = createSlice({
  name:"departmentSlice",
  initialState:{
    departments:[], 
    department:[],
    loading: false, 
    error : null, 
    searchData : [],
  },

  //For Filtering data
  reducers : {
    searchByInputData : (state, action) => {
      console.log(action.payload)
      state.searchData = action.payload
    }
  },
    //For handling result in following ways-- (3 cases to handle state and action)
  extraReducers : (builder)=>{
    //For Showing
    builder.addCase(showDepartment.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(showDepartment.fulfilled, (state, action)=>{
      state.loading=false
      state.departments=action.payload
      state.error=''
    })
    builder.addCase(showDepartment.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })

    builder.addCase(showDepartmentById.pending, (state)=>{state.loading=true;})
    builder.addCase(showDepartmentById.fulfilled, (state, action)=>{ state.loading=false;  state.department=action.payload;})
    builder.addCase(showDepartmentById.rejected, (state, action)=>{ state.loading=false; state.error=action.payload;})
    //For Delete
    builder.addCase(deleteDepartment.pending, (state)=>{
      state.loading=true;
    })
    // builder.addCase(deleteDepartment.fulfilled, (state, action)=>{
    //   state.loading=false
    //   const {id}=action.payload
    //   if(id){
    //     state.departments=state.departments.filter((ele)=>ele.id!==id)
    //     console.log("state.departments===="+state.departments)
    //   }
    // })
    builder.addCase(deleteDepartment.fulfilled, (state, action)=>{
      state.loading=false
      //state.departments=action.payload
      console.log("state.departments===="+state.departments)
    })
    builder.addCase(deleteDepartment.rejected, (state, action)=>{
      console.log("action.payload===="+action.payload)
      state.loading=false
      state.error=action.payload
    })
    //For create
    builder.addCase(createDepartment.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(createDepartment.fulfilled, (state, action)=>{
      state.loading=false
      state.departments=action.payload
      state.error=''
    })
    builder.addCase(createDepartment.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
    //Edit 
    builder.addCase(editDepartment.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(editDepartment.fulfilled, (state, action)=>{
      state.loading=false
      //state.departments=action.payload
      //state.error=''
    })
    builder.addCase(editDepartment.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
  }
  
});

export default departmentSlice.reducer;

export const searchByInputData = departmentSlice.actions;