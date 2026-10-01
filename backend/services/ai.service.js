import { GoogleGenAI } from "@google/genai";
import * as z from "zod";
import {zodToJsonSchema} from "zod-to-json-schema"

// console.log("KEY IN GEMINI FILE:", !!process.env.GEMINI_API_KEY);
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    role: z.string().describe(
  "The primary job role or job title mentioned in the job description, such as Software Engineer, Backend Developer, Data Analyst, etc."
),
})

export async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
You are an AI interview preparation assistant.

Analyze the candidate's resume, self-description, and job description.

Generate an interview preparation report containing:

- matchScore: 0-100 score representing how well the candidate matches the job.
- technicalQuestions: likely technical interview questions, their intention, and how the candidate should answer.
- behavioralQuestions: likely behavioral interview questions, their intention, and how the candidate should answer.
- skillGaps: skills required by the job that the candidate lacks or has limited evidence of.
- preparationPlan: a day-by-day preparation plan.
- - role: Extract the primary job title or role directly from the job description.
  Examples include "Software Engineer", "Backend Developer", "Data Analyst",
  "Frontend Developer", etc.
  Do not invent a role. If the job description contains a specific title,
  use that title as written or a concise equivalent.

Candidate Resume:
${resume}

Candidate Self-Description:
${selfDescription}

Job Description:
${jobDescription}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",

    contents: prompt,

    config: {
      responseMimeType: "application/json",

      responseSchema: {
        type: "OBJECT",

        properties: {
          matchScore: {
            type: "NUMBER",
          },

          technicalQuestions: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                question: {
                  type: "STRING",
                },
                intention: {
                  type: "STRING",
                },
                answer: {
                  type: "STRING",
                },
              },
              required: ["question", "intention", "answer"],
            },
          },

          behavioralQuestions: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                question: {
                  type: "STRING",
                },
                intention: {
                  type: "STRING",
                },
                answer: {
                  type: "STRING",
                },
              },
              required: ["question", "intention", "answer"],
            },
          },

          skillGaps: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                skill: {
                  type: "STRING",
                },
                severity: {
                  type: "STRING",
                  enum: ["low", "medium", "high"],
                },
              },
              required: ["skill", "severity"],
            },
          },

          preparationPlan: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                day: {
                  type: "NUMBER",
                },
                focus: {
                  type: "STRING",
                },
                tasks: {
                  type: "ARRAY",
                  items: {
                    type: "STRING",
                  },
                },
              },
              required: ["day", "focus", "tasks"],
            },
          },

          role: {
            type: "STRING",
          },
        },

        required: [
          "matchScore",
          "technicalQuestions",
          "behavioralQuestions",
          "skillGaps",
          "preparationPlan",
          "role",
        ],
      },
    },
  });

  const output = JSON.parse(response.text);

  console.log("AI OUTPUT:", output);

  // Validate the actual AI response
  const validatedOutput = interviewReportSchema.parse(output);

  return validatedOutput;
}

