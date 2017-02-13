// ------------------------------
// -- QUIZ
// ------------------------------
export const QuizType = {
    MCQ: 'MCQ', 
    TEXT: 'TEXT'
}

// The heading of a quiz
export interface Quiz {
    id: number
    type: string
    title: string
    question: string
    choices: any
    answer: any
    explanations: any
}

// The choice of a user for a given quiz
export interface QuizLocalChoice {
    quizId: number

    choice: any
}

// The global result of a group of people for a given quiz
export interface QuizRoomChoices {
    quizId: number

    choices: any[] // player id => choice
}

// ------------------------------
// -- STUDENT ATTENTION
// ------------------------------
export const AttentionEventType = {
    PANIC_START: "PANICK_START",
    PANIC_END: "PANICK_END", 
    TOO_SLOW_START: "TOO_SLOW_START", 
    TOO_SLOW_END: "TOO_SLOW_END",
    TOO_FAST_START: "TOO_FAST_START",
    TOO_FAST_END: "TOO_FAST_END"
}

export const AttentionStateType = {
    PANIC: "PANIC",
    TOO_SLOW: "TOO_SLOW",
    TOO_FAST: "TOO_FAST"
}

export interface AttentionEvent {
    type: string,
    time: number
}

export interface CommentEvent {
    text: string
    time: number
}

export type ClassEvent = CommentEvent | AttentionEvent

export const QuizInstanceState = {
    OFF: 'OFF',
    HEADING: 'HEADING',
    FEEDBACK: 'FEEDBACK'
}

export interface QuizLauncher {
    quizId: number
    title: string
    state: number // 0: not done; 1: being run; 2: already ran 
    successRate: number
}

export const SessionType = {
    CM: 'CM',
    TD: 'TD',
    TP: 'TP'
}

export interface Session {
    // the name of the session
    sessionName: string
    // the name of the teacher
    teacherName: string
    // the type of session
    sessionType: string
    // the date of the session
    date: Date,
    // the discipline this session belongs to
    discipline: string
    // true if a live of this session is going on actually
    live: boolean
}