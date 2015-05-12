OneStack Enterprise Service Platform
=========================

### Run in development mode

  ```bash
  npm install
  grunt
  ```

  Open `http://localhost:11020/explorer` for more info


### Run in production mode

  ```bash
  bin/standalone
  ```

### Run in docker

  ```bash
  docker build -t hello .
  docker run --rm -it hello
  ```