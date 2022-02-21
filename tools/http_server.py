#!/usr/bin/env python

"""
Manage a simple HTTP server to test the NANOGAME game

Credits:
1) https://docs.python.org/2/library/simplehttpserver.html?highlight=simplehttpserver
    Copyright 1990-2018, Python Software Foundation.

2) https://code.activestate.com/recipes/336012-stoppable-http-server/
"""

_COPYRIGHT_AND_LICENSE = """
NANOGAME-THE-PROGRAM-LICENSE-MD-BEGIN
# COPYRIGHT

The software NANOGAME-JS implements the rules of the NANOGAME board game. This copyright notice only covers the software NANOGAME-JS. The copyright of the NANOGAME rules and board game concept can be found at https://github.com/LucasBorboleta/nanogame.

Copyright (C) 2022 Lucas Borboleta (lucas.borboleta@free.fr).

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <http://www.gnu.org/licenses>.
NANOGAME-THE-PROGRAM-LICENSE-MD-END
"""

import datetime
import http.server
import http.client
import os
import re
import socketserver
import signal
import sys


_default_port=8080


def get_log_path():
    log_path = os.path.join(get_tmpdir_path(), os.path.basename(__file__) + ".log.txt")
    return log_path


def get_project_home():
    project_home = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    return project_home

def get_pid_path():
    pid_path = os.path.join(get_tmpdir_path(), "pid.txt")
    return pid_path


def get_tmpdir_path():  
    tmpdir_path = os.path.join(get_project_home(), "tmp")
    if not os.path.isdir(tmpdir_path):
        os.mkdir(tmpdir_path)
    return tmpdir_path


class Unbuffered(object):

   def __init__(self, stream):
       self.stream = stream

   def write(self, data):
       self.stream.write(data)
       self.stream.flush()

   def writelines(self, datas):
       self.stream.writelines(datas)
       self.stream.flush()

   def __getattr__(self, attr):
       return getattr(self.stream, attr)
    

class StoppableHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    """http request handler with QUIT stopping the server"""


    def do_GET (self):
        
        incr_rule = re.compile(r'/:INCR:(?P<incr_arg>[0-9]+)$')
        incr_match = incr_rule.match(self.path)
                    
        if incr_match:
            self.send_response(200)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            
            incr_input = int(incr_match.group('incr_arg'))
            incr_output = str(incr_input + 1)
            self.wfile.write(bytes(str(incr_output).encode("utf-8")))
            
        else:
            super(StoppableHttpRequestHandler, self).do_GET()



    def do_QUIT (self):
        """send 200 OK response, and set server.stop to True"""
        self.send_response(200)
        self.end_headers()
        print("StoppableHttpRequestHandler.do_QUIT: server.nanogame_stop=True ...")
        self.server.nanogame_stop = True

        

class StoppableHttpServer(socketserver.TCPServer):
    """http server that reacts to self.stop flag"""
    
    
    def __init__(self, *args, **kwargs):
        super(StoppableHttpServer, self).__init__(*args, **kwargs)
        self.nanogame_stop = False

        pid = os.getpid()
        pid_stream = open(get_pid_path(), "w")
        pid_stream.write("%d\n" % pid)
        pid_stream.close()  
        print("StoppableHttpServer.__init__: server process has pid=%d" % pid)


    def service_actions(self):
        if self.nanogame_stop:
            print("StoppableHttpServer.service_actions: shutting down the server ...")
            self.shutdown()
            print("StoppableHttpServer.service_actions: shutting down the server done")


def start_server(port=_default_port):
    
    sys.stdout = Unbuffered(open(get_log_path(), "w"))
    sys.stderr = sys.stdout

    print()
    print( "Hello " + datetime.datetime.now().isoformat() )
    print()

    os.chdir(get_project_home())

    server = StoppableHttpServer(("localhost", port), StoppableHttpRequestHandler)
    
    print()
    print( "Serving NANOGAME at port %d." % port )
    print()
    print( "Open the URL http://localhost:%d in your web browser." % port )
    print()
    print( "For stopping the server:" )
    print( "  1) Quit your web browser." )
    print( "  2) Execute the script 'tools/http_stop_server.py'." )
    print()
    
    server.serve_forever()

    print()
    print( "Bye " + datetime.datetime.now().isoformat() )
    print()


def stop_server(port=_default_port):
    """send QUIT request to http server running on localhost:<port>"""
    
    connection = http.client.HTTPConnection(host="localhost", port=port, timeout=10)
    connection.request(method="QUIT", url="/")
    connection.getresponse()
    connection.close()


def kill_server(port=_default_port):
    """skill the server process"""
    
    pid_stream = open(get_pid_path(), "r")
    pid = int(pid_stream.read().strip())
    pid_stream.close()
    print("stop_server: kill server process with pid=%d ..." % pid)
    os.kill(pid, signal.SIGINT)
    ###os.kill(pid, signal.SIGABRT)


if __name__ == "__main__":
    pass
