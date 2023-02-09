import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from "../../styles/Recipe.module.css";
import Card from "react-bootstrap/Card";
import { Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';

import { axiosRes } from "../../api/axiosDefaults";

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

    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post("/likes/", { recipe: id });
            setRecipes((prevRecipes) => ({
                ...prevRecipes,
                results: prevRecipes.results.map((recipe) => {
                    return recipe.id === id
                        ? { ...recipe, likes_count: recipe.likes_count + 1, like_id: data.id }
                        : recipe;
                }),
            }));
        } catch (err) {
            // console.log(err);
        }
    };

    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}/`);
            setRecipes((prevRecipes) => ({
                ...prevRecipes,
                results: prevRecipes.results.map((recipe) => {
                    return recipe.id === id
                        ? { ...recipe, likes_count: recipe.likes_count - 1, like_id: null }
                        : recipe;
                }),
            }));
        } catch (err) {
            // console.log(err);
        }
    };


    const handleMade = async () => {
        try {
            const { data } = await axiosRes.post("/made/", { recipe: id });
            setRecipes((prevRecipes) => ({
                ...prevRecipes,
                results: prevRecipes.results.map((recipe) => {
                    return recipe.id === id
                        ? { ...recipe, made: recipe.made_count + 1, made_id: data.id }
                        : recipe;
                }),
            }));
        } catch (err) {
            // console.log(err);
        }
    };

    const handleUnmade = async () => {
        try {
            await axiosRes.delete(`/made/${made_id}/`);
            setRecipes((prevRecipes) => ({
                ...prevRecipes,
                results: prevRecipes.results.map((recipe) => {
                    return recipe.id === id
                        ? { ...recipe, made_count: recipe.made_count - 1, made_id: null }
                        : recipe;
                }),
            }));
        } catch (err) {
            // console.log(err);
        }
    };

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
                        <span onClick={handleUnlike}>
                            <i className={`fas fa-heart ${styles.Icon}`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleLike}>
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
                        <span onClick={handleUnmade}>
                            <i className={`fa-solid fa-bowl-food ${styles.Icon}`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleMade}>
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