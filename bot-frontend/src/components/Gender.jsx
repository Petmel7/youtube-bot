import GenderRadioGroup from "./GenderRadioGroup";
import styles from "../styles/dashboard.module.css";

const Gender = ({
    isEditingGender,
    botGender,
    setBotGender,
    savedGender,
    saveGender,
    setIsEditingGender
}) => {

    return (
        <>
            {isEditingGender ? (
                <div className={styles.genderSelection}>
                    <GenderRadioGroup botGender={botGender} setBotGender={setBotGender} />
                    <button className={styles.saveButtonGeneral} onClick={saveGender}>Save</button>
                </div>
            ) : savedGender ? (
                <div className={styles.genderDisplay}>
                    <p>Bot identity: <strong>{savedGender === "male" ? "Male" : "Female"}</strong></p>
                    <button className={styles.editButton} onClick={() => setIsEditingGender(true)}>Change Gender</button>
                </div>
            ) : (
                <div className={styles.genderSelection}>
                    <GenderRadioGroup botGender={botGender} setBotGender={setBotGender} />
                </div>
            )}
        </>
    );
};

export default Gender;