import React, { useRef, useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Image from "react-bootstrap/Image";

import styles from "../../styles/RecipeForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Alert from "react-bootstrap/Alert";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function RecipeEditForm() {

    // Edit form for user recipes

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
    const { id } = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq(`/recipes/${id}/`);
                const { title, ingredients, method, image, is_owner } = data;

                is_owner ? setRecipeData({ title, ingredients, method, image })
                    : history.push('/');
            } catch (err) {
                // console.log(err)
            }
        };
        handleMount();
    }, [history, id]);

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

        if (imageInput?.current?.files[0]) {
            formData.append("image", imageInput.current.files[0]);
        }

        try {
            await axiosReq.put(`/recipes/${id}/`, formData);
            history.push(`/recipes/${id}`);
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
                save
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

                            <Form.File
                                id="image-upload"
                                accept="image/*"
                                onChange={handleChangeImage}
                                ref={imageInput}
                            />
                        </Form.Group>
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
                <Col md={8} lg={7} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>{textFields}</Container>
                </Col>
            </Row>
        </Form>
    );
}

export default RecipeEditForm;