import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { axiosReq } from '../../api/axiosDefaults.js';
import appStyles from '../../App.module.css'
import Asset from '../../components/Asset.js';
import { useCurrentUser } from '../../contexts/CurrentUserContext.js';
import PopularRecipe from './PopularRecipe';

const PopularRecipes = ({ mobile }) => {

    // Data collection & display for PopularRecipe component

    const [profileData, setProfileData] = useState({
        popularRecipes: { results: [] },
        pageProfile: { results: [] },
    });

    const { popularRecipes } = profileData;
    const currentUser = useCurrentUser();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(
                    '/recipes/?ordering=-likes_count'
                );
                setProfileData((prevState) => ({
                    ...prevState,
                    popularRecipes: data,
                }));
            } catch (err) {
                // console.log(err)
            }
        };
        handleMount();
    }, [currentUser])

    return (
        <Container
            className={`${appStyles.Content}
            ${mobile && "d-lg-none text-center mb-3"}`}
        >
            {popularRecipes.results.length ? (
                <>
                    <p>Popular recipes</p>
                    <hr />
                    {mobile ? (
                        <div className="d-flex justify-content-around">
                            {popularRecipes.results.slice(0, 3).map((recipe) => (
                                <PopularRecipe
                                    key={recipe.id}
                                    recipe={recipe}
                                    mobile
                                />
                            ))}
                        </div>
                    ) : (
                        popularRecipes.results.slice(0, 4).map((recipe) => (
                            <PopularRecipe
                                key={recipe.id}
                                recipe={recipe}
                            />
                        ))
                    )}
                </>
            ) : (
                <Asset spinner />
            )}
        </Container>
    );
}

export default PopularRecipes