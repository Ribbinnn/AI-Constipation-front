import { instance } from '.';

export const questionnaireInfer = async (questionnaire, personalInfo) => {
    try {
        const res = (await instance.post("/infer/questionnaire", {questionnaire, personalInfo}))
        return res.data;
    } catch (e) {
        throw e
    }
}

export const imageInfer = async (file, personalInfo) => {

    var bodyFormData = new FormData();
    bodyFormData.append('personalInfo', personalInfo);
    bodyFormData.append('file', file);
    instance.defaults.headers["Content-Type"] = "multipart/form-data";

    try {
        const res = (await instance.post("/infer/image", bodyFormData))
        return res.data;
    } catch (e) {
        throw e
    }
}

export const integrateInfer = async (questionnaire, file, personalInfo) => {

    var bodyFormData = new FormData();
    bodyFormData.append('personalInfo', personalInfo);
    bodyFormData.append('questionnaire', questionnaire);
    bodyFormData.append('file', file);
    instance.defaults.headers["Content-Type"] = "multipart/form-data";

    try {
        const res = (await instance.post("/infer/integrate", bodyFormData))
        return res.data;
    } catch (e) {
        throw e
    }
}