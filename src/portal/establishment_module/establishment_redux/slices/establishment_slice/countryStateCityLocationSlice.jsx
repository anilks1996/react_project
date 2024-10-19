import { combineReducers, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../../../../serviceUrl/AxiosURL";


export const createCountry = createAsyncThunk("createCountry", async(data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+"api/country/", {  
        method:"POST",
        headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
        body:JSON.stringify(data)
    })
    try{
        const result = response.json();
        return result;
    }catch(error){
        return rejectWithValue(error.response); 
    }
});
export const showCountry = createAsyncThunk("showCountry", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+"api/country/",{
      method:"GET",
      headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
        const result=response.json();
        return result;
      }catch(error){
         console.log(error) 
      }
});
export const showCountryById = createAsyncThunk("showCountryById", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+`api/country/${id}`,{
      method:"GET",
      headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
        const result=response.json();
        return result;
      }catch(error){
         console.log(error) 
      }
});

export const deleteCountry = createAsyncThunk("deleteCountry", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/country/${id}`, { 
      method:"DELETE",
      headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{ const result=response.json();
      return result;
    }catch(error){console.log("error= "+error); }
})

export const editCountry = createAsyncThunk("editCountry", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+`api/country/${data.id}`, {  
    method:"PUT",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify(data)
  })
  try{const result=response.json();
    return result;
  }catch(error){ console.log(error); }
});

//For State
export const createState = createAsyncThunk("createState", async(data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+"api/state/", {  
      method:"POST",
      headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify(data)
  })
  try{
      const result = response.json();
      return result;
  }catch(error){
      return rejectWithValue(error.response); 
  }
});
export const showState = createAsyncThunk("showState", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+"api/state/",{
    method:"GET",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
      const result=response.json();
      return result;
    }catch(error){
       console.log(error) 
    }
});
export const showStateById = createAsyncThunk("showStateById", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+`api/state/${id}`,{
    method:"GET",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
      const result=response.json();
      return result;
    }catch(error){
       console.log(error) 
    }
});

export const showStateByCountryId = createAsyncThunk("showStateByCountryId", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+`api/state/byCountryId/${id}`,{
    method:"GET",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
      const result=response.json();
      return result;
    }catch(error){
       console.log(error) 
    }
});
export const deleteState = createAsyncThunk("deleteState", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/state/${id}`, {  
    method:"DELETE",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{ const result=response.json();
    return result;
  }catch(error){console.log("error= "+error); }
})
export const editState = createAsyncThunk("editState", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
const response = await fetch(BASE_URL+`api/state/${data.id}`, {  
  method:"PUT",
  headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
  body:JSON.stringify(data)
})
try{const result=response.json();
  return result;
}catch(error){ console.log(error); }
});
//For City
export const createCity = createAsyncThunk("createCity", async(data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+"api/city/", {
      method:"POST",
      headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify(data)
  })
  try{
      const result = response.json();
      return result;
  }catch(error){
      return rejectWithValue(error.response); 
  }
});
export const showCity = createAsyncThunk("showCity", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+"api/city/",{
    method:"GET",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
      const result=response.json();
      return result;
    }catch(error){
       console.log(error) 
    }
});
export const showCityById = createAsyncThunk("showCityById", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+`api/city/${id}`,{
    method:"GET",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
      const result=response.json();
      return result;
    }catch(error){
       console.log(error) 
    }
});

export const showCityByStateId = createAsyncThunk("showCityByStateId", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+`api/city/byStateId/${id}`,{
    method:"GET",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
      const result=response.json();
      return result;
    }catch(error){
       console.log(error) 
    }
});
export const deleteCity = createAsyncThunk("deleteCity", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/city/${id}`, {  
    method:"DELETE",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{ const result=response.json();
    return result;
  }catch(error){console.log("error= "+error); }
})
export const editCity = createAsyncThunk("editCity", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
const response = await fetch(BASE_URL+`api/city/${data.id}`, {  
  method:"PUT",
  headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
  body:JSON.stringify(data)
})
try{const result=response.json();
  return result;
}catch(error){ console.log(error); }
});

//For LocationInCity
export const createLocationInCity = createAsyncThunk("createLocationInCity", async(data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+"api/locationInCity/", {  
      method:"POST",
      headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify(data)
  })
  try{
      const result = response.json();
      return result;
  }catch(error){
      return rejectWithValue(error.response); 
  }
});
export const showLocationInCityByCityId = createAsyncThunk("showLocationInCityByCityId", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+`api/locationInCity/byCityId/${id}`,{
    method:"GET",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
      const result=response.json();
      return result;
    }catch(error){
       console.log(error) 
    }
});
export const showLocationInCity = createAsyncThunk("showLocationInCity", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+"api/locationInCity/",{
    method:"GET",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
      const result=response.json();
      return result;
    }catch(error){
       console.log(error) 
    }
});
export const showLocationInCityById = createAsyncThunk("showLocationInCityById", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response = await fetch(BASE_URL+`api/locationInCity/${id}`,{
    method:"GET",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
      const result=response.json();
      return result;
    }catch(error){
       console.log(error) 
    }
});

export const deleteLocationInCity = createAsyncThunk("deleteLocationInCity", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/locationInCity/${id}`, {  
    method:"DELETE",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{ const result=response.json();
    return result;
  }catch(error){console.log("error= "+error); }
})

