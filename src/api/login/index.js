import axios from "@/utils/request";
export var loginApi = function () {
    return axios({
        path: "/users"
    });
};
export var upApi = function (data) {
    return axios({
        path: "/users",
        method: "POST",
        data: data
    });
};
//# sourceMappingURL=index.js.map