import React, { useContext } from 'react';
import { Card, Image, Popup } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import CommentButton from './CommentButton';

function PostCard({post: { id, body, createdAt, username, likeCount, commentCount, likes, comments }}){
    const { user } = useContext(AuthContext);
    
    return(
        <Card fluid>
            <Card.Content>
                <Image
                style={{marginRight: 10, marginBottom: 10}}
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                circular/>
                <Card.Header style={{display: 'inline-block'}}>{username}</Card.Header>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra style={{paddingRight: 16, paddingLeft: 16}}>
                <LikeButton user={user} post={{ id, likes, likeCount }}/>

                <CommentButton post={{id}}/>
                
                {user && user.username === username && (
                    <DeleteButton postId={id}/>
                )}

                <Card.Description style={{fontWeight: "bold", marginBottom: 10}}>{likeCount >= 1 && (likeCount > 1? likeCount + " likes": likeCount + " like")}</Card.Description>
                
                {commentCount > 2 && (<Card.Meta as={Link} to={`/posts/${id}`} style={{display: 'block', marginBottom: 3}}>View all {commentCount} comments</Card.Meta>)}  
                
                {comments.slice(0,2).map((comment)=>(
                    <div style={{marginBottom: 3}}>
                        <Popup 
                            key={comment.username}
                            header={comment.username}
                            content="3 posts"
                            trigger={<span style={{fontWeight: 'bold', color: 'black'}}>{comment.username + " "}</span>}/>
                        <span style={{fontWeight: 'normal'}}>{comment.body}</span><br></br> 
                    </div>
                ))}  

                <Card.Meta as={Link} to={`/posts/${id}`} style={{display: 'block', fontSize: 12, marginTop: 7}}>{moment(createdAt).fromNow(true)}</Card.Meta>    
            </Card.Content>
        </Card>
    );
}

export default PostCard;