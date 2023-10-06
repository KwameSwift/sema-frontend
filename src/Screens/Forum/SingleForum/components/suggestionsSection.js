import {GoDot} from "react-icons/go";
import React from "react";
import {toast} from "react-toastify";
import {axiosClientWithHeaders} from "../../../../libs/axiosClient";
import NoForums from "../../../../Assets/images/no-forums.png";
import {useTranslation} from "react-i18next";


function SuggestionsSection({suggestedForums, userTokens, id, setRefetch, isMember}) {
    const {t} = useTranslation();
    const leaveOrJoinForum = async (isMember, forumId = id) => {
        if (!userTokens.access) {
            toast.error("Please login to be able to join this forum.");
        } else {
            try {
                if (isMember) {
                    await axiosClientWithHeaders.post(`/forum/leave-forum/${forumId}/`);
                    toast.success("You have left this forum");
                    setRefetch(prev => !prev);
                } else {
                    await axiosClientWithHeaders.post(`/forum/join-forum/${forumId}/`);
                    toast.success("You have joined this forum");
                    setRefetch(prev => !prev);
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    return (
        <div className="info-sect">
            <div className="about p-3 bg-white">
                <h3 className="font-bold">{t('forum.suggested')} {t('admin.forums')}</h3>
                <hr className="mt-2"></hr>
                {suggestedForums?.length && userTokens?.access && isMember
                    ? (suggestedForums?.map((elt, index) =>
                        <div key={index} className="flex justify-between">
                            <div>
                                <p className="font-bold">{elt?.topic}</p>
                                <p className="flex items-center">{elt?.is_public ? t("home.public") : t("home.private")}
                                    <GoDot/> {elt?.total_members} {" "}
                                    {t("member".getPlural(elt?.total_members).getTranslationKey())}
                                </p>
                            </div>
                            <p className="underline cursor-pointer"
                               onClick={() => leaveOrJoinForum(false, elt?.id)}>
                                {t('forum.join')}
                            </p>
                        </div>
                    ))
                    : (
                        <div className="flex justify-center items-center w-full flex-col">
                            <img src={NoForums} alt="No Chat rooms" width={90} height={90}/>
                            <p className="mt-3 font-bold">
                                {t("forum.no")} {t('admin.forums')}
                            </p>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default SuggestionsSection;
