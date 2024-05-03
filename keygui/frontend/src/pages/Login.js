const Login = () => {
    const scopes = [
        "ugc-image-upload",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "app-remote-control",
        "playlist-modify-public",
        "user-modify-playback-state",
        "playlist-modify-private",
        "user-follow-modify",
        "user-read-currently-playing",
        "user-follow-read",
        "user-library-modify",
        "user-read-playback-position",
        "playlist-read-private",
        "user-read-email",
        "user-read-private",
        "user-library-read",
        "playlist-read-collaborative",
        "streaming"
    ];
    console.log(process.env.REACT_APP_SPOTIFY_CLIENT_ID)
    const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_SPOTIFY_REDIRECT_URI}&scope=${scopes.join("%20")}`;

    return (
        <div className="">
            <button className="">
                <a className="" href={authorizeUrl}>
                Login
                </a>
            </button>
        </div>
    );
}

export default Login;