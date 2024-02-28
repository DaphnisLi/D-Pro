import { CommonError, CommonSuccess } from '@daphnis/d-pro'
import { filter, chunk, pickBy, isNil, set } from 'lodash-es'

export const data = [
  {
    peakName: '喜马拉雅山',
    elevation: '8848',
    country: '尼泊尔/中国',
    continent: '亚洲',
    difficulty: '高',
    description: '世界最高峰,挑战人的身体和意志。',
    duration: '1',
    season: '全年均可,但最佳季节为4-5月和9-11月。',
    sceneryRating: '5',
    time: '2023-06-25'
  },
  {
    peakName: '昆仑山',
    elevation: '7556',
    country: '中国',
    continent: '亚洲',
    difficulty: '中',
    description: '中国的最高峰,有着神秘莫测的风景。',
    duration: '1',
    season: '6-9月',
    sceneryRating: '4',
    time: '2023-07-10'
  },
  {
    peakName: '珠穆朗玛峰',
    elevation: '8848',
    country: '尼泊尔/中国',
    continent: '亚洲',
    difficulty: '高',
    description: '世界最高峰,挑战人的身体和意志。',
    duration: '2',
    season: '全年均可,但最佳季节为4-5月和9-11月。',
    sceneryRating: '5',
    time: '2023-06-25'
  },
  {
    peakName: '泰山',
    elevation: '1545',
    country: '中国',
    continent: '亚洲',
    difficulty: '低',
    description: '中国的五岳之首,有着丰富的历史文化内涵。',
    duration: '2',
    season: '全年均可,但最佳季节为4-11月。',
    sceneryRating: '3',
    time: '2023-07-05'
  },
  {
    peakName: '黄山',
    elevation: '1864',
    country: '中国',
    continent: '亚洲',
    difficulty: '中',
    description: '中国的山水之冠,有着独特的自然风光。',
    duration: '7',
    season: '全年均可,但最佳季节为3-5月和9-11月。',
    sceneryRating: '4',
    time: '2023-08-10'
  },
  {
    peakName: '峨眉山',
    elevation: '3099',
    country: '中国',
    continent: '亚洲',
    difficulty: '中',
    description: '中国的佛教名山,有着古老的寺庙和壮观的自然风光。',
    duration: '6',
    season: '全年均可,但最佳季节为3-5月和9-11月。',
    sceneryRating: '4',
    time: '2023-07-20'
  },
  {
    peakName: '庐山',
    elevation: '1474',
    country: '中国',
    continent: '亚洲',
    difficulty: '中低',
    description: '中国的风景名胜区,有着壮观的瀑布和秀美的山川。',
    duration: '6',
    season: '全年均可,但最佳季节为4-11月。',
    sceneryRating: '3',
    time: '2023-09-05'
  },
  {
    peakName: '华山',
    elevation: '2154',
    country: '中国',
    continent: '亚洲',
    difficulty: '高',
    description: '中国的五大名山之一,以其险峻著名。',
    duration: '7',
    season: '全年均可, 但最佳季节为4',
    sceneryRating: '2',
    time: '2023-10-05'
  },
  {
    peakName: '洛矶山脉',
    elevation: '5267',
    country: '美国',
    continent: '北美洲',
    difficulty: '高',
    description: '美国西部的大山脉，有着雄伟的地貌和丰富的户外活动。',
    duration: '7',
    season: '全年均可，但最佳季节为5-9月',
    sceneryRating: '5',
    time: '2023-08-21'
  },
  {
    peakName: '科罗拉多峰',
    elevation: '4348',
    country: '美国',
    continent: '北美洲',
    difficulty: '中',
    description: '科罗拉多州最高峰，提供绝佳的登山体验。',
    duration: '7',
    season: '6-8月',
    sceneryRating: '4',
    time: '2023-09-05'
  },
  {
    peakName: '亚利桑那之巅',
    elevation: '3128',
    country: '美国',
    continent: '北美洲',
    difficulty: '中',
    description: '坐落在大峡谷国家公园，是一处壮丽的登山胜地。',
    duration: '4',
    season: '4-10月',
    sceneryRating: '5',
    time: '2023-07-15'
  },
  {
    peakName: '蒙大拿巅峰',
    elevation: '4019',
    country: '美国',
    continent: '北美洲',
    difficulty: '中',
    description: '拥有广袤草原和雄伟山脉的蒙大拿州最高峰。',
    duration: '7',
    season: '7-9月',
    sceneryRating: '4',
    time: '2023-06-28'
  },
  {
    peakName: '怀俄明之巅',
    elevation: '4211',
    country: '美国',
    continent: '北美洲',
    difficulty: '高',
    description: '位于黄石国家公园附近，是怀俄明州的最高峰。',
    duration: '5',
    season: '6-9月',
    sceneryRating: '4',
    time: '2023-08-10'
  },
  {
    peakName: '犹他之巅',
    elevation: '3687',
    country: '美国',
    continent: '北美洲',
    difficulty: '中',
    description: '拥有五彩斑斓岩层的峰峦，是犹他州的自然奇观。',
    duration: '0',
    season: '5-10月',
    sceneryRating: '5',
    time: '2023-09-20'
  },
  {
    peakName: '阿拉斯加巅峰',
    elevation: '6194',
    country: '美国',
    continent: '北美洲',
    difficulty: '高',
    description: '屹立在阿拉斯加州境内，是北美洲最高峰。',
    duration: '8',
    season: '6-8月',
    sceneryRating: '5',
    time: '2023-07-02'
  },
  {
    peakName: '俄勒冈之巅',
    elevation: '3429',
    country: '美国',
    continent: '北美洲',
    difficulty: '中',
    description: '坐落在俄勒冈州，是太平洋西北地区的标志性山峰。',
    duration: '9',
    season: '7-10月',
    sceneryRating: '4',
    time: '2023-08-15'
  },
  {
    peakName: '内华达巅峰',
    elevation: '3977',
    country: '美国',
    continent: '北美洲',
    difficulty: '中',
    description: '位于内华达州，是大盆地地区的主要山脉之一。',
    duration: '7',
    season: '6-9月',
    sceneryRating: '4',
    time: '2023-07-25'
  },
  {
    peakName: '爱达荷巅峰',
    elevation: '3859',
    country: '美国',
    continent: '北美洲',
    difficulty: '中',
    description: '被称为“岩石山”，是爱达荷州的最高峰。',
    duration: '0',
    season: '7-10月',
    sceneryRating: '4',
    time: '2023-09-12'
  },
  {
    peakName: '加利福尼亚之巅',
    elevation: '4418',
    country: '美国',
    continent: '北美洲',
    difficulty: '高',
    description: '横跨加利福尼亚州，是西海岸最壮观的山脉之一。',
    duration: '7',
    season: '6-9月',
    sceneryRating: '5',
    time: '2023-08-05'
  },
  {
    peakName: '厄尔布鲁士之巅',
    elevation: '3756',
    country: '阿根廷',
    continent: '南美洲',
    difficulty: '高',
    description: '安第斯山脉最高峰，是阿根廷和智利的国界峰。',
    duration: '2',
    season: '1-3月',
    sceneryRating: '5',
    time: '2023-09-30'
  },
  {
    peakName: '基马努加盖亚',
    elevation: '4884',
    country: '坦桑尼亚',
    continent: '非洲',
    difficulty: '高',
    description: '非洲最高峰，位于乞力马扎罗山脉。',
    duration: '1',
    season: '1-3月',
    sceneryRating: '5',
    time: '2023-10-15'
  },
  {
    peakName: '艾尔布鲁斯峰',
    elevation: '5642',
    country: '俄罗斯',
    continent: '亚洲',
    difficulty: '高',
    description: '是欧洲最高峰，同时也是俄罗斯的国家峰。',
    duration: '5',
    season: '6-9月',
    sceneryRating: '5',
    time: '2023-11-01'
  },
  {
    peakName: '哈拉拉耶峰',
    elevation: '5895',
    country: '尼泊尔',
    continent: '亚洲',
    difficulty: '高',
    description: '喜马拉雅山脉的一部分，是尼泊尔最高峰。',
    duration: '8',
    season: '4-6月',
    sceneryRating: '5',
    time: '2023-10-10'
  },
  {
    peakName: '乞力马扎罗',
    elevation: '5895',
    country: '坦桑尼亚',
    continent: '非洲',
    difficulty: '高',
    description: '非洲最高峰之一，被称为“黑山”或“雪的顶峰”。',
    duration: '3',
    season: '6-9月',
    sceneryRating: '5',
    time: '2023-11-20'
  },
  {
    peakName: '瓦伦西亚峰',
    elevation: '4485',
    country: '西班牙',
    continent: '欧洲',
    difficulty: '中',
    description: '是伊比利亚山脉中的最高峰，享有美丽的地中海风光。',
    duration: '8',
    season: '5-10月',
    sceneryRating: '4',
    time: '2023-12-05'
  },
  {
    peakName: '吉尔吉斯斯坦之巅',
    elevation: '7439',
    country: '吉尔吉斯斯坦',
    continent: '亚洲',
    difficulty: '高',
    description: '横越帕米尔高原，是��亚的宏伟山脉。',
    duration: '6',
    season: '7-9月',
    sceneryRating: '5',
    time: '2024-01-10'
  },
  {
    peakName: '新西兰阿尔卑斯山',
    elevation: '3754',
    country: '新西兰',
    continent: '大洋洲',
    difficulty: '中',
    description: '位于新西兰南岛，是南半球的主要山脉。',
    duration: '8',
    season: '11-2月',
    sceneryRating: '4',
    time: '2024-02-15'
  },
  {
    peakName: '奥尔洛夫斯基峰',
    elevation: '5642',
    country: '格鲁吉亚',
    continent: '亚洲',
    difficulty: '高',
    description: '大高加索山脉的最高峰，位于格鲁吉亚。',
    duration: '3',
    season: '6-9月',
    sceneryRating: '5',
    time: '2024-03-01'
  },
  {
    peakName: '安南康达加蓬',
    elevation: '1020',
    country: '加蓬',
    continent: '非洲',
    difficulty: '低',
    description: '是加蓬的最高峰，属于奥果韦-伊温多省。',
    duration: '4',
    season: '6-9月',
    sceneryRating: '3',
    time: '2024-04-15'
  },
  {
    peakName: '马尔霍夫峰',
    elevation: '4644',
    country: '巴基斯坦',
    continent: '亚洲',
    difficulty: '高',
    description: '喜马拉雅山脉的一部分，是巴基斯坦最高峰。',
    duration: '1',
    season: '5-9月',
    sceneryRating: '4',
    time: '2024-05-20'
  },
  {
    peakName: '阿尔吉雷巴峰',
    elevation: '4058',
    country: '摩洛哥',
    continent: '非洲',
    difficulty: '中',
    description: '是北非最高峰，位于阿特拉斯山脉。',
    duration: '1',
    season: '3-5月',
    sceneryRating: '4',
    time: '2024-06-25'
  }
]

