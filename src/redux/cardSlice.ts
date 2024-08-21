import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Card {
    id: string;
    title: string;
    imageUrl: string;
    text: string;
    liked: boolean;
}

interface CardState {
    cards: Card[];
    loading: boolean;
    error: string | null;
}

const initialState: CardState = {
    cards: [],
    loading: false,
    error: null,
};

export const fetchPhotos = createAsyncThunk(
    'cards/fetchPhotos',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch(`https://api.unsplash.com/search/photos?query=london&client_id=TMfitJcpO39Gi4zOEvkuYLNSsU0rudq1zgBq2xYJWDI&per_page=24`);
            if (!response.ok) {
                throw new Error('Server Error!');
            }

            const data = await response.json();
            return data.results.map((photo: any) => ({
                id: photo.id,
                title: photo.alt_description || 'No title',
                imageUrl: photo.urls.small,
                text: photo.description || 'No description',
                liked: false,
            }));
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);


const cardSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        toggleLike(state, action: PayloadAction<string>) {
            const card = state.cards.find((card) => card.id === action.payload);
            if (card) {
                card.liked = !card.liked;
            }
        },
        deleteCard(state, action: PayloadAction<string>) {
            state.cards = state.cards.filter((card) => card.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPhotos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPhotos.fulfilled, (state, action: PayloadAction<Card[]>) => {
                state.loading = false;
                state.cards = action.payload;
            })
            .addCase(fetchPhotos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { toggleLike, deleteCard } = cardSlice.actions;
export default cardSlice.reducer;
