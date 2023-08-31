import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {axiosClient, axiosClientWithHeaders} from "../../../../libs/axiosClient";
import Navbar from "../../../../Components/Common/Navbar";
import {GoDot} from "react-icons/go";
import {RiShareForwardLine} from "react-icons/ri";
import {Tab, Tabs} from "react-bootstrap";
import "./style.scss";
import ChatsTab from "./chatsTab";
import MediaTab from "./mediaTab";
import FileTab from "./fileTab";
import MembersTab from "./membersTab";
import AboutTab from "./aboutTab";
import {toast} from "react-toastify";


function ForumPost() {
    // const navigate = useNavigate();
    const {id} = useParams();
    const [forum, setForum] = useState({});
    const [key, setKey] = useState("chats");
    const [refetch, setRefetch] = useState(false);
    const user = useSelector((store) => store.user.tokens);

    const getSingleForum = async () => {
        try {
            let resp = null;
            if (user.access) {
                resp = await axiosClientWithHeaders.get(`forum/get-forum/${id}/`);
            } else {
                resp = await axiosClient.get(`forum/get-forum/${id}/`);
            }
            const forumData = resp.data.data;
            setForum(forumData);
        } catch (err) {
            console.error(err);
        }
    }

    const sharePoll = async (e) => {
        e.stopPropagation();
    }

    const handleSelect = (k) => {
        setKey(k);
    }

    const leaveOrJoinForum = async () => {
        if (!user.access) {
            toast.error("Please login to be able to join this forum.");
        } else {
            try {
                if (forum?.is_member) {
                    await axiosClientWithHeaders.post(`/forum/leave-forum/${id}/`);
                    toast.success("You have left this forum");
                    setRefetch(!refetch);
                } else {
                    await axiosClientWithHeaders.post(`/forum/join-forum/${id}/`);
                    toast.success("You have joined this forum");
                    setRefetch(!refetch);
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    useEffect(() => {
        getSingleForum();
    }, [id, refetch]);

    return (
        <div className="single-forum">
            <Navbar/>
            <div>
                {forum.header_image &&
                    <div>
                        <img src={forum.header_image} alt="" className="header-image"/>
                    </div>
                }
            </div>
            <div className="text-section mt-3 px-2">
                <div>
                    <h2 className="topic">{forum.topic}</h2>
                    <p className="flex items-center forum-info">
                        {forum?.is_public ? "Public" : "Private"}
                        <GoDot size={8} className="ml-1"/>
                        <span>{forum?.total_members} member{forum?.total_members > 1 && 's'}</span>
                    </p>
                </div>
                <div className="flex items-center">
                    <button className="act-btn"
                            onClick={leaveOrJoinForum}>{forum?.is_member ? "Leave" : "Join"}</button>
                    <span className="icon ml-3" onClick={sharePoll}>
                        <RiShareForwardLine size={22}/>
                    </span>
                </div>
            </div>
            <div className="forum-desc mt-2 mb-3 px-2">
                <p>{forum.description}</p>
            </div>
            <div className="tabs">
                <Tabs
                    id="administrators_tabs"
                    activeKey={key}
                    onSelect={handleSelect}
                >
                    <Tab eventKey="chats" title="Chats">
                        <ChatsTab chat_rooms={forum?.chat_rooms}/>
                    </Tab>
                    <Tab eventKey="media" title="Media">
                        <MediaTab/>
                    </Tab>
                    <Tab eventKey="files" title="Files">
                        <FileTab/>
                    </Tab>
                    <Tab eventKey="members" title="Members">
                        <MembersTab/>
                    </Tab>
                    <Tab eventKey="about" title="About">
                        <AboutTab/>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}

export default ForumPost;
