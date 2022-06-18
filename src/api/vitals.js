// import { instance } from '.';

// export const searchVitlasProject = async (projectId) => {
//     try {
//         const response = (await instance.get("/vitals/", {
//             params: {
//                 user_id: (JSON.parse(sessionStorage.getItem('user'))).id,
//                 project_id: projectId
//             }})).data;
//         return response
//     } catch (e) {
//         throw e
//     }
// }

// export const uploadVitalsRecord = async (project_id, user_id, record_name, records) => {
//     try {
//         const response = (
//             await instance.post("/vitals/records", {project_id, user_id, record_name, records})
//         ).data;
//         return response;
//     } catch (e) {
//         throw e
//     }
// }

// export const getAllRecords = async (vitals_proj_id) => {
//     try {
//         const response = (
//             await instance.get("/vitals/projects/" + vitals_proj_id + "/medrec")
//         ).data;
//         return response;
//     } catch (e) {
//         throw e
//     }
// }

// export const downloadTemplate = async (project_id) => {
//     try {
//         const response = (
//             await instance.get("/vitals/template/" + project_id, { responseType: 'blob' })
//         ).data;
//         return response;
//     } catch (e) {
//         throw e
//     }
// }

// export const deleteRecord = async (record_id) => {
//     try {
//         const entry_id = 0; // not used
//         const response = (
//             await instance.patch("/vitals/records/deletefile/" + record_id, {entry_id})
//         ).data;
//         return response;
//     } catch (e) {
//         throw e;
//     }
// }