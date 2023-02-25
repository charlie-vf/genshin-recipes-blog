import styles from "../styles/EditDeleteDropdown.module.css";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useHistory } from "react-router";

// Reusable dropdown components

const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <i
        className="fa-solid fa-bars"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    />
));

export const EditDeleteDropdown = ({ handleEdit, handleDelete }) => {

    return (
        <Dropdown
            className={`"ml-auto" ${styles.Toggle}`}
            drop='left'
        >
            <Dropdown.Toggle as={CustomToggle} />

            <Dropdown.Menu
                popperConfig={{ strategy: "fixed" }}
                className='text-center'
            >
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={handleEdit}
                    aria-label="edit"
                >
                    <i className="fa-regular fa-pen-to-square" />
                </Dropdown.Item>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={handleDelete}
                    aria-label="delete"
                >
                    <i className="fa-regular fa-trash-can" />
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export function ProfileEditDropdown({ id }) {
    const history = useHistory();
    return (
        <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
            <Dropdown.Toggle as={CustomToggle} />
            <Dropdown.Menu
                popperConfig={{ strategy: "fixed" }}
                className={`${styles.Background} text-center`}
                >
                <Dropdown.Item
                    onClick={() => history.push(`/profiles/${id}/edit`)}
                    aria-label="edit-profile"
                    className={styles.Item}
                >
                    <i className="fas fa-edit" /> edit profile
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => history.push(`/profiles/${id}/edit/username`)}
                    aria-label="edit-username"
                    className={styles.Item}
                >
                    <i className="far fa-id-card" />
                    change username
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => history.push(`/profiles/${id}/edit/password`)}
                    aria-label="edit-password"
                    className={styles.Item}
                >
                    <i className="fas fa-key" />
                    change password
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}