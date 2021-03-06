import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useContext, useRef, useState } from 'react';
import { Button, Card, Form, Grid, Icon, Image, Label } from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import CustomPopup from '../util/CustomPopup';
import CommentButton from '../components/CommentButton';

function SinglePost(props){
    const postId = props.match.params.postId;
    
    const { user } = useContext(AuthContext);

    const commentInputRef = useRef(null);

    const { data:{getPost}={} } = useQuery(FETCH_POST_QUERY, {
        variables: { postId }
    });

    const [comment, setComment] = useState('');

    const [submitComment ] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update(){
            setComment('');
            commentInputRef.current.blur();
        },
        variables:{
            postId,
            body: comment
        }

    });

    function deletePostCallback(){
        props.history.push('/');
    }

    let postMarkup;

    if(!getPost){
        postMarkup = <p>Loading Post...</p>
    }
    else{
        const {id, body, createdAt, username, comments, likes, likeCount, commentCount} = getPost;
        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                        floated='right'
                        size='small'
                        src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr/>
                            <Card.Content extra>
                                <LikeButton user={user} post={{id, likes, likeCount}}/>
                                
                                <CommentButton post={{id}}/>
                                
                                {user && user.username === username && (
                                    <DeleteButton postId={postId} callback={deletePostCallback}/>
                                )}
                            </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                    <p>Comment on the post</p>
                                    <Form>
                                        <div className='ui action input fluid'>
                                            <input
                                                type='text'
                                                placeholder='Comment...'
                                                name='comment'
                                                value={comment}
                                                onChange={event=> setComment(event.target.value)}
                                                ref={commentInputRef}
                                            />
                                            <button type='submit'
                                                className='ui button teal'
                                                disabled={comment.trim()===''}
                                                onClick={submitComment}>
                                                    Submit
                                            </button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {comments.map(comment=>(
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    {user && user.username===comment.username && (
                                        <DeleteButton postId={id} commentId={comment.id}/>
                                    )}
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>
                    
                </Grid.Row>
            </Grid>
        )
    }

    return postMarkup;

}

const FETCH_POST_QUERY= gql`
    query($postId: ID!){
        getPost(postId: $postId){
            id
            body
            createdAt
            username
            likeCount
            likes{
                username
            }
            commentCount
            comments{
                id
                username
                body
                createdAt
            }

        }
    }
`;

const SUBMIT_COMMENT_MUTATION = gql`
    mutation($postId: ID!, $body: String!){
        createComment(postId: $postId, body: $body){
            id
            comments{
                id
                body
                createdAt
                username
            }
            commentCount
        }
    }
`;

export default SinglePost;