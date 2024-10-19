import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../../serviceUrl/AxiosURL';


export const createBank = createAsyncThunk("createBank", async (data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/bank/create/", {
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
});

export const updateBank=createAsyncThunk("updateBank", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+`api/bank/update/${data.id}`, {  
  method:"PUT",
  headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
  body:JSON.stringify(data)
});
try{
  const result=response.json();
  return result;
}catch(error){
  console.log(error);
}
})

export const deleteBank = createAsyncThunk("deleteBank", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/bank/delete/${id}`, {
    method:"DELETE",
    headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
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

// export const findAllBanks=createAsyncThunk("findAllBanks", async()=>{
//   const response=await fetch("http://localhost:9090/api/bank/all/");
//   try{
//     const result=response.json();
//     return result;
//   }catch(error){
//     //rejectWithValue(error.response);
//   }
// })

export const findAllBanks=createAsyncThunk("findAllBanks", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/bank/all/", {
    method:"GET",
    //headers:{"Authorization":"Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMDAwMyIsImlhdCI6MTcyMDI3MzE2OCwiZXhwIjoxNzIwMjkxMTY4fQ.pA1BIAgqcA23Vj_3nSH7RZQzADDVzdojEFYdz0OuRze_gGylbpqRznzN5-fRz5hJDe9TTJ8k45mnNOhjj4dkhw"},
    headers:{"Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    console.log("Authorization = "+currentUser);
    return result;
  }catch(error){
    console.log("error= "+error);
  }
})

export const findBankById=createAsyncThunk("findBankById", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
const response=await fetch(BASE_URL+`api/bank/${id}`,{
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

export const popupBankList=createAsyncThunk("popupBankList", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/bank/popup/",{
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


export const banksSlice = createSlice({
    name:"banksSlice",
    initialState:{
        banks:[], 
        bank:[],
        bankCol:[],
        bankLoading: false, 
        error : null, 
    },

    extraReducers : (builder)=>{
        //Institution
        builder.addCase(createBank.pending, (state)=>{ state.bankLoading=true; })
        builder.addCase(createBank.fulfilled, (state, action)=>{ state.bankLoading=false;state.bank=action.payload; state.error=''; })
        builder.addCase(createBank.rejected, (state, action)=>{state.bankLoading=false; state.error=action.payload;})
        
        builder.addCase(updateBank.pending, (state)=>{ state.bankLoading=true; })
        builder.addCase(updateBank.fulfilled, (state, action)=>{state.bankLoading=false; state.bank=action.payload; state.error=''})
        builder.addCase(updateBank.rejected, (state, action)=>{state.bankLoading=false; state.error=action.payload;})

        builder.addCase(deleteBank.pending, (state)=>{ state.bankLoading=true; })
        builder.addCase(deleteBank.fulfilled, (state, action)=>{state.bankLoading=false; state.bank=action.payload; state.error='';})
        builder.addCase(deleteBank.rejected, (state, action)=>{state.bankLoading=false; state.error=action.payload;})

        builder.addCase(findAllBanks.pending, (state)=>{ state.bankLoading=true; })
        builder.addCase(findAllBanks.fulfilled, (state, action)=>{state.bankLoading=false; state.banks=action.payload;state.bank=null; state.error='';})
        builder.addCase(findAllBanks.rejected, (state, action)=>{state.bankLoading=false; state.error=action.payload;})

        builder.addCase(findBankById.pending, (state)=>{ state.bankLoading=true; })
        builder.addCase(findBankById.fulfilled, (state, action)=>{state.bankLoading=false; state.banks=action.payload; state.error='';})
        builder.addCase(findBankById.rejected, (state, action)=>{state.bankLoading=false; state.error=action.payload;})

        builder.addCase(popupBankList.pending, (state)=>{ state.bankLoading=true; })
        builder.addCase(popupBankList.fulfilled, (state, action)=>{state.bankLoading=false; state.bankCol=action.payload; state.error='';})
        builder.addCase(popupBankList.rejected, (state, action)=>{state.bankLoading=false; state.error=action.payload;})

        
    }
})

export default banksSlice.reducer;