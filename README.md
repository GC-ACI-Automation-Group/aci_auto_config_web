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

