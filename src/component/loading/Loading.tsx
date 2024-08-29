import './style.scss'

const Loading = () => {
  return (
    <div className='flex ms-5 gap-2'>
      <div className='container'>
        <div className='tiktok'></div>
        <div className='tiktok red'></div>
      </div>
      <div>Loading...</div>
    </div>
  )
}

export default Loading
