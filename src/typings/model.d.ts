import MPlaylist from '@/models/Playlist';
import MAlbum from '@/models/Album';
import MArtist from '@/models/Artist';
import MArtistMV from '@/models/ArtistMV';
import MCount from '@/models/Count';
import MMeta from '@/models/Meta';
import MMetaSource from '@/models/MetaSource';
import MMV from '@/models/MV';
import MPlayable from '@/models/Playable';
import MProfile from '@/models/Profile';
import MRecMV from '@/models/RecMV';
import MRecPlaylist from '@/models/RecPlaylist';
import MSimilarMV from '@/models/SimilarMV';
import MSong from '@/models/Song';
import MTime from '@/models/Time';
import MTrack from '@/models/Track';
import MURLSong from '@/models/URLSong';
import MUser from '@/models/User';

declare global {
  namespace Model {
    type Album = MAlbum;
    type Artist = MArtist;
    type ArtistMV = MArtistMV;
    type Count = MCount;
    type Meta = MMeta;
    type MetaSource = MMetaSource;
    type MV = MMV;
    type Playable = MPlayable;
    type Playlist = MPlaylist;
    type Profile = MProfile;
    type RecMV = MRecMV;
    type RecPlaylist = MRecPlaylist;
    type SimilarMV = MSimilarMV;
    type Song = MSong;
    type Time = MTime;
    type Track = MTrack;
    type URLSong = MURLSong;
    type User = MUser;
  }
}
