// Form will be changed once working

import React from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/SignForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import logo from "/workspace/genshin-recipes-blog/src/assets/ei-miko-cooking.png";

const SignUpForm = () => {
    return (
        <Row className={styles.Row}>
            <Col className="my-auto py-2 p-md-2" md={6}>
                <Container className={`${appStyles.Content} p-4 `}>
                    <h1 className={styles.Header}>sign up</h1>

                    <Form>
                        <Form.Group controlId="username">
                            <Form.Label className="d-none">username</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="text"
                                placeholder="enter username"
                                name="username"
                            />
                        </Form.Group>
                        <Form.Group controlId="password1">
                            <Form.Label className="d-none">password</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="password"
                                placeholder="enter password"
                                name="password1"
                            />
                        </Form.Group>
                        <Form.Group controlId="password2">
                            <Form.Label className="d-none">password</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="password"
                                placeholder="enter password again"
                                name="password2"
                            />
                        </Form.Group>
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Wide}`}
                            type="submit">
                            sign up
                        </Button>
                    </Form>

                </Container>
                <Container className={`mt-3 ${appStyles.Content}`}>
                    <Link className={styles.Link} to="/signin">
                        Already have an account? <span>Sign in</span>
                    </Link>
                </Container>
            </Col>
            <Col
                md={6}
                className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
            >
                <Image
                    className={`${appStyles.SignFormImage}`}
                    src={logo}
                />
            </Col>
        </Row>
    );
};

export default SignUpForm;