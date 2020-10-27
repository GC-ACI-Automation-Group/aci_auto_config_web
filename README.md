Cisco ACI Auto Config Web App
===

ACI Automation Configuration Web App:

Container(Web App + Python3 + Ansible2.10.1)= Cisco ACI Automation Configuration Web App

[![Build Status](https://travis-ci.com/GC-ACI-Automation-Group/aci_auto_config_web.svg?branch=main)](https://travis-ci.com/GC-ACI-Automation-Group/aci_auto_config_web)

Requirements
===

1.Cisco APIC 4.1+

2.Docker Desktop

3.A sample file named inventory to tell the Cisco APIC's crendentials and ip address/domain name (txt format under windows, text format under Mac)

4.Git (optional, used to clone container image)

This is the components you need to use this app in your local environment.

For the codes, please check:https://github.com/GC-ACI-Automation-Group/aci_auto_config_web


Description
===

Cisco ACI（Application Centric Infrastructure）is an industry leading datacenter SDN solution, it can automatically deploy application policy to infrastructure, make customer’s datacenter network more flex and agile. But it is a little difficult to new user familiar with APIC configuration GUI.

We are planning to develop an application to help our new ACI customer very quickly and easily to deploy their ACI fabric. Our application is built on the top to container, so customer can get the identical environment at anytime and anywhere, it can deploy very quickly. After that customer can use this web application configuration policy on Cisco APIC automatically with one simple navigation flow instead of clicking many different menu buttons under the APIC GUI. It will make ACI more friendly to new user.

How it works
===
In order to use this web app, there are two step to do.

Step 1, Building The Web App Container:
===

 Option 1. To Build & Run The Container From https://hub.docker.com/ Remotely
 

 ```bash
 docker run -d -p <host_port>:80 -v </path/to/inventory>:/inventory jinyuansi/aci_auto_config_web
 ```

 Option 2. To Build & Run The Container By Yourself With The Following CMD


 1>. clone the git file to local 

 ```bash
 git clone https://github.com/GC-ACI-Automation-Group/aci_auto_config_web.git
 ```

 2>. go to the aci_auto_config_web directory

 ```bash
  cd aci_auto_config_web/
```

 3>. build the docker image

 ```bash
 docker build -t aci_auto_config_web .
 ```

 4>. run the service

 ```bash
 docker run -d -p <host_port>:80 -v </path/to/inventory>:/inventory aci_auto_config_web
 ```
 
Step 2. To Access The Web App With Browser For Your APIC Configuration:
===

http://localhost:<host_port>

[inventory] File Content Example
===

```bash
[apic:vars]
username=admin #APIC username
password=passwd #APIC password

[apic]
aci.cisco.com #APIC domain name
```

