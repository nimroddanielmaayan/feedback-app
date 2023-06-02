import { Link } from 'react-router-dom'
import Card from '../components/shared/Card'

function AboutPage() {
  return (
    <Card>
      <div className='about'>
        <h1>About this project</h1>
        <p>
          This is a React.js app for leaving feedback for a porduct or service
        </p>
        <p>Built by Nimrod Daniel Mayan</p>
        <p>
          <Link to='/'>Back to home</Link>
        </p>
      </div>
    </Card>
  )
}

export default AboutPage
