import { v4 as uuidv4 } from 'uuid'
import { createContext, useState } from 'react'

const FeedbackContext = createContext()

// The FeedbackProvider function will be imported in App.js, and will be called as a component which will wrap the entire app
export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This is feedback #1',
      rating: 10,
    },
    {
      id: 2,
      text: 'This is feedback #2',
      rating: 9,
    },
    {
      id: 3,
      text: 'This is feedback #3',
      rating: 7,
    },
  ])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  // Add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  // Delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({ item, edit: true })
  }

  // The context provider provides both the state and the functions to the components
  return (
    <FeedbackContext.Provider
      value={{
        // State
        feedback,
        // Function
        deleteFeedback,
        // Function
        addFeedback,
        // Function
        editFeedback,
        // State
        feedbackEdit,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

// The FeedbackContext object will be imported in the components that need access to the global ("context") app data, like FeedbackItem.jsx. There, the neccesary data will be destructured from it
export default FeedbackContext
