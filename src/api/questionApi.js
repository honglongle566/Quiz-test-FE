import axiosClient from "./axiosClient";
import { objectToQueryString } from "../utils/statistic";

const questionApi = {
    getAll(query) {
        const url = `api/question${objectToQueryString(query)}`;
        return axiosClient.get(url);
    },
    create(data) {
        const url = "/api/question";
        return axiosClient.post(url, data);
    },
    updateById(data) {
        const url = `api/question/${data._id}`;
        console.log("url", url, data);
        return axiosClient.patch(url, data);
    },
    deleteById(id) {
        const url = `/api/question/${id}`;
        return axiosClient.delete(url);
    },
};

export default questionApi;