import React from 'react';
import {Link} from "react-router-dom";

export function UnhandledPath() {
    return (
        <div style={{
            textAlign: "center",
            fontSize: "40px",
            height: "100%",
            width: "100%"
        }}>
            <div style={{
                color: "#616afb",
                textAlign: "center",
                marginTop: "20%",
                marginBottom: "20%"
            }}>
                Извините, но эта страница недоступна.<br></br>
                Перейдите на <Link to="/main_page/">/main_page/</Link>
            </div>
        </div>
    )
}