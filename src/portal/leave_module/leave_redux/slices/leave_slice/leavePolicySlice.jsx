import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../../serviceUrl/AxiosURL';

export const createLeavePolicy = createAsyncThunk("createLeavePoilcy", async (data, {rejectWithValue})=>{
    const response=await fetch(BASE_URL+"leavePolicy", {
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
    export const showLeavePolicy=createAsyncThunk("showLeavePolicy", async()=>{
        //const response=await fetch("http://localhost:9090/allLeaveTypes");
        const response=await fetch(BASE_URL+"leavePolicy");
        try{
          const result=response.json();
          return result;
        }catch(error){
          console.log(error);
        }
      })
      export const deleteLeavePolicy = createAsyncThunk("deleteLeavePolicy", async(id)=>{
        const response=await fetch(BASE_URL+`leavePolicy/${id}`, {
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
    
      export const editLeavePolicy = createAsyncThunk("editLeavePolicy", async(data)=>{
        const response = await fetch(BASE_URL+`leavePolicy/${data.id}`, {
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
      export const leavePolicySlice = createSlice({
        name:"leavePolicy",
        initialState:{
          leavePolicy:[], 
          loading: false, 
          error : null, 
        },
          //For handling result in following ways-- (3 cases to handle state and action)
        extraReducers : (builder)=>{
          //For Showing
          builder.addCase(showLeavePolicy.pending, (state)=>{
            state.loading=true;
          })
          builder.addCase(showLeavePolicy.fulfilled, (state, action)=>{
            state.loading=false
            state.leavePolicy=action.payload
            state.error=''
          })
          builder.addCase(showLeavePolicy.rejected, (state, action)=>{
            state.loading=false
            state.error=action.payload
          })
          //For Delete
          builder.addCase(deleteLeavePolicy.pending, (state)=>{
            state.loading=true;
          })
          builder.addCase(deleteLeavePolicy.fulfilled, (state, action)=>{
            state.loading=false
            //state.departments=action.payload
            console.log("state.departments===="+state.departments)
          })
          builder.addCase(deleteLeavePolicy.rejected, (state, action)=>{
            console.log("action.payload===="+action.payload)
            state.loading=false
            state.error=action.payload
          })
          //For create
          builder.addCase(createLeavePolicy.pending, (state)=>{
            state.loading=true;
          })
          builder.addCase(createLeavePolicy.fulfilled, (state, action)=>{
            state.loading=false
            //state.employeeTypes=action.payload
            state.error=''
          })
          builder.addCase(createLeavePolicy.rejected, (state, action)=>{
            state.loading=false
            state.error=action.payload
          })
          //Edit 
          builder.addCase(editLeavePolicy.pending, (state)=>{
            state.loading=true;
          })
          builder.addCase(editLeavePolicy.fulfilled, (state, action)=>{
            state.loading=false
            //state.departments=action.payload
            //state.error=''
          })
          builder.addCase(editLeavePolicy.rejected, (state, action)=>{
            state.loading=false
            state.error=action.payload
          })
        }
        
      });
      export default leavePolicySlice.reducer;
            
      