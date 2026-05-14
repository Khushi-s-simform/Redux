import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";

interface Post {
    id : number ,
    title : string ,
    post : string
}

interface PostsState {
    posts : Post[] ,
    loading : Boolean ,
    error : string | null
}

const initialState : PostsState = {
    posts : [],
    loading:false,
    error:null
}


//THUNK 
export const FetchPosts = createAsyncThunk<
Post[],
void ,
{rejectValue:string}
>(
    "posts/FetchPosts",

    async(_,thunkAPI) => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");

            if(!response.ok){
                return thunkAPI.rejectWithValue(
                    "Fetch Failed"
                )
            }

            const data:Post[] = await response.json()

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue (
                "Network Error"
            )
        }
    }
)

//SLICE
const PostsSlice = createSlice({
    name : 'posts',
    initialState ,
    reducers:{} ,
    extraReducers : (builder) => {
        builder 

        //PENDING
        .addCase (
            FetchPosts.pending,

            (state) => {
                state.loading = true;
                state.error = null;
            }
        )

        //SUCCESS
        .addCase (
            FetchPosts.fulfilled ,
            (state , action) => {
                state.loading=false;
                state.posts = action.payload;
            }
        )

        // ERROR
        .addCase (
            FetchPosts.rejected ,
            (state , action) => {
                state.loading = false;
                state.error = action.payload || "unknown error"
            }
        )
    }
})

export default PostsSlice.reducer;