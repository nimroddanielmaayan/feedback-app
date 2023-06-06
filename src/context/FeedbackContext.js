import { createContext, useState, useEffect } from 'react'

const FeedbackContext = createContext()

// The FeedbackProvider function will be imported in App.js, and will be called as a component which will wrap the entire app

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)

  // The default feedback will be replaced by the feedback fetched from the json server, if a connection is available
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

  // The feedbackEdit state
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  // Fetch feedback from the json server - stage 1, useEffect
  useEffect(() => {
    fetchFeedback()
  }, [])

  // Fetch feedback from the json server - stage 2, fetch API
  const fetchFeedback = async () => {
    const response = await fetch('/feedback?_sort=id&_order=desc')

    const data = await response.json()

    setFeedback(data)
    setIsLoading(false)
  }

  // Add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })

    // The response is the new feedback item that was added to json-server, along with the ID that was assigned to it
    const data = await response.json()

    setFeedback([data, ...feedback])
  }

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      await fetch(`/feedback/${id}`, { method: 'DELETE' })

      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // Update feedback item
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updItem),
    })

    const data = await response.json()

    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    )
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
        feedbackEdit,
        isLoading,
        // Functions
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

// The FeedbackContext object will be imported in the components that need access to the global ("context") app data, like FeedbackItem.jsx. There, the neccesary data will be destructured from it
export default FeedbackContext
