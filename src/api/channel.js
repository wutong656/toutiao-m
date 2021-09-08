import request from '@/utils/request'

export function channelList(query) {
  return request({
    url: '/vue-element-admin/channel/list',
    method: 'get',
    params: query
  })
}
