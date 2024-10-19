import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../../serviceUrl/AxiosURL';

export const createLeaveAllocation = createAsyncThunk("createLeaveAllocation", async (data, {rejectWithValue})=>{
    const response=await fetch(BASE_URL+"leaveTransaction", {
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
    export const showLeaveAllocation=createAsyncThunk("showLeaveAllocation", async()=>{
        //const response=await fetch("http://localhost:9090/allLeaveTypes");
        const response=await fetch(BASE_URL+"leaveTransaction");
        try{
          const result=response.json();
          return result;
        }catch(error){
          console.log(error);
        }
      })
      export const deleteLeaveAllocation = createAsyncThunk("deleteLeaveAllocation", async(id)=>{
        const response=await fetch(BASE_URL+`leaveTransaction/${id}`, {
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
    
      export const editLeaveAllocation = createAsyncThunk("editLeaveAllocation", async(data)=>{
        const response = await fetch(BASE_URL+`leaveTransaction/${data.id}`, {
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
      export const leaveAllocationSlice = createSlice({
        name:"leaveTransaction",
        initialState:{
          leaveTransaction:[], 
          loading: false, 
          error : null, 
        },
          //For handling result in following ways-- (3 cases to handle state and action)
        extraReducers : (builder)=>{
          //For Showing
          builder.addCase(showLeaveAllocation.pending, (state)=>{
            state.loading=true;
          })
          builder.addCase(showLeaveAllocation.fulfilled, (state, action)=>{
            state.loading=false
            state.leaveTransaction=action.payload
            state.error=''
          })
          builder.addCase(showLeaveAllocation.rejected, (state, action)=>{
            state.loading=false
            state.error=action.payload
          })
          //For Delete
          builder.addCase(deleteLeaveAllocation.pending, (state)=>{
            state.loading=true;
          })
          builder.addCase(deleteLeaveAllocation.fulfilled, (state, action)=>{
            state.loading=false
            //state.departments=action.payload
            console.log("state.departments===="+state.departments)
          })
          builder.addCase(deleteLeaveAllocation.rejected, (state, action)=>{
            console.log("action.payload===="+action.payload)
            state.loading=false
            state.error=action.payload
          })
          //For create
          builder.addCase(createLeaveAllocation.pending, (state)=>{
            state.loading=true;
          })
          builder.addCase(createLeaveAllocation.fulfilled, (state, action)=>{
            state.loading=false
            //state.employeeTypes=action.payload
            state.error=''
          })
          builder.addCase(createLeaveAllocation.rejected, (state, action)=>{
            state.loading=false
            state.error=action.payload
          })
          //Edit 
          builder.addCase(editLeaveAllocation.pending, (state)=>{
            state.loading=true;
          })
          builder.addCase(editLeaveAllocation.fulfilled, (state, action)=>{
            state.loading=false
            //state.departments=action.payload
            //state.error=''
          })
          builder.addCase(editLeaveAllocation.rejected, (state, action)=>{
            state.loading=false
            state.error=action.payload
          })
        }
        
      });
      export default leaveAllocationSlice.reducer;