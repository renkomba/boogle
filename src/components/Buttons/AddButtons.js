import React from "react";
import Button from "react-bootstrap/Button";
import styles from './AddButtons.module.css';

const AddButtons = () => {
    return (
        <article className={styles.add_button_group}>
                <Button className={styles.work_button}>
                    <i className="fa-solid fa-plus"></i>
                </Button>
                <section className={styles.buttons}>
                    <Button 
                        size="lg"
                        type="button"
                        className={`${styles.button} ${styles.announcement}`}
                        active
                    >
                        <i className="fa-solid fa-file-circle-plus">
                            <span>ADD RESOURCE</span>
                        </i>
                    </Button>
                    <Button 
                        size="lg"
                        type="button"
                        className={`${styles.button} ${styles.resource}`}
                        active
                    >
                        <i className="fa-solid fa-bullhorn">
                            <span>ADD ANNOUNCEMENT</span>
                        </i>
                    </Button>
                </section>
            </article>
    );
}

export default AddButtons;