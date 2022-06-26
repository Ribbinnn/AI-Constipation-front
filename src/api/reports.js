import { instance } from '.';

export const viewResults = async () => {
    try {
        const response = (await instance.get("/reports/list"));
        return response.data
    } catch (e) {
        throw e
    }
}

export const getReport = async (report_id) => {
    try {
        const response = (await instance.get("/reports/" + report_id));
        return response.data
    } catch (e) {
        throw e
    }
}

export const updateReport = async (
    report_id, label, final_diag, ctt_result, anorectal_structural_abnormality,
    IBS, cormorbidity, surgical_history, surgical_history_note, comments
) => {
    try {
        const res = (await instance.patch("/reports/", {
            report_id, label, final_diag, ctt_result, anorectal_structural_abnormality,
            IBS, cormorbidity, surgical_history, surgical_history_note, comments
        }))
        return res.data;
    } catch (e) {
        throw e
    }
}

export const deleteReport = async (report_id) => {
    try {
        const response = (await instance.delete("/reports/delete/" + report_id));
        return response.data
    } catch (e) {
        throw e
    }
}