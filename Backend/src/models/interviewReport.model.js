const mongoose=require("mongoose")

/**
 * -job description schema
 * -resume text:String
 * -self description:String
 * -
 * 
 * -matchscore:Number
 * 
 * -technical questions :[{
 *      question:"",
 *      intention:"",
 *      answer:"",
 * }]
 * -behaviour questions :[{
 * 
 *      question:"",
 *      intention:"",
 *      answer:"",
 * 
 * }]
 * -skill gaps:[
 *          {
 *      skill:"",
 *      severity:"",
 *      type:String,
 *      enum:["low", "medium", "high", "critical"]
 *  *
 * 
 * 
 * }]
 * -prepration plan:;[{
 *      day:number,
 *      focus:String,
 *      task:[String]
 * 
 * 
 * }]
 */

const technicalQuestionsSchema=new mongoose.Schema({
    question:{
        type:String,
        required:[true,"question is required"]
    },
    intention:{
        type:String,
        required:[true,"intention is required"]
    },
    answer:{
        type:String,
        required:[true,"answer is required"]
    }
},{
    _id: false
}
)

const behaviouralQuestionsSchema=new mongoose.Schema({
     question:{
        type:String,
        required:[true,"question is required"]
    },
    intention:{
        type:String,
        required:[true,"intention is required"]
    },
    answer:{
        type:String,
        required:[true,"answer is required"]
    }},{
        _id:false
    })

const skillGapSchema=new mongoose.Schema({
   
    skill:{
        type:String,
        required:[true,"SKILL IS REQUIRED"]
    },
    severity:{
        type:String,
        enum:["low","medium","high","critical"],
        required:[true,"SEVERITY IS REQUIRED"]
    }
},{
    _id: false  
})
    
const preprationPlanSchema=new mongoose.Schema({
    day:{
        type:Number,
        required:[true,"day is required"]
    },
    focus:{
        type:String,
        required:[true,"FOCUS IS REQUIRED"]
    },
    tasks:[{
        type:String,
        required:[true,"TASK IS REQUIRED"]
    }]
})

const interviewReportSchema=new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true,"Job DESCRIPTION IS REQUIRED"]
    },
    resume:{
        type:String,
    },
    matchScore:{
        type:Number,
        min:0,
        max:100,
    },
    technicalQuestions:[technicalQuestionsSchema],
    behavioralQuestions:[behaviouralQuestionsSchema],
    skillGaps:[skillGapSchema],
    preparationPlan:[preprationPlanSchema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        
    },
    title:{
        type:String,
        required:[true,"TITLE IS REQUIRED"]
    }

},
{
    timestamps:true
}
)

const interviewReportModel= mongoose.model("InterviewReport",
    interviewReportSchema 
)

module.exports=interviewReportModel