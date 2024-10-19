import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../../serviceUrl/AxiosURL';

export const createLeaveType = createAsyncThunk("createLeaveType", async (data, {rejectWithValue})=>{
    const response=await fetch(BASE_URL+"leaveTypeList", {
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(data)
    });
    try{
        const result=response.json();
        return result;
      }catch(error){
        return rejectWithValue(error.response);
      }
    });
    export const showLeaveType=createAsyncThunk("showLeaveType", async()=>{
        //const response=await fetch("http://localhost:9090/allLeaveTypes");
        const response=await fetch(BASE_URL+"leaveTypeList");
        try{
          const result=response.json();
          return result;
        }catch(error){
          console.log(error);
        }
      })
      export const deleteLeaveType = createAsyncThunk("deleteLeaveType", async(id)=>{
        const response=await fetch(BASE_URL+`leaveTypeList/${id}`, {
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
    
      export const editLeaveType = createAsyncThunk("editLeaveType", async(data)=>{
        const response = await fetch(BASE_URL+`leaveTypeList/${data.id}`, {
          method:"PUT",
          headers:{"content-type":"application/json"},
          body:JSON.stringify(data)
        })
        try{
          const result=response.json();
          return result;
        }catch(error){
          console.log(error);
        }
      });
      
      export const leaveTypeSlice = createSlice({
        name:"leaveTypeSlice",
        initialState:{
          leaveTypes:[], 
          loading: false, 
          error : null, 
        },
          //For handling result in following ways-- (3 cases to handle state and action)
        extraReducers : (builder)=>{
          //For Showing
          builder.addCase(showLeaveType.pending, (state)=>{
            state.loading=true;
          })
          builder.addCase(showLeaveType.fulfilled, (state, action)=>{
            state.loading=false
            state.leaveTypes=action.payload
            state.error=''
          })
          builder.addCase(showLeaveType.rejected, (state, action)=>{
            state.loading=false
            state.error=action.payload
          })
          //For Delete
          builder.addCase(deleteLeaveType.pending, (state)=>{
            state.loading=true;
          })
          builder.addCase(deleteLeaveType.fulfilled, (state, action)=>{
            state.loading=false
            //state.departments=action.payload
            console.log("state.departments===="+state.departments)
          })
          builder.addCase(deleteLeaveType.rejected, (state, action)=>{
            console.log("action.payload===="+action.payload)
            state.loading=false
            state.error=action.payload
          })
          //For create
          builder.addCase(createLeaveType.pending, (state)=>{
            state.loading=true;
          })
          builder.addCase(createLeaveType.fulfilled, (state, action)=>{
            state.loading=false
            //state.employeeTypes=action.payload
            state.error=''
          })
          builder.addCase(createLeaveType.rejected, (state, action)=>{
            state.loading=false
            state.error=action.payload
          })
          //Edit 
          builder.addCase(editLeaveType.pending, (state)=>{
            state.loading=true;
          })
          builder.addCase(editLeaveType.fulfilled, (state, action)=>{
            state.loading=false
            //state.departments=action.payload
            //state.error=''
          })
          builder.addCase(editLeaveType.rejected, (state, action)=>{
            state.loading=false
            state.error=action.payload
          })
        }
        
      });
      export default leaveTypeSlice.reducer;
            
      