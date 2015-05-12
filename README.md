OneStack Enterprise Service Platform
=========================

1. Run in development mode

  ```bash
  npm install
  grunt
  ```

  Open `http://localhost:11020/explorer` for more info


2. Run in production mode

  ```bash
  bin/standalone
  ```

3. Run in docker

  ```bash
  docker build -t hello .
  docker run --rm -it hello
  ```