# weareastream-client

The client for https://weareateam.stream, an always-on stream of Ceres' album _We Are a Team_ playing on an endless loop. Everyone who tuned in heard the same moment, like a radio station.

Status: archived. Made in 2019. This is the original client, which was hosted on Surge and played audio from a separate server, [weareastream-server](https://github.com/superhighfives/weareastream-server). The weareateam.stream domain is no longer live. [superhighfives/weareastream](https://github.com/superhighfives/weareastream) is the current version, which combines this client and the server into a single Bun app on Fly.io, live at https://weareastream.superhighfives.com.

## Running it

Copy `.env.sample` to `.env`. `REACT_APP_AUDIO_SERVER_URL` is the server the app streams `/live.mp3` from, and `REACT_APP_LAUNCH_STATUS` sets which of three states gets built: `prelaunch` shows the launch date, `live` builds the player, and `postlaunch` shows "We Were a Team" once it was over.

```
yarn start
```

To deploy to staging, https://weareastream.surge.sh:

```
yarn deploy
```

To deploy to production, https://weareateam.stream:

```
yarn deploy-prod
```

## How it works

A Create React App site with styled-components, prerendered with `react-snap` after each build. The player is a single `Audio` object pointed at the server's live MP3 stream, so there's no seeking: you join wherever the record happens to be.

## Links

- [weareastream-server](https://github.com/superhighfives/weareastream-server)
- [weareastream](https://github.com/superhighfives/weareastream), the current version
