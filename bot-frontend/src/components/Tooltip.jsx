
const Tooltip = ({ children, isTooltipOpen }) => (
    <>
        {isTooltipOpen && (
            <div className="dropdown-menu">
                {children}
            </div>)}
    </>
)

export default Tooltip;