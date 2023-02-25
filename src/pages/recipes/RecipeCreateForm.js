import React, { useRef, useState } from "react";

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
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Alert from "react-bootstrap/Alert";
import { useRedirect } from "../../hooks/useRedirect";

function RecipeCreateForm() {

    // Creation form for recipes

    useRedirect('loggedOut');

    const [errors, setErrors] = useState({});

    const [recipeData, setRecipeData] = useState({
        title: '',
        ingredients: '',
        method: '',
        image: '',
    });

    const { title, ingredients, method, image } = recipeData;

    const imageInput = useRef(null);

    const history = useHistory();

    const handleChange = (e) => {
        setRecipeData({
            ...recipeData,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeImage = (e) => {
        if (e.target.files.length) {
            URL.revokeObjectURL(image);
            setRecipeData({
                ...recipeData,
                image: URL.createObjectURL(e.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("ingredients", ingredients);
        formData.append("method", method);
        formData.append("image", imageInput.current.files[0]);

        try {
            const { data } = await axiosReq.post("/recipes/", formData);
            history.push(`/recipes/${data.id}`);
        } catch (err) {
            // console.log(err)
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
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
            {errors?.title?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
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
            {errors?.ingredients?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
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
            {errors?.method?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}



            <Button
                className={btnStyles.Button}
                onClick={() => history.goBack()}
            >
                cancel
            </Button>
            <Button
                className={btnStyles.Button}
                type="submit"
            >
                create
            </Button>
        </div>
    );

    return (
        <Form method='POST' onSubmit={handleSubmit}>
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
                                            className={appStyles.SignFormImage}
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
                                ref={imageInput}
                            />
                        </Form.Group>
                        {errors?.image?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
                <Col md={5} lg={7} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>{textFields}</Container>
                </Col>
            </Row>
        </Form>
    );
}

export default RecipeCreateForm;