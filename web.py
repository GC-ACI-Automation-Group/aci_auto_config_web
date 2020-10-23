#!/usr/bin/env python3

import os
import yaml
import json

from flask import Flask, send_from_directory, request, send_file

app = Flask(__name__, static_folder='')

config_file = 'aci_config.yml'

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)

@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('css', path)

@app.route('/fonts/<path:path>')
def send_font(path):
    return send_from_directory('fonts', path)

@app.route('/api/config', methods=['POST'])
def recieve_data():
    data = request.get_data()
    data = json.loads(data)
    with open(config_file, 'w') as f:
        yaml.dump(data, f)
    print(request.get_data())
    return 'success'

@app.route('/download')
def download_config():
    return send_file(config_file, as_attachment=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
