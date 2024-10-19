import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../../serviceUrl/AxiosURL';


export const createBankBranch = createAsyncThunk("createBankBranch", async (data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/bankbranch/create/", {
    method:"POST",
    headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify(data)
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    return rejectWithValue(error.response);
  }
});

export const updateBankBranch=createAsyncThunk("updateBankBranch", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+`api/bankbranch/update/${data.id}`, {  
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

export const deleteBankBranch = createAsyncThunk("deleteBankBranch", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/bankbranch/delete/${id}`, {
    method:"DELETE",
    headers:{"content-type":"application/json"},
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

export const findAllBankBranchs=createAsyncThunk("findAllBankBranchs", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/bankbranch/all/",{
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

export const findBankBranchById=createAsyncThunk("findBankBranchById", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
const response=await fetch(BASE_URL+`api/bankbranch/${id}`,{
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
export const filterBankBranchById=createAsyncThunk("filterBankBranchById", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/bankbranch/filter/${id}`,{
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

export const popupBankBranchList=createAsyncThunk("popupBankBranchList", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/bankbranch/popup/",{
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


export const bankBranchesSlice = createSlice({
    name:"bankBranchesSlice",
    initialState:{
        bankBranches:[], 
        bankBranch:[],
        bankBranchCol:[],
        bankBranchLoading: false, 
        error : null, 
    },

    extraReducers : (builder)=>{
        //Institution
        builder.addCase(createBankBranch.pending, (state)=>{ state.bankBranchLoading=true; })
        builder.addCase(createBankBranch.fulfilled, (state, action)=>{ state.bankBranchLoading=false;state.bankBranch=action.payload; state.error=''; })
        builder.addCase(createBankBranch.rejected, (state, action)=>{state.bankBranchLoading=false; state.error=action.payload;})
        
        builder.addCase(updateBankBranch.pending, (state)=>{ state.bankBranchLoading=true; })
        builder.addCase(updateBankBranch.fulfilled, (state, action)=>{state.bankBranchLoading=false; state.bankBranch=action.payload; state.error=''})
        builder.addCase(updateBankBranch.rejected, (state, action)=>{state.bankBranchLoading=false; state.error=action.payload;})

        builder.addCase(deleteBankBranch.pending, (state)=>{ state.bankBranchLoading=true; })
        builder.addCase(deleteBankBranch.fulfilled, (state, action)=>{state.bankBranchLoading=false; state.bankBranch=action.payload; state.error='';})
        builder.addCase(deleteBankBranch.rejected, (state, action)=>{state.bankBranchLoading=false; state.error=action.payload;})

        builder.addCase(findAllBankBranchs.pending, (state)=>{ state.bankBranchLoading=true; })
        builder.addCase(findAllBankBranchs.fulfilled, (state, action)=>{state.bankBranchLoading=false; state.bankBranches=action.payload;state.bankBranch=null; state.error='';})
        builder.addCase(findAllBankBranchs.rejected, (state, action)=>{state.bankBranchLoading=false; state.error=action.payload;})

        builder.addCase(findBankBranchById.pending, (state)=>{ state.bankBranchLoading=true; })
        builder.addCase(findBankBranchById.fulfilled, (state, action)=>{state.bankBranchLoading=false; state.bankBranches=action.payload; state.error='';})
        builder.addCase(findBankBranchById.rejected, (state, action)=>{state.bankBranchLoading=false; state.error=action.payload;})

        builder.addCase(filterBankBranchById.pending, (state)=>{ state.bankBranchLoading=true; })
        builder.addCase(filterBankBranchById.fulfilled, (state, action)=>{state.bankBranchLoading=false; state.bankBranches=action.payload; state.error='';})
        builder.addCase(filterBankBranchById.rejected, (state, action)=>{state.bankBranchLoading=false; state.error=action.payload;})

        builder.addCase(popupBankBranchList.pending, (state)=>{ state.bankBranchLoading=true; })
        builder.addCase(popupBankBranchList.fulfilled, (state, action)=>{state.bankBranchLoading=false; state.bankBranchCol=action.payload; state.error='';})
        builder.addCase(popupBankBranchList.rejected, (state, action)=>{state.bankBranchLoading=false; state.error=action.payload;})

        
    }
})

export default bankBranchesSlice.reducer;