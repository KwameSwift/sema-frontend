import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ContentCreatorLayout from "../../../../../Components/ContentCreator/Layout";
import {axiosClientWithHeaders} from "../../../../../libs/axiosClient";
import {BarElement, CategoryScale, Chart as ChartJS, LinearScale} from 'chart.js';
import {Bar} from 'react-chartjs-2';

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
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
            getSinglePoll()
        }
    }, [id])


    return (
        <ContentCreatorLayout header={poll?.question || ""}>
            <div className="flex justify-center w-full">
                <Bar options={options} data={data}/>
            </div>
            <div>

            </div>
        </ContentCreatorLayout>
    )
}
