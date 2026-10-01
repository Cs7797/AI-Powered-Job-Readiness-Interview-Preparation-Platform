import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/interview`,
  withCredentials: true,
});

export const generateInterviewReport = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}) => {
  const formData = new FormData();

  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);
  formData.append("resume", resumeFile);

  const response = await api.post("/", formData);

  return response.data;
};

export const getAllInterviewReports = async () => {
  const response = await api.get("/all-reports");
  return response.data;
};

export const getInterviewReportById = async (interviewId) => {
  const response = await api.get(`/report/${interviewId}`);
  return response.data;
};

export const generateResume = async (interviewId) => {
  const response = await api.get(`/generate-resume/${interviewId}`, {
    responseType: "blob",
  });

  return response.data;
};