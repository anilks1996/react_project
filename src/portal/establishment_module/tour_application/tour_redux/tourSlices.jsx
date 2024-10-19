import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../serviceUrl/AxiosURL';

export const createTourRequest=createAsyncThunk("createTourRequest", async(data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/tour/create/",{
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

export const editTourRequest=createAsyncThunk("editTourRequest", async(data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/tour/edit/${data.id}`,{
        method:"PUT",
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

export const deleteTourRequest=createAsyncThunk("deleteTourRequest", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/tour/delete/${id}`,{
        method:"DELETE",
        headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
        body:JSON.stringify()
    });
    try{
        const result=response.json();
        return result;
    }catch(error){
        console.log(error.response);
    }   
})

export const findTourById=createAsyncThunk("findTourById", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/tour/${id}`,{
        method:"GET",
        headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
        body:JSON.stringify()
    });
    try{
        const result=response.json();
        return result;
    }catch(error){
        console.log(error.response);
    }   
})

export const findTourByEmployeeId=createAsyncThunk("findTourByEmployeeId", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/tour/employee/${id}`,{
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
export const findTourByFileNo=createAsyncThunk("findTourByFileNo", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/tour/fileNo/${data}`,{
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

export const findTourByStatus=createAsyncThunk("findTourByStatus", async(data)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/tour/status/${data}`,{
        method:"GET",
        headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
        body:JSON.stringify(data)
    });
    try{
      const result=response.json();
      return result;
    }catch(error){
      //rejectWithValue(error.response);
    }
  })

  export const findTourByFinancialYear=createAsyncThunk("findTourByFinancialYear", async(data)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/tour/financialYear/${data}`,{
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
    export const findTourByStatusOrFinancialYear=createAsyncThunk("findTourByStatusOrFinancialYear", async({param1,param2})=>{
        const params=new URLSearchParams({param1,param2}).toString();
        const currentUser=localStorage.getItem("current-jwtToken");
        const response=await fetch(BASE_URL+`api/tour/statusOrFy?${params}`,{
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

//Tour Claim
export const createTourClaim=createAsyncThunk("createTourClaim", async(data, {rejectWithValue})=>{
    const currentUser=localStorage.getItem("current-jwtToken");
      const response=await fetch(BASE_URL+"api/tourClaim/create/",{
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
  
  export const editTourClaim=createAsyncThunk("editTourClaim", async(data, {rejectWithValue})=>{
    const currentUser=localStorage.getItem("current-jwtToken");
      const response=await fetch(BASE_URL+`api/tourClaim/edit/${data.id}`,{
          method:"PUT",
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
  
  export const deleteTourClaim=createAsyncThunk("deleteTourClaim", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
      const response=await fetch(BASE_URL+`api/tourClaim/delete/${id}`,{
          method:"DELETE",
          headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
          body:JSON.stringify()
      });
      try{
          const result=response.json();
          return result;
      }catch(error){
          console.log(error.response);
      }   
  })
  
  export const findTourClaimById=createAsyncThunk("findTourClaimById", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
      const response=await fetch(BASE_URL+`api/tourClaim/${id}`,{
          method:"GET",
          headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
          body:JSON.stringify()
      });
      try{
          const result=response.json();
          return result;
      }catch(error){
          console.log(error.response);
      }   
  })
  
  export const findTourClaimByEmployeeId=createAsyncThunk("findTourClaimByEmployeeId", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
      const response=await fetch(BASE_URL+`api/tourClaim/employee/${id}`,{
          method:"GET",
          headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
          body:JSON.stringify()
      });
      try{
          const result=response.json();
          return result;
      }catch(error){
          console.log(error.response);
      }   
  })
  export const findTourClaimByStatus=createAsyncThunk("findTourClaimByStatus", async(data)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
      const response=await fetch(BASE_URL+`api/tourClaim/status/${data}`,{
          method:"GET",
          headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
          body:JSON.stringify()
      });
      try{
          const result=response.json();
          return result;
      }catch(error){
          console.log(error.response);
      }   
  })
  export const findTourClaimByFinancialYear=createAsyncThunk("findTourClaimByFinancialYear", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
      const response=await fetch(BASE_URL+`api/tourClaim/financialYear/${id}`,{
          method:"GET",
          headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
          body:JSON.stringify()
      });
      try{
          const result=response.json();
          return result;
      }catch(error){
          console.log(error.response);
      }   
  })
  export const findTourClaimByTourClaimNo=createAsyncThunk("findTourClaimByTourClaimNo", async(data)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/tour/tourClaimNo/${data}`,{
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
  export const findTourClaimByStatusOrFinancialYear=createAsyncThunk("findTourClaimByStatusOrFinancialYear", async({param1,param2})=>{
    const params=new URLSearchParams({param1,param2}).toString();
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/tourClaim/statusOrFy?${params}`,{
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

  export const getTotalNoOfDays=createAsyncThunk("getTotalNoOfDays", async({param1,param2})=>{
    const params=new URLSearchParams({param1,param2}).toString();
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/tour/totalDays?${params}`,{
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
export const getTotalTime=createAsyncThunk("getTotalTime", async({param1,param2})=>{
    const params=new URLSearchParams({param1,param2}).toString();
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/tour/totalTime?${params}`,{
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


export const tourSlices = createSlice({
    name:"tourSlices",
    initialState:{
        tours:[],
        tour:[],
        tourClaim:[],
        tourClaims:[],
        tourCreateLoading:false,
        tourUpdateLoading:false,
        tourClaimCreateLoading:false,
        tourClaimUpdateLoading:false,
        totalDays:[],
        totalTime:[],
        loading: false, 
        error : null, 
    },

    extraReducers : (builder)=>{
    //Tour
        builder.addCase(createTourRequest.pending, (state)=>{ state.tourCreateLoading=true; })
        builder.addCase(createTourRequest.fulfilled, (state, action)=>{ state.tourCreateLoading=false; state.tour=action.payload; state.error=''; })
        builder.addCase(createTourRequest.rejected, (state, action)=>{ state.tourCreateLoading=false; state.error=action.payload; })
        
        builder.addCase(editTourRequest.pending, (state)=>{ state.tourUpdateLoading=true; })
        builder.addCase(editTourRequest.fulfilled, (state, action)=>{ state.tourUpdateLoading=false;  state.tour=action.payload; state.error='';})
        builder.addCase(editTourRequest.rejected, (state, action)=>{ state.tourUpdateLoading=false; state.error=action.payload; })
        
        builder.addCase(deleteTourRequest.pending, (state)=>{ state.tourUpdateLoading=true; })
        builder.addCase(deleteTourRequest.fulfilled, (state, action)=>{  state.tourUpdateLoading=false; state.tour=action.payload; state.error=''; })
        builder.addCase(deleteTourRequest.rejected, (state, action)=>{ state.tourUpdateLoading=false; state.error=action.payload; })
        
        builder.addCase(findTourById.pending, (state)=>{ state.tourUpdateLoading=true; })
        builder.addCase(findTourById.fulfilled, (state, action)=>{  state.tourUpdateLoading=false; state.tour=action.payload; state.error=''; })
        builder.addCase(findTourById.rejected, (state, action)=>{ state.tourUpdateLoading=false; state.error=action.payload; })
        
        builder.addCase(findTourByFileNo.pending, (state)=>{ state.tourUpdateLoading=true; })
        builder.addCase(findTourByFileNo.fulfilled, (state, action)=>{  state.tourUpdateLoading=false; state.tour=action.payload; state.error=''; })
        builder.addCase(findTourByFileNo.rejected, (state, action)=>{ state.tourUpdateLoading=false; state.error=action.payload; })
        builder.addCase(findTourByStatus.pending, (state)=>{ state.tourUpdateLoading=true; })
        builder.addCase(findTourByStatus.fulfilled, (state, action)=>{  state.tourUpdateLoading=false; state.tours=action.payload; state.error=''; })
        builder.addCase(findTourByStatus.rejected, (state, action)=>{ state.tourUpdateLoading=false; state.error=action.payload; })
        
        builder.addCase(findTourByEmployeeId.pending, (state)=>{ state.tourUpdateLoading=true; })
        builder.addCase(findTourByEmployeeId.fulfilled, (state, action)=>{  state.tourUpdateLoading=false; state.tours=action.payload; state.error=''; })
        builder.addCase(findTourByEmployeeId.rejected, (state, action)=>{ state.tourUpdateLoading=false; state.error=action.payload; })
        builder.addCase(findTourByFinancialYear.pending, (state)=>{ state.tourUpdateLoading=true; })
        builder.addCase(findTourByFinancialYear.fulfilled, (state, action)=>{  state.tourUpdateLoading=false; state.tours=action.payload; state.error=''; })
        builder.addCase(findTourByFinancialYear.rejected, (state, action)=>{ state.tourUpdateLoading=false; state.error=action.payload; })        
        
        builder.addCase(findTourByStatusOrFinancialYear.pending, (state)=>{ state.tourUpdateLoading=true; })
        builder.addCase(findTourByStatusOrFinancialYear.fulfilled, (state, action)=>{  state.tourUpdateLoading=false; state.tours=action.payload; state.error=''; })
        builder.addCase(findTourByStatusOrFinancialYear.rejected, (state, action)=>{ state.tourUpdateLoading=false; state.error=action.payload; })        
   
        builder.addCase(getTotalNoOfDays.pending, (state)=>{ state.tourUpdateLoading=true; })
        builder.addCase(getTotalNoOfDays.fulfilled, (state, action)=>{  state.tourUpdateLoading=false; state.totalDays=action.payload; state.error=''; })
        builder.addCase(getTotalNoOfDays.rejected, (state, action)=>{ state.tourUpdateLoading=false; state.error=action.payload; })        
        builder.addCase(getTotalTime.pending, (state)=>{ state.tourUpdateLoading=true; })
        builder.addCase(getTotalTime.fulfilled, (state, action)=>{  state.tourUpdateLoading=false; state.totalTime=action.payload; state.error=''; })
        builder.addCase(getTotalTime.rejected, (state, action)=>{ state.tourUpdateLoading=false; state.error=action.payload; })        
   
    //Tour Claim
        builder.addCase(createTourClaim.pending, (state)=>{ state.tourClaimCreateLoading=true; })
        builder.addCase(createTourClaim.fulfilled, (state, action)=>{ state.tourClaimCreateLoading=false; state.tourClaim=action.payload; state.error=''; })
        builder.addCase(createTourClaim.rejected, (state, action)=>{ state.tourClaimCreateLoading=false; state.error=action.payload; })
        
        builder.addCase(editTourClaim.pending, (state)=>{ state.tourClaimUpdateLoading=true; })
        builder.addCase(editTourClaim.fulfilled, (state, action)=>{ state.tourClaimUpdateLoading=false;  state.tourClaim=action.payload; state.error='';})
        builder.addCase(editTourClaim.rejected, (state, action)=>{ state.tourClaimUpdateLoading=false; state.error=action.payload; })
        
        builder.addCase(deleteTourClaim.pending, (state)=>{ state.tourClaimUpdateLoading=true; })
        builder.addCase(deleteTourClaim.fulfilled, (state, action)=>{  state.tourClaimUpdateLoading=false; state.tourClaim=action.payload; state.error=''; })
        builder.addCase(deleteTourClaim.rejected, (state, action)=>{ state.tourClaimUpdateLoading=false; state.error=action.payload; })
        
        builder.addCase(findTourClaimById.pending, (state)=>{ state.tourClaimUpdateLoading=true; })
        builder.addCase(findTourClaimById.fulfilled, (state, action)=>{  state.tourClaimUpdateLoading=false; state.tourClaim=action.payload; state.error=''; })
        builder.addCase(findTourClaimById.rejected, (state, action)=>{ state.tourClaimUpdateLoading=false; state.error=action.payload; })
        
        builder.addCase(findTourClaimByTourClaimNo.pending, (state)=>{ state.tourClaimUpdateLoading=true; })
        builder.addCase(findTourClaimByTourClaimNo.fulfilled, (state, action)=>{  state.tourClaimUpdateLoading=false; state.tourClaim=action.payload; state.error=''; })
        builder.addCase(findTourClaimByTourClaimNo.rejected, (state, action)=>{ state.tourClaimUpdateLoading=false; state.error=action.payload; })
        builder.addCase(findTourClaimByStatus.pending, (state)=>{ state.tourClaimUpdateLoading=true; })
        builder.addCase(findTourClaimByStatus.fulfilled, (state, action)=>{  state.tourClaimUpdateLoading=false; state.tourClaims=action.payload; state.error=''; })
        builder.addCase(findTourClaimByStatus.rejected, (state, action)=>{ state.tourClaimUpdateLoading=false; state.error=action.payload; })
        
        builder.addCase(findTourClaimByEmployeeId.pending, (state)=>{ state.tourClaimUpdateLoading=true; })
        builder.addCase(findTourClaimByEmployeeId.fulfilled, (state, action)=>{  state.tourClaimUpdateLoading=false; state.tourClaims=action.payload; state.error=''; })
        builder.addCase(findTourClaimByEmployeeId.rejected, (state, action)=>{ state.tourClaimUpdateLoading=false; state.error=action.payload; })
        builder.addCase(findTourClaimByFinancialYear.pending, (state)=>{ state.tourClaimUpdateLoading=true; })
        builder.addCase(findTourClaimByFinancialYear.fulfilled, (state, action)=>{  state.tourClaimUpdateLoading=false; state.tourClaims=action.payload; state.error=''; })
        builder.addCase(findTourClaimByFinancialYear.rejected, (state, action)=>{ state.tourClaimUpdateLoading=false; state.error=action.payload; })        

        builder.addCase(findTourClaimByStatusOrFinancialYear.pending, (state)=>{ state.tourClaimUpdateLoading=true; })
        builder.addCase(findTourClaimByStatusOrFinancialYear.fulfilled, (state, action)=>{  state.tourClaimUpdateLoading=false; state.tourClaims=action.payload; state.error=''; })
        builder.addCase(findTourClaimByStatusOrFinancialYear.rejected, (state, action)=>{ state.tourClaimUpdateLoading=false; state.error=action.payload; })        



    }
})

export default tourSlices.reducer;