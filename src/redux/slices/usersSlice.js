import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {
    id: 1,
    address_id: 8,
    email: "user1@admin.com",
    created_at: "2024-05-31T08:26:04.708Z",
    updated_at: "2024-05-31T08:26:04.708Z",
    first_name: "User 1",
    last_name: "admin",
  },
};
const usersSlice = createSlice({
  name: "user",
  initialState,
});

export default usersSlice.reducer;
