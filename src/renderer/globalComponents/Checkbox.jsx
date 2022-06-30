const CheckBox = ({ id, className, change }) => {
    return (
        <label className={"switch " + (className ? className : "")}>
            <input type="checkbox" id={id} onChange={change} />
            <span className="slider round"></span>
        </label>
    );
};

export default CheckBox;
