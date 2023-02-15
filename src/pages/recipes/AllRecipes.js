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
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularCreators from "../../profiles/PopularCreators";
import PopularRecipes from "./PopularRecipes";

function AllRecipes({ message, filter = '' }) {

    const [recipes, setRecipes] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const { data } = await axiosReq.get(`/recipes/?${filter}search=${search}`);
                setRecipes(data)
                setHasLoaded(true)
            } catch (err) {
                // console.log(err)
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchRecipes();
        }, 1000)
        return () => {
            clearTimeout(timer)
        }

    }, [filter, search, pathname]);

    return (
        <Row className="h-100">
            <Col lg={2} className="d-none d-lg-block p-0 p-lg-2">
                <PopularRecipes />
            </Col>
            <Col lg={8} className="d-lg-none p-0 p-lg-2">
                <PopularCreators mobile />
            </Col>
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <i className={`fa-solid fa-eye ${styles.SearchIcon}`} />
                <Form
                    className={styles.SearchBar}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <Form.Control
                        className='mr-sm-2'
                        type='text'
                        placeholder='search by creator or recipe'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    >

                    </Form.Control>
                </Form>

                {hasLoaded ? (
                    <>
                        {recipes.results.length ? (
                            <InfiniteScroll
                                children={
                                    recipes.results.map((recipe) => (
                                        <Recipe
                                            key={recipe.id}
                                            {...recipe}
                                            setRecipes={setRecipes}
                                        />
                                    ))
                                }
                                dataLength={recipes.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!recipes.next}
                                next={() => fetchMoreData(recipes, setRecipes)}
                            />
                        ) : (
                            <Container className={appStyles.Content}>
                                <Asset src={NoResults} message={message} />
                            </Container>
                        )}
                    </>
                ) : (
                    <Container className={appStyles.Content}>
                        <Asset spinner />
                    </Container>
                )}
            </Col>
            <Col lg={2} className="d-none d-lg-block p-0">
                <PopularCreators />
            </Col>
        </Row>
    );
}

export default AllRecipes;