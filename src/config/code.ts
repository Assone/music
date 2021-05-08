/* eslint-disable no-shadow */

export enum TypeIDSource {
  song,
  mv,
  playlist,
  album,
  radio,
  video,
  dynamic,
}

export enum TypeIDCommentSort {
  recommend = 1,
  hot,
  time,
}

export enum TypeIDSearch {
  song = 1,
  album = 10,
  artist = 100,
  playlist = 1000,
  user = 1002,
  mv = 1004,
  lyric = 1006,
  radio = 1009,
  video = 1014,
  comprehensive = 1018,
}

export enum TypeIDMVArea {
  '全部',
  '内地',
  '港台',
  '欧美',
  '日本',
  '韩国',
}

export enum TypeIDMVType {
  '全部',
  '官方版',
  '原生',
  '现场版',
  '网易出品',
}

export enum TypeIDMVOrder {
  '上升最快',
  '最热',
  '最新',
}
