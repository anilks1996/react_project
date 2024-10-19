import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../../../../serviceUrl/AxiosURL";


export const fetchAllEmployeesCols = createAsyncThunk("fetchAllEmployeesCols", async()=>{
    //const response = await fetch("http://localhost:9090/api/employees/");
    const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+"api/employees", {
        method:"GET",
      headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
        const result = response.json();
        return result;
    }catch(error){
        console.log(error);
    }
});
export const showEmployeePopup = createAsyncThunk("showEmployeePopup", async()=>{
    //const response = await fetch(BASE_URL+"employeeList");
    const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+"api/employees/employeeSelection", {
        method:"GET",
      headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
        const result = response.json();
        return result;
    }catch(error){
        console.log(error);
    }
});
export const showEmployeeById = createAsyncThunk("showEmployeeById", async(id)=>{
    //const response = await fetch(BASE_URL+"employeeList");
    const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+`api/employees/general/${id}`, {
        method:"GET",
      headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
        const result = response.json();
        return result;
    }catch(error){
        console.log(error);
    }
});
export const findEmployeeByCode = createAsyncThunk("findEmployeeByCode", async(data)=>{
    //const response = await fetch(BASE_URL+"employeeList");
    const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+`api/employees/bycode/${data}`, {
        method:"GET",
      headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
        const result = response.json();
        return result;
    }catch(error){
        console.log(error);
    }
});
export const findNextEmployeeByCode = createAsyncThunk("findNextEmployeeByCode", async(data)=>{
    //const response = await fetch(BASE_URL+"employeeList");
    const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+`api/employees/nextempById/${data}`, {
        method:"GET",
      headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
        const result = response.json();
        return result;
    }catch(error){
        console.log(error);
    }
});
export const showEmploymentEmployeeById = createAsyncThunk("showEmploymentEmployeeById", async(id)=>{
    //const response = await fetch(BASE_URL+"employeeList");
    const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+`api/employees/employment/${id}`, {
        method:"GET",
      headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
        const result = response.json();
        return result;
    }catch(error){
        console.log(error);
    }
});
export const showPersonalEmployeeById = createAsyncThunk("showPersonalEmployeeById", async(id)=>{
    //const response = await fetch(BASE_URL+"employeeList");
    const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+`api/employees/personal/${id}`, {
      method:"GET",
      headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    });
    try{
        const result = response.json();
        return result;
    }catch(error){
        console.log(error);
    }
});
export const createEmployeeTab = createAsyncThunk("createEmployeeTab", async(data, {rejectWithValue})=>{
    //const response = await fetch(BASE_URL+"allEmployeesCols",{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+"api/employees/create/",{
        method:"POST",
        headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
        body:JSON.stringify(data)
    });
    try{
        const result = response.json();
        return result;
    }catch(error){
        console.log(error);
        return rejectWithValue(error.response);
    }
});
export const editEmployee = createAsyncThunk("editEmployee", async(data)=>{
    //const response = await fetch(BASE_URL+`allEmployeesCols/${data.id}`, {
    const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+`api/employees/editGeneral/${data.id}`, {
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

export const editEmploymentEmployeeTab = createAsyncThunk("editEmploymentEmployeeTab", async(data)=>{
    //const response = await fetch(BASE_URL+`allEmployeesCols/${data.id}`, {
    const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+`api/employees/editEmployment/${data.id}`, {
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

export const editPersonalEmployeeTab = createAsyncThunk("editPersonalEmployeeTab", async(data)=>{
    //const response = await fetch(BASE_URL+`allEmployeesCols/${data.id}`, {
    const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+`api/employees/editPersonal/${data.id}`, {
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

//Category
export const findCategoriyById = createAsyncThunk("findCategoriyById", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+`api/employees/category/${id}`, {
      method:"GET",
      headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    })
    try{
      const result=response.json();
      return result;
    }catch(error){
      console.log(error);
    }
});
export const findAllCategories = createAsyncThunk("findAllCategories", async(id)=>{
    const currentUser=localStorage.getItem("current-jwtToken");
    const response = await fetch(BASE_URL+"api/employees/category", {
      method:"GET",
      headers:{"content-type":"application/json","Authorization":`Bearer ${currentUser}`},
      body:JSON.stringify()
    })
    try{
      const result=response.json();
      return result;
    }catch(error){
      console.log(error);
    }
});


export const employeeSetupSlice = createSlice({
    name:"employeeSetupSlice",
    initialState:{
        allEmployees:[],
        employeeById:[],
        nextEmployee:[],
        employmentEmployee:[],
        personalEmployee:[], 
        employeeSelection:[],
        loggedEmployee:null,
        category:[],
        categories:[],
        generalLoading:false,
        employmentLoading:false,
        personalLoading:false,
        qualLoading:false,
        loading: false, 
        error : null
    },
    extraReducers : (builder)=>{
        //showing employee
        builder.addCase(fetchAllEmployeesCols.pending, (state)=>{state.loading=true; })
        builder.addCase(fetchAllEmployeesCols.fulfilled, (state, action)=>{state.loading=false; state.allEmployees=action.payload; state.error=null; })
        builder.addCase(fetchAllEmployeesCols.rejected, (state, action)=>{state.loading=false; state.allEmployees=null; state.error=action.payload; })
       
        builder.addCase(findAllCategories.pending, (state)=>{state.loading=true; })
        builder.addCase(findAllCategories.fulfilled, (state, action)=>{state.loading=false; state.categories=action.payload; state.error=null; })
        builder.addCase(findAllCategories.rejected, (state, action)=>{state.loading=false; state.categories=null; state.error=action.payload; })
        
        builder.addCase(findCategoriyById.pending, (state)=>{state.loading=true; })
        builder.addCase(findCategoriyById.fulfilled, (state, action)=>{state.loading=false; state.category=action.payload; state.error=null; })
        builder.addCase(findCategoriyById.rejected, (state, action)=>{state.loading=false; state.category=null; state.error=action.payload; })
       
        builder.addCase(showEmployeePopup.pending, (state)=>{state.loading=true;})
        builder.addCase(showEmployeePopup.fulfilled, (state, action)=>{state.loading=false;  state.employeeSelection=action.payload;  state.error=null;})
        builder.addCase(showEmployeePopup.rejected, (state, action)=>{ state.loading=false; state.employeeSelection=null; state.error=action.payload; })
        //Show single general employee by Id
        builder.addCase(showEmployeeById.pending, (state)=>{  state.loading=true; })
        builder.addCase(showEmployeeById.fulfilled, (state,action)=>{
            state.loading=false;
            state.employeeById=null;
            state.employeeById=action.payload;
            console.log('employee ==== '+state.employeeById.id)
            state.error=null;
        })
        builder.addCase(showEmployeeById.rejected, (state,action)=>{ state.loading=false;  state.employeeById=null;  state.error=action.payload;})
        //Fetch by Code
        builder.addCase(findEmployeeByCode.pending, (state)=>{ state.loading=true; })
        builder.addCase(findEmployeeByCode.fulfilled, (state,action)=>{ state.loading=false; state.employeeById=action.payload;  state.error=null;  })
        builder.addCase(findEmployeeByCode.rejected, (state,action)=>{
            state.loading=false; state.employeeById=null; state.error=action.payload;  })

        builder.addCase(findNextEmployeeByCode.pending, (state)=>{ state.loading=true; })
        builder.addCase(findNextEmployeeByCode.fulfilled, (state,action)=>{state.loading=false; state.nextEmployee=action.payload; state.error=null; })
        builder.addCase(findNextEmployeeByCode.rejected, (state,action)=>{state.loading=false; state.nextEmployee=null; state.error=action.payload; })
        //Show single employment employee by Id
        builder.addCase(showEmploymentEmployeeById.pending, (state)=>{ state.loading=true; })
        builder.addCase(showEmploymentEmployeeById.fulfilled, (state,action)=>{
            state.loading=false;
            state.employmentEmployee=null;
            state.employmentEmployee=action.payload;
            console.log('employee ==== '+state.employeeById.id)
            state.error=null;
        })
        builder.addCase(showEmploymentEmployeeById.rejected, (state,action)=>{ state.loading=false; state.employmentEmployee=null;  state.error=action.payload; })
        //Show single personal employee by Id
        builder.addCase(showPersonalEmployeeById.pending, (state)=>{ state.loading=true;})
        builder.addCase(showPersonalEmployeeById.fulfilled, (state,action)=>{
            state.loading=false;
            state.personalEmployee=action.payload;
            console.log('employee ==== '+state.employeeById.id)
            state.error=null;
        })
        builder.addCase(showPersonalEmployeeById.rejected, (state,action)=>{ state.loading=false;  state.personalEmployee=null;  state.error=action.payload;  })
        //creating employee
        builder.addCase(createEmployeeTab.pending, (state)=>{  state.loading=true; })
        builder.addCase(createEmployeeTab.fulfilled, (state, action)=>{
            state.loading=false;
            state.employeeById=action.payload;
            state.error=null;
        })
        builder.addCase(createEmployeeTab.rejected, (state, action)=>{ state.loading=false; state.employeeById=null; state.error=action.payload;})
        //editing employee
        builder.addCase(editEmployee.pending, (state)=>{ state.generalLoading=true; })
        builder.addCase(editEmployee.fulfilled, (state, action)=>{
            state.generalLoading=false;
            //state.allEmployees=action.payload;
            console.log("======= updated successfully ==============")
            state.error=null;
        })
        builder.addCase(editEmployee.rejected, (state, action)=>{
            state.generalLoading=false;
            state.allEmployees=null;
            state.error=action.payload;
        })
        //edit Employment Tab
        builder.addCase(editEmploymentEmployeeTab.pending, (state)=>{ state.employmentLoading=true;})
        builder.addCase(editEmploymentEmployeeTab.fulfilled, (state, action)=>{
            state.employmentLoading=false;
            //state.allEmployees=action.payload;
            console.log("======= updated successfully ==============")
            state.error=null;
        })
        builder.addCase(editEmploymentEmployeeTab.rejected, (state, action)=>{
            state.employmentLoading=false;
            state.allEmployees=null;
            state.error=action.payload;
        })
        //edit Personal
        builder.addCase(editPersonalEmployeeTab.pending, (state)=>{ state.personalLoading=true;})
        builder.addCase(editPersonalEmployeeTab.fulfilled, (state, action)=>{
            state.personalLoading=false;
            //state.allEmployees=action.payload;
            console.log("======= updated successfully ==============")
            state.error=null;
        })
        builder.addCase(editPersonalEmployeeTab.rejected, (state, action)=>{
            state.personalLoading=false;
            state.allEmployees=null;
            state.error=action.payload;
        })

    }
    
});

export default employeeSetupSlice.reducer;