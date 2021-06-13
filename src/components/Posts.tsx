import React, { useEffect, useReducer } from 'react'
import { PostType, Post as IPost, getPosts } from '../utils/api'
import Loading from './Loading'
import Post from './Post'

interface PostsState {
    posts: null | IPost[];
    error: null | string;
    loading: boolean;
}

type PostsAction =
| { type: "fetch" }
| { type: "success"; posts: IPost[] }
| { type: "error"; message: string };

function postsReducer(state: PostsState, action: PostsAction): PostsState {
    if (action.type === "fetch") {
        return {
            posts: null,
            error: null,
            loading: true
        }
    } else if (action.type === "success") {
        return {
            posts: action.posts,
            error: null,
            loading: false
        }
    } else if (action.type === "error") {
        return {
            posts: null,
            error: action.message,
            loading: false
        }
    } else {
        throw new Error(`That action type is not supported.`);
    }
}

function Posts({type}: {type: PostType}): JSX.Element {
    let [state, dispatch] = useReducer(postsReducer, {
        posts: null,
        error: null,
        loading: true
    })
    
    useEffect(() => {
        (async () => {
            dispatch({type: "fetch"})
            try {
                let posts = await getPosts(type)
                dispatch({type: "success", posts})
            } catch(ex) {
                dispatch({type: "error", message: ex.message})
            }
        })()
    }, [type])

    if (state.loading) {
        return <Loading />
    } else {
        return <ul className="md:w-1/2 md:mx-auto m-10 bg-white dark:bg-gray-800 dark:text-white rounded shadow px-8">
            { state.posts && state.posts.map((post) => {
            return <Post {...post } key={post.id} />
            }) }
        </ul>
    }
}

export default Posts