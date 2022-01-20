"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var urql_1 = require("urql");
var isServerSide = typeof window === "undefined";
var ssrExchange = {
    isClient: !isServerSide,
};
var client = (0, urql_1.createClient)({
    exchanges: [urql_1.dedupExchange, urql_1.cacheExchange, ssr, urql_1.fetchExchange],
});
