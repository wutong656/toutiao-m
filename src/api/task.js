import request from '@/utils/request'

// 查询任务列表
export function getList(query) {
  return request({
    url: '/api/v1/promotion/query/promotionlist',
    method: 'get',
    params: query
  })
}

// 获取素材列表
export function materialList() {
  return request({
    url: '/api/v1/promotion/query/material',
    methods: 'get'
  })
}

// 添加任务列表
export function saveList(data) {
  return request({
    url: '/api/v1/promotion/save/promotion',
    method: 'post',
    data
  })
}

// 修改任务列表
export function updateList(data) {
  return request({
    url: '/api/v1/promotion/update/promotion',
    method: 'post',
    data
  })
}

// 查询详情
export function queryList(id) {
  return request({
    url: '/api/v1/promotion/query/promotion',
    method: 'get',
    params: id
  })
}

// 停止任务
export function stopList(id) {
  return request({
    url: '/api/v1/promotion/stop/promotion',
    methods: 'get',
    params: id
  })
}

// 删除任务
export function deleteList(id) {
  return request({
    url: '/api/v1/promotion/delete/promotion',
    method: 'get',
    params: id
  })
}

// 获取渠道列表
export function channelList() {
  return request({
    url: 'api/v1/promotion/query/channel',
    method: 'get'
  })
}

// 获取任务列表
export function taskList() {
  return request({
    url: '/api/v1/channel/pulldown/task',
    method: 'get'
  })
}

export function querysList(urls) {
  return request({
    url: urls,
    method: 'GET'
  })
}
