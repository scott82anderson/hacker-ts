const HACKER_NEWS_API_BASE = 'https://hacker-news.firebaseio.com'
const TOP_POSTS_ENDPOINT = '/v0/topstories'
const NEW_POSTS_ENDPOINT = '/v0/newstories'
const USER_ENDPOINT = '/v0/user/'
const API_SUFFIX = '.json?print=pretty'


export type PostType = "top" | "new";

export interface Post {
    id: number;
    by: string;
    time: number;
    text: string;
    title: string;
    url: string;
    descendants: number;
    kids: number[];
    type: string;
}

export interface User {
    about: string;
    created: number;
    id: string;
    karma: number;
    submitted: number[];
}

function onlyPosts(posts: Post[]) {
    return posts.filter(({ type }) => type === "story");
  }

export async function getPost(id: number): Promise<Post> {
    const ITEM_ENDPOINT = HACKER_NEWS_API_BASE + `/v0/item/${id}${API_SUFFIX}`

    let response = await fetch(ITEM_ENDPOINT)

    if (!response.ok) {
        throw new Error('Unable to fetch post')
    }
    return response.json()
}

export async function getPostsFromIds(postIds: number[]): Promise<Post[]> {
    return Promise.all(postIds.map((id) => {
        return getPost(id)
    }))
}

export async function getPosts(postType: PostType): Promise<Post[]> {
    const apiEndpoint = HACKER_NEWS_API_BASE + 
        (postType === "top" ? TOP_POSTS_ENDPOINT : NEW_POSTS_ENDPOINT) + API_SUFFIX
    
    let response = await fetch(apiEndpoint)

    if (!response.ok) {
        throw new Error('Unable to fetch post ids')
    }
    
    let postIds:number[] = await response.json()
    postIds = postIds.slice(0, 40) // only load the first 40 posts

    return getPostsFromIds(postIds);
}

export async function getUser(id: string): Promise<User> {
    const apiEndpoint = HACKER_NEWS_API_BASE + USER_ENDPOINT + id + API_SUFFIX
    
    let response = await fetch(apiEndpoint)

    if (!response.ok) {
        throw new Error('Unable to fetch user data')
    }
    
    return response.json()
}

export async function getUserPosts(userPosts: number[]): Promise<Post[]> {
    const posts:Post[] = await Promise.all(userPosts.map((id) => {
        return getPost(id)
    }))
    return onlyPosts(posts)
}
