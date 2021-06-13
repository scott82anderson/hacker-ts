import React, { useEffect, useReducer } from 'react'
import queryString from 'query-string'
import { User as IUser, Post as IPost, getUser, getUserPosts } from '../utils/api'
import Post from './Post'
import { formatDate } from '../utils/helpers';
import Loading from './Loading';

interface UserState {
    loading: boolean;
    user: null | IUser;
    posts: null | IPost[];
    error: null | string;
}

type UserAction = 
    | { type: 'fetch'}
    | { type: 'loadedUser', user: IUser }
    | { type: 'loadedPosts', posts: IPost[] }
    | { type: 'error', message: string }

function userReducer(state: UserState, action: UserAction): UserState {
    if (action.type ===  "fetch") {
        return {
            loading: true,
            error: null,
            posts: null,
            user: null,
        }
    } else if (action.type === "loadedPosts") {
        return {
            ...state,
            loading: false,
            error: null,
            posts: action.posts,
        }
    } else if (action.type === "loadedUser") {
        return {
            ...state,
            loading: false,
            error: null,
            user: action.user,
        }
    } else if (action.type === "error") {
        return {
            loading: false,
            error: action.message,
            posts: null,
            user: null
        }
    } else {
        throw new Error("Unsupported action in userReducer")
    }
}


function User({
    location,
  }: {
    location: { search: string };
  }): JSX.Element {
    const { id } = queryString.parse(location.search) as { id: string };
    let [state, dispatch] = useReducer(userReducer, {
        loading: true,
        posts: null,
        user: null,
        error: null
    })

    useEffect(() => {
        async function loadUser(id: string) {
            dispatch({type: "fetch"})
            let data = await getUser(id)
            dispatch({type: "loadedUser", user: data})
            let postData = await getUserPosts(data.submitted.slice(0, 20))
            dispatch({type: "loadedPosts", posts: postData})
        }
        try {
            loadUser(id)
        } catch (ex) {
            dispatch({type: "error", message: ex.message})
        }
    }, [id])

    const {loading, user, posts} = state

    if (state.error) return <div>{state.error}</div>

    if (!loading && user !== null) {
        return <div className="md:w-1/2 md:mx-auto m-10 bg-white dark:bg-gray-800 dark:text-white rounded shadow px-8 pt-3">
            <h2 className="font-bold text-4xl mb-2">{user.id}</h2>
            <div className="user-details">
                joined on <strong>{formatDate(user.created)} </strong>
                has <strong>{user.karma}</strong> karma
            </div>
            { posts !== null && <ul>
                { posts.map(post => {
                    return <Post {...post} key={post.id} />
                }) }
                </ul>
            }
        </div>
    } else {
        return <Loading />
    }
}

export default User
