import {useBaseUrlStore} from "@/assets/js/Stores";
import {ElMessage} from "element-plus";

const API_PATHS = {
    getMistakeBooks: '/api/services/app/MistakeBook/GetMyMistakeBooksAsync',
    searchMistakeQstItem: '/api/services/app/MistakeBook/SearchMistakeQstItemsAsync',
    getQsInfo: '/api/services/app/MistakeBook/GetMistakeQstItemDetailInfoAsync',
    getCustomQstInfo: '/api/services/app/MistakeBook/GetCustomMistakeQstItemDetailInfoAsync'
}

async function buildUrl(path){
    const baseUrl = useBaseUrlStore().baseUrl
    return baseUrl.then(
        s => s + path
    )
}
export async function getMistakeBooks(token){
    return buildUrl(API_PATHS.getMistakeBooks)
        .then(url =>
            fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
                .then(resp => resp.json())
                .catch(e => ElMessage.error(e))
        )
}

export async function getMistakeItem(token,page,id){
    return buildUrl(API_PATHS.searchMistakeQstItem)
        .then(url =>
            fetch(url,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+token
                },
                body: JSON.stringify({
                    attainedLevel: [],
                    bookId: id,
                    diff: [],
                    errorReason: [],
                    haveNoTag: false,
                    maxResultCount: 20,
                    skipCount: page*20,
                    tagIdList: []
                })
            })
                .then(resp => resp.json())
                .catch(e => ElMessage.error(e))
        )
}
export async function getQstDetail(token, id) {
    return buildUrl(API_PATHS.getQsInfo)
        .then(url =>
            fetch(url+"?itemId="+id,{
                method: "GET",
                headers: {
                    "Authorization": "Bearer "+token
                }
            })
                .then(resp => resp.json())
                .then(async o => {
                    if (o.result) {
                        return o
                    } else {
                        return await getCustomQstDetail(token,id)
                    }
                })
                .catch(e => ElMessage.error(e)))
}
async function getCustomQstDetail(token,id){
    return buildUrl(API_PATHS.getCustomQstInfo)
        .then(url =>
            fetch(url+"?itemId="+id,{
                method: "GET",
                headers: {
                    "Authorization": "Bearer "+token
                }
            })
                .then(resp => resp.json())
                .catch(e => ElMessage.error(e)))
}