export const generateResumePdf = async (
  resume,
  jobDescription,
  selfDescription,
) => {
  const prompt = `
You are an expert ATS resume writer, recruiter, and career optimization assistant.

Your task is to create a highly ATS-optimized, professional resume in HTML format
for the candidate using:

1. Their existing resume
2. The job description they are applying for
3. Their self-description

The final resume must be specifically tailored to the target job.

========================
IMPORTANT RULES
========================

1. NEVER fabricate information.

Do not invent:
- Work experience
- Companies
- Job titles
- Dates
- Education
- Degrees
- Certifications
- Projects
- Technologies
- Skills
- Achievements
- Metrics
- Responsibilities
- Awards
- Links
- Contact information

Only use information supported by the candidate's resume or self-description.

2. You MAY rewrite existing information.

You should:
- Rewrite weak bullet points professionally.
- Improve clarity and impact.
- Use strong action verbs.
- Make existing experience more relevant to the target role.
- Reorder information based on relevance.
- Combine redundant information where appropriate.
- Improve the professional summary.
- Improve project descriptions.
- Improve skill organization.
- Use terminology commonly found in the job description when it accurately
  describes something the candidate already knows or has done.

3. ATS OPTIMIZATION

Analyze the job description and identify:
- Required technical skills
- Preferred technical skills
- Programming languages
- Frameworks
- Databases
- Tools
- Methodologies
- Domain terminology
- Soft skills
- Responsibilities
- Important keywords

Naturally incorporate relevant keywords into the resume ONLY when supported
by the candidate's actual experience or skills.

Do NOT keyword stuff.

4. JOB RELEVANCE

Prioritize the candidate's:
- Most relevant technical skills
- Most relevant projects
- Most relevant work experience
- Relevant education
- Relevant achievements

Less relevant information may be shortened or omitted if necessary.

5. PROFESSIONAL SUMMARY

Create a concise 2-4 line professional summary specifically tailored to
the target role.

The summary should mention relevant:
- Experience
- Technical skills
- Projects
- Domain knowledge

Do not make unsupported claims.

6. SKILLS

Organize skills into useful ATS-friendly categories where appropriate.

For example:

Languages:
Java, JavaScript, Python

Frameworks:
React.js, Node.js, Express.js

Databases:
MongoDB, SQL

Tools:
Git, Docker

Only include skills supported by the candidate's information.

7. EXPERIENCE

Rewrite experience bullets using concise, achievement-oriented language.

Where the original resume contains measurable results, preserve them.

NEVER invent metrics.

Use strong action verbs such as:
- Developed
- Built
- Implemented
- Designed
- Integrated
- Automated
- Optimized
- Deployed
- Engineered

only when they accurately describe the candidate's work.

8. PROJECTS

Select and prioritize projects that are most relevant to the job.

For each relevant project:
- Clearly mention the project name.
- Mention important technologies.
- Explain what was built.
- Highlight technically relevant contributions.
- Mention measurable outcomes only when provided.

9. EDUCATION

Preserve the candidate's actual education information.

10. CONTACT INFORMATION

Preserve the candidate's actual:
- Name
- Email
- Phone
- LinkedIn
- GitHub
- Portfolio
- Location

Do not create missing information.

11. RESUME LENGTH

Create a concise professional resume suitable for approximately
1-2 pages when rendered as an A4 PDF.

Avoid unnecessary paragraphs.

Use concise bullet points.

12. ATS-FRIENDLY DESIGN

The HTML must be extremely simple and ATS-friendly.

Use:
- Standard headings
- Semantic HTML
- One-column layout
- Plain text
- Standard bullet lists
- Clear section hierarchy

Avoid:
- Tables
- Multiple columns
- Text inside images
- Icons used instead of text
- Graphics
- Skill bars
- Progress bars
- Complex layouts
- Decorative elements that could interfere with ATS parsing

13. HTML OUTPUT

Return ONLY a complete HTML document.

Do NOT return:
- Markdown
- Code fences
- Explanations
- Comments outside the HTML
- JSON

The HTML should contain:

<!DOCTYPE html>
<html>
<head>
  ...
</head>
<body>
  ...
</body>
</html>

Include CSS inside a <style> tag so the document can be directly passed
to Pupeteer.

The HTML should be optimized for A4 printing.

Use professional typography, spacing, and hierarchy.

The resulting HTML should look like a professional modern software
engineering resume while remaining highly ATS-friendly.

========================
CANDIDATE RESUME
========================

${resume}

========================
CANDIDATE SELF-DESCRIPTION
========================

${selfDescription}

========================
TARGET JOB DESCRIPTION
========================

${jobDescription}

========================
FINAL TASK
========================

Analyze all three inputs.

First determine the target role and the important requirements and keywords
from the job description.

Then tailor the candidate's existing information toward that role.

Finally generate the complete ATS-optimized HTML resume.

Remember:

ACCURACY > KEYWORD MATCHING.

Never fabricate information simply to improve ATS matching.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",

    contents: prompt,

    config: {
      responseMimeType: "text/plain",

      responseSchema: {
        type: "STRING",
      },
    },
  });

  let html = response.text.trim();

  // Gemini may occasionally wrap the HTML in markdown code fences.
  html = html
    .replace(/^```html\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  if (!html.toLowerCase().includes("<html")) {
    throw new Error("AI failed to generate a valid HTML resume");
  }

  return html;
};





// export async function invokeGemini() {
//   const response = await ai.models.generateContent({
//     model: "gemini-3.5-flash",
//     contents: "Hello Gemini! Explain what an interview is.",
//   });

//   console.log(response.text);
// }
