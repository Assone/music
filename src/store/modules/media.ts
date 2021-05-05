import { Module } from 'vuex';
import {
  ADD_TRACK,
  PAUSE,
  PLAY,
  PLAY_CURRENT,
  PLAY_NEXT,
  PLAY_PREV,
  PLAY_RESET,
  PLAY_SPECIFIC,
  SET_MODEL,
  SET_MUTE,
  SET_SOURCE_ID,
  SET_TRACKS,
  SET_VOLUME,
} from '../type';

const media: Module<SMediaState, SRootState> = {
  namespaced: true,
  state: {
    id: 0,
    play: false,
    model: 'default',
    activeIndex: 0,
    tracks: [],
    volume: 1,
    mute: false,
  },
  getters: {
    currentTrack({ tracks, activeIndex }) {
      return tracks[activeIndex];
    },
  },
  mutations: {
    [PLAY](state) {
      state.play = true;
    },
    [PAUSE](state) {
      state.play = false;
    },
    [PLAY_PREV](state) {
      state.activeIndex -= 1;
    },
    [PLAY_NEXT](state) {
      state.activeIndex += 1;
    },
    [PLAY_RESET](state) {
      state.activeIndex = 0;
    },
    [PLAY_CURRENT](state, index: number) {
      state.activeIndex = index;
    },
    [SET_MODEL](state, model: SMediaState['model']) {
      state.model = model;
    },
    [SET_TRACKS](state, tracks: number[]) {
      state.tracks = tracks;
    },
    [ADD_TRACK](state, track: number) {
      state.tracks.push(track);
    },
    [SET_VOLUME](state, volume: number) {
      state.volume = volume;
    },
    [SET_MUTE](state, mute: boolean) {
      state.mute = mute;
    },
    [SET_SOURCE_ID](state, id: number) {
      state.id = id;
    },
  },
  actions: {
    [PLAY]({ commit }, options: { ids: number[]; id: number; track?: number }) {
      commit(SET_TRACKS, options.ids);
      commit(SET_SOURCE_ID, options.id);

      if (options.track) {
        const index = options.ids.indexOf(options.track);
        commit(PLAY_CURRENT, index);
      } else {
        commit(PLAY_RESET);
      }
      commit(PLAY);
    },
    [PLAY_SPECIFIC]({ commit, state }, track: number) {
      const index = state.tracks.indexOf(track);

      if (index !== state.activeIndex) commit(PLAY_CURRENT, index);
      commit(PLAY);
    },
    [PLAY_PREV]({ commit }) {
      commit(PLAY_PREV);
    },
    [PLAY_NEXT]({ commit }) {
      commit(PLAY_NEXT);
    },
    [SET_VOLUME]({ commit, state }, volume: number) {
      if (volume && state.mute) commit(SET_MUTE, false);
      if (volume === 0) commit(SET_MUTE, true);
      commit(SET_VOLUME, volume);
    },
  },
};

export default media;
