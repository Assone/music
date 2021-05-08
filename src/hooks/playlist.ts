import { getPlaylistDetail } from '@/apis';

import { reactive, toRefs } from 'vue';
import { useMediaState, useMediaControlsByView } from './media';

export const usePlaylistDetailData = async (id: number) => {
  const { activeTrack, sourceId } = useMediaState(id);
  const { play, playSpecific } = useMediaControlsByView();
  const { name, cover, description, creator, track, trackIds } = toRefs(
    reactive(await getPlaylistDetail(id)),
  );

  const handlePlay = () => play({ id, ids: trackIds.value });
  const handleDoubleClick = ({ track }: { track: number }) => {
    if (sourceId.value === id) playSpecific(track);
    else play({ id, ids: trackIds.value, track });
  };

  return {
    name,
    cover,
    description,
    creator,
    track,
    trackIds,

    activeTrack,

    handlePlay,
    handleDoubleClick,
  };
};
