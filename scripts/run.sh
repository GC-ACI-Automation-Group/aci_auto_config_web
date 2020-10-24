#!/usr/bin/env sh

if [ ! -f '/inventory' ]; then
 cat << EOF
 I can not find the inventory file, Please use the following command the run this container

docker run -d -v <path/to/inventory>:/inventory -p <host_port>:80 <image>

EOF
exit 1
fi

python3 web.py
