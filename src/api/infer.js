import { instance } from '.';

export const questionnaire = async (questionnaire, personalInfo) => {
    try {
        const res = (await instance.post("/infer/questionnaire", {questionnaire, personalInfo}))
        return res.data;
    } catch (e) {
        throw e
    }
}