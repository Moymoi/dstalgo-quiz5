import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { conversationService } from '../services/api';

export const sendMessage = createAsyncThunk(
  'conversations/sendMessage',
  async ({ message, conversationId }, { rejectWithValue }) => {
    try {
      const { data } = await conversationService.chat({ message, conversation_id: conversationId });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { detail: 'Failed to send message.' });
    }
  }
);

export const fetchConversations = createAsyncThunk(
  'conversations/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await conversationService.listConversations();
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { detail: 'Failed to fetch conversations.' });
    }
  }
);

export const fetchConversation = createAsyncThunk(
  'conversations/fetchOne',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await conversationService.getConversation(id);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { detail: 'Failed to fetch conversation.' });
    }
  }
);

const conversationsSlice = createSlice({
  name: 'conversations',
  initialState: {
    list: [],
    current: null,
    loading: false,
    sendingMessage: false,
    error: null,
  },
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.sendingMessage = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sendingMessage = false;
        state.current = action.payload;
        const conversationIndex = state.list.findIndex((c) => c._id === action.payload._id);
        if (conversationIndex >= 0) {
          state.list[conversationIndex] = action.payload;
        } else {
          state.list.unshift(action.payload);
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sendingMessage = false;
        state.error = action.payload;
      })
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchConversation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversation.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrent, clearError } = conversationsSlice.actions;
export default conversationsSlice.reducer;
