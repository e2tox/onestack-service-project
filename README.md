OneStack Enterprise Service Platform
=========================

### Run in development mode

  ```bash
  npm install
  grunt
  ```
  
  Useful console output for logging and analysis
  
![Console Output](https://raw.githubusercontent.com/e2tox/images/master/onestack.png)


  Open `http://localhost:11020/explorer` for more info
  
![API Explorer](https://raw.githubusercontent.com/e2tox/images/master/onestack-service.png)


### Run in production mode

  ```bash
  bin/standalone
  ```

### Run in docker

  ```bash
  docker build -t hello .
  docker run --rm -it hello
  ```