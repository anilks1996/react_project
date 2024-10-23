import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BASE_URL from '../../../../serviceUrl/AxiosURL';
import { saveAs } from 'file-saver';


export const createDocumentVerification = createAsyncThunk("createDocumentVerification", async (data, {rejectWithValue})=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/documentVerification/", {
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
  
  export const findAllDocumentVerifications=createAsyncThunk("findAllDocumentVerifications", async()=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/documentVerification/", {
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
  
  export const findDocumentVerificationById=createAsyncThunk("findDocumentVerificationById", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/documentVerification/${id}`, {
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
  
  export const findDocumentVerificationByDocument=createAsyncThunk("findDocumentVerificationByDocument", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/documentVerification/document/${id}`, {
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
  export const findDocumentVerificationByEmployee=createAsyncThunk("findDocumentVerificationByEmployee", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+`api/documentVerification/employee/${id}`, {
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
  export const findDocumentVerificationByEmployeeDocument=createAsyncThunk("findDocumentVerificationByEmployeeDocument", async(data)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response=await fetch(BASE_URL+"api/documentVerification/empDoc/", {
      method:"GET",
      headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify(data)
    });
    try{
      const result=response.json();
      return result;
    }catch(error){
      console.log(error);
    }
  })

  export const deleteDocumentVerificationById = createAsyncThunk("deleteDocumentVerificationById", async(id)=>{
      const currentUser=localStorage.getItem("current-jwtToken");
      const response=await fetch(BASE_URL+`api/documentVerification/${id}`, {
        method:"DELETE",
        headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
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

  export const editDocumentVerificationById = createAsyncThunk("editDocumentVerificationById", async(data)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+`api/documentVerification/${data.id}`, {  
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

  export const uploadDocumentByEmployeeId = createAsyncThunk("uploadDocumentByEmployeeId", async(formData)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+"api/documentVerification/uploadDocumentByEmployeeId", {  
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

  export const downloadDocumentVerificationById = createAsyncThunk("downloadDocumentVerificationById", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+`api/documentVerification/downloadDocument/${id}`, {
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



export const documentVerificationSlice = createSlice({
  name:"documentVerificationSlice",
  initialState:{
    documentVer:[],
    documentVers:[],
    uploadEmployeeDocs:[],
    uploadLeaveDocs:[],
    uploadPurchaseDocs:[],
    downloadEmployeeDocs:[],
    downloadLeaveDocs:[],
    downloadPurchaseDocs:[],

    uploadEmployeeDocLoading:false,
    uploadLeaveDocLoading:false,
    uploadPurchaseDocLoading:false,
    downloadEmployeeDocLoading:false,
    downloadLeaveDocLoading:false,
    downloadPurchaseDocLoading:false,
    docVerLoading:false,
    error : null, 
  },
    //For handling result in following ways-- (3 cases to handle state and action)
  extraReducers : (builder)=>{
    //Document Verification
    //For create
    builder.addCase(createDocumentVerification.pending, (state)=>{state.docVerLoading=true;})
    builder.addCase(createDocumentVerification.fulfilled, (state, action)=>{state.docVerLoading=false; state.documentVer=action.payload; state.error='';})
    builder.addCase(createDocumentVerification.rejected, (state, action)=>{ state.docVerLoading=false;state.error=action.payload; })
    
    builder.addCase(findAllDocumentVerifications.pending, (state)=>{ state.docVerLoading=true; })
    builder.addCase(findAllDocumentVerifications.fulfilled, (state, action)=>{ state.docVerLoading=false; state.documentVers=action.payload; state.error='';})
    builder.addCase(findAllDocumentVerifications.rejected, (state, action)=>{state.docVerLoading=false;state.error=action.payload; })
    //For user Role List
    builder.addCase(findDocumentVerificationById.pending, (state)=>{ state.docVerLoading=true;})
    builder.addCase(findDocumentVerificationById.fulfilled, (state, action)=>{ state.docVerLoading=false;  state.documentVer=action.payload; state.error='';  })
    builder.addCase(findDocumentVerificationById.rejected, (state, action)=>{ state.docVerLoading=false;  state.error=action.payload;  })
    //For Delete
    builder.addCase(deleteDocumentVerificationById.pending, (state)=>{ state.docVerLoading=true; })
    builder.addCase(deleteDocumentVerificationById.fulfilled, (state, action)=>{  state.docVerLoading=false; state.documentVers=action.payload; })
    builder.addCase(deleteDocumentVerificationById.rejected, (state, action)=>{state.docVerLoading=false;state.error=action.payload; })
    //Edit 
    builder.addCase(editDocumentVerificationById.pending, (state)=>{state.docVerLoading=true; })
    builder.addCase(editDocumentVerificationById.fulfilled, (state, action)=>{ state.docVerLoading=false; state.documentVer=action.payload; })
    builder.addCase(editDocumentVerificationById.rejected, (state, action)=>{state.docVerLoading=false; state.error=action.payload; })
  //show else
    builder.addCase(findDocumentVerificationByDocument.pending, (state)=>{ state.docVerLoading=true; })
    builder.addCase(findDocumentVerificationByDocument.fulfilled, (state, action)=>{ state.docVerLoading=false; state.documentVers=action.payload; state.error='';})
    builder.addCase(findDocumentVerificationByDocument.rejected, (state, action)=>{state.docVerLoading=false;state.error=action.payload; })
        
    builder.addCase(findDocumentVerificationByEmployee.pending, (state)=>{ state.docVerLoading=true; })
    builder.addCase(findDocumentVerificationByEmployee.fulfilled, (state, action)=>{ state.docVerLoading=false; state.documentVers=action.payload; state.error='';})
    builder.addCase(findDocumentVerificationByEmployee.rejected, (state, action)=>{state.docVerLoading=false;state.error=action.payload; })
    
    builder.addCase(findDocumentVerificationByEmployeeDocument.pending, (state)=>{ state.docVerLoading=true; })
    builder.addCase(findDocumentVerificationByEmployeeDocument.fulfilled, (state, action)=>{ state.docVerLoading=false; state.documentVer=action.payload; state.error='';})
    builder.addCase(findDocumentVerificationByEmployeeDocument.rejected, (state, action)=>{state.docVerLoading=false;state.error=action.payload; })
//Upload Document
    builder.addCase(uploadDocumentByEmployeeId.pending, (state)=>{ state.uploadEmployeeDocLoading=true; })
    builder.addCase(uploadDocumentByEmployeeId.fulfilled, (state, action)=>{ state.uploadEmployeeDocLoading=false; state.uploadEmployeeDocs=action.payload; state.error='';})
    builder.addCase(uploadDocumentByEmployeeId.rejected, (state, action)=>{state.uploadEmployeeDocLoading=false;state.error=action.payload; })

//Download Document
    builder.addCase(downloadDocumentVerificationById.pending, (state)=>{ state.downloadEmployeeDocLoading=true; })
    builder.addCase(downloadDocumentVerificationById.fulfilled, (state, action)=>{ state.downloadEmployeeDocLoading=false; state.downloadEmployeeDocs=action.payload; state.error='';})
    builder.addCase(downloadDocumentVerificationById.rejected, (state, action)=>{state.downloadEmployeeDocLoading=false;state.error=action.payload; })


}
  
});

export default documentVerificationSlice.reducer;
