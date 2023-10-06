import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {axiosClient, axiosClientWithHeaders} from "../../../../libs/axiosClient";
import Navbar from "../../../../Components/Common/Navbar";
import {GoDot} from "react-icons/go";
import {Tab, Tabs} from "react-bootstrap";
import ChatsTab from "./chatsTab";
import MediaTab from "./mediaTab";
import FileTab from "./fileTab";
import MembersTab from "./membersTab";
import AboutTab from "./aboutTab";
import {toast} from "react-toastify";
import VirtualMeetingsTab from "./virtualMeetingsTab";
import DiscussionTab from "./discussionTab";
import DefaultForumBanner from "../../../../Assets/images/default-forum-banner.png";
import "./style.scss";
import PollsTab from "./polls";
import {useTranslation} from "react-i18next";


function ForumPost() {
    // const navigate = useNavigate();
    const {id} = useParams();
    const {t} = useTranslation();
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

    const fetchDiscussion = async () => {
        try {
            const resp = await axiosClientWithHeaders.get(`/forum/get-all-forum-discussions/${id}`);
            const respData = resp.data;
            setForum(prevState => ({...prevState, discussions: respData.data}));
        } catch (err) {
            console.error(err);
        }
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
                <div>
                    <img src={forum.header_image || DefaultForumBanner} alt="" className="header-image"/>
                </div>
            </div>
            <div className="text-section mt-3 px-2">
                <div>
                    <h2 className="topic">{forum.topic}</h2>
                    <p className="flex items-center forum-info">
                        {forum?.is_public ? t("home.public") : t("home.private")}
                        <GoDot size={8} className="ml-1"/>
                        <span>
                            {forum?.total_members} {" "}
                            {t("members".getPlural(forum?.total_members?.length).getTranslationKey())}
                        </span>
                    </p>
                </div>
                <div className="flex items-center">
                    <button className="act-btn"
                            onClick={() => leaveOrJoinForum()}>
                        {forum?.is_member ? t('forum.leave') : t('forum.join')}
                    </button>
                </div>
            </div>
            <div className="tabs">
                <Tabs
                    id="administrators_tabs"
                    activeKey={key}
                    onSelect={handleSelect}
                >
                    <Tab eventKey="discussion" title={t('forum.discussions')}>
                        <DiscussionTab
                            suggestedForums={forum?.suggested_forums}
                            user={user}
                            forumId={id}
                            isMember={forum?.is_member}
                            discussions={forum?.discussions || []}
                            setRefetch={fetchDiscussion}
                        />
                    </Tab>
                    <Tab eventKey="chats" title={t('forum.chats')}>
                        <ChatsTab
                            chatRooms={forum?.chat_rooms}
                            user={user}
                            forumId={id}
                            isMember={forum?.is_member}
                            setRefetch={setRefetch}
                            suggestedForums={forum?.suggested_forums}
                        />
                    </Tab>
                    <Tab eventKey="media" title={t('forum.media')}>
                        <MediaTab
                            files={forum?.media_files}
                            forumId={id}
                            refetch={setRefetch}
                            suggestedForums={forum?.suggested_forums}
                            user={user}
                            isMember={forum?.is_member}
                            setRefetch={setRefetch}
                        />
                    </Tab>
                    <Tab eventKey="files" title={t('forum.files')}>
                        <FileTab
                            files={forum?.files}
                            forumId={id}
                            refetch={setRefetch}
                            suggestedForums={forum?.suggested_forums}
                            user={user}
                            isMember={forum?.is_member}
                            setRefetch={setRefetch}
                        />
                    </Tab>
                    <Tab eventKey="virtualMeetings" title={t('forum.virtualMeetings')}>
                        <VirtualMeetingsTab
                            virtualMeetings={forum?.virtual_meetings}
                            forumId={id}
                            refetch={setRefetch}
                            suggestedForums={forum?.suggested_forums}
                            isMember={forum?.is_member}
                            user={user}
                        />
                    </Tab>
                    <Tab eventKey="polls" title={t('admin.polls')}>
                        <PollsTab
                            forumId={id}
                            refetch={setRefetch}
                            suggestedForums={forum?.suggested_forums}
                            isMember={forum?.is_member}
                            user={user}
                        />
                    </Tab>
                    <Tab eventKey="members" title={String(t('feed.members')).titleWord()} className="members-tab">
                        <MembersTab
                            members={forum?.members}
                            forumId={id}
                            refetch={setRefetch}
                            suggestedForums={forum?.suggested_forums}
                            user={user}
                            isMember={forum?.is_member}
                        />
                    </Tab>
                    <Tab eventKey="about" title={t('forum.about')}>
                        <AboutTab
                            about={forum?.description}
                            forumId={id}
                            refetch={setRefetch}
                            suggestedForums={forum?.suggested_forums}
                            user={user}
                            isMember={forum?.is_member}
                        />
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}

export default ForumPost;
