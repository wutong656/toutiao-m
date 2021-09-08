import request from '@/utils/request'

// 指标汇总
export function quota(data) {
  return request({
    url: '/api/v1/analysis/queryVistsCount',
    method: 'post',
    data
  })
}

// 地图数据
export function plat(data) {
  return request({
    url: '/api/v1/analysis/queryRegion',
    method: 'post',
    data
  })
}

// 柱状图数据
export function frac(data) {
  return request({
    url: '/api/v1/analysis/queryVistsChart',
    method: 'post',
    data
  })
}

export function selectParams(urls) {
  return request({
    url: urls,
    method: 'GET'
  })
}
