import React from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/AllRecipes.module.css";

function AllRecipes() {

    return (
        <Row className="h-100">
            <Col lg={2} className="d-none d-lg-block p-0 p-lg-2">
                <p>Popular recipes</p>
            </Col>
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                all recipes
            </Col>
            <Col lg={2} className="d-none d-lg-block p-0 p-lg-2">
                <p>Popular creators</p>
            </Col>
        </Row>
    );
}

export default AllRecipes;