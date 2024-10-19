import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../../../../serviceUrl/AxiosURL";

export const createOrganizationType = createAsyncThunk(
  "createOrganizationType",
  async (data, { rejectWithValue }) => {
    const response = await fetch(BASE_URL + "institutionDropdownList", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    try {
      const result = response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const showOrganizationType = createAsyncThunk(
  "showOrganizationType",
  async () => {
    const response = await fetch(BASE_URL + "institutionDropdownList");
    try {
      const result = response.json();
      return result;
    } catch (error) {
      //rejectWithValue(error.response);
    }
  }
);
export const showAccCompanyFinancialYears = createAsyncThunk(
  "showAccCompanyFinancialYears",
  async () => {
    const response = await fetch(BASE_URL + "accCompanyFinancialYearList");
    try {
      const result = response.json();
      return result;
    } catch (error) {
      //rejectWithValue(error.response);
    }
  }
);

export const deleteOrganizationType = createAsyncThunk(
  "deleteOrganizationType",
  async (id) => {
    const response = await fetch(BASE_URL + `institutionDropdownList/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(),
    });
    try {
      const result = response.json();
      console.log("result===" + result);
      return result;
    } catch (error) {
      //rejectWithValue(error.response);
      console.log("error= " + error);
    }
  }
);
export const editOrganizationType = createAsyncThunk(
  "editOrganizationType",
  async (data) => {
    const response = await fetch(
      BASE_URL + `institutionDropdownList/${data.id}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);

export const organizationTypeSlice = createSlice({
  name: "organizationTypeSlice",
  initialState: {
    organizationTypes: [],
    accCompanyfinancialYears: [],
    loading: false,
    error: null,
  },
  //For handling result in following ways-- (3 cases to handle state and action)
  extraReducers: (builder) => {
    //For Showing
    builder.addCase(showOrganizationType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(showOrganizationType.fulfilled, (state, action) => {
      state.loading = false;
      state.organizationTypes = action.payload;
      state.error = "";
    });
    builder.addCase(showOrganizationType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // Show ACFY
    builder.addCase(showAccCompanyFinancialYears.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(showAccCompanyFinancialYears.fulfilled, (state, action) => {
      state.loading = false;
      state.accCompanyfinancialYears = action.payload;
      state.error = "";
    });
    builder.addCase(showAccCompanyFinancialYears.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //For Delete
    builder.addCase(deleteOrganizationType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteOrganizationType.fulfilled, (state, action) => {
      state.loading = false;
      //state.staffTypes=action.payload
      console.log("state.organizationType====" + state.departments);
    });
    builder.addCase(deleteOrganizationType.rejected, (state, action) => {
      console.log("action.payload====" + action.payload);
      state.loading = false;
      state.error = action.payload;
    });
    //For create
    builder.addCase(createOrganizationType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createOrganizationType.fulfilled, (state, action) => {
      state.loading = false;
      //state.staffTypes=action.payload
      state.error = "";
    });
    builder.addCase(createOrganizationType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //Edit
    builder.addCase(editOrganizationType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editOrganizationType.fulfilled, (state, action) => {
      state.loading = false;
      //state.departments=action.payload
      //state.error=''
    });
    builder.addCase(editOrganizationType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default organizationTypeSlice.reducer;
