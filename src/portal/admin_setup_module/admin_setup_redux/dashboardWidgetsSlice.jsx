import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../../serviceUrl/AxiosURL";


export const createDashboardWidget = createAsyncThunk("createDashboardWidget",async(data,{rejectWithValue})=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/dashboardWidget/create", {
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

export const updateDashboardWidget=createAsyncThunk("updateDashboardWidget", async(data, {rejectWithValue})=>{
const currentUser=localStorage.getItem("current-jwtToken");
const response=await fetch(BASE_URL+`api/dashboardWidget/edit/${data.id}`, {
    method:"PUT",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify(data)
});
try {
const result=response.json();
return result;
} catch (error) {
return rejectWithValue(error.response);
}
})
export const deleteDashboardWidget=createAsyncThunk("deleteDashboardWidget", async(id)=>{
const currentUser=localStorage.getItem("current-jwtToken");
const response=await fetch(BASE_URL+`api/dashboardWidget/delete/${id}`, {
    method:"GET",
    headers:{"Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
});
try{
    const result=response.json();
    return result;
}catch(error){
    //rejectWithValue(error.response);
}
})

export const findDashboardWidgetById=createAsyncThunk("findDashboardWidgetById", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/dashboardWidget/${id}`, {
      method:"GET",
      headers:{"Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
      const result=response.json();
      return result;
    }catch(error){
      //rejectWithValue(error.response);
    }
})

export const findAllDashboardWidgets=createAsyncThunk("findAllDashboardWidgets", async(id)=>{
const currentUser=localStorage.getItem("current-jwtToken");
const response=await fetch(BASE_URL+"api/dashboardWidget/", {
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


export const dashboardWidgetsSlice = createSlice({
    name:'dashboardWidgetsSlice',
    initialState:{
        dashboardWidget:[],
        dashboardWidgets:[],
        group:[],
        dwLoading:[],
        loading:false,
        error:null,
    },
    extraReducers : (builder)=>{
        builder.addCase(createDashboardWidget.pending, (state)=>{state.dwLoading=true; })
        builder.addCase(createDashboardWidget.fulfilled, (state, action)=>{ state.dwLoading=false; state.dashboardWidget=action.payload; state.error=''; })
        builder.addCase(createDashboardWidget.rejected, (state, action)=>{state.dwLoading=false; state.error=action.payload; })
       
        builder.addCase(updateDashboardWidget.pending, (state)=>{state.dwLoading=true; })
        builder.addCase(updateDashboardWidget.fulfilled, (state, action)=>{ state.dwLoading=false; state.dashboardWidget=action.payload; state.error=''; })
        builder.addCase(updateDashboardWidget.rejected, (state, action)=>{state.dwLoading=false; state.error=action.payload; })
       
        builder.addCase(deleteDashboardWidget.pending, (state)=>{state.dwLoading=true; })
        builder.addCase(deleteDashboardWidget.fulfilled, (state, action)=>{ state.dwLoading=false; state.dashboardWidgets=action.payload; state.error=''; })
        builder.addCase(deleteDashboardWidget.rejected, (state, action)=>{state.dwLoading=false; state.error=action.payload; })
       
        builder.addCase(findDashboardWidgetById.pending, (state)=>{state.dwLoading=true; })
        builder.addCase(findDashboardWidgetById.fulfilled, (state, action)=>{ state.dwLoading=false; state.dashboardWidget=action.payload; state.error=''; })
        builder.addCase(findDashboardWidgetById.rejected, (state, action)=>{state.dwLoading=false; state.error=action.payload; })
       
        builder.addCase(findAllDashboardWidgets.pending, (state)=>{state.dwLoading=true; })
        builder.addCase(findAllDashboardWidgets.fulfilled, (state, action)=>{ state.dwLoading=false; state.dashboardWidgets=action.payload; state.error=''; })
        builder.addCase(findAllDashboardWidgets.rejected, (state, action)=>{state.dwLoading=false; state.error=action.payload; })

    }
})

export default dashboardWidgetsSlice.reducer;