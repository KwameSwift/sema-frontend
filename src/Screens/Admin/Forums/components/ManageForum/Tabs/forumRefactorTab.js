import React, {useState} from "react";
import CustomTable from "../../../../../../Components/Common/CustomTable";

function AdminForumRefactorTab() {
    const [forumRequests,] = useState([]);

    return (
        <div className="mt-8">
            <CustomTable
                totalPages={1}
                data={forumRequests}
                headers={["Name", "Email", "Actions"]}
                idType={"user_key"}
                currentPage={1}
                isEditable={false}
                isPaginated={true}
                headerValues={["member__first_name", "member__email"]}
            />
        </div>
    )
}

export default AdminForumRefactorTab;
