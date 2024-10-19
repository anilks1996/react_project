import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../../serviceUrl/AxiosURL';

export const createUserRegister=createAsyncThunk("createUserRegister", async(data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/userRegister/create/",{
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
})

export const createEmployeeByUserRegister=createAsyncThunk("createEmployeeByUserRegister", async(data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/userRegister/employee/create/",{
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
})

export const rejectUserRegister=createAsyncThunk("rejectUserRegister", async(data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/userRegister/employee/reject/",{
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
})

export const updateUserDetailRegister=createAsyncThunk("updateUserDetailRegister", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/userRegister/user/${data.id}`,{
        method:"PUT",
        headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
        body:JSON.stringify(data)
    });
    try{
        const result=response.json();
        return result;
    }catch(error){
        console.log(error.response);
    }   
})

export const showUserRegistersByAllStatus=createAsyncThunk("showUserRegistersByAllStatus", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/userRegister/inbox/${data}`,{
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
export const showUserRegistersByPengingStatus=createAsyncThunk("showUserRegistersByPendingStatus", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/userRegister/inbox/${data}`,{
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
export const showUserRegistersByApprovedStatus=createAsyncThunk("showUserRegistersByApprovedStatus", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/userRegister/inbox/${data}`,{
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
export const showUserRegistersByRejectedStatus=createAsyncThunk("showUserRegistersByRejectedStatus", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/userRegister/inbox/${data}`,{
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
export const showUserRegisterById=createAsyncThunk("showUserRegisterById", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/userRegister/${id}`,{
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


export const userRegisterSlice = createSlice({
    name:"userRegisterSlice",
    initialState:{
        userRegisters:[],
        userRegister:[],
        updatedUser:[],
        createEmployee:[],
        createLoading:false,
        pendingUserRegisters:[],
        approvedUserRegisters:[],
        rejectedUserRegisters:[],
        userBookmarks:[],
        loading: false, 

        error : null, 
    },

    extraReducers : (builder)=>{
       //Create User register
        builder.addCase(createUserRegister.pending, (state)=>{ state.loading=true; })
        builder.addCase(createUserRegister.fulfilled, (state, action)=>{
        state.loading=false;
        state.userRegister=action.payload;
        state.error='';
        })
        builder.addCase(createUserRegister.rejected, (state, action)=>{ state.loading=false; state.error=action.payload; })
        
        builder.addCase(createEmployeeByUserRegister.pending, (state)=>{ state.createLoading=true; })
        builder.addCase(createEmployeeByUserRegister.fulfilled, (state, action)=>{
        state.createLoading=false;
        state.createEmployee=action.payload;
        state.error='';
        })
        builder.addCase(createEmployeeByUserRegister.rejected, (state, action)=>{ state.createLoading=false; state.error=action.payload; })
        
        builder.addCase(rejectUserRegister.pending, (state)=>{ state.loading=true; })
        builder.addCase(rejectUserRegister.fulfilled, (state, action)=>{
        state.loading=false;
        state.userRegister=action.payload;
        state.error='';
        })
        builder.addCase(rejectUserRegister.rejected, (state, action)=>{ state.loading=false; state.error=action.payload; })
        
        //Update User register
        builder.addCase(updateUserDetailRegister.pending, (state)=>{ state.loading=true; })
        builder.addCase(updateUserDetailRegister.fulfilled, (state, action)=>{
        state.loading=false
        state.updatedUser=action.payload
        state.error=''
        })
        builder.addCase(updateUserDetailRegister.rejected, (state, action)=>{
        state.loading=false
        state.error=action.payload
        })
        //Show User register
        builder.addCase(showUserRegistersByAllStatus.pending, (state)=>{ state.loading=true; })
        builder.addCase(showUserRegistersByAllStatus.fulfilled, (state, action)=>{
        state.loading=false
        state.userRegisters=action.payload
        state.error=''
        })
        builder.addCase(showUserRegistersByAllStatus.rejected, (state, action)=>{
        state.loading=false
        state.error=action.payload
        })
        //Show User pending register
        builder.addCase(showUserRegistersByPengingStatus.pending, (state)=>{ state.loading=true; })
        builder.addCase(showUserRegistersByPengingStatus.fulfilled, (state, action)=>{
        state.loading=false
        state.pendingUserRegisters=action.payload
        state.error=''
        })
        builder.addCase(showUserRegistersByPengingStatus.rejected, (state, action)=>{
        state.loading=false
        state.error=action.payload
        })
        //Show User Approved register
        builder.addCase(showUserRegistersByApprovedStatus.pending, (state)=>{ state.loading=true; })
        builder.addCase(showUserRegistersByApprovedStatus.fulfilled, (state, action)=>{
        state.loading=false
        state.approvedUserRegisters=action.payload
        state.error=''
        })
        builder.addCase(showUserRegistersByApprovedStatus.rejected, (state, action)=>{
        state.loading=false
        state.error=action.payload
        })
        //Show User Rejected register
        builder.addCase(showUserRegistersByRejectedStatus.pending, (state)=>{ state.loading=true; })
        builder.addCase(showUserRegistersByRejectedStatus.fulfilled, (state, action)=>{
        state.loading=false
        state.rejectedUserRegisters=action.payload
        state.error=''
        })
        builder.addCase(showUserRegistersByRejectedStatus.rejected, (state, action)=>{
        state.loading=false
        state.error=action.payload
        })
        //Show User register by Id
        builder.addCase(showUserRegisterById.pending, (state)=>{ state.loading=true; })
        builder.addCase(showUserRegisterById.fulfilled, (state, action)=>{
        state.loading=false
        state.userRegister=action.payload
        state.error=''
        })
        builder.addCase(showUserRegisterById.rejected, (state, action)=>{
        state.loading=false
        state.error=action.payload
        })

    }
})

export default userRegisterSlice.reducer;