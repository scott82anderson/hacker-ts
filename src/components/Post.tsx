import React from 'react'
import { Link } from 'react-router-dom'
import { Post as IPost } from '../utils/api'
import { formatDate } from '../utils/helpers'

function Post(post: IPost): JSX.Element {
    return <li className="py-6 border-b border-gray-100">
        <a target="_blank" rel="noreferrer" className="font-semibold text-blue-900 dark:text-yellow-500 underline hover:no-underline" href={post.url}>{post.title}</a>
        <div className="meta-info-light"><span>by <Link className="text-blue-900 dark:text-yellow-500 underline hover:no-underline" to={`/user?id=${post.by}`}>{post.by}</Link></span>
            <span className="font-semibold"> on {formatDate(post.time)}</span><span> with <Link className="text-blue-900 dark:text-yellow-500 underline hover:no-underline" to={`/post?id=${post.id}`}>{post.descendants}</Link> comments</span>
            </div>
        </li>
  
}

export default Post