export const countryList = [
  { value: 'usa', label: '美国' },
  { value: 'argentina', label: '阿根廷' },
  { value: 'tanzania', label: '坦桑尼亚' },
  { value: 'russia', label: '俄罗斯' },
  { value: 'nepal', label: '尼泊尔' },
  { value: 'china', label: '中国' },
  { value: 'spain', label: '西班牙' },
  { value: 'kyrgyzstan', label: '吉尔吉斯斯坦' },
  { value: 'newzealand', label: '新西兰' },
  { value: 'georgia', label: '格鲁吉亚' },
  { value: 'gabon', label: '加蓬' },
  { value: 'pakistan', label: '巴基斯坦' },
  { value: 'morocco', label: '摩洛哥' },
]

export const continentList = [
  { value: 'northAmerica', label: '北美洲' },
  { value: 'southAmerica', label: '南美洲' },
  { value: 'europe', label: '欧洲' },
  { value: 'asia', label: '亚洲' },
  { value: 'africa', label: '非洲' },
  { value: 'oceania', label: '大洋洲' },
]

export const difficultyList = [
  { value: 'high', label: '高' },
  { value: 'medium', label: '中' },
  { value: 'low', label: '低' },
]

export const requestApi = <T extends any>(interfaceName: string, params?: any): Promise<[null, CommonError] | [CommonSuccess<T>, null]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const { current, pageSize, ...rest } = params
      rest.country && set(rest, 'country', countryList.find(item => item.value === rest.country)?.label)
      rest.continent && set(rest, 'continent', continentList.find(item => item.value === rest.continent)?.label)
      rest.difficulty && set(rest, 'difficulty', difficultyList.find(item => item.value === rest.difficulty)?.label)

      const list = filter(data, pickBy(rest, (v) => !isNil(v)))

      resolve({
        data: {
          total: list.length,
          list: chunk(list, pageSize)[current - 1],
        },
        errno: 0,
        errmsg: 'success',
        traceid: '2134567'
      })
    }, 500)
  }).then((res: any) => {
    if ((res?.errno ?? res?.errcode) === 0) {
      return [{
        data: res?.data,
        code: res?.errno ?? res?.errcode,
        message: res?.errmsg,
        traceId: res?.traceid,
      }, null]
    } else {
      return [null, {
        code: res?.errno ?? res?.errcode,
        message: res?.errmsg,
        traceId: res?.traceid,
      }]
    }
  })
}
