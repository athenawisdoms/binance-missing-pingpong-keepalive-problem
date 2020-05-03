const initialState = {
    asks: [],
    bids: [],
    trades: [],
};

export default function datafeedReducer(state=initialState, action) {
    switch (action.type) {
        case 'UPDATE_ORDERBOOK':
            return { ...state, asks: [...action.payload.asks], bids: [...action.payload.bids] }

        case 'UPDATE_TRADES':
            return { ...state, trades: [ ...state.trades, action.payload[0] ] }

        default:
            return state
    }
}