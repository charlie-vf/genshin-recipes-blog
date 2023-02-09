import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Recipe from "./Recipe";


function RecipePage() {

    const { id } = useParams();
    const [recipe, setRecipe] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: recipe }] = await Promise.all([
                    axiosReq.get(`/recipes/${id}`)
                ])
                setRecipe({ results: [recipe] })
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
                {/* commenting out until i fix the api */}
                <Recipe {...recipe.results[0]} setRecipes={setRecipe} recipePage/>
                <Container className={appStyles.Content}>
                    Comments
                </Container>
            </Col>
            <Col lg={2} className="d-none d-lg-block p-0 p-lg-2">
                <p>Popular creators</p>
            </Col>
        </Row>
    );
}

export default RecipePage;