#!/usr/bin/env python

"""
Start a simple HTTP server to test the NANOGAME game
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

import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

import http_server

if __name__ == "__main__":
    http_server.start_server()
    sys.exit(0)
