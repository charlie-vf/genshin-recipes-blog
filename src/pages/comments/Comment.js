import React from "react";
import styles from "../../styles/Comment.module.css";
import Media from "react-bootstrap/Media";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

const Comments = (props) => {

  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setRecipe,
    setComments,
  } = props;



  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <Link to={`/profiles/${profile_id}`}>
            <span className={styles.Owner}>{owner}</span>
          </Link>
          <span className={styles.Date}>{updated_at}</span>
          <p>{content}</p>
        </Media.Body>
      </Media>
    </>
  )
}

export default Comments