import { toast } from "react-toastify";


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../apiService";
import { fetchBooks } from "./bookAPI";

const initialState = {
    books: [],
    readingList: [],
    bookDetail: null,
    status: null,

}



export const fetchData = createAsyncThunk("book/fetchData", async (props) => {
    const response = await fetchBooks(props);
    return response.data;
  });

export const getBookDetail = createAsyncThunk(
    'book/bookDetail',
    async (bookId) => {
        try {
            const response = await api.get(`/books/${bookId}`);
            return response.data
          } 
        catch (error) {
            toast.error(error.message);
          }
    }
)
export const addToReadingList = createAsyncThunk(
    'book/addToReadingList',
    async (bookDetail) => {
        const response = await api.post('/favorites', bookDetail)
        return response.data
    }
)
export const removeBook = createAsyncThunk(
    'book/removeBook',
    async (bookId) => {
        const response = await api.delete(`/favorites/${bookId}`)
        return response.data
    }
)

export const getReadingList = createAsyncThunk(
    'book/getReadingList',
    async () => {
        const response = await api.get('/favorites')
        return response.data
    }
)


const bookSlice = createSlice({
    name: 'bookStore',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchData.fulfilled, (state, action) => {
            state.status = null
            state.books = action.payload
        })
        .addCase(fetchData.rejected, (state) => {
            state.status = 'failed'
        })
        builder.addCase(getBookDetail.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(getBookDetail.fulfilled, (state, action) => {
            state.status = 'success'
            state.bookDetail = action.payload
        })
        .addCase(getBookDetail.rejected, (state)=>{
            state.status = 'failed'
        })
        builder.addCase(addToReadingList.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(addToReadingList.fulfilled, (state, action) => {
            state.status= 'success'
            state.readingList = action.payload

            toast.success('Added')
        })
        .addCase(addToReadingList.rejected, (state, action) => {
            state.status= 'failed'
            toast.error(action.error.message)
        })
        builder.addCase(removeBook.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(removeBook.fulfilled, (state, action) => {
            state.status = 'completed'
            // state.readingList = action.payload
            toast.success('Removed')
        })
        .addCase(removeBook.rejected, (state , action) => {
            state.status = 'falied'
            toast.error(action.error.message)
        })
        builder.addCase(getReadingList.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(getReadingList.fulfilled, (state, action) => {
            state.status = 'completed'
            state.readingList = action.payload
        })
        .addCase(getReadingList.rejected, (state, action) => {
            state.status = 'falied'
            
        })


    }
})

export default bookSlice.reducer