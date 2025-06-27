export const validateInputs = (videoUrl, channelTheme, setError) => {
    let errors = { videoUrl: false, channelTheme: false };
    let isValid = true;

    if (!videoUrl.trim()) {
        errors.videoUrl = true;
        isValid = false;
    }
    if (!channelTheme.trim()) {
        errors.channelTheme = true;
        isValid = false;
    }

    setError(errors);
    return isValid;
};