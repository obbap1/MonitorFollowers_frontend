import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {CachePersistor} from 'apollo-cache-persist'

const httpLink = new HttpLink({
    uri:'https://medium-followers.herokuapp.com/'
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


