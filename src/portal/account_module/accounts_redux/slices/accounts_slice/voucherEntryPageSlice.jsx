import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../../../../serviceUrl/AxiosURL";

export const createVoucherEntryType = createAsyncThunk(
  "createVoucherEntryType",
  async (data, { rejectWithValue }) => {
    const response = await fetch(BASE_URL + "accountVoucherEntry", {
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

export const createVoucherTransactions = createAsyncThunk(
  "createVoucherTransactions",
  async (data, { rejectWithValue }) => {
    const response = await fetch(BASE_URL + "accountVoucherEntry", {
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

export const createVouchers = createAsyncThunk(
  "createVouchers",
  async (data, { rejectWithValue }) => {
    const response = await fetch(BASE_URL + "vouchers", {
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

export const showVouchers = createAsyncThunk("showVouchers", async () => {
  const response = await fetch(BASE_URL + "accountVoucherEntry");
  try {
    const result = response.json();
    return result;
  } catch (error) {
    //rejectWithValue(error.response);
  }
});

export const showVoucherTrnsEntryTypeById = createAsyncThunk(
  "showVoucherTrnsEntryTypeById",
  async () => {
    const response = await fetch(BASE_URL + "voucherTransactions");
    try {
      const result = response.json();
      return result;
    } catch (error) {
      //rejectWithValue(error.response);
    }
  }
);

export const showVoucherEntryType = createAsyncThunk(
  "showVoucherEntryType",
  async () => {
    const response = await fetch(BASE_URL + "accountVoucherEntry");
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

export const deleteVoucherEntryType = createAsyncThunk(
  "deleteVoucherEntryType",
  async (id) => {
    const response = await fetch(BASE_URL + `accountVoucherEntry/${id}`, {
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
export const editVoucherEntryType = createAsyncThunk(
  "editVoucherEntryType",
  async (data) => {
    const response = await fetch(BASE_URL + `accountVoucherEntry/${data.id}`, {
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

export const voucherEntryPageSlice = createSlice({
  name: "voucherEntryPageSlice",
  initialState: {
    voucherEntryTypes: [],
    accCompanyfinancialYears: [],
    voucherObj: [],
    vouchers: [],
    voucherTransactions: [],
    loading: false,
    error: null,
  },
  //For handling result in following ways-- (3 cases to handle state and action)
  extraReducers: (builder) => {
    //For Showing
    builder.addCase(showVoucherEntryType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(showVoucherEntryType.fulfilled, (state, action) => {
      state.loading = false;
      state.voucherEntryTypes = action.payload;
      state.error = "";
    });
    builder.addCase(showVoucherEntryType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //For Showing Voucher entry
    builder.addCase(showVouchers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(showVouchers.fulfilled, (state, action) => {
      state.loading = false;
      state.vouchers = action.payload;
      state.error = "";
    });
    builder.addCase(showVouchers.rejected, (state, action) => {
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
    builder.addCase(deleteVoucherEntryType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteVoucherEntryType.fulfilled, (state, action) => {
      state.loading = false;
      //state.staffTypes=action.payload
      console.log("state.voucherEntryType====" + state.departments);
    });
    builder.addCase(deleteVoucherEntryType.rejected, (state, action) => {
      console.log("action.payload====" + action.payload);
      state.loading = false;
      state.error = action.payload;
    });
    //For create
    builder.addCase(createVoucherEntryType.pending, (state) => {
      state.loading = true;
      console.log("===== Pending =======");
    });
    builder.addCase(createVoucherEntryType.fulfilled, (state, action) => {
      state.loading = false;
      state.voucher = action.payload;
      console.log(
        "==== created ==" + state.voucher + ",  id=" + state.voucherObj.id
      );
      state.error = "";
    });
    builder.addCase(createVoucherEntryType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log("===== Rejected =======");
    });
    //Edit
    builder.addCase(editVoucherEntryType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editVoucherEntryType.fulfilled, (state, action) => {
      state.loading = false;
      //state.departments=action.payload
      //state.error=''
    });
    builder.addCase(editVoucherEntryType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(showVoucherTrnsEntryTypeById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(showVoucherTrnsEntryTypeById.fulfilled, (state, action) => {
      state.loading = false;
      state.voucherTransactions = action.payload;
      //state.error=''
    });
    builder.addCase(showVoucherTrnsEntryTypeById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //createVoucherTransactions
    //For create
    builder.addCase(createVoucherTransactions.pending, (state) => {
      state.loading = true;
      console.log("Voucher  ========  Pending");
    });
    builder.addCase(createVoucherTransactions.fulfilled, (state, action) => {
      state.loading = false;
      state.voucherTransaction = action.payload;
      console.log("Voucher  ========  Fullfilled=" + state.voucherObj.id);
      state.error = "";
    });
    builder.addCase(createVoucherTransactions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log("Voucher  ========  Rejected");
    });

    //createVoucher
    builder.addCase(createVouchers.pending, (state) => {
      state.loading = true;
      console.log("Voucher  ========  Pending");
    });
    builder.addCase(createVouchers.fulfilled, (state, action) => {
      state.loading = false;
      state.voucherObj = action.payload;
      console.log("Voucher  ========  Fullfilled=" + state.voucherObj.id);
      state.error = "";
    });
    builder.addCase(createVouchers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log("Voucher  ========  Rejected");
    });
  },
});

export default voucherEntryPageSlice.reducer;
