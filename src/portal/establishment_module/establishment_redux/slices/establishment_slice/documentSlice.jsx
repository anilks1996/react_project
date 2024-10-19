import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../../serviceUrl/AxiosURL';

export const createDocument = createAsyncThunk("createDocument", async (data, {rejectWithValue})=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/document/", {
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
}) ;

export const showDocument=createAsyncThunk("showDocument", async()=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+"api/document/",{
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

export const showDocumentById=createAsyncThunk("showDocumentById", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/document/${id}`, {
    method:"GET",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify()
  });
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
})

export const deleteDocument = createAsyncThunk("deleteDocument", async(id)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
  const response=await fetch(BASE_URL+`api/document/${id}`, {
      method:"DELETE",
      headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
      const result=response.json();
      console.log("result==="+result)
      return result;
    }catch(error){
      //rejectWithValue(error.response);
      console.log("error= "+error);
    }
  })
export const editDocument = createAsyncThunk("editDocument", async(data)=>{
  const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+`api/document/${data.id}`, {
    method:"PUT",
    headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
    body:JSON.stringify(data)
  })
  try{
    const result=response.json();
    return result;
  }catch(error){
    console.log(error);
  }
});

export const documentSlice = createSlice({
  name:"documentSlice",
  initialState:{
    documents:[], 
    document:[],
    loading: false, 
    error : null, 
  },
    //For handling result in following ways-- (3 cases to handle state and action)
  extraReducers : (builder)=>{
    //For Showing
    builder.addCase(showDocument.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(showDocument.fulfilled, (state, action)=>{
      state.loading=false
      state.documents=action.payload
      state.error=''
    })
    builder.addCase(showDocument.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })

    builder.addCase(showDocumentById.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(showDocumentById.fulfilled, (state, action)=>{
      state.loading=false
      state.document=action.payload
      state.error=''
    })
    builder.addCase(showDocumentById.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
    //For Delete
    builder.addCase(deleteDocument.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(deleteDocument.fulfilled, (state, action)=>{
      state.loading=false
      //state.departments=action.payload
      console.log("state.departments===="+state.departments)
    })
    builder.addCase(deleteDocument.rejected, (state, action)=>{
      console.log("action.payload===="+action.payload)
      state.loading=false
      state.error=action.payload
    })
    //For create
    builder.addCase(createDocument.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(createDocument.fulfilled, (state, action)=>{
      state.loading=false
      //state.documents=action.payload
      state.error=''
    })
    builder.addCase(createDocument.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
    //Edit 
    builder.addCase(editDocument.pending, (state)=>{
      state.loading=true;
    })
    builder.addCase(editDocument.fulfilled, (state, action)=>{
      state.loading=false
    })
    builder.addCase(editDocument.rejected, (state, action)=>{
      state.loading=false
      state.error=action.payload
    })
  }
  
});

export default documentSlice.reducer;
