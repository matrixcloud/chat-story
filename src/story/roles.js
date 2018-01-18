const roleA = {
  id: 101,
  name: '便衣警察',
  avatar: 'https://ww3.sinaimg.cn/large/006tKfTcgy1fnkjj8r9ulj30oo0oojrw.jpg',
  position: 'left',
}

const roleB = {
  id: 102,
  name: '冯康',
  avatar: 'https://ww4.sinaimg.cn/large/006tKfTcgy1fnkkg6re1zj30oo0oowfa.jpg',
  position: 'right'
}

const roles = [
  roleA,
  roleB
]

export function role(ID) {
  return roles.find(r => r.id === ID)
}

export default roles
