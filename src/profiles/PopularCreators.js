import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { axiosReq } from '../api/axiosDefaults';
import appStyles from '../App.module.css'
import Asset from '../components/Asset';
import { useCurrentUser } from '../contexts/CurrentUserContext';

const PopularCreators = ({ mobile }) => {

    const [profileData, setProfileData] = useState({
        popularCreators: { results: [] },
        pageProfile: { results: [] },
    });

    const { popularCreators } = profileData;
    const currentUser = useCurrentUser();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(
                    '/profiles/?ordering=-followers_count'
                );
                setProfileData((prevState) => ({
                    ...prevState,
                    popularCreators: data,
                }));
            } catch (err) {
                // console.log(err)
            }
        };
        handleMount();
    }, [currentUser])

    return (
        <Container
            className={`${appStyles.Content}
            ${mobile && "d-lg-none text-center mb-3"}`}
        >
            {popularCreators.results.length ? (
                <>
                    <p>Popular creators</p>
                    <hr />
                    {mobile ? (
                        <div className="d-flex justify-content-around">
                            {popularCreators.results.slice(0, 4).map((profile) => (
                                <p key={profile.id}>{profile.owner}</p>
                            ))}
                        </div>
                    ) : (
                        popularCreators.results.map((profile) => (
                            <p key={profile.id}>{profile.owner}</p>
                        ))
                    )}
                </>
            ) : (
                <Asset spinner />
            )}
        </Container>
    );
}

export default PopularCreators