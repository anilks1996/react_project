import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../../../../serviceUrl/AxiosURL";

export const createOpeningBalance = createAsyncThunk(
  "createOpeningBalance",
  async (data, { rejectWithValue }) => {
    const response = await fetch(BASE_URL + "accountsChartList", {
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

export const showOpeningBalance = createAsyncThunk(
  "showOpeningBalance",
  async () => {
    const response = await fetch(BASE_URL + "accountChartList");
    try {
      const result = response.json();
      return result;
    } catch (error) {
      //rejectWithValue(error.response);
    }
  }
);

export const deleteOpeningBalance = createAsyncThunk(
  "deleteOpeningBalance",
  async (id) => {
    const response = await fetch(BASE_URL + `accountsChartList/${id}`, {
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
export const editOpeningBalance = createAsyncThunk(
  "editOpeningBalance",
  async (data) => {
    const response = await fetch(BASE_URL + `accountsChartList/${data.id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    try {
      const result = response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);

export const openingBalanceSlice = createSlice({
  name: "openingBalanceSlice",
  initialState: {
    openingBalance: [],
    loading: false,
    error: null,
  },
  //For handling result in following ways-- (3 cases to handle state and action)
  extraReducers: (builder) => {
    //For Showing
    builder.addCase(showOpeningBalance.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(showOpeningBalance.fulfilled, (state, action) => {
      state.loading = false;
      state.accountsCharts = action.payload;
      state.error = "";
    });
    builder.addCase(showOpeningBalance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //For Delete
    builder.addCase(deleteOpeningBalance.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteOpeningBalance.fulfilled, (state, action) => {
      state.loading = false;
      //state.staffTypes=action.payload
      console.log("state.accountsChart====" + state.departments);
    });
    builder.addCase(deleteOpeningBalance.rejected, (state, action) => {
      console.log("action.payload====" + action.payload);
      state.loading = false;
      state.error = action.payload;
    });
    //For create
    builder.addCase(createOpeningBalance.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createOpeningBalance.fulfilled, (state, action) => {
      state.loading = false;
      state.accountsCharts = action.payload;
      state.error = "";
    });
    builder.addCase(createOpeningBalance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //Edit
    builder.addCase(editOpeningBalance.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editOpeningBalance.fulfilled, (state, action) => {
      state.loading = false;
      //state.departments=action.payload
      //state.error=''
    });
    builder.addCase(editOpeningBalance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default openingBalanceSlice.reducer;
