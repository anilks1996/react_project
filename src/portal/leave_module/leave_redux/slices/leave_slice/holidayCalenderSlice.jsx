import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../../serviceUrl/AxiosURL';

export const createHolidayCalender = createAsyncThunk("createHolidayCalender", async (data, {rejectWithValue})=>{
    const response=await fetch(BASE_URL+"holidayCalender", {
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
    export const showHolidayCalender=createAsyncThunk("showHolidayCalender", async()=>{
        //const response=await fetch("http://localhost:9090/allHolidayCalender");
        const response=await fetch(BASE_URL+"holidayCalender");
        try{
          const result=response.json();
          return result;
        }catch(error){
          console.log(error);
        }
      })
      export const deleteHolidayCalender = createAsyncThunk("deleteHolidayCalender", async(id)=>{
        const response=await fetch(BASE_URL+`holidayCalender/${id}`, {
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
    
      export const editHolidayCalender = createAsyncThunk("editHolidayCalender", async(data)=>{
        const response = await fetch(BASE_URL+`holidayCalender/${data.id}`, {
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
      
      export const holidayCalenderSlice = createSlice({
        name:"holidayCalenderSlice",
        initialState:{
          holidayCalender:[], 
          loading: false, 
          error : null, 
        },
          //For handling result in following ways-- (3 cases to handle state and action)
        extraReducers : (builder)=>{
          //For Showing
          builder.addCase(showHolidayCalender.pending, (state)=>{
            state.loading=true;
          })
          builder.addCase(showHolidayCalender.fulfilled, (state, action)=>{
            state.loading=false
            state.holidayCalender=action.payload;
            console.log("======== show holiday Calender  ========="+action.payload)
            state.error=''
          })
          builder.addCase(showHolidayCalender.rejected, (state, action)=>{
            state.loading=false
            state.error=action.payload;
          })
          //For Delete
          builder.addCase(deleteHolidayCalender.pending, (state)=>{
            state.loading=true;
          })
          builder.addCase(deleteHolidayCalender.fulfilled, (state, action)=>{
            state.loading=false
            //state.departments=action.payload
            console.log("state.holidayCalender===="+state.holidayCalender)
          })
          builder.addCase(deleteHolidayCalender.rejected, (state, action)=>{
            console.log("action.payload===="+action.payload)
            state.loading=false
            state.error=action.payload
          })
          //For create
          builder.addCase(createHolidayCalender.pending, (state)=>{
            state.loading=true;
          })
          builder.addCase(createHolidayCalender.fulfilled, (state, action)=>{
            state.loading=false
            //state.holiday Calender=action.payload
            state.error=''
          })
          builder.addCase(createHolidayCalender.rejected, (state, action)=>{
            state.loading=false
            state.error=action.payload
          })
          //Edit 
          builder.addCase(editHolidayCalender.pending, (state)=>{
            state.loading=true;
          })
          builder.addCase(editHolidayCalender.fulfilled, (state, action)=>{
            state.loading=false
            //state.departments=action.payload
            //state.error=''
          })
          builder.addCase(editHolidayCalender.rejected, (state, action)=>{
            state.loading=false
            state.error=action.payload
          })
        }
        
      });

      export default holidayCalenderSlice.reducer;
            
      