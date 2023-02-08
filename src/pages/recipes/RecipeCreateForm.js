import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.png";

import Image from "react-bootstrap/Image";

import styles from "../../styles/RecipeForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";

function RecipeCreateForm() {

    const [errors, setErrors] = useState({});

    const [postData, setPostData] = useState({
        title: '',
        ingredients: '',
        method: '',
        image: '',
    })

    const { title, ingredients, method, image } = postData;

    const handleChange = (e) => {
        setPostData({
            ...postData,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeImage = (e) => {
        if (e.target.files.length) {
            URL.revokeObjectURL(image);
            setPostData({
                ...postData,
                image: URL.createObjectURL(e.target.files[0]),
            });
        }
    };

    const textFields = (
        <div className="text-center">
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type='text'
                    name='title'
                    value={title}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Ingredients</Form.Label>
                <Form.Control
                    as='textarea'
                    rows={6}
                    name='ingredients'
                    value={ingredients}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Method</Form.Label>
                <Form.Control
                    as='textarea'
                    rows={6}
                    name='method'
                    value={method}
                    onChange={handleChange}
                />
            </Form.Group>



            <Button
                className={btnStyles.Button}
                onClick={() => { }}
            >
                cancel
            </Button>
            <Button className={btnStyles.Button} type="submit">
                create
            </Button>
        </div>
    );

    return (
        <Form>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={4} lg={5}>
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group className="text-center">
                            {image ? (
                                <>
                                    <figure>
                                        <Image
                                            className={appStyles.Image}
                                            src={image}
                                            rounded
                                        />
                                    </figure>
                                    <div>
                                        <Form.Label
                                            className={`${btnStyles.Button} btn`}
                                            htmlFor="image-upload"
                                        >
                                            change image
                                        </Form.Label>
                                    </div>
                                </>
                            ) : (
                                <Form.Label
                                    className="d-flex justify-content-center"
                                    htmlFor="image-upload"
                                >
                                    <Asset
                                        src={Upload}
                                        message="Click or tap to upload an image"
                                    />
                                </Form.Label>
                            )}

                            <Form.File
                                id="image-upload"
                                accept="image/*"
                                onChange={handleChangeImage}
                            />
                        </Form.Group>
                    </Container>
                </Col>
                <Col md={8} lg={7} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>{textFields}</Container>
                </Col>
            </Row>
        </Form>
    );
}

export default RecipeCreateForm;