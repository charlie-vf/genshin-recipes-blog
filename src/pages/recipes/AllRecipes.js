import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/AllRecipes.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Recipe from "./Recipe";

import NoResults from "../../assets/noresults.png";
import Asset from "../../components/Asset";

function AllRecipes({message, filter=''}) {

    const [recipes, setRecipes] = useState({results: []});
    const [hasLoaded, setHasLoaded] = useState(false);
    const {pathname} = useLocation();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const {data} = await axiosReq.get(`/recipes/?${filter}`)
                setRecipes(data)
                setHasLoaded(true)
            } catch(err) {
                // console.log(err)
            }
        };

        setHasLoaded(false);
        fetchRecipes();

    }, [filter, pathname]);

    return (
        <Row className="h-100">
            <Col lg={2} className="d-none d-lg-block p-0 p-lg-2">
                <p>Popular recipes</p>
            </Col>
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                {hasLoaded ? (
                    <>
                        {recipes.results.length
                        ? recipes.results.map((recipe) => (
                                <Recipe
                                    key={recipe.id}
                                    {...recipe}
                                    setRecipes={setRecipes}
                                />
                            ))
                            : <Container className={appStyles.Content}>
                                <Asset
                                    src={NoResults}
                                    message={message}
                                />
                            </Container>
                        }
                    </>
                ) : (
                    <Container className={appStyles.Content}>
                        <Asset
                            spinner
                        />
                    </Container>
                )}
            </Col>
            <Col lg={2} className="d-none d-lg-block p-0 p-lg-2">
                <p>Popular creators</p>
            </Col>
        </Row>
    );
}

export default AllRecipes;