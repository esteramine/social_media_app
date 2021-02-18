import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import CustomPopup from '../util/CustomPopup';

function CommentButton({post: {id}}){
    return (
        <CustomPopup content='comments on the post'>
            <Button labelPosition='right' as={Link} to={`/posts/${id}`} style={{ marginBottom: 10 }}>
                <Icon name='comment outline' color='black' size='big' style={{marginLeft: 0}}/>
            </Button>
        </CustomPopup>
    );
}

export default CommentButton;