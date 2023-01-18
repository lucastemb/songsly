import spotipy
import os 
from spotipy import SpotifyOAuth
from notes import notes
import csv

#returns spotify authentication
def SpotifyClientCredentials():
    return SpotifyOAuth(client_id=os.getenv('SPOTIFY_CLIENT_ID'), 
            client_secret=os.getenv('SPOTIFY_CLIENT_SECRET'),
            redirect_uri="https://localhost:8888/callback")


tfuri="spotify:playlist:37i9dQZEVXbLRQDuF5jeBp" #the uri for spotify's "Top 50-USA" playlist
spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials())
tft=spotify.playlist_items(playlist_id=tfuri, market="US", limit=50) 
songs = []
major, minor = "Major", "Minor"
header = ['Name', 'Key', 'Mode', 'Key Signature']
for track in tft["items"]:
    song_feat= spotify.audio_features(track['track']['href'][34:])
    key=song_feat[0]['key']
    mode=song_feat[0]['mode']
    kam=notes[key] + (" Major" if mode == 1 else " Minor")
    songs.append([track['track']['name'], str(key), str(mode), kam])
    #print("Name: " + track['track']['name'] + " Key: " + notes[key] + " " + (major if mode == 1 else minor))

with open("songs.csv", 'w') as csvfile:
        csv_writer = csv.writer(csvfile)
        csv_writer.writerow(header)
        for song in songs: 
            csv_writer.writerow(song)

    

