import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { isRequiredFieldValuesPassed } from "../../../../../utils/helpers";
import Layout from "../../../../../Components/Dashboard/Layout";
import { axiosClientWithHeaders } from "../../../../../libs/axiosClient";

function AdminEditPollPage() {
  const { t } = useTranslation();
  const [state, setState] = useState({});
  const [choices, setChoices] = useState({});
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
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
    const payload = { ...state, choices: [...Object.values(choices)] };
    try {
      await axiosClientWithHeaders.post("/polls/create-poll/", payload);
      setLoading(false);
      toast.success("Poll Added successfully");
      await new Promise((r) => setTimeout(r, 2000));
      navigate("/admin/polls");
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
      const { question, choices, description, start_date, end_date } = {
        ...resp.data.data,
      };
      setState({
        question,
        description,
        start_date: new Date(start_date).toISOString().slice(0, 10),
        end_date: new Date(end_date).toISOString().slice(0, 10),
      });
      const defaultChoices = choices.reduce((acc, curr, index) => {
        return { ...acc, [`opt${index + 1}`]: curr.choice };
      }, {});
      setChoices(defaultChoices);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log(choices);
    const requiredFields = ["start_date", "end_date", "question"];
    setDisabled(
      !isRequiredFieldValuesPassed(state, requiredFields, "eq") ||
        Object.values(choices).length !== 4
    );
  }, [state, choices]);

  useEffect(() => {
    if (id) {
      getSinglePoll(id);
    }
  }, [id]);

  return (
    <Layout>
      <div>
        <div className="p-8 mt-3 flex flex-col blog-header">
          <h1>{t("admin.editPoll")}</h1>
        </div>
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
              type="text"
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
              <div className="flex items-center mb-3">
                <label className="text-[16px] border rounded-full w-[40px] h-[40px] flex items-center justify-center">
                  A
                </label>
                <input
                  type="text"
                  name="opt1"
                  onChange={handleChoices}
                  value={choices.opt1}
                  placeholder="Enter Choice 1"
                  className="w-full mt-2 ml-6 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
                />
              </div>
              <div className="flex items-center mb-3">
                <label className="text-[16px] border rounded-full w-[40px] h-[40px] flex items-center justify-center">
                  B
                </label>
                <input
                  type="text"
                  name="opt2"
                  value={choices.opt2}
                  onChange={handleChoices}
                  placeholder="Enter Choice 2"
                  className="w-full mt-2 ml-6 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
                />
              </div>
              <div className="flex items-center mb-3">
                <label className="text-[16px] border rounded-full w-[40px] h-[40px] flex items-center justify-center">
                  C
                </label>
                <input
                  type="text"
                  name="opt3"
                  value={choices.opt3}
                  onChange={handleChoices}
                  placeholder="Enter Choice 3"
                  className="w-full mt-2 ml-6 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
                />
              </div>
              <div className="flex items-center">
                <label className="text-[16px] border rounded-full w-[40px] h-[40px] flex items-center justify-center">
                  D
                </label>
                <input
                  type="text"
                  name="opt4"
                  value={choices.opt4}
                  onChange={handleChoices}
                  placeholder="Enter Choice 4"
                  className="w-full mt-2 ml-6 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
                />
              </div>
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
              onClick={handleSave}
              disabled={disabled || loading}
            >
              {loading ? "Loading..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminEditPollPage;
