import {getMonthsIsTheTime} from '../utils/common'

const status_type = [
  {
    value: 0,
    class: 'bg-gray-500',
    label: 'Ended',
  },
  {
    value: 1,
    class: 'bg-green-600',
    label: 'Ongoing',
  },
]
const Status = ({status, update_time}: {status: number; update_time: string}) => {
  const dataRender = status_type.filter((el) => el.value === (+status || 0))?.[0]
  return (
    <div className='h-[100%] w-[100%] flex items-center'>
      <div className='flex gap-[5px]'>
        <div className={`${dataRender?.class} w-[12px] h-[12px] rounded-full mt-[5px]`}></div>
        <div className='wrapper-campaign'>
          <p className='leading-[19px] font-semibold text-[16px] text-sky-800'>
            {dataRender?.label}
          </p>
          <p className='leading-[19px] text-gray-400'>{getMonthsIsTheTime(update_time)}</p>
        </div>
      </div>
    </div>
  )
}

export default Status
