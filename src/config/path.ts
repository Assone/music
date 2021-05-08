/* eslint-disable no-shadow */

export const enum AUTH {
  loginPhone = '/login/cellphone', // 手机登录
  loginEmail = '/login', // 邮箱登录
  refresh = '/login/refresh', // 刷新登录
  captchaSend = '/captcha/sent', // 发送验证码
  captchaVerify = '/captcha/verify', // 验证验证码
  register = '/register/cellphone', // 注册
  changePassword = '/register/cellphone', // 修改密码
  checkPhone = '/cellphone/existence/check', // 检测手机号码是否已注册
  initNick = '/activate/init/profile', // 初始化昵称
  changePhone = '/rebind', // 更换绑定手机
  logout = '/logout', // 退出登录
  status = '/login/status', // 登录状态
}

export const enum USER {
  detail = '/user/detail', // 获取用户详情
  infoAccount = '/user/account', // 获取账号信息
  info = '/user/subcount', // 获取用户信息 , 歌单，收藏，mv, dj 数量
  level = '/user/level', // 获取用户等级信息,
  infoBind = '/user/binding', // 获取用户绑定信息
  changePhone = '/user/replacephone', // 用户绑定手机
  updateInfo = '/user/update', // 更新用户信息
  updateAvatar = '/avatar/upload', // 更新头像
  playlist = '/user/playlist', // 获取用户歌单
  radio = '/user/dj', // 获取用户电台
  following = '/user/follows', // 获取用户关注列表
  followers = '/user/followeds', // 获取用户粉丝列表
  follow = '/follow', // 关注用户
  followCancel = '/follow', // 取消关注用户
  record = '/user/record', // 获取用户播放记录
  setting = '/setting', // 设置
  digitalAlbum = '/digitalAlbum/purchased', // 我的数字专辑
  digitalAlbumBuy = '/digitalAlbum/ordering', // 购买数字专辑
  dynamic = '/user/event', // 获取用户动态
  signIn = '/daily_signin', // 签到
  clockIn = '/scrobble', // 听歌打卡
}

export const enum MESSAGE {
  get = '/msg/private', // 通知 - 私信
  send = '/send/text', // 发送私信
  sendMusic = '/send/song', // 发送私信音乐
  sendPlaylist = '/send/playlist', // 发送私信(带歌单)
  recent = '/msg/recentcontact', // 最近联系人
  detail = '/msg/private/history', // 私信内容
}

export const enum NOTICE {
  comment = '/msg/comments', // 通知 - 评论
  toMe = '/msg/forwards', // 通知 - @我
  index = '/msg/notices', // 通知 - 通知
}

export const enum DYNAMIC {
  share = '/share/resource', // 分享歌曲、歌单、mv、电台、电台节目到动态
  index = '/event', // 获取动态消息
  forward = '/event/forward', // 转发用户动态
  delete = '/event/del', // 删除用户动态
}

export const enum SUB {
  artist = '/artist/sublist', // 收藏的歌手列表
  column = '/topic/sublist', // 收藏的专栏
  mv = '/mv/sublist', // 收藏的 MV 列表
  album = '/album/sublist', // 获取已收藏专辑列表
  radio = '/dj/sublist', // 电台的订阅列表
  subVideo = '/video/sub', // 收藏视频
  subVideoCancel = '/video/sub', // 取消收藏视频
  subArtist = '/artist/sub', // 收藏歌手
  subArtistCancel = '/artist/sub', // 取消收藏歌手
  subMV = '/mv/sub', // 收藏 MV
  subMVCancel = '/mv/sub', // 取消收藏 MV
  subPlaylist = '/playlist/subscribe', // 收藏歌单
  subPlaylistCancel = '/playlist/subscribe', // 取消收藏歌单
  subAlbum = '/album/sub', // 收藏专辑
  subAlbumCancel = '/album/sub', // 取消收藏专辑,
  subRadio = '/dj/sub', // 电台 - 订阅
  subRadioCancel = '/dj/sub', // 电台 - 取消订阅
}

export const enum LIKE {
  comment = '/comment/like', // 给评论点赞
  resource = '/resource/like', // 资源点赞( MV,电台,视频)
  listVideo = '/playlist/mylike', // 获取点赞过的视频
  listSong = '/likelist', // 喜欢音乐列表
  song = '/like', // 喜欢音乐
}

