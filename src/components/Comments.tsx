import React, { useEffect, useReducer } from 'react'
import { Post as IPost, getPost, getPostsFromIds } from '../utils/api'
import queryString from 'query-string'
import Loading from './Loading'
import { formatDate } from '../utils/helpers'
import Post from './Post'
import { Link } from 'react-router-dom'

interface CommentsState {
    loading: boolean;
    post: null | IPost;
    comments: null | IPost[];
    error: null | string;
}

type CommentsAction = 
    | { type: "fetch" }
    | { type: "loadedPost", post: IPost }
    | { type: "loadedComments", comments: IPost[] }
    | { type: "error", message: string }

function commentsReducer(state: CommentsState, action: CommentsAction): CommentsState {
    if (action.type ===  "fetch") {
        return {
            loading: true,
            error: null,
            post: null,
            comments: null,
        }
    } else if (action.type === "loadedPost") {
        return {
            ...state,
            loading: false,
            error: null,
            post: action.post,
        }
    } else if (action.type === "loadedComments") {
        return {
            ...state,
            loading: false,
            error: null,
            comments: action.comments,
        }
    } else if (action.type === "error") {
        return {
            loading: false,
            error: action.message,
            post: null,
            comments: null
        }
    } else {
        throw new Error("Unsupported action in commentsReducer")
    }
}

function Comments({
    location,
  }: {
    location: { search: string };
  }): JSX.Element {
    const { id } = queryString.parse(location.search) as { id: string };
    let [state, dispatch] = useReducer(commentsReducer, {
        loading: true,
        post: null,
        comments: null,
        error: null
    })

    useEffect(() => {
        async function loadPost(id: number) {
            dispatch({type: "fetch"})
            let post = await getPost(id)
            dispatch({type: "loadedPost", post})
            let comments = await getPostsFromIds(post.kids)
            dispatch({type: "loadedComments", comments})
        }
        try {
            loadPost(parseInt(id))
        } catch (ex) {
            dispatch({type: "error", message: ex.message})
        }
    }, [id])

    if (state.error) return <div>{state.error}</div>

    const { loading, post, comments } = state

    if (loading) {
        return <Loading />
    } else {
        return <div className="post-comments">
            { post && 
                <ul className="md:w-1/2 md:mx-auto m-10 bg-white dark:bg-gray-800 dark:text-white rounded shadow px-8 pt-3">
                    <Post {...post} />
                </ul>
            }
            {comments && <div className="md:w-1/2 md:mx-auto m-10">
                { comments.map((comment) => {
                return <div className="dark:text-white" key={comment.id}>
                    <span>by <Link className="text-blue-900 dark:text-yellow-500 underline hover:no-underline" to={`/user?id=${comment.by}`}>{comment.by}</Link> on <strong>{formatDate(comment.time)}</strong></span>
                    <div className="bg-gray-300 dark:bg-gray-800 p-8 mb-4" dangerouslySetInnerHTML={{__html: comment.text}}></div>
                </div>
                }) }
            </div>
            }
        </div>
    }
}

export default Comments