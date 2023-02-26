import React from 'react';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from "../../styles/Recipe.module.css";
import Card from "react-bootstrap/Card";
import Media from 'react-bootstrap/Media';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';

import { axiosRes } from "../../api/axiosDefaults";
import { EditDeleteDropdown } from '../../components/EditDeleteDropdown';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Recipe = (props) => {

    // main & handle functionality for Recipe displays & counts

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
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/recipes/${id}/edit`);
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/recipes/${id}/`);
            history.goBack();
        } catch(err) {

        }
    };


    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post("/likes/", { recipe: id });
            setRecipes((prevRecipes) => ({
                ...prevRecipes,
                results: prevRecipes.results.map((recipe) => {
                    return recipe.id === id ? 
                        { ...recipe, likes_count: recipe.likes_count + 1, like_id: data.id }
                        : recipe;
                }),
            }));
        } catch (err) {

        }
    };

    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}/`);
            setRecipes((prevRecipes) => ({
                ...prevRecipes,
                results: prevRecipes.results.map((recipe) => {
                    return recipe.id === id ? 
                        { ...recipe, likes_count: recipe.likes_count - 1, like_id: null }
                        : recipe;
                }),
            }));
        } catch (err) {

        }
    };


    const handleMade = async () => {
        try {
            const { data } = await axiosRes.post("/made/", { recipe: id });
            setRecipes((prevRecipes) => ({
                ...prevRecipes,
                results: prevRecipes.results.map((recipe) => {
                    return recipe.id === id ? 
                        { ...recipe, made_count: recipe.made_count + 1, made_id: data.id }
                        : recipe;
                }),
            }));
        } catch (err) {

        }
    };

    const handleUnmade = async () => {
        try {
            await axiosRes.delete(`/made/${made_id}/`);
            setRecipes((prevRecipes) => ({
                ...prevRecipes,
                results: prevRecipes.results.map((recipe) => {
                    return recipe.id === id ? 
                        { ...recipe, made_count: recipe.made_count - 1, made_id: null }
                        : recipe;
                }),
            }));
        } catch (err) {

        }
    };

    return (
        <Card className={styles.Recipe}>
            <Card.Body>
                <Media className='align-items-center justify-content-between'>
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profile_image} height={55} />
                        {owner}
                    </Link>
                    <div className='d-flex align-items-center'>
                        <span>{updated_at}</span>
                        {is_owner && recipePage && 
                            <EditDeleteDropdown
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        }
                    </div>
                </Media>
            </Card.Body>
            <Link to={`/recipes/${id}`}>
                <Card.Img src={image} alt={title} />
            </Link>
            <Card.Body>
                {title && <Card.Title>{title}</Card.Title>}
                <hr/>
                {ingredients && <Card.Title>Ingredients<hr/>
                    <p className={styles.RecipeContent}>{ingredients}</p></Card.Title>}
                {method && <Card.Title>Method<hr/>
                    <p className={styles.RecipeContent}>{method}</p></Card.Title>}
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
                            <i className={`fa-solid fa-bowl-rice ${styles.Icon}`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleMade}>
                            <i className={`fa-solid fa-bowl-rice ${styles.IconOutline}`} />
                        </span>
                    ) : (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Log in to mark recipes as made!</Tooltip>}
                        >
                            <i className="fa-solid fa-bowl-rice" />
                        </OverlayTrigger>
                    )}
                    {made_count}
                    <Link to={`/recipes/${id}`}>
                        <i className={`far fa-comments ${styles.Icon}`} />
                    </Link>
                    {comments_count}
                </div>
            </Card.Body>
        </Card>
    )
}

export default Recipe