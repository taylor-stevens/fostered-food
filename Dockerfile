# Basic nginx dockerfile starting with Ubuntu 20.04
# Changed the filetype txt -> none (12/15/22)
FROM ubuntu:20.04
RUN apt-get -y update && apt-get -y install nginx
