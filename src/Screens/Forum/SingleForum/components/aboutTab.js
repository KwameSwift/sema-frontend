import React from "react";

function AboutTab({about}) {
    return (
        <div>
            <div className="bg-white rounded-lg p-4">
                <p className="text-[14px]">{about}</p>
            </div>
        </div>
    )
}

export default AboutTab;
