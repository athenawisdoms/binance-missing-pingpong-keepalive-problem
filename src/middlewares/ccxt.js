import ccxtpro from 'ccxt.pro';
import ccxt from 'ccxt.pro';

const watchExchange = async (exchangeName, symbol, store) => {
    console.log(`Watching: ${exchangeName} ${symbol}`);
    const exchange = new ccxtpro[exchangeName]({ enableRateLimit: true, verbose: false });
    watchTrades(exchange, symbol, store);
    watchOrderbook(exchange, symbol, store);

    return exchange
}

const watchOrderbook = async (exchange, symbol, store) => {
    while (true) {
        try {
            const orderbook = await exchange.watchOrderBook(symbol, 100);
            store.dispatch({
                type: 'UPDATE_ORDERBOOK',
                payload: orderbook
            });
        } catch (e) {
            if (e instanceof ccxt.NetworkError) {
                console.log (exchange.id, symbol, 'watchOrderBook failed due to a network error:', e.message)
            } else if (e instanceof ccxt.ExchangeError) {
                console.log (exchange.id, symbol, 'watchOrderBook failed due to exchange error:', e.message)
            } else {
                console.log (exchange.id, symbol, 'watchOrderBook failed with:', e.message)
            }
        }
    }
}

const watchTrades = async (exchange, symbol, store) => {
    while (true) {
        try {
            const trades = await exchange.watchTrades(symbol, undefined, 1);
            store.dispatch({
                type: 'UPDATE_TRADES',
                payload: trades
            });
        } catch (e) {
            if (e instanceof ccxt.NetworkError) {
                console.log (exchange.id, symbol, 'watchTrades failed due to a network error:', e.message)
            } else if (e instanceof ccxt.ExchangeError) {
                console.log (exchange.id, symbol, 'watchTrades failed due to exchange error:', e.message)
            } else {
                console.log (exchange.id, symbol, 'watchTrades failed with:', e.message)
            }
        }
    }
}

const ccxtMiddleware = (store) => {

    let exchange = null;
    exchange = watchExchange('binance', 'ETH/BTC', store);

    return next => action => {
        return next(action);
    }
}

export default ccxtMiddleware;