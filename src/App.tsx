import {useState} from 'react'
import './App.css'
import Aggird from './component/table/Aggird'
import OpenAI from 'openai'
const OPENAI_API_KEY =
  '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'

function App() {
  const openai = new OpenAI({apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true})
  const aiModel = 'gpt-3.5-turbo'
  const fetchWeather = async () => {
    const messages = [
      {
        role: 'user',
        content: 'hello',
      },
    ]
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{role: 'user', content: 'Say this is a test!'}],
      stream: true,
    })
  }
  return (
    <div>
      <div>
        <button
          onClick={() => {
            fetchWeather()
          }}
        >
          test{' '}
        </button>
      </div>
      <Aggird />
    </div>
  )
}

export default App
