import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {CachePersistor} from 'apollo-cache-persist'

let uri;

process.env.NODE_ENV == 'development' ? uri = "https://localhost:4000" : uri = 'https://medium-followers.herokuapp.com/'

const httpLink = new HttpLink({
    uri:uri
})
export const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    link: httpLink,
    cache: cache
})

export const persistor = new CachePersistor({
    cache,
    storage: window.localStorage
})

export default apolloClient


