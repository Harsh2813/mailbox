import { createSlice } from "@reduxjs/toolkit";

const initialcompose = localStorage.getItem("compose") || "";
const initalinbox = localStorage.getItem("inbox") || 0;

const initialMailState = {
  compose: initialcompose,
  sent: [],
  unreadInbox: parseInt(initalinbox),
  inbox: [],
  activeOption: "inbox", //we will be having default inbox sidebar content
};

const MailSlice = createSlice({
  name: "mail",
  initialState: initialMailState,
  reducers: {
    composeShow(state) {
      state.compose = true;
      localStorage.setItem("compose", "true");
    },
    composeHide(state) {
      state.compose = false;
      localStorage.removeItem("compose");
    },

    sentMail(state, action) {
      state.sent.push(action.payload);
    },
    inboxMail(state, action) {
      state.inbox = action.payload;
    },

    totalUnreadInbox(state, action){
        state.unreadInbox = action.payload;
    },

    sentActive(state) {
      state.activeOption = "sent";
    },
    inboxActive(state) {
      state.activeOption = "inbox";
    },

    deleteMail(state, action) {
      state.sent = state.sent.filter((mail) => mail.id !== action.payload);
      state.inbox = state.inbox.filter((mail) => mail.id !== action.payload);
    },
    deleteInbox(state) {
      state.inbox = [];
    },
    deleteSent(state) {
      state.sent = [];
    },
  },
});

export const mailActions = MailSlice.actions;
export default MailSlice.reducer;
