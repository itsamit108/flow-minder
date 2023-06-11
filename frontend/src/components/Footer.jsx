import React from "react";

const Footer = () => {
    return (
        <footer className="text-white" style={{ marginBottom: "20px" }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <p className="mb-0">
                            Task Manager App &copy; {new Date().getFullYear()}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
