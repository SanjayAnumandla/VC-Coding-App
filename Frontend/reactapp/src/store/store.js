import authReducer from './authslice';

export const store = configureStore({
  reducer: {
    auth: authReducer, // Add this line
  },
});