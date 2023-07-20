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

#initializes mongodb database
client=MongoClient("mongodb://localhost:27017/")
db=client.spotifydata #creates database 
collection=db.songdata #creates collection that contains the songdata

#idea: create collection for each user(?)

tfuri="spotify:playlist:0JiVp7Z0pYKI8diUV6HJyQ" #the uri for spotify's "Top 500 Most Streamed Songs of All Time" playlist
spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials())
tfts=[] #track features

#song info nomenclature(?)
major, minor = "Major", "Minor"
header = ['Name', 'Key', 'Mode', 'Key Signature']
notes={0:'C', 1:'C♯/D♭', 2:'D', 3:'E♭', 4:'E', 5:'F', 6:'F♯/G♭', 7:'G', 8:'A♭', 9:'A', 10:'B♭', 11:'B/C♭'}

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
        post_id=collection.insert_one(post).inserted_id
        



    

