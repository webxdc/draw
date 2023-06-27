# Draw [![CI](https://github.com/webxdc/draw.xdc/actions/workflows/ci.yml/badge.svg)](https://github.com/webxdc/draw.xdc/actions/workflows/ci.yml) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A WebXDC app that allows to share draws.

<img width="200" alt="draw" src="https://user-images.githubusercontent.com/9800740/170771244-cc1ce59e-9f9f-41bd-ae27-1e195cf930bb.png">

[Download the latest version](https://github.com/webxdc/draw.xdc/releases/latest/download/draw.xdc), attach to a Delta Chat (or other [WebXDC-capable](https://webxdc.org) client) group and share your drawings!

## Developing

### Installing Dependencies

After cloning this repo for the first time, install dependecies:

```
pnpm i
```

### Running tests

```
pnpm test
```

### Testing the app in the browser

To test your work in your browser (with hot reloading!) while developing:

```
pnpm dev-mini
# Alternatively to test in a more advanced WebXDC emulator:
npm run dev
```

**💡 TIP:** To debug inside Delta Chat, uncomment the `script` tag at the end of
`index.html` file and your WebXDC will be packaged with developer tools inside!

### Building

To package the WebXDC file:

```
pnpm build
```

The resulting optimized `.xdc` file is saved in `dist-xdc/` folder.

### Releasing

To automatically build and create a new GitHub release with your `.xdc` file:

```
git tag v1.0.1
git push origin v1.0.1
```
