# NiceBlog

The blog was build with Angular2 and Express.The database is MongoDB.

This is a [Demo](http://derker.cn).

## Development

First, you should clone：

```
git clone git@github.com:derker94/NiceBlog.git
```

### Fore-end

Fore-end was build with Angular2 and the code was stored in the `NiceBlog/web` directory.

You can go into the `web` directory and run build script to build：

```
cd NiceBlog/web
npm install
npm build
```

The build artifacts will be stored in the `NiceBlog/server/public` directory. 

You can also run `npm start` for a dev server，The app will automatically reload if you change the web code.

### Back-end

Back-end was build with Express and the code was stored in the `NiceBlog/server` directory.

You can run `npm run dev` to put the server in development mode or run `npm start` for production mode.

```
cd NiceBlog/server
npm install
npm run dev
# or
npm start
```

You can set the server host and server port through `NiceBlog/server/config.json`.

### Import article(markdown) to MongoDB

```
./NiceBlog/bin/markdown -r -p <dir/file>
```
