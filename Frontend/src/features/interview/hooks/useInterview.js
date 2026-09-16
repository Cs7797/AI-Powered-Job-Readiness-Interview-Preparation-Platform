import {getAllInterviewReports,generateInterviewReport,getInterviewReportById} from "../services/interview.api"
import {useContext, useCallback,useEffect} from "react"
import { InterviewContext } from "../interview.context.jsx"
import { useParams } from "react-router"


export const useInterview=()=>{


    const context =useContext(InterviewContext)

    const {interviewId}=useParams()

    if(!context){
        throw new Error("useInterview must be used within InterviewProvider")
    }

    const {loading,setLoading,report,setReport,reports,setReports,}=context

    const  generateReport= useCallback(async ({jobDescription,resumeFile,selfDescription})=>{
        setLoading(true)
        let response=null

        try {
           response=await generateInterviewReport({jobDescription,resumeFile,selfDescription})
           setReport(response.interviewReport)
           
        } 
        catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
        return response.interviewReport
    }, [setLoading, setReport])
    
    const getReportById = useCallback(async (interviewId) => {
        setLoading(true)
        let response=null


        try {
            response = await getInterviewReportById(interviewId)

            setReport(response.interviewReport)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        return response.interviewReport
    }, [setLoading, setReport])

    const getReports = useCallback(async () => {
        setLoading(true)
        let response=null

        try {
            response = await getAllInterviewReports()

            setReports(response.interviewReports)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        return response.interviewReports
    }, [setLoading, setReports])

    useEffect(()=>{
       if (interviewId){
        getReportById(interviewId)
       }else{
            getReports()
       }
    },[interviewId])
    return {loading,generateReport,getReportById,getReports,report,reports}
}
