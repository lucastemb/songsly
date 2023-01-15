import spotipy
import os 
from spotipy import SpotifyOAuth
from notes import notes
from notes import major
from notes import minor

def SpotifyClientCredentials():
    return SpotifyOAuth(client_id=os.getenv('SPOTIFY_CLIENT_ID'), 
            client_secret=os.getenv('SPOTIFY_CLIENT_SECRET'),
            redirect_uri="https://localhost:8888/callback")

tfuri="spotify:playlist:37i9dQZEVXbLRQDuF5jeBp"
spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials())
tft=spotify.playlist_items(playlist_id=tfuri, market="US", limit=50)

for track in tft["items"]:
    song_feat= spotify.audio_features(track['track']['href'][34:])
    key=song_feat[0]['key']
    mode=song_feat[0]['mode']
    print("Name: " + track['track']['name'] + " Key: " + notes[key] + " " + (major if mode == 1 else minor))
    

