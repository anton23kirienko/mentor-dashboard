This app is a great example of an approach which shouldn't be taken in consideration while developing server-side logic. Initially server was supposed to get data from google sheets, combine it and give on demand to client layer. Actually it does all of it but extremely slow. It takes about 40 - 50 sec to get data from google sheets. So now all what the server is capable of is to serve single json file though all unnecessary code is still in the repo.

Deployed client can be found [here](https://anton23kirienko.github.io/mentor-github/index.html).
