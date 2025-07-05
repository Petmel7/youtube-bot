import { useState } from "react";
import { fetchMyVideos } from "../services/youtubeService";
import styles from "../styles/videoListButton.module.css";

const VideoListButton = () => {
    const [videos, setVideos] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        if (isOpen) {
            setIsOpen(false);
            return;
        }

        setLoading(true);
        const res = await fetchMyVideos();
        if (res && Array.isArray(res)) {
            setVideos(res);
        }
        setIsOpen(true);
        setLoading(false);
    };

    return (
        <div>
            <button onClick={handleClick} className={styles.button}>
                {isOpen ? "🔽 Hide Videos" : "📺 Show My Videos"}
            </button>

            {loading && <p>Loading...</p>}

            {isOpen && (
                <ul className={styles.videoList}>
                    {videos.length === 0 && <li>No videos found</li>}
                    {videos.map((video) => (
                        <li key={video.videoId} className={styles.videoItem}>
                            <img src={video.thumbnail} alt={video.title} className={styles.thumbnail} />
                            <div>
                                <strong>{video.title}</strong><br />
                                {new Date(video.publishedAt).toLocaleDateString()}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default VideoListButton;

