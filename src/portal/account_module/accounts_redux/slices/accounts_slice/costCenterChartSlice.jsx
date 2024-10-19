import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../../../../serviceUrl/AxiosURL";

export const createCostCenterChart = createAsyncThunk(
  "createCostCenterChart",
  async (data, { rejectWithValue }) => {
    const response = await fetch(BASE_URL + "costCenterChartList", {
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

export const showCostCenterChart = createAsyncThunk(
  "showCostCenterChart",
  async () => {
    //const response=await fetch(BASE_URL+"accountsChartList");
    const response = await fetch(BASE_URL + "costCenterChartList");
    try {
      const result = response.json();
      return result;
    } catch (error) {
      //rejectWithValue(error.response);
    }
  }
);

export const deleteCostCenterChart = createAsyncThunk(
  "deleteCostCenterChart",
  async (id) => {
    const response = await fetch(BASE_URL + `costCenterChartList/${id}`, {
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
export const editCostCenterChart = createAsyncThunk(
  "editCostCenterChart",
  async (data) => {
    const response = await fetch(BASE_URL + `costCenterChartList/${data.id}`, {
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

export const costCenterChartSlice = createSlice({
  name: "costCenterChartSlice",
  initialState: {
    costCenterChart: [],
    loading: false,
    error: null,
  },
  //For handling result in following ways-- (3 cases to handle state and action)
  extraReducers: (builder) => {
    //For Showing
    builder.addCase(showCostCenterChart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(showCostCenterChart.fulfilled, (state, action) => {
      state.loading = false;
      state.costCenterChart = action.payload;
      state.error = "";
    });
    builder.addCase(showCostCenterChart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //For Delete
    builder.addCase(deleteCostCenterChart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCostCenterChart.fulfilled, (state, action) => {
      state.loading = false;
      //state.staffTypes=action.payload
      console.log("state.costCenterChart====" + state.departments);
    });
    builder.addCase(deleteCostCenterChart.rejected, (state, action) => {
      console.log("action.payload====" + action.payload);
      state.loading = false;
      state.error = action.payload;
    });
    //For create
    builder.addCase(createCostCenterChart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCostCenterChart.fulfilled, (state, action) => {
      state.loading = false;
      state.costCenterChart = action.payload;
      state.error = "";
    });
    builder.addCase(createCostCenterChart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //Edit
    builder.addCase(editCostCenterChart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editCostCenterChart.fulfilled, (state, action) => {
      state.loading = false;
      //state.departments=action.payload
      //state.error=''
    });
    builder.addCase(editCostCenterChart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default costCenterChartSlice.reducer;
