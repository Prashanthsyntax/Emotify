import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

def authenticate_spotify():
    client_id = "ec0a2a297cbb4609a5df33fff403262b"
    client_secret = "8602cc313c47430585f4c75f8e06db2a"
    sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id=client_id, client_secret=client_secret))
    return sp

def get_playlist_for_mood(mood, sp):
    # Define the mood-to-playlist mapping
    mood_to_playlist = {
        'happy': 'spotify:playlist:37i9dQZF1DX3rxVfibe1L0',  # Happy Hits
        'sad': 'spotify:playlist:37i9dQZF1DX3YSRoSdA634',    # Sad Songs
        'angry': 'spotify:playlist:37i9dQZF1DX8SfyqmSFDwe',  # Rock Hard
        'neutral': 'spotify:playlist:37i9dQZF1DX6VdMW310YC7', # Chill Vibes
        'fear': 'spotify:playlist:37i9dQZF1DX4E3UdUs7fUx',    # Calming Music
        'surprise': 'spotify:playlist:37i9dQZF1DX4fpCWaHOned', # Mood Booster
        'disgust': 'spotify:playlist:37i9dQZF1DX3j9EYdzv2N9'   # Indie Pop
    }

    # Check if the mood exists in the dictionary
    if mood in mood_to_playlist:
        return mood_to_playlist[mood]
    else:
        print(f"No playlist found for mood: {mood}")
        return None


