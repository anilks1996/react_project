import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../../serviceUrl/AxiosURL';


//Show
export const findLeaveApplicationById=createAsyncThunk("findLeaveApplicationById", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/leaveApp/byId/${id}`, {
    method:"GET",
    headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
})
export const findLeaveApplicationByEmployeeId=createAsyncThunk("findLeaveApplicationByEmployeeId", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/leaveApp/byEmpId/${id}`, {
    method:"GET",
    headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
})
export const findLeaveApplicationItemById=createAsyncThunk("findLeaveApplicationItemById", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/leaveApp/leaveAppItem/byId/${id}`, {
    method:"GET",
    headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
})
export const findLeaveAppItemByLeaveAppId=createAsyncThunk("findLeaveAppItemByLeaveAppId", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/leaveApp/leaveAppItem/bylvId/${id}`, {
    method:"GET",
    headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
})
export const getListOfEligibleLeaves=createAsyncThunk("getListOfEligibleLeaves", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/leaveApp/leavePolicyList/byEmployee/${data}`, {
    method:"GET",
    headers:{"Content-Type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
})
export const createLeaveApplication = createAsyncThunk("createLeaveApplication", async (data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/leaveApp/create/application/", {
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

export const approveLeaveApplication = createAsyncThunk("approveLeaveApplication", async (data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/leaveApp/approve/leaveApplication/", {
    method:"POST",
    headers:{"Authorization":`Bearer ${currentUser}`,"content-type":"application/json"},
    body:JSON.stringify(data)
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    return rejectWithValue(error.response);
  }
});

export const createLeaveMaster = createAsyncThunk("createLeaveMaster", async (data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"leaveTypeMaster", {
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
    export const showLeaveMasters=createAsyncThunk("showLeaveMasters", async()=>{
        //const response=await fetch("http://localhost:9090/allLeaveTypes");
        const currentUser=localStorage.getItem("current-jwtToken");
        const response=await fetch(BASE_URL+"leaveTypeMaster");
        try{
          const result=response.json();
          return result;
        }catch(error){
          console.log(error);
        }
      })
      export const deleteLeaveMaster = createAsyncThunk("deleteLeaveMaster", async(id)=>{
        const currentUser=localStorage.getItem("current-jwtToken");
        const response=await fetch(BASE_URL+`leaveTypeMaster/${id}`, {
          method:"DELETE",
          headers:{"Content-Type":"application/json"},
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
    
      export const editLeaveMaster = createAsyncThunk("editLeaveMaster", async(data)=>{
        const currentUser=localStorage.getItem("current-jwtToken");
        const response = await fetch(BASE_URL+`leaveTypeMaster/${data.id}`, {
          method:"PUT",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(data)
        })
        try{
          const result=response.json();
          return result;
        }catch(error){
          console.log(error);
        }
      });
      
      export const leaveMasterSlice = createSlice({
        name:"leaveMasterSlice",
        initialState:{
          leaveMasters:[],
          leaveApplications:[],
          leaveApplicationItems:[],
          leavePolicies:[], 
          approvedLeave:[],
          leaveLoading:false,
          loading: false, 
          error : null, 
        },
          //For handling result in following ways-- (3 cases to handle state and action)
        extraReducers : (builder)=>{
          //Anil
          builder.addCase(findLeaveApplicationById.pending, (state)=>{state.loading=true;})
          builder.addCase(findLeaveApplicationById.fulfilled, (state, action)=>{
            state.loading=false;
            state.leaveApplications=action.payload;
            state.error='';
            state.approvedLeave=null;
          })
          builder.addCase(findLeaveApplicationById.rejected, (state, action)=>{state.loading=false; state.approvedLeave=null;  state.error=action.payload;})
          builder.addCase(findLeaveApplicationByEmployeeId.pending, (state)=>{
            state.loading=true;
          })
          builder.addCase(findLeaveApplicationByEmployeeId.fulfilled, (state, action)=>{
            state.loading=false
            state.leaveApplications=action.payload;
            state.error=''
          })
          builder.addCase(findLeaveApplicationByEmployeeId.rejected, (state, action)=>{
            state.loading=false
            state.error=action.payload;
          })
          //Leave App Item
          builder.addCase(findLeaveApplicationItemById.pending, (state)=>{
            state.loading=true;
          })
          builder.addCase(findLeaveApplicationItemById.fulfilled, (state, action)=>{
            state.loading=false
            state.leaveApplicationItems=action.payload;
            state.error=''
          })
          builder.addCase(findLeaveApplicationItemById.rejected, (state, action)=>{
            state.loading=false
            state.error=action.payload;
          })
          builder.addCase(findLeaveAppItemByLeaveAppId.pending, (state)=>{
            state.loading=true;
          })
          builder.addCase(findLeaveAppItemByLeaveAppId.fulfilled, (state, action)=>{
            state.loading=false
            state.leaveApplicationItems=action.payload;
            state.error=''
          })
          builder.addCase(findLeaveAppItemByLeaveAppId.rejected, (state, action)=>{
            state.loading=false
            state.error=action.payload;
          })
          //For Showing
          builder.addCase(showLeaveMasters.pending, (state)=>{
            state.loading=true;
          })
          builder.addCase(showLeaveMasters.fulfilled, (state, action)=>{
            state.loading=false
            state.leaveMasters=action.payload;
            console.log("======== show leave master ========="+action.payload)
            state.error=''
          })
          builder.addCase(showLeaveMasters.rejected, (state, action)=>{
            state.loading=false
            state.error=action.payload;
          })
          //For Delete
          builder.addCase(deleteLeaveMaster.pending, (state)=>{
            state.loading=true;
          })
          builder.addCase(deleteLeaveMaster.fulfilled, (state, action)=>{
            state.loading=false
            //state.departments=action.payload
            console.log("state.leaveMasters===="+state.leaveMasters)
          })
          builder.addCase(deleteLeaveMaster.rejected, (state, action)=>{
            console.log("action.payload===="+action.payload)
            state.loading=false
            state.error=action.payload
          })
          //For create
          builder.addCase(createLeaveMaster.pending, (state)=>{
            state.loading=true;
          })
          builder.addCase(createLeaveMaster.fulfilled, (state, action)=>{
            state.loading=false
            //state.employeeTypes=action.payload
            state.error=''
          })
          builder.addCase(createLeaveMaster.rejected, (state, action)=>{
            state.loading=false
            state.error=action.payload
          })
          //Edit 
          builder.addCase(editLeaveMaster.pending, (state)=>{
            state.loading=true;
          })
          builder.addCase(editLeaveMaster.fulfilled, (state, action)=>{
            state.loading=false
          })
          builder.addCase(editLeaveMaster.rejected, (state, action)=>{
            state.loading=false
            state.error=action.payload
          })
          //Policy list by employee
          builder.addCase(getListOfEligibleLeaves.pending, (state)=>{
            state.loading=true;
          })
          builder.addCase(getListOfEligibleLeaves.fulfilled, (state, action)=>{
            state.loading=false
            state.leavePolicies=action.payload;
          })
          builder.addCase(getListOfEligibleLeaves.rejected, (state, action)=>{
            state.loading=false
            state.error=action.payload
          })
          //create leave application
          builder.addCase(createLeaveApplication.pending, (state)=>{state.loading=true;})
          builder.addCase(createLeaveApplication.fulfilled, (state, action)=>{
            state.loading=false; state.leaveApplications=action.payload;
          })
          builder.addCase(createLeaveApplication.rejected, (state, action)=>{state.loading=false; state.error=action.payload; })

          builder.addCase(approveLeaveApplication.pending, (state)=>{state.leaveLoading=true;})
          builder.addCase(approveLeaveApplication.fulfilled, (state, action)=>{
            state.leaveLoading=false; state.approvedLeave=action.payload;
          })
          builder.addCase(approveLeaveApplication.rejected, (state, action)=>{state.leaveLoading=false; state.error=action.payload; })


        }
        
      });

      export default leaveMasterSlice.reducer;
            
      