export const enum CLOUD_DISK {
  data = '/user/cloud', // 云盘
  dataDetail = '/user/cloud/detail', // 云盘数据详情
  delSong = '/user/cloud/del', // 云盘歌曲删除
}

export const enum COMMENT {
  song = '/comment/music', // 歌曲评论
  floor = '/comment/floor', // 楼层评论
  album = '/comment/album', // 专辑评论
  playlist = '/comment/playlist', // 歌单评论
  mv = '/comment/mv', // mv 评论
  radio = '/comment/dj', // 电台节目评论
  video = '/comment/video', // 视频评论
  hot = '/comment/hot', // 热门评论
  index = '/comment/new', // 新版评论接口
  dynamic = '/comment/event', // 获取动态评论
  hug = '/hug/comment', // 抱一抱评论
  hugList = '/comment/hug/list', // 评论抱一抱列表
  send = '/comment', // 发送评论
  delete = '/comment', // 删除评论
}

export const enum RECOMMEND {
  dailyPlaylist = '/recommend/resource', // 获取每日推荐歌单
  dailySong = '/recommend/songs', // 获取每日推荐歌曲
  history = '/history/recommend/songs', // 获取历史日推可用日期列表
  historyDetail = '/history/recommend/songs/detail', // 获取历史日推详情数据
  mv = '/personalized/mv', // 推荐 mv
  playlist = '/personalized', // 推荐歌单
  song = '/personalized/newsong', // 推荐新音乐
  radio = '/personalized/djprogram', // 推荐电台
  program = '/program/recommend', // 推荐节目
  video = '/video/timeline/recommend', // 获取推荐视频
  radioPersonal = '/dj/personalize/recommend', // 电台个性推荐
}

export const enum ARTIST {
  classification = '/artist/list', // 歌手分类列表
  songsHot = '/artist/top/song', // 歌手热门50首歌曲
  songs = '/artist/songs', // 歌手全部歌曲
  info = '/artists', // 获取歌手单曲
  mv = '/artist/mv', // 获取歌手 mv
  album = '/artist/album', // 获取歌手专辑
  decs = '/artist/desc', // 获取歌手描述
  detail = '/artist/detail', // 获取歌手详情
}

export const enum ALBUM {
  detail = '/album', // 获取专辑内容,
  info = '/album/detail/dynamic', // 专辑动态信息
  new = '/album/new', // 全部新碟
  newest = '/album/newest', // 最新专辑
  digitalNew = '/album/list', // 数字专辑-新碟上架
  digitalStyleList = '/album/list/style', // 数字专辑-语种风格馆
  digitalDetail = '/album/detail', // 数字专辑详情
}

export const enum SONG {
  updateOrder = '/song/order/update', // 调整歌曲顺序
  url = '/song/url', // 获取音乐 url,
  available = '/check/music', // 音乐是否可用
  detail = '/song/detail', // 获取歌曲详情
  subArtistNewSong = '/artist/new/song', // 关注歌手新歌
}

export const enum TRACK {
  addToPlaylist = '/playlist/tracks', // 对歌单添加歌曲
  delToPlaylist = '/playlist/tracks', // 对歌单删除歌曲
  addToPlaylistVideo = '/playlist/track/add', // 收藏视频到视频歌单
  delToPlaylistVideo = '/playlist/track/delete', // 删除视频歌单里的视频
}

export const enum PLAYLIST {
  classification = '/playlist/catlist', // 歌单分类
  classificationHot = '/playlist/hot', // 热门歌单分类
  index = '/top/playlist', // 歌单 ( 网友精选碟 )
  tags = '/playlist/highquality/tags', // 精品歌单标签列表
  boutique = '/top/playlist/highquality', // 获取精品歌单
  recommend = '/related/playlist', // 相关歌单推荐
  detail = '/playlist/detail', // 获取歌单详情
  detailDynamic = '/playlist/detail/dynamic', // 歌单详情动态
  collectors = '/playlist/subscribers', // 歌单收藏者
  update = '/playlist/update', // 更新歌单
  updateDecs = '/playlist/desc/update', // 更新歌单描述
  updateName = '/playlist/name/update', // 更新歌单名
  updateTags = '/playlist/tags/update', // 更新歌单标签
  updateCover = '/playlist/cover/update', // 歌单封面上传
  updateOrder = '/playlist/order/update', // 调整歌单顺序
  create = '/playlist/create', // 新建歌单
  delete = '/playlist/delete', // 删除歌单
  lyric = '/lyric', // 获取歌词
}

