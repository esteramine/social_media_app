import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
{
    getPosts{
        id 
        username 
        body 
        createdAt 
        likeCount 
        commentCount

        comments{
            id 
            username 
            body 
            createdAt
        }

        likes{
            username
        }
    }
}
`