import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from "../../styles/Recipe.module.css";
import Card from "react-bootstrap/Card";
import { Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';

const Recipe = (props) => {

    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        likes_count,
        like_id,
        made_count,
        made_id,
        title,
        ingredients,
        method,
        image,
        updated_at,
        recipePage,
        setRecipes,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    return (
        <Card className={styles.Recipe}>
            <Card.Body>
                <Media className='align-items-center justify-content-between'>
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profile_image} height={55} />
                    </Link>
                    <div className='d-flex align-items-center'>
                        <span>{updated_at}</span>
                        {is_owner && recipePage && ('...')}
                    </div>
                </Media>
            </Card.Body>
            <Link to={`/recipes/${id}`}>
                <Card.Img src={image} alt={title} />
            </Link>
            <Card.Body>
                {title && <Card.Title className='text-center'>{title}</Card.Title>}
                {ingredients && <Card.Title>{ingredients}</Card.Title>}
                {method && <Card.Title>{method}</Card.Title>}
                <div className={styles.PostBar}>
                    {is_owner ? (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>You can't like your own recipe!</Tooltip>}
                        >
                            <i className="far fa-heart" />
                        </OverlayTrigger>
                    ) : like_id ? (
                        <span onClick={()=>{}}>
                            <i className={`fas fa-heart ${styles.Icon}`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={()=>{}}>
                            <i className={`far fa-heart ${styles.IconOutline}`} />
                        </span>
                    ) : (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Log in to like recipes!</Tooltip>}
                        >
                            <i className="far fa-heart" />
                        </OverlayTrigger>
                    )}
                    {likes_count}
                    {made_id ? (
                        <span onClick={()=>{}}>
                            <i className={`fa-solid fa-bowl-food ${styles.Icon}`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={()=>{}}>
                            <i className={`fa-solid fa-bowl-food ${styles.IconOutline}`} />
                        </span>
                    ) : (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Log in to mark recipes as made!</Tooltip>}
                        >
                            <i className="fa-solid fa-bowl-food" />
                        </OverlayTrigger>
                    )}
                    {made_count}
                    <Link to={`/recipes/${id}`}>
                        <i className="far fa-comments" />
                    </Link>
                    {comments_count}
                </div>
            </Card.Body>
        </Card>
    )
}

export default Recipe