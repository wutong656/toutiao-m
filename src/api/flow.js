import request from '@/utils/request'

// 查询环形图
export function huan(data) {
  return request({
    url: '/api/v1/analysis/queryRingDiagram',
    method: 'post',
    data
  })
}

export function norm(data) {
  return request({
    url: '/api/v1/analysis/queryCount',
    method: 'post',
    data
  })
}

// 折线图
export function inline(data) {
  return request({
    url: '/api/v1/analysis/queryLineChart',
    method: 'post',
    data
  })
}

// 表格
export function chartQuery(data) {
  return request({
    url: '/api/v1/analysis/queryTable',
    method: 'post',
    data
  })
}

