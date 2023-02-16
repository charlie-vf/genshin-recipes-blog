import React from 'react';
import styles from '../../styles/Profile.module.css';
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from '../../contexts/CurrentUserContext.js';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar.js';
import { Button } from 'react-bootstrap';

const PopularRecipe = (props) => {

    const {
        recipe,
        mobile,
        imageSize = 35,
    } = props;

    const {
        id,
        following_id,
        image,
        owner
    } = recipe;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

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
                className={`mx-2 ${styles.WordBreak}`}
            >
                {owner}
            </div>
            <div
                className={`text-right ${mobile && 'ml-auto'}`}
            >
                {!mobile &&
                    currentUser &&
                    !is_owner &&
                    (following_id ? (
                        <Button
                            className={`${btnStyles.ButtonFollow} ${btnStyles.Unfollow}`}
                            onClick={() => { }}
                        >
                            -
                        </Button>
                    ) : (
                        <Button
                            className={`${btnStyles.ButtonFollow} ${btnStyles.Follow}`}
                            onClick={() => { }}
                        >
                            +
                        </Button>
                    ))}
            </div>
        </div>
    )
}

export default PopularRecipe