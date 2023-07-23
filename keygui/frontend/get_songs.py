import spotipy
import os 
from spotipy import SpotifyOAuth
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

#returns spotify authentication
def SpotifyClientCredentials():
    return SpotifyOAuth(client_id=os.getenv('SPOTIFY_CLIENT_ID'), 
            client_secret=os.getenv('SPOTIFY_CLIENT_SECRET'),
            redirect_uri="https://localhost:8888/callback")

#initializes mongodb database
client=MongoClient(os.getenv('URI'),server_api=ServerApi('1'))
db=client.spotifydata #creates database 
collection=db.songdata #creates collection that contains the songdata

#idea: create collection for each user(?)

tfuri="spotify:playlist:6UeSakyzhiEt4NB3UAd6NQ" #the uri for spotify's "Billboard Hot 100" playlist
spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials())
tfts=[] #track features

#song info nomenclature(?)
major, minor = "Major", "Minor"
header = ['Name', 'Key', 'Mode', 'Key Signature']
notes={0:'C', 1:'C♯/D♭', 2:'D', 3:'E♭', 4:'E', 5:'F', 6:'F♯/G♭', 7:'G', 8:'A♭', 9:'A', 10:'B♭', 11:'B/C♭'}

for i in range(7):
    tft=spotify.playlist_items(playlist_id=tfuri, market="US", offset=100*i)
    for track in tft["items"]:
        song_feat= spotify.audio_features(track['track']['href'][34:]) #return current track uri 
        key=song_feat[0]['key']
        mode=song_feat[0]['mode']
        song_name=track['track']['name']
        kam=notes[key] + (" Major" if mode == 1 else " Minor") #key and mode
        bpm=song_feat[0]['tempo']
        time_signature=str(song_feat[0]['time_signature'])+"/4"
        album_uri=track['track']['album']['uri'][14:] #extract uri of track arist
        genres=[]

        artists=[]
        artist=track['track']['artists']
        for i in artist:
            artists.append(i["name"])
            genre=spotify.artist(i["uri"])["genres"]
            genres.append(genre)

        post={
            
             "name": song_name,
             "artist": artists,
             "key and mode": kam,
             "bpm":bpm, 
             "time_signature": time_signature,
             "genres": genres,
             
        }
        post_id=collection.insert_one(post).inserted_id
        



    

