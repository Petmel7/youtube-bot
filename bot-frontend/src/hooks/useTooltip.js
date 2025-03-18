import { useState } from "react";

const useTooltip = () => {
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    const showTooltip = () => setIsTooltipOpen(true);
    const hideTooltip = () => setIsTooltipOpen(false);

    return { isTooltipOpen, showTooltip, hideTooltip };
};

export default useTooltip;
