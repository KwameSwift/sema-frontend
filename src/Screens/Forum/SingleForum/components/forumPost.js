import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {axiosClient, axiosClientWithHeaders} from "../../../../libs/axiosClient";
import Navbar from "../../../../Components/Common/Navbar";
import {GoDot} from "react-icons/go";
import {RiShareForwardLine} from "react-icons/ri";
import {Tab, Tabs} from "react-bootstrap";
import ChatsTab from "./chatsTab";
import MediaTab from "./mediaTab";
import FileTab from "./fileTab";
import MembersTab from "./membersTab";
import AboutTab from "./aboutTab";
import {toast} from "react-toastify";
import VirtualMeetingsTab from "./virtualMeetingsTab";
import DiscussionTab from "./discussionTab";
import "./style.scss";


function ForumPost() {
    // const navigate = useNavigate();
    const {id} = useParams();
    const [forum, setForum] = useState({});
    const [key, setKey] = useState("discussion");
    const [refetch, setRefetch] = useState(false);
    const user = useSelector((store) => store.user);
    const userTokens = user?.tokens;

    const getSingleForum = async () => {
        try {
            let resp = null;
            if (userTokens.access) {
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

    const leaveOrJoinForum = async (forumId = id, isMember = forum?.is_member) => {
        if (!userTokens.access) {
            toast.error("Please login to be able to join this forum.");
        } else {
            try {
                if (isMember) {
                    await axiosClientWithHeaders.post(`/forum/leave-forum/${forumId}/`);
                    toast.success("You have left this forum");
                    setRefetch(!refetch);
                } else {
                    await axiosClientWithHeaders.post(`/forum/join-forum/${forumId}/`);
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
            <div className="tabs">
                <Tabs
                    id="administrators_tabs"
                    activeKey={key}
                    onSelect={handleSelect}
                >
                    <Tab eventKey="discussion" title="Discussion">
                        <DiscussionTab/>
                    </Tab>
                    <Tab eventKey="chats" title="Chats">
                        <ChatsTab
                            chatRooms={forum?.chat_rooms}
                            user={user}
                            forumId={forum?.id}
                            setRefetch={setRefetch}
                            suggestedForums={forum?.suggested_forums}
                            joinForum={leaveOrJoinForum}
                        />
                    </Tab>
                    <Tab eventKey="media" title="Media">
                        <MediaTab files={forum?.media_files} forumId={id} refetch={setRefetch}/>
                    </Tab>
                    <Tab eventKey="files" title="Files">
                        <FileTab files={forum?.files} forumId={id} refetch={setRefetch}/>
                    </Tab>
                    <Tab eventKey="virtualMeetings" title="Virtual Meetings">
                        <VirtualMeetingsTab virtualMeetings={forum?.virtual_meetings} forumId={id}
                                            refetch={setRefetch}/>
                    </Tab>
                    <Tab eventKey="members" title="Members" className="members-tab">
                        <MembersTab members={forum?.members}/>
                    </Tab>
                    <Tab eventKey="about" title="About">
                        <AboutTab about={forum?.description}/>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}

export default ForumPost;
