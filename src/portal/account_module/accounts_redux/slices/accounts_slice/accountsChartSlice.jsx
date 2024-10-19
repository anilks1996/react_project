import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../../serviceUrl/AxiosURL';


export const createAccountChart = createAsyncThunk("createAccountChart", async (data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/accountChart/create", {
    method:"POST",
    headers:{"Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify(data)
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    return rejectWithValue(error.response);
  }
});

export const showAccountChart=createAsyncThunk("showAccountChart", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/accountChart/", {
    method:"GET",
    headers:{"Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  //const response=await fetch(BASE_URL+"employeeTypeList");
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
})

export const showAccountChartById=createAsyncThunk("showAccountChartById", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/accountChart/${id}`, {
      method:"GET",
      headers:{"Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    //const response=await fetch(BASE_URL+"employeeTypeList");
    try{
      const result=response.json();
      return result;
    }catch(error){
      console.log(error);
    }
  })

export const populateAccountChartList=createAsyncThunk("populateAccountChartList", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/accountChart/list", {
    method:"GET",
    headers:{"Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
})

export const populateCashBankBooks=createAsyncThunk("populateCashBankBooks", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/accountChart/cashBank", {
    method:"GET",
    headers:{"Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
})

export const populateAccountCharts=createAsyncThunk("populateAccountCharts", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/accountChart/type", {
    method:"GET",
    headers:{"Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
})

export const deleteAccountChart = createAsyncThunk("deleteAccountChart", async(id)=>{
    //const response=await fetch(BASE_URL+`employeeTypeList/${id}`, {
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/accountChart/delete/${id}`, {
      method:"DELETE",
      headers:{"Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
      const result=response.json();
      console.log("result==="+result)
      return result;
    }catch(error){
      console.log("error= "+error);
    }
  })
export const editAccountChart = createAsyncThunk("editAccountChart", async(data)=>{
  //const response = await fetch(BASE_URL+`employeeTypeList/${data.id}`, {
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+`api/accountChart/edit/${data.id}`, {  
    method:"PUT",
    headers:{"Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify(data)
  })
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
});


export const accountChartSlice = createSlice({name:"accountChartSlice",
  initialState:{
    accountChart:[],
    accountCharts:[],
    accountChartList:[], 
    transType:[],
    loading:false,
    error : null, 
  },
    //For handling result in following ways-- (3 cases to handle state and action)
  extraReducers : (builder)=>{
    //For AccCompany
    builder.addCase(createAccountChart.pending, (state)=>{state.loading=true;})
    builder.addCase(createAccountChart.fulfilled, (state, action)=>{
      state.loading=false; state.accountChart=action.payload; state.error='';
    })
    builder.addCase(createAccountChart.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })

    builder.addCase(showAccountChart.pending, (state)=>{state.loading=true;})
    builder.addCase(showAccountChart.fulfilled, (state, action)=>{
      state.loading=false; state.accountCharts=action.payload; state.error='';
    })
    builder.addCase(showAccountChart.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })

    builder.addCase(showAccountChartById.pending, (state)=>{state.loading=true;})
    builder.addCase(showAccountChartById.fulfilled, (state, action)=>{
      state.loading=false; state.accountChart=action.payload; state.error='';
    })
    builder.addCase(showAccountChartById.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })

    builder.addCase(populateAccountChartList.pending, (state)=>{state.loading=true;})
    builder.addCase(populateAccountChartList.fulfilled, (state, action)=>{
      state.loading=false; state.accountChartList=action.payload; state.error='';
    })
    builder.addCase(populateAccountChartList.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })

    builder.addCase(populateCashBankBooks.pending, (state)=>{state.loading=true;})
    builder.addCase(populateCashBankBooks.fulfilled, (state, action)=>{
      state.loading=false; state.accountChartList=action.payload; state.error='';
    })
    builder.addCase(populateCashBankBooks.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })

    builder.addCase(populateAccountCharts.pending, (state)=>{state.loading=true;})
    builder.addCase(populateAccountCharts.fulfilled, (state, action)=>{
      state.loading=false; state.accountCharts=action.payload; state.error='';
    })
    builder.addCase(populateAccountCharts.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })


    builder.addCase(deleteAccountChart.pending, (state)=>{state.loading=true;})
    builder.addCase(deleteAccountChart.fulfilled, (state, action)=>{
      state.loading=false; state.accountChart=action.payload; state.error='';
    })
    builder.addCase(deleteAccountChart.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })

    builder.addCase(editAccountChart.pending, (state)=>{state.loading=true;})
    builder.addCase(editAccountChart.fulfilled, (state, action)=>{
      state.loading=false; state.accountChart=action.payload; state.error='';
    })
    builder.addCase(editAccountChart.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })
    
     
   
  }
  
});

export default accountChartSlice.reducer;
