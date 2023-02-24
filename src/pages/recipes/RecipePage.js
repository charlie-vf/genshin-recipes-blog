import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Recipe from "./Recipe";
import CommentCreateForm from "../comments/CommentCreateForm.js";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Comments from "../comments/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import PopularRecipes from "./PopularRecipes";


function RecipePage(props) {

    // Main display for individual recipes with loading functionality

    const { id } = useParams();
    const [recipe, setRecipe] = useState({ results: [] });
    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: recipe }, { data: comments }] = await Promise.all([
                    axiosReq.get(`/recipes/${id}`),
                    axiosReq.get(`/comments/?recipe=${id}`)
                ])
                setRecipe({ results: [recipe] });
                setComments(comments);
                setHasLoaded(true);
            } catch (err) {
                // console.log(err)
            }
        }
        setHasLoaded(false);
        const timer = setTimeout(() => {
            handleMount();
        }, 1000)
        return () => {
            clearTimeout(timer)
        }
    }, [id])

    return (
        <Row className="h-100">
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                <PopularRecipes />
            </Col>
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <Recipe {...recipe.results[0]} setRecipes={setRecipe} recipePage />
                {hasLoaded ? (
                    <>
                        <Container className={appStyles.Content}>
                            {currentUser ? (
                                <CommentCreateForm
                                    profile_id={currentUser.profile_id}
                                    profileImage={profile_image}
                                    recipe={id}
                                    setRecipe={setRecipe}
                                    setComments={setComments}
                                />
                            ) : comments.results.length ? (
                                "Comments"
                            ) : null}
                            {comments.results.length ? (
                                <InfiniteScroll
                                    children={comments.results.map(comment => (
                                        <Comments
                                            key={comment.id}
                                            {...comment}
                                            setRecipe={setRecipe}
                                            setComments={setComments}
                                        />
                                    ))}
                                    dataLength={comments.results.length}
                                    loader={<Asset spinner />}
                                    hasMore={!!comments.next}
                                    next={() => fetchMoreData(comments, setComments)}
                                />
                            ) : currentUser ? (
                                <span>No comments yet. Want to be the first?</span>
                            ) : (
                                <span>No comments yet...</span>
                            )}
                        </Container>
                    </>
                ) : (
                    <Container className={appStyles.Content}>
                        <Asset spinner />
                    </Container>
                )}
            </Col>
        </Row>
    );
}

export default RecipePage;