export const enum VIDEO {
  recent = '/playlist/video/recent', // 最近播放的视频
  tags = '/video/group/list', // 获取视频标签列表
  classification = '/video/category/list', // 获取视频分类列表
  tagToGroup = '/video/group', // 获取视频标签/分类下的视频
  all = '/video/timeline/all', // 获取全部视频列表
  related = '/related/allvideo', // 相关视频
  detail = '/video/detail', // 视频详情
  info = '/video/detail/info', // 获取视频点赞转发评论数数据
  url = '/video/url', // 获取视频播放地址
}

export const enum MV {
  all = '/mv/all', // 全部 mv
  new = '/mv/first', // 最新 mv
  official = '/mv/exclusive/rcmd', // 网易出品mv
  detail = '/mv/detail', // 获取 mv 数据
  info = '/mv/detail/info', // 获取 mv 点赞转发评论数数据
  url = '/mv/url', // mv 地址
}

export const enum RADIO {
  private = '/personal_fm', // 私人 FM
  trash = '/fm_trash', // 垃圾桶
  subscriber = '/dj/subscriber', // 电台订阅者列表
  hot = '/dj/hot', // 热门电台
  hotToCategory = '/dj/radio/hot', // 电台 - 类别热门电台
  classification = '/dj/catelist', // 电台 - 分类
  classificationRecommend = '/dj/recommend/type', // 电台 - 分类推荐
  paidPicks = '/dj/paygift', // 电台 - 付费精选
  typeExcludeHot = '/dj/category/excludehot', // 电台 - 非热门类型
  typeCommend = '/dj/category/recommend', // 电台 - 推荐类型
  todayPreferred = '/dj/today/perfered', // 电台 - 今日优选
  detail = '/dj/detail', // 电台 - 详情
  program = '/dj/program', // 电台 - 节目
  programDetail = '/dj/program/detail', // 电台 - 节目详情
}

export const enum SIMILAR {
  artist = '/simi/artist', // 获取相似歌手
  playlist = '/simi/playlist', // 获取相似歌单
  mv = '/simi/mv', // 相似 mv
  song = '/simi/song', // 获取相似音乐
  user = '/simi/user', // 获取最近 5 个听了这首歌的用户
}

export const enum TOP {
  song = '/top/song', // 新歌速递
  album = '/top/album', // 新碟上架
  artistHot = '/top/artists', // 热门歌手
  mv = '/top/mv', // mv 排行
  all = '/toplist', // 所有榜单
  allAbstract = '/toplist/detail', // 所有榜单内容摘要
  artist = '/toplist/artist', // 歌手榜
  digital = '/album_songsaleboard', // 数字专辑&数字单曲-榜单
  program = '/dj/program/toplist', // 电台 - 节目榜
  radioPay = '/dj/toplist/pay', // 电台 - 付费精品
  program24 = '/dj/program/toplist/hours', // 电台 - 24小时节目榜
  anchor24 = '/dj/toplist/hours', // 电台 - 24小时主播榜
  anchorNew = '/dj/toplist/newcomer', // 电台 - 主播新人榜
  anchorHot = '/dj/toplist/popular', // 电台 - 最热主播榜
  radio = '/dj/toplist', // 电台 - 新晋电台榜/热门电台榜
}

export const enum SEARCH {
  index = '/cloudsearch', // 搜索
  keyword = '/search/default', // 默认搜索关键词
  hot = '/search/hot', // 热搜列表(简略)
  hotDetail = '/search/hot/detail', // 热搜列表(详细)
  suggestion = '/search/suggest', // 搜索建议
  multiMatch = '/search/multimatch', // 搜索多重匹配
}

export const enum TEMP {
  areaList = '/countries/code/list', // 国家编码列表
  exclusiveRelease = '/personalized/privatecontent', // 独家放送(入口列表)
  exclusiveReleaseList = '/personalized/privatecontent/list', // 独家放送列表
  radio = '/user/audio', // 用户电台
  calender = '/calendar', // 音乐日历
  subArtistNewMV = '/artist/new/mv', // 关注歌手新MV
  heartbeatList = '/playmode/intelligence/list', // 心动模式/智能播放
  comment = '/comment/hotwall/list', // 云村热评
  topic = '/hot/topic', // 获取热门话题
  recommend = '/dj/recommend', // 电台 - 推荐
}
