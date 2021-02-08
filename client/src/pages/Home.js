import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import PostCard from '../components/PostCard';
function Home() {
    const { loading, data: {getPosts: posts}={} } = useQuery(FETCH_POSTS_QUERY);
    //posts is an alias for getPosts

    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {loading?(
                    <h1>Loading posts...</h1>
                ):(
                    posts && posts.map(post =>(
                        <Grid.Column key={post.id}>
                            <PostCard post={post}/>
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
    )
}

const FETCH_POSTS_QUERY = gql`
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

export default Home;