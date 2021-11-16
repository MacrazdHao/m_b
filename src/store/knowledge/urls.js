export default {
  messagesList: (index, size) => `/student/knowledge/list?pageIndex=${index}&pageSize=${size}`,
  readMessage: (msgId) => `/admin/message/read?messageId=${msgId}`,
}