<div align="center">
  
# Boat Tracker
  
</div>


### Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [TODO](#todo)
- [Bugs](#bugs)
- [Install](#install)


# Introduction

This is an application to track ship movement on map.


# Features

- Multiple servers
- Coordinates handled through csv
- Web sockets with native API implementation
- Data is streamed every second to all connected clients at same time
- Ui does not connect to CoordProvider directly
- Coordinates are loaded in infinite loop, no need for human intervention

# TODO

- Database connection
- implement heading display
- Saving/loading tracks

# Bugs

- Boat does not appear on map

# Install
Clone the repository with "git clone git@github.com:Asanque/BoatTracker.git" command
Inside CoordProvider, Server and UI folders run the install.bat files
Inside the same folders run the start.bat files in CoordProvider->Server->UI order
