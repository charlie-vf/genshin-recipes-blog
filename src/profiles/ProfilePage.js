import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../components/Asset";

import styles from "../styles/ProfilePage.module.css";
import appStyles from "../App.module.css";
import btnStyles from "../styles/Button.module.css";

import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useParams } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import { useProfileData, useSetProfileData } from "../contexts/ProfileDataContext";
import { Button, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Recipe from "../pages/recipes/Recipe";
import NoResults from "../assets/noresults.png";
import { fetchMoreData } from "../utils/utils";
import { ProfileEditDropdown } from "../components/EditDeleteDropdown";
import PopularRecipes from "../pages/recipes/PopularRecipes";

function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [profileRecipes, setProfileRecipes] = useState({ results: [] });

    const currentUser = useCurrentUser();

    const {id} = useParams();
    const {setProfileData, handleFollow, handleUnfollow} = useSetProfileData();
    const {pageProfile} = useProfileData();
    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username === profile?.owner;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{data: pageProfile}, {data: profileRecipes}] = await Promise.all([
                    axiosReq.get(`/profiles/${id}/`),
                    axiosReq.get(`/recipes/?owner__profile=${id}`)
                ]);
                setProfileData((prevState) => ({
                    ...prevState,
                    pageProfile: {results: [pageProfile]},
                }));
                setProfileRecipes(profileRecipes);
                setHasLoaded(true);
            } catch(err) {
                // console.log(err)
            }
        };
        fetchData();
    }, [id, setProfileData]);

    const mainProfile = (
        <>
            {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
            <Row noGutters className="px-3 text-center">
                <Col lg={3} className="text-lg-left">
                    <Image
                        className={styles.ProfileImage}
                        roundedCircle
                        src={profile?.image}
                        alt='profile image'
                    />
                </Col>
                <Col lg={6}>
                    <h3 className="m-2">{profile?.owner}</h3>
                    <Row className="justify-content-centre no-gutters">
                        <Col className="my-2">
                            <div>{profile?.recipes_count}</div>
                            <div>recipes</div>
                        </Col>
                        <Col className="my-2">
                            <div>{profile?.followers_count}</div>
                            <div>followers</div>
                        </Col>
                        <Col className="my-2">
                            <div>{profile?.following_count}</div>
                            <div>following</div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={3} className="text-lg-right">
                    {currentUser &&
                        !is_owner &&
                        (profile?.following_id ? (
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.Unfollow}`}
                                onClick={() => handleUnfollow(profile)}
                            >
                                unfollow
                            </Button>
                        ) : (
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.Follow}`}
                                onClick={() => handleFollow(profile)}
                            >
                                follow
                            </Button>
                        ))
                    }
                </Col>
                {profile?.content && <Col className="p-3">{profile.content}</Col>}
            </Row>
        </>
    );

    const mainProfilePosts = (
        <>
            <hr />
            {is_owner ? (
                <p className="text-center">my recipes</p>
            ) : (
                <p className="text-center">{profile?.owner}'s recipes</p>
            )}
            <hr />
            {profileRecipes.results.length ? (
                <InfiniteScroll
                    children={profileRecipes.results.map((recipe) => (
                        <Recipe
                            key={recipe.id}
                            {...recipe}
                            setRecipes={setProfileRecipes}
                        />
                    ))}
                    dataLength={profileRecipes.results.length}
                    loader={<Asset spinner/>}
                    hasMore={!!profileRecipes.next}
                    next={() => fetchMoreData(profileRecipes, setProfileRecipes)}
                />
            ) : (
                <Asset
                    src={NoResults}
                    message={`${profile?.owner} hasn't posted anything yet!`}
                />
            )}
        </>
    );

    return (
        <Row>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                <PopularRecipes />
            </Col>
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <PopularRecipes mobile />
                <Container className={appStyles.Content}>
                    {hasLoaded ? (
                        <>
                            {mainProfile}
                            {mainProfilePosts}
                        </>
                    ) : (
                        <Asset spinner />
                    )}
                </Container>
            </Col>
        </Row>
    );
}

export default ProfilePage;