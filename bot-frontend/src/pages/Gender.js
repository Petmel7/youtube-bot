import styles from "../styles/dashboard.module.css";

const Gender = ({
    isEditingGender,
    botGender,
    setBotGender,
    savedGender,
    saveGender,
    setIsEditingGender }) => {
    return (
        <>
            {/* 🔹 Відображення збереженого гендеру */}
            {isEditingGender ? (
                <div className={styles.genderSelection}>
                    <p>Select bot identity:</p>
                    <label className={styles.genderLabel}>
                        <input
                            type="radio"
                            value="male"
                            checked={botGender === "male"}
                            onChange={() => setBotGender("male")}
                        />
                        Male
                    </label>
                    <label className={styles.genderLabel}>
                        <input
                            type="radio"
                            value="female"
                            checked={botGender === "female"}
                            onChange={() => setBotGender("female")}
                        />
                        Female
                    </label>
                    <button className={styles.saveButtonGeneral} onClick={saveGender}>Save</button>
                </div>
            ) : savedGender ? (
                <div className={styles.genderDisplay}>
                    <p>Bot identity: <strong>{savedGender === "male" ? "Male" : "Female"}</strong></p>
                    <button className={styles.editButton} onClick={() => setIsEditingGender(true)}>Change Gender</button>
                </div>
            ) : (
                <div className={styles.genderSelection}>
                    <p>Select bot identity:</p>
                    <label>
                        <input
                            type="radio"
                            value="male"
                            checked={botGender === "male"}
                            onChange={() => setBotGender("male")}
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="female"
                            checked={botGender === "female"}
                            onChange={() => setBotGender("female")}
                        />
                        Female
                    </label>
                </div>
            )}
        </>
    )
}

export default Gender;