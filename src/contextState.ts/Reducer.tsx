import {Children, createContext, ReactNode, useContext, useReducer} from "react"

const defaultState = {
  quizSettings: {
    name: "",
    category: "",
    difficulty: ""
  }
}

export type QuizStateProps = {
  setup: {
      name: string
      category: string
      difficulty: string
  }
}

const newState = {
  payload: {
    name:"Kola",
    difficulty: "easy",
    category: "history"
  }
}
export type State = typeof defaultState | undefined | any
export type Dispatch = (action: Action) => void

export type Action = {
  type: 'UPDATE_QUIZ_SETTINGS',
  payload: State
}


const QuizSettingsContext = createContext<{state: State; dispatch: Dispatch} | undefined>(undefined)


const quizSettingsReducer = (state: State, action:Action) => {
  console.log('state', state);
  
  switch (action.type) {
    case "UPDATE_QUIZ_SETTINGS": 
        return {
          quizSettings: Object.assign(state?.quizSettings, action?.payload?.quizSettings)
        }
    default:
        return state
  }
}

export const QuizSettingsProvider = ({children}: {children: ReactNode}) => {
  const [state, dispatch] = useReducer(quizSettingsReducer, defaultState)

  return(
    <QuizSettingsContext.Provider value={{state, dispatch}}>{children}</QuizSettingsContext.Provider>
  )

  
}

export const useQuizSettings = () => {
  const context = useContext(QuizSettingsContext)

  if(!context) throw new Error("useQuizContext must be used inside a QuizSettingsProvider")

  return context
}