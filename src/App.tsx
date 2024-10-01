import './App.css'
import Aggird from './component/table/Aggird'
import OpenAI from 'openai'
const OPENAI_API_KEY = ''

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
      <Aggird />
    </div>
  )
}

export default App
