import styles from "../styles/dashboard.module.css";

const GenderRadioGroup = ({ botGender, setBotGender }) => (
    <>
        <p>Select bot identity:</p>
        {['male', 'female'].map((gender) => (
            <label key={gender} className={styles.genderLabel}>
                <input
                    type="radio"
                    value={gender}
                    checked={botGender === gender}
                    onChange={() => setBotGender(gender)}
                />
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </label>
        ))}
    </>
);

export default GenderRadioGroup;
