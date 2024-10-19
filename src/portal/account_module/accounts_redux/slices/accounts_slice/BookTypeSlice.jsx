import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../../../../serviceUrl/AxiosURL";

export const createBookType = createAsyncThunk(
  "createBookType",
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

export const showBookType = createAsyncThunk("showBookType", async () => {
  const response = await fetch(BASE_URL + "vouchers");
  try {
    const result = response.json();
    return result;
  } catch (error) {
    //rejectWithValue(error.response);
  }
});
// export const showAccCompanyFinancialYears = createAsyncThunk(
//   "showAccCompanyFinancialYears",
//   async () => {
//     const response = await fetch(BASE_URL + "accCompanyFinancialYearList");
//     try {
//       const result = response.json();
//       return result;
//     } catch (error) {
//       //rejectWithValue(error.response);
//     }
//   }
// );

export const deleteBookType = createAsyncThunk("deleteBookType", async (id) => {
  const response = await fetch(BASE_URL + `vouchers/${id}`, {
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
});
export const editBookType = createAsyncThunk("editBookType", async (data) => {
  const response = await fetch(BASE_URL + `vouchers/${data.id}`, {
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
});

export const BookTypeSlice = createSlice({
  name: "BookTypeSlice",
  initialState: {
    bookTypes: [],
    accCompanyfinancialYears: [],
    loading: false,
    error: null,
  },
  //For handling result in following ways-- (3 cases to handle state and action)
  extraReducers: (builder) => {
    //For Showing
    builder.addCase(showBookType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(showBookType.fulfilled, (state, action) => {
      state.loading = false;
      state.bookTypes = action.payload;
      state.error = "";
    });
    builder.addCase(showBookType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // Show ACFY
    // builder.addCase(showAccCompanyFinancialYears.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(showAccCompanyFinancialYears.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.accCompanyfinancialYears = action.payload;
    //   state.error = "";
    // });
    // builder.addCase(showAccCompanyFinancialYears.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });
    //For Delete
    builder.addCase(deleteBookType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteBookType.fulfilled, (state, action) => {
      state.loading = false;
      //state.staffTypes=action.payload
      console.log("state.bookType====" + state.departments);
    });
    builder.addCase(deleteBookType.rejected, (state, action) => {
      console.log("action.payload====" + action.payload);
      state.loading = false;
      state.error = action.payload;
    });
    //For create
    builder.addCase(createBookType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBookType.fulfilled, (state, action) => {
      state.loading = false;
      //state.staffTypes=action.payload
      state.error = "";
    });
    builder.addCase(createBookType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //Edit
    builder.addCase(editBookType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editBookType.fulfilled, (state, action) => {
      state.loading = false;
      //state.departments=action.payload
      //state.error=''
    });
    builder.addCase(editBookType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default BookTypeSlice.reducer;
