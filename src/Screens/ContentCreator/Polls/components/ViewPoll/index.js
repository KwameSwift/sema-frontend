import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ContentCreatorLayout from "../../../../../Components/ContentCreator/Layout";
import {axiosClientWithHeaders} from "../../../../../libs/axiosClient";
import {BarElement, CategoryScale, Chart as ChartJS, LinearScale} from 'chart.js';
import {Bar} from 'react-chartjs-2';

import "./style.scss";
import CustomTable from "../../../../../Components/Common/CustomTable";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
);

export function ViewPoll() {
    const {id} = useParams();
    const [poll, setPoll] = useState({});
    const [labels, setLabels] = useState([]);
    const [datasets, setDatasets] = useState([]);

    const createDataset = (data) => {
        return {
            label: 'Dataset 1',
            data: data,
            borderColor: '#001253',
            backgroundColor: '#001253',
        }
    }
    const getSinglePoll = async () => {
        try {
            const resp = await axiosClientWithHeaders(`/users/my-single-polls/${id}/`);
            const respData = resp.data.data;
            setLabels(respData?.choices?.map((elt) => elt.choice))
            setPoll(respData);
            const datasets = respData?.choices?.map((elt) => elt.votes);
            setDatasets([createDataset(datasets)])
        } catch (err) {
            console.log(err);
        }
    }

    const options = {
        indexAxis: 'y',
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'No. of Votes',
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Choices',
                },
            },
        },
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Chart.js Horizontal Bar Chart',
            },
        },
    };


    const data = {
        labels,
        datasets,
    };

    useEffect(() => {
        if (id) {
            getSinglePoll();
        }
    }, [id])


    return (
        <ContentCreatorLayout header={poll?.question || ""}>
            <h1 className="mt-3">Result</h1>
            <div className="mt-3 flex justify-center p-4 bg-[#fff] bar-chart">
                <Bar options={options} data={data}/>
            </div>
            <div>
                <h1 className="mt-5 mb-3">Comments</h1>
                <CustomTable
                    totalPages={1}
                    data={poll?.poll_votes || []}
                    headers={["Name", "Choice", "Comment"]}
                    idType={"user_key"}
                    currentPage={1}
                    isEditable={false}
                    isPaginated={false}
                    headerValues={["voter__first_name", "poll_choice__choice", "comments"]}
                />
            </div>
        </ContentCreatorLayout>
    )
}
