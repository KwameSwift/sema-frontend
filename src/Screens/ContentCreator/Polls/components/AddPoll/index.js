import React, {useEffect, useState} from "react";
// import { useTranslation } from "react-i18next";
import {axiosClientWithHeaders} from "../../../../../libs/axiosClient";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {isRequiredFieldValuesPassed} from "../../../../../utils/helpers";
import ContentCreatorLayout from "../../../../../Components/ContentCreator/Layout";
import {BsPlusCircle, BsTrash} from "react-icons/bs";

const letters = ["A", "B", "C", "D", "E"]

function CreatorAddPollPage() {
    // const { t } = useTranslation();
    const [state, setState] = useState({});
    const [choices, setChoices] = useState({});
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [choiceElts, setChoiceElts] = useState([]);
    const [choiceLength, setChoiceLength] = useState(3);


    const navigate = useNavigate();

    const choiceField = (letter, index) => (
        <div className="flex items-center mb-3">
            <label className="text-[16px] border rounded-full w-[40px] h-[40px] flex items-center justify-center">
                {letter}
            </label>
            <input
                type="text"
                name={`opt${index + 1}`}
                onChange={handleChoices}
                placeholder={`Enter Choice ${index + 1}`}
                className="w-full mt-2 ml-6 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
            />
            <BsTrash fill="#e14d2a" size={30} className="ml-2 mt-3 cursor-pointer"
                     onClick={() => deleteChoice(5 - index + 1)}/>
        </div>

    )

    const addChoice = () => {
        setChoiceElts(prev => [...prev, choiceField(letters[choiceLength], choiceLength)]);
        setChoiceLength(prev => prev + 1);
    }

    const deleteChoice = (eltId) => {
        setChoiceElts(choiceElts.filter((_, index) => index !== eltId));
        setChoiceLength(prev => prev - 1);
        if (Object.keys(choices).includes(`opt${5 - eltId}`)) {
            delete choices[`opt${5 - eltId}`]
        }
        console.log(`opt${5 - eltId}`)
        console.log(choices);
    }

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

    const handleSave = async () => {
        setLoading(true);
        const payload = {...state, choices: [...Object.values(choices)]}
        try {
            await axiosClientWithHeaders.post("/polls/create-poll/", payload);
            setLoading(false);
            toast.success("Poll Added successfully");
            await new Promise((r) => setTimeout(r, 2000));
            navigate("/creator/polls");
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        const requiredFields = ["start_date", "end_date", "question"];
        setDisabled(
            !isRequiredFieldValuesPassed(state, requiredFields, "eq") ||
            Object.values(choices).length < 3
        );
    }, [state, choices]);

    return (
        <ContentCreatorLayout header="Add Poll">
            <div>
                <div className="p-4">
                    <div>
                        <label className="text-[18px] font-bold">
                            Title<span className="text-[#e14d2a]">*</span>
                        </label>
                        <input
                            type="text"
                            name="question"
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
                                placeholder="Enter Description"
                                className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
                            />
                        </div>
                    </div>
                    <div className="mt-8 flex items-center justify-center">
                        <button
                            type="button"
                            className="ml-2 px-3 py-2 rounded-md text-[#fff] bg-[#001253]"
                            onClick={handleSave}
                            disabled={disabled || loading}
                        >
                            {loading ? "Loading..." : "Save"}
                        </button>
                    </div>
                </div>
            </div>
        </ContentCreatorLayout>
    );
}

export default CreatorAddPollPage;
