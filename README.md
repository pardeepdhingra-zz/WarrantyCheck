# Warranty Check

Warranty Check is API based on ruby on rails for storing products and checking there warranty status.

You can also:
  - Search by product brand and type
  - It notifies user about the products whose warranty about to expire

Technology:
* [Ruby on Rails] - Backend API for web apps!
* [Postgresql] - Database to store product details and user authentication details
* [Devise] - For user registration and Authentication

And of course Warranty Check itself is open source with a [public repository][WarrantyCheck]
 on GitHub.

### Installation

WarrantyCheck requires [Ruby on Rails](http://rubyonrails.org/) 4.2 to run.

Download and extract the [latest pre-built release](https://github.com/railites/WarrantyCheck).

Install the dependencies and devDependencies and start the server.

```sh
$ cd WarrantyCheck
$ bundle install
```

Create database and migrate table into it

```sh
$ rake db:create
$ rake db:migrate
```
For development environments...

```sh
$ rails s -p <port>
```

For production environments...
```sh
$ rails s -p <port> -e production
```
