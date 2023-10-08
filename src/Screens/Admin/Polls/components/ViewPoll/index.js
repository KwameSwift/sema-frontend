import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {axiosClientWithHeaders} from "../../../../../libs/axiosClient";
import {BarElement, CategoryScale, Chart as ChartJS, LinearScale} from 'chart.js';
import CustomTable from "../../../../../Components/Common/CustomTable";
import {Bar} from 'react-chartjs-2';
import "./style.scss";
import Layout from "../../../../../Components/Dashboard/Layout";
import {formatDate} from "../../../../../utils/helpers";
import {BsArrowLeft} from "react-icons/bs";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
);

export default function AdminViewPoll() {
    const {id} = useParams();
    const [poll, setPoll] = useState({});
    const [labels, setLabels] = useState([]);
    const [datasets, setDatasets] = useState([]);

    const navigate = useNavigate();
    const {t} = useTranslation();

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
            const resp = await axiosClientWithHeaders(`/super-admin/single-poll/${id}/`);
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
                    text: t('admin.noOfVotes'),
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: t('admin.choices'),
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
        <Layout>
            <div className="mx-4 mb-3">
                <div className="p-8 mt-3 flex flex-row blog-header">
                    <div className="mr-3 flex items-start justify-center cursor-pointer">
                        <BsArrowLeft fill="#fff" size={28} onClick={() => navigate(-1)}/>
                    </div>
                    <div>
                        <h1>{poll?.question}</h1>
                        <p className="text-white mt-3">{formatDate(poll?.start_date)} - {formatDate(poll?.end_date)}</p>
                    </div>
                </div>
                <h1 className="mt-3">{t('admin.result')}</h1>
                <div className="mt-3 flex justify-center p-4 bg-[#fff] bar-chart">
                    <Bar options={options} data={data}/>
                </div>
                <div>
                    <h1 className="mt-5 mb-3">{t('feed.comments')}</h1>
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
            </div>
        </Layout>
    )
}
