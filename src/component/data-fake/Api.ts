export interface data_type {
  id: number
  marketplace: String
  adTool: String
  title: String
  code: String
  shop: String
  country: String
  number: String
  company: String
  start_time: String
  end_time: String
  update_time: String
  status: number
}

export const Api: data_type[] = [
  {
    id: 1,
    marketplace: 'Shoppe',
    adTool: 'Product Ads',
    title: 'CAMP-TESting DA',
    code: 'adbc123',
    shop: 'XYZ',
    country: 'Vietnam',
    number: '234',
    company: 'Epsilo',
    start_time: '2024-08-19 02:00:17',
    end_time: '2024-08-19 02:00:17',
    update_time: '2024-08-19 02:00:17',
    status: 1,
  },
  {
    id: 2,
    marketplace: 'Shoppe',
    adTool: 'Product Ads',
    title: 'CAMP-TESting DA',
    code: 'adbc123',
    shop: 'XYZ',
    company: 'Epsilo',
    country: 'Vietnam',
    number: '234',
    start_time: '2024-08-19 02:00:17',
    end_time: '2024-08-19 02:00:17',
    update_time: '2024-08-19 02:00:17',
    status: 0,
  },
]
