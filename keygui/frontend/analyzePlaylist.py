import spotipy
from spotipy import SpotifyOAuth
import os

def SpotifyClientCredentials():
    return SpotifyOAuth(client_id=os.getenv('SPOTIFY_CLIENT_ID'), 
            client_secret=os.getenv('SPOTIFY_CLIENT_SECRET'),
            redirect_uri="https://localhost:8888/callback")

credentials=SpotifyClientCredentials()
spotify=spotipy.Spotify(client_credentials_manager=credentials)

major, minor = "Major", "Minor"
notes={0:'C', 1:'C♯/D♭', 2:'D', 3:'E♭', 4:'E', 5:'F', 6:'F♯/G♭', 7:'G', 8:'A♭', 9:'A', 10:'B♭', 11:'B/C♭'}

class analyzePlaylist():
    def __init__(self, uri): 
        self.uri = uri
        self.tracks=spotify.playlist_items(self.uri)

    #for now this keeps in mind that 
    def sortKeys(self):
        keys={}
        for track in self.tracks["items"]:
            song_feat=spotify.audio_features(track['track']['uri'])
            key=song_feat[0]['key']
            mode=song_feat[0]['mode']
            kam=notes[key] + (" Minor" if mode == 0 else " Major")
            keys[kam]=1 + keys.get(kam, 0)
        return keys

    def topArtists(self):
        artist_freq={}
        for track in self.tracks["items"]:
            artist=track['track']['artists']
            for i in artist:
                artist_freq[i["name"]]=1 + artist_freq.get(i["name"],0)
        return sorted(artist_freq.items(), key=lambda a: a[1], reverse=True)[0:3]

    def topGenres(self): 
        genre_freq={}
        for track in self.tracks["items"]:
            artist=track['track']['artists']
            for i in artist:
                genres=spotify.artist(i["uri"])["genres"]
                for genre in genres: 
                    genre_freq[genre] = 1 + genre_freq.get(genre, 0)
        return sorted(genre_freq.items(), key=lambda a: a[1], reverse=True)[0:3]

    def sortBpm(self):
        bpm_ranges={}
        for track in self.tracks["items"]:
            song_feat=spotify.audio_features(track['track']['uri'])
            bpm=song_feat[0]['tempo']
            if bpm > 200:
                bpm_ranges["200-∞ bpm"]= 1 + bpm_ranges.get("200-∞ bpm", 0)
            elif bpm > 168 and bpm <= 200: 
                bpm_ranges["168-200 bpm"]= 1 + bpm_ranges.get("168-200 bpm", 0)
            elif bpm > 120 and bpm <= 168: 
                bpm_ranges["120-168 bpm"]= 1 + bpm_ranges.get("120-168 bpm", 0)
            elif bpm > 108 and bpm <= 120: 
                bpm_ranges["108-120 bpm"]= 1 + bpm_ranges.get("108-120 bpm", 0)
            elif bpm > 76 and bpm <= 108: 
                bpm_ranges["76-108 bpm"]= 1 + bpm_ranges.get("76-108 bpm", 0)
            elif bpm > 66 and bpm <= 76: 
                bpm_ranges["66-76 bpm"]= 1 + bpm_ranges.get("66-76 bpm", 0)
            elif bpm > 60 and bpm <= 66: 
                bpm_ranges["60-66 bpm"] = 1 + bpm_ranges.get("60-66 bpm", 0)
            else: 
                bpm_ranges["40-60 bpm"] = 1 + bpm_ranges.get("40-60 bpm", 0)
        return sorted(bpm_ranges.items(), key=lambda a: int(a[0].split('-')[0]))