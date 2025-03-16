function Form({ children }) {
    return (
        <div className="h-screen">
            <div className="flex-1 bg-main bg-cover bg-no-repeat bg-center h-full ">
                <div className="relative h-full backdrop-brightness-90 ">{children}</div>
            </div>
        </div>
    );
}

export default Form;
