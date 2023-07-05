import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Layout from "../../../../../Components/Dashboard/Layout";
import { axiosClientWithHeaders } from "../../../../../libs/axiosClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { isRequiredFieldsPassed } from "../../../../../utils/helpers";

function AdminAddPollPage() {
  const { t } = useTranslation();
  const [state, setState] = useState({});
  const [choices, setChoices] = useState({});
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleChoices = (e) => {
    setChoices({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  const handleSave = async () => {
    setLoading(true);
    try {
      await axiosClientWithHeaders.post("/polls/create-poll/", state);
      setLoading(false);
      toast.success("Poll Added successfully");
      await new Promise((r) => setTimeout(r, 2000));
      navigate("/admin/blogs");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log(isRequiredFieldsPassed(state, 2, 'eq') && Object.values(choices).length !== 4)
    setDisabled(isRequiredFieldsPassed(state, 2, 'eq') && Object.values(choices).length === 4);
  }, [state, choices]);
  
  return (
    <Layout>
      <div>
        <div className="p-8 mt-3 flex flex-col blog-header">
          <h1>{t("admin.addPolls")}</h1>
        </div>
        <div className="p-4">
          <div>
            <label className="text-[18px] font-bold">
              Title<span className="text-[#e14d2a]">*</span>
            </label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="Enter Title"
              className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
            />
          </div>
          <div className="mt-4">
            <label className="text-[18px] font-bold">
              Description<span className="text-[#e14d2a]">*</span>
            </label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="Enter Description"
              className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
            />
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
                  onChange={handleChoices}
                  placeholder="Enter Choice 4"
                  className="w-full mt-2 ml-6 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
                />
              </div>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-center">
            <button
              type="button"
              className="ml-2 px-3 py-2 rounded-md text-[#fff] bg-[#001253]"
              onClick={handleSave}
              disabled={disabled || loading}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminAddPollPage;
