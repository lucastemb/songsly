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
    def keySorter(self):
        keys={}
        for track in self.tracks["items"]:
            song_feat=spotify.audio_features(track['track']['uri'])
            key=song_feat[0]['key']
            mode=song_feat[0]['mode']
            kam=notes[key] + (" Minor" if mode == 0 else " Major")
            keys[kam]=1 + keys.get(kam, 0)
        return keys

    def sortArtists(self):
        artist_freq={}
        for track in self.tracks["items"]:
            artist=track['track']['artists']
            for i in artist:
                artist_freq[i["name"]]=1 + artist_freq.get(i["name"],0)
        return sorted(artist_freq.items(), key=lambda a: a[1], reverse=True)[0:3]

    