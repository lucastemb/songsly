import spotipy
import os 
from spotipy import SpotifyOAuth
from notes import notes
from pymongo import MongoClient

#returns spotify authentication
def SpotifyClientCredentials():
    return SpotifyOAuth(client_id=os.getenv('SPOTIFY_CLIENT_ID'), 
            client_secret=os.getenv('SPOTIFY_CLIENT_SECRET'),
            redirect_uri="https://localhost:8888/callback")


client=MongoClient("mongodb://localhost:27017/")
db=client.spotifydata #database
collection=db.songdata #like table in sql

tfuri="spotify:playlist:0JiVp7Z0pYKI8diUV6HJyQ" #the uri for spotify's "Top 500 Most Streamed Songs of All Time" playlist
spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials())
tfts=[] #track features
major, minor = "Major", "Minor"
header = ['Name', 'Key', 'Mode', 'Key Signature']
posts=db.posts
for i in range(7):
    tft=spotify.playlist_items(playlist_id=tfuri, market="US", offset=100*i)
    for track in tft["items"]:
        song_feat= spotify.audio_features(track['track']['href'][34:])
        key=song_feat[0]['key']
        mode=song_feat[0]['mode']
        kam=notes[key] + (" Major" if mode == 1 else " Minor") #key and mode
        post={
             "name": track['track']['name'],
             "key and mode": kam,
        }
        post_id=posts.insert_one(post).inserted_id
        



    

