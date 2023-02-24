import React from 'react';
import styles from '../../styles/Profile.module.css';
import btnStyles from "../../styles/Button.module.css";
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar.js';


const PopularRecipe = (props) => {

    // Styling & linking for use in PopularRecipes component

    const {
        recipe,
        mobile,
        imageSize = 70,
    } = props;

    const {
        id,
        image,
    } = recipe;


    return (
        <div
            className={`my-3 d-flex align-items-center
                ${mobile && 'flex-column'}
            `}
        >
            <div>
                <Link
                    to={`/recipes/${id}/`}
                    className='align-self-center'
                >
                    <Avatar
                        src={image}
                        height={imageSize}
                    />
                </Link>
            </div>
            {recipe.likes_count === 1 ? (
                <div
                    className={`mx-auto ${styles.WordBreak} ${btnStyles.ButtonFollow} ${btnStyles.PopularButton}`}
                >
                    {recipe.likes_count} like
                </div>
            ) : (
                <div
                    className={`mx-auto ${styles.WordBreak} ${btnStyles.ButtonFollow} ${btnStyles.PopularButton}`}
                >
                    {recipe.likes_count} likes
                </div>
            )}
            <div
                className={`text-right ${mobile && 'ml-auto'}`}
            >
            </div>
        </div>
    )
}

export default PopularRecipe