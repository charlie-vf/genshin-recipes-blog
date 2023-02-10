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


function RecipePage() {

    const { id } = useParams();
    const [recipe, setRecipe] = useState({ results: [] });
    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: recipe }, { data: comments }] = await Promise.all([
                    axiosReq.get(`/recipes/${id}`),
                    axiosReq.get(`/comments/?recipe=${id}`)
                ])
                setRecipe({ results: [recipe] });
                setComments(comments)
            } catch (err) {
                // console.log(err)
            }
        }
        handleMount();
    }, [id])

    return (
        <Row className="h-100">
            <Col lg={2} className="d-none d-lg-block p-0 p-lg-2">
                <p>Popular recipes</p>
            </Col>
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <Recipe {...recipe.results[0]} setRecipes={setRecipe} recipePage />
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
                        comments.results.map(comment => (
                            <Comments
                                key={comment.id}
                                {...comment}
                                setRecipe={setRecipe}
                                setComments={setComments}
                            />
                        ))
                    ) : currentUser ? (
                        <span>No comments yet. Want to be the first?</span>
                    ) : (
                        <span>No comments yet...</span>
                    )}
                </Container>
            </Col>
            <Col lg={2} className="d-none d-lg-block p-0 p-lg-2">
                <p>Popular creators</p>
            </Col>
        </Row>
    );
}

export default RecipePage;