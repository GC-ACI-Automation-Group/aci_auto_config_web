FROM node:12 AS builder

WORKDIR /root/

COPY front_end .

RUN yarn install && \
    yarn build

FROM alpine:latest

MAINTAINER jisi@cisco.com

LABEL version="1.0"
LABEL description="ACI Automation Configurition Web"

RUN apk --no-cache add \
    python3 \
    gcc \
    python3-dev \
    musl-dev \
    libffi-dev \
    openssl-dev && \
    wget https://bootstrap.pypa.io/get-pip.py -O - | python3 -

EXPOSE 80

WORKDIR /ACI

COPY --from=builder /root/dist dist

COPY 05_aci_deploy_app.yml requirements.txt web.py scripts/run.sh ./

RUN pip3 install --no-cache-dir --compile -r requirements.txt

CMD ["./run.sh"]
