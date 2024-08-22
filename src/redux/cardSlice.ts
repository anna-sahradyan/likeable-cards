import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

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
    showLikedOnly: boolean;
    likedCardIds: string[];
}

const initialState: CardState = {
    cards: [],
    loading: false,
    error: null,
    showLikedOnly: false,
    likedCardIds: [],
};

export const fetchPhotos = createAsyncThunk<Card[], void, { rejectValue: string }>(
    'cards/fetchPhotos',
    async function (_, {rejectWithValue}) {
        try {
            const response = await fetch(`https://api.unsplash.com/search/photos?query=london&client_id=TMfitJcpO39Gi4zOEvkuYLNSsU0rudq1zgBq2xYJWDI&per_page=24`);
            if (!response.ok) {
                throw new Error('Server Error!');
            }

            const data = await response.json();
            console.log(data)
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
            const cardId = action.payload;
            const card = state.cards.find(card => card.id === cardId);

            if (card) {
                card.liked = !card.liked;

                if (card.liked) {
                    state.likedCardIds.push(cardId);
                } else {
                    state.likedCardIds = state.likedCardIds.filter(id => id !== cardId);
                }

                localStorage.setItem('likedCardIds', JSON.stringify(state.likedCardIds));
            }
        },
        deleteCard(state, action: PayloadAction<string>) {
            state.cards = state.cards.filter(card => card.id !== action.payload);
            state.likedCardIds = state.likedCardIds.filter(id => id !== action.payload);
            localStorage.setItem('likedCardIds', JSON.stringify(state.likedCardIds));
        },
        toggleShowLikedOnly(state) {
            state.showLikedOnly = !state.showLikedOnly;
            localStorage.setItem('showLikedOnly', JSON.stringify(state.showLikedOnly));
        },
        setCardsFromLocalStorage(state) {
            const savedCards = localStorage.getItem('likedCardIds');
            if (savedCards) {
                state.likedCardIds = JSON.parse(savedCards);
            }
        },
        setShowLikedOnlyFromLocalStorage(state) {
            const savedFilter = localStorage.getItem('showLikedOnly');
            if (savedFilter) {
                state.showLikedOnly = JSON.parse(savedFilter);
            }
        },
        clearLocalStorage(state) {
            localStorage.removeItem('likedCardIds');
            localStorage.removeItem('showLikedOnly');
            state.likedCardIds = [];
            state.showLikedOnly = false;
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
                localStorage.setItem('likedCardIds', JSON.stringify(state.likedCardIds)); // Обновляем локальное хранилище
            })
            .addCase(fetchPhotos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    toggleLike,
    deleteCard,
    toggleShowLikedOnly,
    setCardsFromLocalStorage,
    setShowLikedOnlyFromLocalStorage,
    clearLocalStorage
} = cardSlice.actions;
export default cardSlice.reducer;
