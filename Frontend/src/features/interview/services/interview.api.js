import axios from "axios";

const api =axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})
/**
 * @description function to generate the interview report
 */
export const generateInterviewReport=async({jobDescription,resumeFile,selfDescription})=>{
    const formData=new FormData() 

    formData.append("jobDescription",jobDescription)
    formData.append("resume",resumeFile)
    formData.append("selfDescription",selfDescription)

    const response = await api.post("/api/interview/",formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })

    return response.data

    
}
/**
 * @description function to get the interview report by id
 */
export const getInterviewReportById = async(interviewId) => {
    const response = await api.get(`/api/interview/report/${interviewId}`)

    return response.data
}
/**
 * @description function to get the interview reports of the logged in user
 */
export const getAllInterviewReports = async() => {
    const response = await api.get("/api/interview/")

    return response.data
}