export const editLocationInCity = createAsyncThunk("editLocationInCity", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
const response = await fetch(BASE_URL+`api/locationInCity/${data.id}`, {  
  method:"PUT",
  headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
  body:JSON.stringify(data)
})
try{const result=response.json();
  return result;
}catch(error){ console.log(error); }
});


export const countryStateCityLocationSlice = createSlice({name:"countryStateCityLocationSlice",
    initialState:{
        country:[],
        countries:[],
        stateObj:[],
        states:[],
        city:[],
        cities:[],
        locationInCity:[],
        locationInCities:[],
        Cityading:false,
        error:null,
    },
    extraReducers : (builder)=>{
      //For country slice
        builder.addCase(createCountry.pending, (state)=>{ state.loading=true; })
        builder.addCase(createCountry.fulfilled, (state, action)=>{ state.loading=false; state.error='';})
        builder.addCase(createCountry.rejected, (state, action)=>{ state.loading=false; state.error=action.payload;})

        builder.addCase(showCountry.pending, (state)=>{ state.loading=true; })
        builder.addCase(showCountry.fulfilled, (state, action)=>{ state.loading=false; state.error=''; state.countries=action.payload;})
        builder.addCase(showCountry.rejected, (state, action)=>{ state.loading=false; state.error=action.payload;})
        builder.addCase(showCountryById.pending, (state)=>{ state.loading=true; })
        builder.addCase(showCountryById.fulfilled, (state, action)=>{ state.loading=false; state.error=''; state.country=action.payload;})
        builder.addCase(showCountryById.rejected, (state, action)=>{ state.loading=false; state.error=action.payload;})


        builder.addCase(editCountry.pending, (state)=>{ state.loading=true; })
        builder.addCase(editCountry.fulfilled, (state, action)=>{ state.loading=false; state.error=''; })
        builder.addCase(editCountry.rejected, (state, action)=>{ state.loading=false; state.error=action.payload;})
        
        builder.addCase(deleteCountry.pending, (state)=>{ state.loading=true; })
        builder.addCase(deleteCountry.fulfilled, (state, action)=>{ state.loading=false; state.error=''; state.countries=action.payload;})
        builder.addCase(deleteCountry.rejected, (state, action)=>{ state.loading=false; state.error=action.payload;})  
  //For state slice
        builder.addCase(createState.pending, (state)=>{ state.loading=true; })
        builder.addCase(createState.fulfilled, (state, action)=>{ state.loading=false; state.error='';})
        builder.addCase(createState.rejected, (state, action)=>{ state.loading=false; state.error=action.payload;})

        builder.addCase(showState.pending, (state)=>{ state.loading=true; })
        builder.addCase(showState.fulfilled, (state, action)=>{ state.loading=false; state.error=''; state.states=action.payload;})
        builder.addCase(showState.rejected, (state, action)=>{ state.loading=false; state.error=action.payload;})
        builder.addCase(showStateById.pending, (state)=>{ state.loading=true; })
        builder.addCase(showStateById.fulfilled, (state, action)=>{ state.loading=false; state.error=''; state.stateObj=action.payload;})
        builder.addCase(showStateById.rejected, (state, action)=>{ state.loading=false; state.error=action.payload;})

        builder.addCase(showStateByCountryId.pending, (state)=>{ state.loading=true; })
        builder.addCase(showStateByCountryId.fulfilled, (state, action)=>{ state.loading=false; state.error=''; state.states=action.payload;})
        builder.addCase(showStateByCountryId.rejected, (state, action)=>{ state.loading=false; state.error=action.payload;})


        builder.addCase(editState.pending, (state)=>{ state.loading=true; })
        builder.addCase(editState.fulfilled, (state, action)=>{ state.loading=false; state.error=''; })
        builder.addCase(editState.rejected, (state, action)=>{ state.loading=false; state.error=action.payload;})

        builder.addCase(deleteState.pending, (state)=>{ state.loading=true; })
        builder.addCase(deleteState.fulfilled, (state, action)=>{ state.loading=false; state.error=''; state.states=action.payload;})
        builder.addCase(deleteState.rejected, (state, action)=>{ state.loading=false; state.error=action.payload;})
    //For city slice
        builder.addCase(createCity.pending, (state)=>{ state.loading=true; })
        builder.addCase(createCity.fulfilled, (state, action)=>{ state.loading=false; state.error='';})
        builder.addCase(createCity.rejected, (state, action)=>{ state.loading=false; state.error=action.payload;})

        builder.addCase(showCity.pending, (state)=>{ state.loading=true; })
        builder.addCase(showCity.fulfilled, (state, action)=>{ state.loading=false; state.error=''; state.cities=action.payload;})
        builder.addCase(showCity.rejected, (state, action)=>{ state.loading=false; state.error=action.payload;})
        builder.addCase(showCityById.pending, (state)=>{ state.loading=true; })
        builder.addCase(showCityById.fulfilled, (state, action)=>{ state.loading=false; state.error=''; state.city=action.payload;})
        builder.addCase(showCityById.rejected, (state, action)=>{ state.loading=false; state.error=action.payload;})
       
        builder.addCase(showCityByStateId.pending, (state)=>{ state.loading=true; })
        builder.addCase(showCityByStateId.fulfilled, (state, action)=>{ state.loading=false; state.error=''; state.cities=action.payload;})
        builder.addCase(showCityByStateId.rejected, (state, action)=>{ state.loading=false; state.error=action.payload;})

        builder.addCase(editCity.pending, (state)=>{ state.loading=true; })
        builder.addCase(editCity.fulfilled, (state, action)=>{ state.loading=false; state.error=''; })
        builder.addCase(editCity.rejected, (state, action)=>{ state.loading=false; state.error=action.payload;})

        builder.addCase(deleteCity.pending, (state)=>{ state.loading=true; })
        builder.addCase(deleteCity.fulfilled, (state, action)=>{ state.loading=false; state.error=''; state.cities=action.payload;})
        builder.addCase(deleteCity.rejected, (state, action)=>{ state.loading=false; state.error=action.payload;})
      //For locatyionInCity slice
        builder.addCase(createLocationInCity.pending, (state)=>{ state.loading=true; })
        builder.addCase(createLocationInCity.fulfilled, (state, action)=>{ state.loading=false; state.error='';})
        builder.addCase(createLocationInCity.rejected, (state, action)=>{ state.loading=false; state.error=action.payload;})

        builder.addCase(showLocationInCity.pending, (state)=>{ state.loading=true; })
        builder.addCase(showLocationInCity.fulfilled, (state, action)=>{ state.loading=false; state.error=''; state.locationInCities=action.payload;})
        builder.addCase(showLocationInCity.rejected, (state, action)=>{ state.loading=false; state.error=action.payload;})
        builder.addCase(showLocationInCityById.pending, (state)=>{ state.loading=true; })
        builder.addCase(showLocationInCityById.fulfilled, (state, action)=>{ state.loading=false; state.error=''; state.locationInCity=action.payload;})
        builder.addCase(showLocationInCityById.rejected, (state, action)=>{ state.loading=false; state.error=action.payload;})
        
        builder.addCase(showLocationInCityByCityId.pending, (state)=>{ state.loading=true; })
        builder.addCase(showLocationInCityByCityId.fulfilled, (state, action)=>{ state.loading=false; state.error=''; state.locationInCities=action.payload;})
        builder.addCase(showLocationInCityByCityId.rejected, (state, action)=>{ state.loading=false; state.error=action.payload;})


        builder.addCase(editLocationInCity.pending, (state)=>{ state.loading=true; })
        builder.addCase(editLocationInCity.fulfilled, (state, action)=>{ state.loading=false; state.error=''; })
        builder.addCase(editLocationInCity.rejected, (state, action)=>{ state.loading=false; state.error=action.payload;})

        builder.addCase(deleteLocationInCity.pending, (state)=>{ state.loading=true; })
        builder.addCase(deleteLocationInCity.fulfilled, (state, action)=>{ state.loading=false; state.error=''; state.locationInCities=action.payload;})
        builder.addCase(deleteLocationInCity.rejected, (state, action)=>{ state.loading=false; state.error=action.payload;})      
   }
});

export default countryStateCityLocationSlice.reducer;
