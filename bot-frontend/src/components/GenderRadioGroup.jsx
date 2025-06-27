
import styles from "../styles/dashboard.module.css";

const GenderRadioGroup = ({ botGender, setBotGender }) => (
    <>
        <p>Select bot identity:</p>
        <div className={styles.genderContainer}>
            {['male', 'female'].map((gender) => (
                <label key={gender} className={`${styles.genderLabel} ${botGender === gender ? styles.selected : ""}`}>
                    <input
                        type="radio"
                        value={gender}
                        checked={botGender === gender}
                        onChange={() => setBotGender(gender)}
                        className={styles.hiddenRadio}
                    />
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </label>
            ))}
        </div>
    </>
);

export default GenderRadioGroup;

