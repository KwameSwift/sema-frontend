import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ContentCreatorLayout from "../../../../../Components/ContentCreator/Layout";
import {axiosClientWithHeaders} from "../../../../../libs/axiosClient";
import {BarElement, CategoryScale, Chart as ChartJS, LinearScale} from 'chart.js';
import {Bar} from 'react-chartjs-2';

import "./style.scss";

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
            console.log(respData);
            setLabels(respData?.choices?.map((elt) => elt.choice))
            setPoll(respData);
            const datasets = respData?.choices?.map((elt) => elt.vote_percentage);
            console.log(datasets);
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
            <div className="mt-3 flex justify-center p-4 bg-[#fff] w-[1000] h-[600]">
                <Bar options={options} data={data}/>
            </div>
            <div>
                <h1 className="mt-5">Comments</h1>
                <div className="flex mt-3 flex-wrap">
                    {poll?.poll_votes?.map((elt) =>
                        <div key={elt.id} className="bg-[#fff] p-3 poll-comment-card m-3">
                            <h3 className="font-bold text-[18px]">{elt.voter__first_name} {elt.voter__last_name}</h3>
                            <div className="mt-3">
                                <p className="flex flex-col">
                                    <p className="text-[13px] text-gray-400">Voter Choice:</p>
                                    <p className="text-[13px] ml-1">{elt.poll_choice__choice}</p>
                                </p>
                                <p className="flex flex-col">
                                    <p className="text-[13px] text-gray-400">Voter Comment:</p>
                                    <p className="text-[13px] ml-1">{elt.comments}</p>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ContentCreatorLayout>
    )
}
