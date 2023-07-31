from analyzePlaylist import * 
import os 
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

#MongoDB server 
client=MongoClient(os.getenv('URI'),server_api=ServerApi('1'))
db=client.spotifydata #creates database 
collection=db.songdata #creates collection that contains the songdata

billboard = analyzePlaylist("37i9dQZEVXbLRQDuF5jeBp")

post={
            
    "topGenres": billboard.topGenres(),
    "keyCounter": billboard.sortKeys(),
    "topArtists": billboard.topArtists(),
    "bpmRangeCounter": billboard.sortBpm(),
    "keySignatureCounter": billboard.sortTimeSignature(),
    "modeCounter": billboard.sortMode()
             
}
post_id=collection.insert_one(post).inserted_id

'''
sample output: 
[('rap', 48), ('pop', 32), ('trap', 30)]
{'F Major': 6, 'F♯/G♭ Major': 7, 'A♭ Major': 6, 'B/C♭ Major': 4, 'C Major': 8, 'E♭ Major': 1, 'A Major': 4, 'C♯/D♭ Minor': 6, 'D Major': 6, 'F Minor': 6, 'B/C♭ Minor': 3, 'E Major': 3, 'E Minor': 5, 'C♯/D♭ Major': 7, 'E♭ Minor': 2, 'D Minor': 5, 'A Minor': 4, 'F♯/G♭ Minor': 4, 'G Minor': 5, 'G Major': 3, 'B♭ Minor': 3, 'C Minor': 1, 'B♭ Major': 1}
[('3/4', 13), ('4/4', 85), ('5/4', 2)]
[('Lil Uzi Vert', 18), ('Peso Pluma', 11), ('Morgan Wallen', 8)]
[('66-76 bpm', 3), ('76-108 bpm', 21), ('108-120 bpm', 10), ('120-168 bpm', 56), ('168-200 bpm', 9), ('200-∞ bpm', 1)]
{' Major': 56, ' Minor': 44}


'''