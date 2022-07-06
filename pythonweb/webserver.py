from http.server import HTTPServer, SimpleHTTPRequestHandler
import ssl

server_ip = 'localhost'
server_port = 443
server_address = (server_ip, server_port)

httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
# httpd.socket = ssl.wrap_socket(httpd.socket, server_side=True, certfile="./gjol.vip.pem", keyfile="./gjol.vip.key",
#                                ssl_version=ssl.PROTOCOL_TLSv1)

sslctx = ssl.SSLContext()
sslctx.check_hostname = False # If set to True, only the hostname that matches the certificate will be accepted
sslctx.load_cert_chain(certfile="./gjol.vip.pem", keyfile="./gjol.vip.key")
httpd.socket = sslctx.wrap_socket(httpd.socket, server_side=True)
httpd.serve_forever()