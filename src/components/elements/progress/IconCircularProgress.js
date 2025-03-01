import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./IconCircularProgress.css"

export default function IconCircularProgress({style, size=18}) {
    return <div className="IconCircularProgress">
            <CircularProgress color="secondary" size={size} style={style}/>
        </div>
}