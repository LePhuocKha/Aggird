import {faker} from '@faker-js/faker'
import {ColDef, GridReadyEvent} from 'ag-grid-community'
import {formatDate} from '../../utils/common'
export interface data_type {
  id: number
  marketplace: string
  adTool: string
  title: string
  code: string
  shop: string
  country: string
  number: string
  company: string
  start_time: string
  end_time: string
  update_time: string
  status: number
}

// Generate random data using faker
export const generateData = (count: number, params: any) => {
  const addFieldData = params?.api?.getColumnDefs().filter((el: ColDef) => !!el.type)
  const fakeData = Array.from({length: count}, (_, id) => {
    let data = {}
    const mapUpdateField = (addFieldData || []).forEach((d: ColDef) => {
      const fieldColData = d?.field
      if (d.type === 'date') {
        data = {
          ...data,
          [fieldColData as string]: formatDate((faker.date.recent().toISOString() as string) || ''),
        }
      }
      if (d.type === 'text') {
        data = {...data, [fieldColData as string]: faker.commerce.productMaterial()}
      }
      if (d.type === 'number') {
        data = {
          ...data,
          [fieldColData as string]: faker.datatype.number({min: 0, max: 99999}).toString(),
        }
      }
      if (d.type === 'boolean') {
        data = {
          ...data,
          [fieldColData as string]: faker.datatype.boolean() ? 1 : 0,
        }
      }
    })

    return {
      id: id + 1,
      marketplace: faker.commerce.department(),
      adTool: faker.commerce.productMaterial(),
      title: faker.lorem.words(2),
      code: faker.datatype.number({min: 0, max: 99999}).toString(),
      shop: faker.company.name(),
      country: faker.address.countryCode('alpha-2'),
      number: faker.datatype.number({min: 0, max: 99999}).toString(),
      company: faker.company.name(),
      start_time: faker.date.recent().toISOString(),
      end_time: faker.date.future().toISOString(),
      update_time: faker.date.recent().toISOString(),
      status: faker.datatype.boolean() ? 1 : 0,
      ...data,
    }
  })
  return fakeData
}
export const Api: data_type[] = []
