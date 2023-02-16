import React from 'react';
import styles from '../../styles/Profile.module.css';
import btnStyles from "../../styles/Button.module.css";
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar.js';


const PopularRecipe = (props) => {

    const {
        recipe,
        mobile,
        imageSize = 70,
    } = props;

    const {
        id,
        image,
        owner
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
            <div
                className={`mx-4 ${styles.WordBreak}`}
            >
                <Link
                    to={`/recipes/${id}`}
                    className='align-self-center'
                >
                    {owner}
                </Link>
            </div>
            <div
                className={`${styles.WordBreak} ${btnStyles.ButtonFollow} ${btnStyles.PopularButton}`}
            >
                {recipe.likes_count}
            </div>
            <div
                className={`text-right ${mobile && 'ml-auto'}`}
            >
            </div>
        </div>
    )
}

export default PopularRecipe