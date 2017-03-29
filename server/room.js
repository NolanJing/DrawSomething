
var io = require('./prod_server').io;



// 随机头像哈希表
var picArray = {
  '0': '92e0b55210219528',
  '1': '6733dff7afb97d1f',
  '2': '330e8d6d36f7ed41',
  '3': 'c3936106ff35f5c0',
  '4': 'fb1c080965258f2f',
  '5': '621bf5f436ab2952',
  '6': '5326860156751e07',
  '7': '9fdce1d6a32ee318',
  '8': 'e98f33144c141e8c',
  '9': '9fa836819ca5c071',
  '10': '795bb0118fd158a4',
  '11': '20ffd72d8bb0f38d',
  '12': '4ab871a81527c9a7',
  '13': '679b24f2000031f3',
  '14': '720d6a3fb8409d8b',
  '15': 'd945ea1d6c4dcb85',
  '16': 'a2c0e1556c9f2cc6',
  '17': '21f2048ef7eb379f',
  '18': '6de04b34d182ac66',
  '19': '6401187b59895576',
  '20': '3d4d9a6d3a5f67cd',
  '21': '78f18264cf29ba72',
  '22': '5fd2f5e8b3e1dba9',
  '23': '5a9c9eba98719b5f',
  '24': '82bfb8feece2f5da',
  '25': '331f3f5f33aa890b',
  '26': '3b20aa6cfd2e4baf',
  '27': 'f362cb746a8f026e',
  '28': 'cfae2bab573f0627'
};

var playerCount = 0;
var newId = 0;

// 在线用户
var onlineUsers = {};
// 当前在线人数
var onlineCount = 0;

io.on('connection', function (socket) {
  // 用户注册
  socket.on('login', function (playerInfo) {
    // 将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
    this.name = playerInfo.userId;
    var socketId = this.name;
    // 生成随机头像
    var rand = Math.floor(Math.random() * 28);
    var picUrl = 'http://i1.piimg.com/589116/' + picArray[rand] + 't.jpg';
    playerInfo.avatar = picUrl;
    /**
     * playerInfo = {
     *   userid : 000001,
     *   userName: '欧阳蒜苗'
     *   avatar: "https://gss0.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/8ad4b31c8701a18bbef9f231982f07082838feba.jpg"
     * }
     */
    //检查在线列表，如果不在里面就加入
    if (!onlineUsers.hasOwnProperty(playerInfo.userId)) {
      onlineUsers[playerInfo.userId] = playerInfo;
      //在线人数+1
      onlineCount++;
    }
    //向所有客户端广播用户加入
    /* {
     * onlineUsers: onlineUsers,
     * onlineCount: onlineCount,
     * appendUser: playerInfo
     * }
     */
    io.emit('login', {onlineUsers: onlineUsers, onlineCount: onlineCount, appendUser: playerInfo});
    console.log('用户 <' + playerInfo.userName + '> 加入了聊天室');
    console.log('当前在线人数： ' + onlineCount + '\n');
  });
  //用户发送消息
  socket.on('clientSendMsg', function (msg) {
    console.log('get message:' + JSON.stringify(msg));
    io.emit('serverEmitMsg', msg);
  });
  //用户离开
  socket.on('disconnect', function () {

    var socketId = this.name;
    if (onlineUsers.hasOwnProperty(socketId)) {
      //退出用户的信息
      var leaveUser = {userId: socketId, userName: onlineUsers[socketId].userName};
      //将退出的用户从在线列表中删除
      delete onlineUsers[socketId];
      //在线人数-1
      onlineCount--;

      //向所有客户端广播用户退出
      io.emit('logout', {onlineUsers: onlineUsers, onlineCount: onlineCount, leaveUser: leaveUser});
      console.log('用户 <' + leaveUser.userName + '> 退出了聊天室');
      console.log('当前在线人数： ' + onlineCount + '\n');
    }
  });
  //画笔数据
  socket.on('path', function (pathData) {
    // console.log(pathDataDict.toString());
    // console.log(pathDataDict);
    // console.log('transfer to client pathDataDict\n');
    socket.broadcast.emit('appendPath', pathData);
  });

  socket.on('clear', function () {
    socket.broadcast.emit('clear');
    console.log('clear');
  })
});
