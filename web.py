#!/usr/bin/env python3

import os
import json
import tempfile

import yaml
from ansible.cli.playbook import PlaybookCLI
from flask import Flask, send_from_directory, request, send_file
from gevent.pywsgi import WSGIServer

app = Flask(__name__, static_folder='dist')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('dist/js', path)

@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('dist/css', path)

@app.route('/fonts/<path:path>')
def send_font(path):
    return send_from_directory('dist/fonts', path)

def save_config_fille(data):
    tf = tempfile.NamedTemporaryFile(suffix='.yml', prefix='aci_config_', delete=False)
    tf.close()

    with open(tf.name, 'w') as f:
        yaml.dump(data, f)
        f.flush()

    return tf.name

def apply_config(json_data):
    config_file = save_config_fille(json_data)

    app.logger.info('user config file: %s', config_file)

    args = [' ',
            '-i', '/inventory',
            '05_aci_deploy_app.yml',
            '-e', '@{}'.format(config_file)]

    playbook = PlaybookCLI(args)

    exit_code = playbook.run()
    os.unlink(config_file)

    return exit_code == 0

@app.route('/api/config', methods=['POST'])
def recieve_data():
    data = request.get_data()
    data = json.loads(data)

    app.logger.info(data)

    apply_result = apply_config(data)

    return 'success' if apply_result else 'failed'

if __name__ == '__main__':
    server = WSGIServer(('0.0.0.0', 80), app)
    server.serve_forever()
