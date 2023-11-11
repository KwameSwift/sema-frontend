import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {Tab, Tabs} from "react-bootstrap";
import {axiosClient, axiosClientWithHeaders} from "../../../../../libs/axiosClient";
import AdminChatsTab from "../../../../Admin/Forums/components/ManageForum/Tabs/chatTab";
import AdminFilesTab from "../../../../Admin/Forums/components/ManageForum/Tabs/filesTab";
import AdminVirtualMeetingsTab from "../../../../Admin/Forums/components/ManageForum/Tabs/virtualMeetingTab";
import AdminForumRefactorTab from "../../../../Admin/Forums/components/ManageForum/Tabs/forumRefactorTab";
import AdminMediaTab from "../../../../Admin/Forums/components/ManageForum/Tabs/mediaTab";
import AdminPollTab from "../../../../Admin/Forums/components/ManageForum/Tabs/polls";
import ContentCreatorLayout from "../../../../../Components/ContentCreator/Layout";
import "./style.scss";
import {useTranslation} from "react-i18next";


export default function CreatorManageForumPage() {
    const {id} = useParams();
    const user = useSelector((store) => store.user);
    const [forum, setForum] = useState([]);
    const [key, setKey] = useState("chats");
    const [selectedChat, setSelectedChat] = useState(null);
    const [refetch, setRefetch] = useState(false);
    const {t} = useTranslation();

    const getSingleForum = async () => {
        try {
            let resp = null;
            if (user?.tokens?.access) {
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

    useEffect(() => {
        if (id) {
            getSingleForum();
        }
    }, [id, refetch])


    return (
        <ContentCreatorLayout header={`${t('admin.manage')} ${t('admin.forum')}`}>
            <div className="manage-forum">
                <div className="tabs mt-3">
                    <Tabs
                        id="administrators_tabs"
                        activeKey={key}
                        onSelect={setKey}
                    >
                        <Tab eventKey="chats" title={t('forum.chats')}>
                            <AdminChatsTab
                                chatRooms={forum?.chat_rooms}
                                user={user}
                                forumId={id}
                                selectedChat={selectedChat}
                                setRefetch={setRefetch}
                                setSelectedChat={setSelectedChat}
                                authorDetails={{
                                    author__first_name: forum?.author__first_name,
                                    author__last_name: forum?.author__last_name,
                                    author__organization: forum?.author__organization
                                }}
                            />
                        </Tab>
                        <Tab eventKey="media" title={t('forum.media')}>
                            <AdminMediaTab
                                files={forum?.media_files}
                                forumId={id}
                                refetch={setRefetch}
                                user={user}
                                setRefetch={setRefetch}
                            />
                        </Tab>
                        <Tab eventKey="files" title={t('forum.files')}>
                            <AdminFilesTab
                                files={forum?.files}
                                forumId={id}
                                refetch={setRefetch}
                                user={user}
                                setRefetch={setRefetch}
                            />
                        </Tab>
                        <Tab eventKey="virtualMeetings" title={t('forum.virtualMeetings')}>
                            <AdminVirtualMeetingsTab
                                virtualMeetings={forum?.virtual_meetings}
                                forumId={id}
                                refetch={setRefetch}
                                user={user}
                                setRefetch={setRefetch}
                            />
                        </Tab>
                        <Tab eventKey="polls" title={t('admin.polls')}>
                            <AdminPollTab
                                forumId={id}
                                user={user}
                            />
                        </Tab>
                        <Tab eventKey="requests" title={t('admin.forumRequests')}>
                            <AdminForumRefactorTab forumId={id}/>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </ContentCreatorLayout>
    )
}
