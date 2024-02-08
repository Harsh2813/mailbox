import { createSlice } from "@reduxjs/toolkit";

const initialcompose = localStorage.getItem('compose') || '';
const initalinbox = localStorage.getItem('inbox') || 0;

const initialMailState = {
    compose : initialcompose,
    sent: [],
    totalInbox: parseInt(initalinbox),
    inbox: [],
    activeOption: 'inbox' //we will be having default inbox sidebar content
}

const MailSlice = createSlice({
    name: 'mail',
    initialState: initialMailState,
    reducers: {
        composeShow(state){
            state.compose = true;
            localStorage.setItem('compose', 'true');
        },
        composeHide(state){
            state.compose = false;
            localStorage.removeItem('compose');
        },
        sentMail(state, action){
            state.sent.push(action.payload);
        },
        inboxMail(state, action) {
            state.inbox.push(action.payload);
            state.totalInbox++;
            localStorage.setItem('inbox', state.totalInbox)
        },
        sentActive(state){
            state.activeOption = 'sent';
        },
        inboxActive(state){
            state.activeOption = 'inbox'
        },
        deleteMail(state, action){
            state.sent = state.sent.filter(mail => mail.id !== action.payload);
        }
    }
});

export const mailActions = MailSlice.actions;
export default MailSlice.reducer;