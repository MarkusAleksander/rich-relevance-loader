import getNestedProperty from "./libs/getNestedProperty";

export const getSessionId = () => {
    let rr_session_id = null;

    if (typeof tagDataLayer === "object") {
        let web_session_id = getNestedProperty(
            tagDataLayer,
            "WebSessionID",
            null
        );
        if (web_session_id) {
            let web_session_id_split = web_session_id.split("_");
            if (typeof web_session_id_split[2] !== "undefined") {
                rr_session_id = web_session_id_split[2];
            }
        }
    }
    return rr_session_id;
}

export const getUserId = () => {
    let user_id = "";
    if (typeof tagDataLayer === "object") {
        user_id = getNestedProperty(
            tagDataLayer,
            "AccountDetails.accountRef",
            ""
        );
    }
    return user_id;
}