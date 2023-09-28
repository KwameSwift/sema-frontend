import React, {useEffect, useState} from "react";
import ContentCreatorLayout from "../../../Components/ContentCreator/Layout";
import "./style.scss";
import SummaryCard from "../../../Components/ContentCreator/SummaryCard";
import {axiosClientWithHeaders} from "../../../libs/axiosClient";
import {useSelector} from "react-redux";
import {DAYS} from "../../../utils/data";
import {formatDateWithBar} from "../../../utils/helpers";

function ContentCreatorDashboardPage() {
    const [statistics, setStatistics] = useState({});

    const user = useSelector((store) => store.user.user);

    const today = new Date();
    const day = today.getDay();

    const data = [
        {
            name: "Blogs",
            count: statistics?.total_blogs || 0,
            icon: "BsBarChartFill",
        },
        {
            name: "Forums",
            count: statistics?.total_forums || 0,
            icon: "BsChatDots",
        },
        {
            name: "Polls",
            count: statistics?.total_polls || 0,
            icon: "BsFillHeartFill",
        },
        {
            name: "Documents Vault",
            count: statistics?.total_document_vault || 0,
            icon: "BsFiles",
        },
    ];

    useEffect(() => {
        const getUserStatistics = async () => {
            try {
                const resp = await axiosClientWithHeaders.get("/users/my-statistics/");
                setStatistics(resp.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        getUserStatistics();
    }, []);

    return (
        <ContentCreatorLayout
            header={`Welcome, ${user.first_name}`}
            subChild={`${DAYS[day]}, ${formatDateWithBar(today)}`}
        >
            <div className="creator-dashboard">
                <div className="summary-cards mt-8">
                    {data.map((elt, index) => (
                        <SummaryCard {...elt} key={index}/>
                    ))}
                </div>
            </div>
        </ContentCreatorLayout>
    );
}

export default ContentCreatorDashboardPage;
