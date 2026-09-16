import React, { useState, useRef } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router'

const Home = () => {
    const { loading, generateReport, reports } = useInterview()
    const navigate = useNavigate()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [fileName, setFileName] = useState("")
    const resumeInputRef = useRef()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({
            resumeFile,
            jobDescription,
            selfDescription
        })
        navigate(`/interview/${data._id}`)
    }

    if (loading) {
        return (
            <main className='loading-screen'>
                <div className="loading-spinner"></div>
                <h1>Generating Your Interview Plan...</h1>
                <p>Analyzing your resume and matching it against the job description...</p>
            </main>
        )
    }

    return (
        <main className='home'>
            <div className="home-container">
                <header className="home-header">

                    <h1 className="home-title">AI Interview Preparation</h1>
                    <p className="home-subtitle">
                        Upload your resume and target role to generate customized technical questions, behavioral preparation, and a roadmap.
                    </p>
                </header>

                <div className="interview-input-group">
                    <div className="left">
                        <label className="input-label" htmlFor="jobDescription">
                            Job Description <span className="required">*</span>
                        </label>
                        <textarea
                            onChange={(e) => { setJobDescription(e.target.value) }}
                            name="jobDescription"
                            id="jobDescription"
                            placeholder="Paste the job description or role requirements here..."
                            value={jobDescription}
                        ></textarea>
                    </div>

                    <div className="right">
                        <div className="input-group">
                            <label className="input-label">
                                Resume <span className="highlight">(PDF format)</span>
                            </label>
                            <label className={`file-label ${fileName ? 'file-label--uploaded' : ''}`} htmlFor="resume">
                                <span className="file-icon">
                                    {fileName ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                                    )}
                                </span>
                                <span className="file-text">
                                    {fileName ? fileName : 'Upload Resume'}
                                </span>
                            </label>
                            <input
                                ref={resumeInputRef}
                                hidden
                                type="file"
                                name="resume"
                                id="resume"
                                accept=".pdf"
                                onChange={(e) => {
                                    const file = e.target.files[0]
                                    if (file) setFileName(file.name)
                                }}
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label" htmlFor="selfDescription">
                                Self Description <span className="optional">(Optional)</span>
                            </label>
                            <textarea
                                onChange={(e) => { setSelfDescription(e.target.value) }}
                                name="selfDescription"
                                id="selfDescription"
                                placeholder="Describe yourself in a few sentences (experience, strengths)..."
                                value={selfDescription}
                            ></textarea>
                        </div>

                        <button
                            className="button generate-button"
                            onClick={handleGenerateReport}
                            disabled={!jobDescription || !fileName}
                        >
                            Generate Interview Prep Guide
                        </button>
                    </div>
                </div>

                {/* Recent Reports List */}
                {reports && reports.length > 0 && (
                    <section className='recent-reports'>
                        <h2 className="recent-reports__title">Your Previous Interview Plans</h2>
                        <div className='reports-list'>
                            {reports.map(report => (
                                <div
                                    key={report._id}
                                    className='report-item'
                                    onClick={() => navigate(`/interview/${report._id}`)}
                                >
                                    <div className="report-item__header">
                                        <h3 className="report-item__title">{report.title || 'Untitled Position'}</h3>
                                        <span className={`match-badge ${report.matchScore >= 80 ? 'match-badge--high' :
                                                report.matchScore >= 60 ? 'match-badge--mid' : 'match-badge--low'
                                            }`}>
                                            {report.matchScore}% Match
                                        </span>
                                    </div>
                                    <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    )
}

export default Home