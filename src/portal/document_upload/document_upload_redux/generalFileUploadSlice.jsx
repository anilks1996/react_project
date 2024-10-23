import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { saveAs } from 'file-saver';
import BASE_URL from '../../../serviceUrl/AxiosURL';


export const createFileUpload = createAsyncThunk("createFileUpload", async (data, {rejectWithValue})=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/fileUpload/create", {
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
  
  export const editFileUpload=createAsyncThunk("editFileUpload", async()=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/fileUpload/edit", {
      method:"PUT",
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
  
  export const deleteFileUploadById=createAsyncThunk("deleteFileUploadById", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/fileUpload/delete/${id}`, {
      method:"DELETE",
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
  
  export const findFileUploadById=createAsyncThunk("findFileUploadById", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/fileUpload/${id}`, {
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
  export const findFileUploadByModelId=createAsyncThunk("findFileUploadByModelId", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/fileUpload/modelId/${id}`, {
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
  export const findFileUploadByModelType=createAsyncThunk("findFileUploadByModelType", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/fileUpload/modelType/${id}`, {
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

  export const uploadFileByEmployee = createAsyncThunk("uploadFileByEmployee", async(formData)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+"api/fileUpload/uploadByEmployee", {  
      method:"PUT",
      headers:{"Authorization":`Bearer ${currentUser}`},
      body:formData,
    })
    try{
      const result=response.json();
      return result;
    }catch(error){
      console.log(error);
    }
  });

  export const downloadFileByModelId = createAsyncThunk("downloadFileByModelId", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+`api/fileUpload/downloadByModelId/${id}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/pdf',"Authorization":`Bearer ${currentUser}`,
      },     
    })
    .then((response) => response.blob())
    .then((blob) => {
      // Create a new object URL for the Blob
      const url = window.URL.createObjectURL(new Blob([blob]));
      // Create a link element
      const link = document.createElement('a');
      // Set the download attribute with a filename
      link.href = url;
      link.setAttribute('download', 'employee-document.pdf');
      // Append the link to the body
      document.body.appendChild(link);
      // Simulate a click to trigger the download
      link.click();
      // Remove the link from the document
      link.parentNode.removeChild(link);
    })
    .catch((error) => console.error('Error downloading the PDF:', error));
    try{
      //const result=response.Blob();
      //return result;
    }catch(error){
      console.log(error);
    }
  });



export const generalFileUploadSlice = createSlice({
  name:"generalFileUploadSlice",
  initialState:{
    uploadFile:[],
    uploadFiles:[],
    uploadFileLoading:false,
    createFileLoading:false,
    error : null, 
  },
    //For handling result in following ways-- (3 cases to handle state and action)
  extraReducers : (builder)=>{
    //Document Verification
    //For create
    builder.addCase(createFileUpload.pending, (state)=>{state.createFileLoading=true;})
    builder.addCase(createFileUpload.fulfilled, (state, action)=>{state.createFileLoading=false; state.uploadFile=action.payload; state.error='';})
    builder.addCase(createFileUpload.rejected, (state, action)=>{ state.createFileLoading=false;state.error=action.payload; })
    
    builder.addCase(editFileUpload.pending, (state)=>{ state.createFileLoading=true; })
    builder.addCase(editFileUpload.fulfilled, (state, action)=>{ state.createFileLoading=false; state.uploadFile=action.payload; state.error='';})
    builder.addCase(editFileUpload.rejected, (state, action)=>{state.createFileLoading=false;state.error=action.payload; })
    
    builder.addCase(deleteFileUploadById.pending, (state)=>{ state.createFileLoading=true; })
    builder.addCase(deleteFileUploadById.fulfilled, (state, action)=>{ state.createFileLoading=false; state.uploadFiles=action.payload; state.error='';})
    builder.addCase(deleteFileUploadById.rejected, (state, action)=>{state.createFileLoading=false;state.error=action.payload; })
    
    //One result
    builder.addCase(findFileUploadById.pending, (state)=>{ state.uploadFileLoading=true;})
    builder.addCase(findFileUploadById.fulfilled, (state, action)=>{ state.uploadFileLoading=false;  state.uploadFile=action.payload; state.error='';  })
    builder.addCase(findFileUploadById.rejected, (state, action)=>{ state.uploadFileLoading=false;  state.error=action.payload;  })
    //For ModelId
    builder.addCase(findFileUploadByModelId.pending, (state)=>{ state.uploadFileLoading=true; })
    builder.addCase(findFileUploadByModelId.fulfilled, (state, action)=>{  state.uploadFileLoading=false; state.uploadFiles=action.payload; })
    builder.addCase(findFileUploadByModelId.rejected, (state, action)=>{state.uploadFileLoading=false;state.error=action.payload; })
    //ModelType
    builder.addCase(findFileUploadByModelType.pending, (state)=>{state.uploadFileLoading=true; })
    builder.addCase(findFileUploadByModelType.fulfilled, (state, action)=>{ state.uploadFileLoading=false; state.uploadFiles=action.payload; })
    builder.addCase(findFileUploadByModelType.rejected, (state, action)=>{state.uploadFileLoading=false; state.error=action.payload; })
  //Upload
    builder.addCase(uploadFileByEmployee.pending, (state)=>{state.uploadFileLoading=true; })
    builder.addCase(uploadFileByEmployee.fulfilled, (state, action)=>{ state.uploadFileLoading=false; state.uploadFile=action.payload; })
    builder.addCase(uploadFileByEmployee.rejected, (state, action)=>{state.uploadFileLoading=false; state.error=action.payload; })
  //Download
    builder.addCase(downloadFileByModelId.pending, (state)=>{state.uploadFileLoading=true; })
    builder.addCase(downloadFileByModelId.fulfilled, (state, action)=>{ state.uploadFileLoading=false; state.uploadFile=action.payload; })
    builder.addCase(downloadFileByModelId.rejected, (state, action)=>{state.uploadFileLoading=false; state.error=action.payload; })



}
  
});

export default generalFileUploadSlice.reducer;
