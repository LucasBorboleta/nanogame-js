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
import json
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


def next_key(key):
    """ Compute the next key
    
     We just want to ensure a maximal cycle length, no more.
    
        When c ≠ 0, correctly chosen parameters allow a period equal to m, for all seed values. 
        This will occur if and only if
        1) m and c are relatively prime,
        2) (a - 1) is divisible by all prime factors of m,
        3) (a - 1) is divisible by 4 if m is divisible by 4.
    
        References:
        [1] Hull, T. E.; Dobell, A. R. (July 1962). "Random Number Generators"
        [2] Knuth, Donald (1997). Seminumerical Algorithms. The Art of Computer Programming. 2 (3rd ed.).
    """   
    a = 5
    c = 3
    m = 256
    return (a*key + c) % m


def singleton(class_):
    instances = {}
    def getinstance(*args, **kwargs):
        if class_ not in instances:
            instances[class_] = class_(*args, **kwargs)
        return instances[class_]
    return getinstance


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


@singleton
class NanogameCommander():

    ### 
    
    def __init__(self):
        self.__register_commands()
        self.__next = 1_000
        self.__players = list()
        self.__state = None
        self.__key = 0


    def __register_commands(self):
        self.__commands = dict()
        self.__commands["INCR"] = self.__command_incr
        self.__commands["NEXT"] = self.__command_next
        self.__commands["NEW_PLAYER"] = self.__command_new_player
        self.__commands["GET_STATE"] = self.__command_get_state
        self.__commands["SET_STATE"] = self.__command_set_state


    def execute(self, command_name, command_input):
        command_output = self.__commands[command_name](command_input)
        return command_output
        
    ### commands
    
    def __command_get_state(self, command_input):
        command_output = dict()
        command_output["state"] = self.__state
        command_output["key"] = self.__key
        return command_output
     
        
    def __command_set_state(self, command_input):
        key = command_input["key"]
        state = command_input["state"]
        
        if key == next_key(self.__key):
            self.__key = key
            self.__state = state
            command_output = "OK"
        else:
            command_output = "NOK"
            
        return command_output
   
    
    def __command_incr(self, command_input):
        command_output = command_input + 1
        return command_output

    
    def __command_next(self, command_input):
        self.__next += 10
        command_output = self.__next
        return command_output
 
    
    def __command_new_player(self, command_input):
        player_count = len(self.__players)
        player_count += 1
        
        if player_count == 1:
            self.__players.append("Alice")
            
        elif player_count == 2:
            self.__players.append("Bob")
            
        else:
            self.__players.append("Eve%d" % (player_count - 2) )
        
        command_output = self.__players[-1]
        return command_output


class NanogameHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Http request handler for Nanogame"""


    def __doit(self):
        
        command_rule = re.compile(r'^.*/:NANO:[0-9]+:(?P<command_name>[A-Z_]+):(?P<command_input>.*)$')
        command_match = command_rule.match(self.path)
                    
        if command_match:

            command_name = command_match.group('command_name')
            command_input = json.loads(command_match.group('command_input'))
            command_output = NanogameCommander().execute(command_name, command_input)
            
            self.send_response(200)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(bytes(json.dumps(command_output).encode("utf-8")))

            return True
        
        else:
            return False


    def do_GET(self):
        
        if not self.__doit():
            super().do_GET()


    def do_POST(self):
        
        if not self.__doit():
            super().do_POST()


    def do_QUIT(self):
        """send 200 OK response, and set server.stop to True"""
        self.send_response(200)
        self.end_headers()
        print("NanogameHttpRequestHandler.do_QUIT: server.nanogame_stop=True ...")
        self.server.nanogame_stop = True

        

class NanogameHttpServer(socketserver.TCPServer):
    """Http server handler for Nanogame that reacts to self.stop flag"""

    
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.nanogame_stop = False

        pid = os.getpid()
        pid_stream = open(get_pid_path(), "w")
        pid_stream.write("%d\n" % pid)
        pid_stream.close()  
        print("NanogameHttpServer.__init__: server process has pid=%d" % pid)


    def service_actions(self):
        if self.nanogame_stop:
            print("NanogameHttpServer.service_actions: shutting down the server ...")
            self.shutdown()
            print("NanogameHttpServer.service_actions: shutting down the server done")


def start_server(port=_default_port):
    
    sys.stdout = Unbuffered(open(get_log_path(), "w"))
    sys.stderr = sys.stdout

    print()
    print( "Hello " + datetime.datetime.now().isoformat() )
    print()

    os.chdir(get_project_home())
    
    with NanogameHttpServer(("localhost", port), NanogameHttpRequestHandler) as server:
    
        print()
        print( "Serving NANOGAME at port %d." % port )
        print()
        print( "Open the URL http://localhost:%d in your web browser." % port )
        print()
        print( "For stopping the server:" )
        print( "  1) Quit your web browser." )
        print( "  2) Execute the script 'tools/http_stop_server.py'." )
        print()
        
        server.serve_forever(poll_interval=0.100)
        
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
