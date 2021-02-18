import React, { useEffect, useState } from 'react';
import { Link } from 'react'; //for not login situation, then has to go back to home
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import {Button, Icon, Label} from 'semantic-ui-react';
import CustomPopup from '../util/CustomPopup';

function LikeButton({user, post: {id, likes, likeCount}}){
    const [liked, setLiked] = useState(false);

    useEffect(()=>{
        if(user && likes.find(like=> like.username===user.username)){
            setLiked(true);
        }
        else{
            setLiked(false);
        }
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id}
    });


    const likeButton = user? (
        liked?(
            <Icon name='heart' color='red' size='big' style={{marginLeft: 0}}/>

        ):(
            <Icon name='heart outline' color='black' size='big' style={{marginLeft: 0}}/>
        )
    ):(
        <Icon name='heart outline' color='black' size='big' style={{marginLeft: 0}}/>
    );
    
    return(
        user? (
            <Button as='div' labelPosition='right' onClick={likePost}>
                <CustomPopup content={liked? 'unlike post': 'like post'}>
                {likeButton} 
                </CustomPopup>
            </Button>
        ):(
            <Button labelPosition='right' as='a' href='/login'>
                <CustomPopup content={liked? 'unlike post': 'like post'}>
                {likeButton} 
                </CustomPopup>
            </Button>
        )
        
    );
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id
            likes{
                id
                username
            }
            likeCount
        }
    }
`

export default LikeButton;


/*<Button as='div' labelPosition='right' onClick={likePost}>
<CustomPopup content={liked? 'unlike post': 'like post'}>
{likeButton} 
</CustomPopup>
<Label basic color='teal' pointing='left'>{likeCount}</Label>
</Button>*/