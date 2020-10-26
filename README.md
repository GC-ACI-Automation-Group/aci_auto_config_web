Cisco ACI Auto Config Web App
===
ACI Automation Configuration Web App:

Container(Web App + Python3 + Ansible2.10.1)= Cisco ACI Automation Configuration Web App


Requirements
===
1.Cisco APIC 4.1+

2.Docker Desktop

3.txt file editor

This is the components you need to use this app in your local environment.

For the codes, please check:https://github.com/GC-ACI-Automation-Group/aci_auto_config_web

Description
===
This project is a web app built from a container which used to complete the configuration of tenants in Cisco APIC automatically with simple navigation flow instead of clicking many different menu buttons under the APIC GUI.

How To Run The Website
===

```bash
docker run -d -p <host_port>:80 -v </path/to/inventory>:/inventory containers.cisco.com/jisi/aci_auto_config_web
```

You Can Build It By Yourself With The Following CMD
===

1. build the docker image

```bash
docker build -t aci_auto_config_web .
```

2. run the service

```bash
docker run -d -p 80:80 -v inventory:/inventory aci_auto_config_web
```

[inventory] File Content Example
===

```bash
[apic:vars]
username=admin
password=passwd

[apic]
aci.cisco.com
```

