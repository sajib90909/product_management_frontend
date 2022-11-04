import { BASE_URL } from "../App/ApiUrl/urls";

export const makeStorageUrl = (path) => {
    if(!path) {
        return '';
    }
    return `${BASE_URL}/storage/${path}`
}
