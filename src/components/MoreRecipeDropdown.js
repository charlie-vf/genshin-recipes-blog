import styles from "../styles/MoreRecipeDropdown.module.css";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";


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

export const MoreRecipeDropdown = ({ handleEdit, handleDelete }) => {

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
}
