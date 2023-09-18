import React, {useEffect, useState} from "react";
import {IoCloseOutline} from "react-icons/io5";
import {axiosClientWithHeaders} from "../../../../../../libs/axiosClient";
import {isRequiredFieldValuesPassed} from "../../../../../../utils/helpers";
import {useTranslation} from "react-i18next";
import {BsPlusCircle, BsTrash} from "react-icons/bs";
import {toast} from "react-toastify";

const letters = ["A", "B", "C", "D", "E"]


const AddPollModal = ({isOpen, setIsOpen, forumId, refetch}) => {
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };


    const {t} = useTranslation();
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [choiceElts, setChoiceElts] = useState([]);
    const [choiceLength, setChoiceLength] = useState(3);
    const [choices, setChoices] = useState({});

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const handleChoices = (e) => {
        setChoices((prevChoices) => ({
            ...prevChoices,
            [e.target.name]: e.target.value,
        }));
    };

    const deleteChoice = (eltId) => {
        setChoiceElts(choiceElts.filter((_, index) => index !== eltId));
        setChoiceLength(prev => prev - 1);
        if (Object.keys(choices).includes(`opt${5 - eltId}`)) {
            delete choices[`opt${5 - eltId}`]
        }
    }

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

    const addPoll = async () => {
        setLoading(true);
        const payload = {...state, choices: Object.values(choices)};
        try {
            await axiosClientWithHeaders.post(`/forum/create-forum-poll/${forumId}/`, payload);
            setLoading(false);
            toast.success("Poll added successfully");
            toggleModal();
            refetch(prev => !prev);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    }

    useEffect(() => {
        const requiredFields = ["start_date", "end_date", "question"];
        setDisabled(
            !isRequiredFieldValuesPassed(state, requiredFields, "eq") ||
            Object.values(choices).length < 3
        );
    }, [state, choices]);


    return (
        <div>
            {isOpen && (
                <div className="modal fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                        <div
                            className="bg-white max-w-[500px] rounded-lg p-6"
                        >
                            <div className="flex justify-between">
                                <h2 className="text-xl font-bold mb-4">
                                    Add Poll
                                </h2>
                                <span className="close-btn" onClick={toggleModal}>
                                  <IoCloseOutline size={20} fill="#eee"/>
                                </span>
                            </div>
                            <div>
                                <div className="form-field">
                                    <label>Question</label>
                                    <input
                                        type="text"
                                        placeholder="Enter question"
                                        name="question"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <label>Choices</label>
                                    <div className="mt-3">
                                        <div className="flex items-center mb-3">
                                            <label
                                                className="text-[16px] border rounded-full w-[40px] h-[40px] flex items-center justify-center">
                                                A
                                            </label>
                                            <input
                                                type="text"
                                                name="opt1"
                                                onChange={handleChoices}
                                                placeholder="Enter Choice 1"
                                                className="w-full mt-2 ml-6 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
                                            />
                                        </div>
                                        <div className="flex items-center mb-3">
                                            <label
                                                className="text-[16px] border rounded-full w-[40px] h-[40px] flex items-center justify-center">
                                                B
                                            </label>
                                            <input
                                                type="text"
                                                name="opt2"
                                                onChange={handleChoices}
                                                placeholder="Enter Choice 2"
                                                className="w-full mt-2 ml-6 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
                                            />
                                        </div>
                                        <div className="flex items-center mb-3">
                                            <label
                                                className="text-[16px] border rounded-full w-[40px] h-[40px] flex items-center justify-center">
                                                C
                                            </label>
                                            <input
                                                type="text"
                                                name="opt3"
                                                onChange={handleChoices}
                                                placeholder="Enter Choice 3"
                                                className="w-full mt-2 ml-6 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
                                            />
                                        </div>
                                        <>{choiceElts}</>
                                        {(choiceLength < 5) && <div className="add-choice mt-3" onClick={addChoice}>
                                            <BsPlusCircle fill="#000" className="mr-1" size={20}/>
                                            <span className="mt-1 cursor-pointer">Add Choice</span>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="form-field half">
                                    <label>Start Date</label>
                                    <input
                                        type="date"
                                        placeholder="Enter start date"
                                        name="start_date"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-field half">
                                    <label>End Date</label>
                                    <input
                                        type="date"
                                        placeholder="Enter end date"
                                        name="end_date"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="flex mt-8 justify-end items-center">
                                <button
                                    className="text-[14px] border rounded px-3 py-2"
                                    onClick={toggleModal}
                                >
                                    {t("modal.cancel")}
                                </button>
                                <button
                                    className="text-[14px] ml-2 text-white px-3 py-2 rounded bg-[#001253]"
                                    onClick={addPoll}
                                    disabled={loading || disabled}
                                >
                                    {loading ? "Loading..." : "Save"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddPollModal;
