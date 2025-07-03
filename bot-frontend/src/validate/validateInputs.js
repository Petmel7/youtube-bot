
export const validateVideoUrl = (videoUrl, setError) => {
    const isValid = !!videoUrl.trim();
    setError(prev => ({ ...prev, videoUrl: !isValid }));
    return isValid;
};

export const validateChannelTheme = (channelTheme, setError) => {
    const isValid = !!channelTheme.trim();
    setError(prev => ({ ...prev, channelTheme: !isValid }));
    return isValid;
};
