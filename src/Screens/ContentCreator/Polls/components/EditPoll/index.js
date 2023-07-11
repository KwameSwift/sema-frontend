import React, {useEffect, useState} from "react";
// import { useTranslation } from "react-i18next";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {isRequiredFieldValuesPassed} from "../../../../../utils/helpers";
import {axiosClientWithHeaders} from "../../../../../libs/axiosClient";
import ContentCreatorLayout from "../../../../../Components/ContentCreator/Layout";
import {BsPlusCircle, BsTrash} from "react-icons/bs";

const letters = ["A", "B", "C", "D", "E"]

function CreatorEditPollPage() {
    // const { t } = useTranslation();
    const [state, setState] = useState({});
    const [choices, setChoices] = useState({});
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [choiceLength, setChoiceLength] = useState(3);


    const navigate = useNavigate();
    const {id} = useParams();
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleChoices = (e) => {
        setChoices({
            ...choices,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async () => {
        setLoading(true);
        const payload = {...state, choices: [...Object.values(choices)]};
        try {
            await axiosClientWithHeaders.put(`/polls/update-poll/${id}/`, payload);
            setLoading(false);
            toast.success("Poll updated successfully");
            await new Promise((r) => setTimeout(r, 2000));
            navigate("/creator/polls");
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const getSinglePoll = async (id) => {
        try {
            const resp = await axiosClientWithHeaders.get(
                `/super-admin/single-poll/${id}/`
            );
            const {question, choices, description, start_date, end_date} = {
                ...resp.data.data,
            };
            setState({
                question,
                description,
                start_date: new Date(start_date).toISOString().slice(0, 10),
                end_date: new Date(end_date).toISOString().slice(0, 10),
            });
            const defaultChoices = choices.reduce((acc, curr, index) => {
                return {...acc, [`opt${index + 1}`]: curr.choice};
            }, {});
            setChoices(defaultChoices);
        } catch (err) {
            console.error(err);
        }
    };

    const choiceField = (letter, index) => (
        <div className="flex items-center mb-3">
            <label className="text-[16px] border rounded-full w-[40px] h-[40px] flex items-center justify-center">
                {letter}
            </label>
            <input
                type="text"
                name={`opt${index + 1}`}
                value={choices[`opt${index + 1}`]}
                onChange={handleChoices}
                placeholder={`Enter Choice ${index + 1}`}
                className="w-full mt-2 ml-6 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
            />
            {index > 2 && <BsTrash fill="#e14d2a" size={30} className="ml-2 mt-3 cursor-pointer"
                                   onClick={() => deleteChoice(index)}/>}
        </div>
    )

    const addChoice = () => {
        setChoiceLength(prev => prev + 1);
        setChoices({...choices, [`opt${Object.keys(choices).length + 1}`]: ''})
    }

    const deleteChoice = (eltId) => {
        setChoiceLength(prev => prev - 1);
        if (Object.keys(choices).includes(`opt${eltId + 1}`)) {
            const modChoices = {...choices};
            delete modChoices[`opt${eltId + 1}`]
            setChoices(modChoices);
        }
    }

    useEffect(() => {
        const requiredFields = ["start_date", "end_date", "question"];
        setDisabled(
            !isRequiredFieldValuesPassed(state, requiredFields, "eq") ||
            Object.values(choices).length < 3
        );
    }, [state, choices]);

    useEffect(() => {
        if (id) {
            getSinglePoll(id);
        }
    }, [id]);

    return (
        <ContentCreatorLayout header="Edit Poll">
            <div>
                <div className="p-4">
                    <div>
                        <label className="text-[18px] font-bold">
                            Title<span className="text-[#e14d2a]">*</span>
                        </label>
                        <input
                            type="text"
                            name="question"
                            value={state.question}
                            onChange={handleChange}
                            placeholder="Enter Title"
                            className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="text-[18px] font-bold">
                            Description<span className="text-[#e14d2a]">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={state.description}
                            onChange={handleChange}
                            placeholder="Enter Description"
                            className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
                        ></textarea>
                    </div>
                    <div className="mt-4">
                        <label className="text-[18px] font-bold">
                            Choices<span className="text-[#e14d2a]">*</span>
                        </label>
                        <div className="mt-3">
                            {Object.keys(choices).map((elt, index) => choiceField(letters[index], index))}
                            {(choiceLength < 5) && <div className="add-choice mt-3" onClick={addChoice}>
                                <BsPlusCircle fill="#000" className="mr-1" size={20}/>
                                <span className="mt-1 cursor-pointer">Add Choice</span>
                            </div>}
                        </div>
                    </div>
                    <div className="flex mt-4">
                        <div>
                            <label className="text-[18px] font-bold">
                                Start Date<span className="text-[#e14d2a]">*</span>
                            </label>
                            <input
                                type="date"
                                name="start_date"
                                onChange={handleChange}
                                value={state.start_date}
                                placeholder="Enter Description"
                                className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
                            />
                        </div>
                        <div className="ml-8">
                            <label className="text-[18px] font-bold">
                                End Date<span className="text-[#e14d2a]">*</span>
                            </label>
                            <input
                                type="date"
                                name="end_date"
                                onChange={handleChange}
                                value={state.end_date}
                                placeholder="Enter Description"
                                className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
                            />
                        </div>
                    </div>
                    <div className="mt-8 flex items-center justify-center">
                        <button
                            type="button"
                            className="ml-2 px-3 py-2 rounded-md text-[#fff] bg-[#001253]"
                            onClick={handleUpdate}
                            disabled={disabled || loading}
                        >
                            {loading ? "Loading..." : "Update"}
                        </button>
                    </div>
                </div>
            </div>
        </ContentCreatorLayout>
    );
}

export default CreatorEditPollPage;
