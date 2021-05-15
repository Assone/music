import { computed, onDeactivated, Ref, ref, watch } from 'vue';
import { useStore } from '@/store';
import {
  CLOSE_PLAYER_VIEW,
  OPEN_PLAYER_VIEW,
  PAUSE,
  PLAY,
  PLAY_NEXT,
  PLAY_PREV,
  PLAY_SPECIFIC,
  SET_MUTE,
  SET_VOLUME,
} from '@/store/type';
import { getSongDetail, getSongUrl } from '@/apis';
import MSong from '@/models/Song';

export const useMediaState = (id?: number) => {
  const store = useStore();

  const sourceId = computed(() => store.state.media.id);
  const currentTrack = computed<number | undefined>(() => store.getters['media/currentTrack']);
  const activeTrack = computed(() => (sourceId.value === id ? currentTrack.value : undefined));
  const status = computed(() => store.state.media.play);
  const mute = computed(() => store.state.media.mute);
  const volume = computed(() => store.state.media.volume);
  const show = computed(() => store.state.media.show);

  return {
    sourceId,
    activeTrack,
    currentTrack,
    status,
    mute,
    volume,
    show,
  };
};

export const useMediaControls = () => {
  const store = useStore();

  return {
    play: () => store.commit(`media/${PLAY}`),
    pause: () => store.commit(`media/${PAUSE}`),
    prev: () => store.dispatch(`media/${PLAY_PREV}`),
    next: () => store.dispatch(`media/${PLAY_NEXT}`),
    setVolume: (volume: number) => store.dispatch(`media/${SET_VOLUME}`, volume),
    setMute: (mute: boolean) => store.commit(`media/${SET_MUTE}`, mute),
    openPlayer: () => store.commit(`media/${OPEN_PLAYER_VIEW}`),
    closePlayer: () => store.commit(`media/${CLOSE_PLAYER_VIEW}`),
  };
};

export const useMediaVolume = () => {
  const { mute, volume } = useMediaState();
  const { setVolume } = useMediaControls();

  const value = computed({
    get: () => (mute.value ? 0 : volume.value),
    set: (volume: number) => {
      setVolume(volume);
    },
  });

  return {
    value,
    setVolume,
  };
};

export const useMediaControlsByView = () => {
  const store = useStore();

  const play = (options: { ids: number[]; id: number; track?: number }) =>
    store.dispatch(`media/${PLAY}`, options);
  const playSpecific = (track: number) => store.dispatch(`media/${PLAY_SPECIFIC}`, track);

  return {
    play,
    playSpecific,
  };
};

export const useMediaAudioCore = (time: { currentTime: Ref<number>; duration: Ref<number> }) => {
  const audio = new Audio();
  const { status, currentTrack, volume, mute } = useMediaState();
  const { play, pause, next } = useMediaControls();
  const { currentTime, duration } = time;

  watch(status, (state) => {
    if (state) audio.play();
    else audio.pause();
  });
  watch(currentTrack, (track) => {
    if (track) {
      getSongUrl(track).then(([{ url }]) => {
        audio.src = url;
        if (status.value) audio.play();
      });
    }
  });
  watch(volume, (volume) => {
    audio.volume = volume;
  });
  watch(mute, (mute) => {
    audio.muted = mute;
  });

  const setCurrentPlayTime = (value: number) => {
    audio.currentTime = value;
  };

  const updateCurrentTime = ({ target }: Event) => {
    currentTime.value = Math.floor((target as HTMLMediaElement).currentTime);
  };
  const updateDuration = ({ target }: Event) => {
    duration.value = Math.floor((target as HTMLMediaElement).duration);
  };
  const handlePlay = () => {
    if (!audio.ended && !status.value) play();
  };
  const handlePause = () => {
    if (!audio.ended && status.value) pause();
  };
  const handleEnded = () => {
    next();
  };

  audio.addEventListener('timeupdate', updateCurrentTime);
  audio.addEventListener('durationchange', updateDuration);
  audio.addEventListener('play', handlePlay);
  audio.addEventListener('pause', handlePause);
  audio.addEventListener('ended', handleEnded);

  onDeactivated(() => {
    audio.removeEventListener('timeupdate', updateCurrentTime);
    audio.removeEventListener('durationchange', updateDuration);
    audio.removeEventListener('play', handlePlay);
    audio.removeEventListener('pause', handlePause);
    audio.removeEventListener('ended', handleEnded);
  });

  return {
    setCurrentPlayTime,
  };
};

export const useMediaAudioInfo = () => {
  const { currentTrack } = useMediaState();
  const info = ref<MSong>();

  const name = computed(() => info.value?.name);
  const cover = computed(() => info.value?.album.cover);
  const artists = computed(() => info.value?.artists);

  watch(currentTrack, (track) => {
    if (track) {
      getSongDetail(track).then(({ songs }) => {
        [info.value] = songs;
      });
    }
  });

  return {
    name,
    cover,
    artists,
  };
};
